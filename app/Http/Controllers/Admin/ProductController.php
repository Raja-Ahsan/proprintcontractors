<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::query()
            ->with([
                'category',
                'variations:id,product_id,price,image',
            ])
            ->latest();

        if ($request->filled('q')) {
            $q = (string) $request->input('q');
            $query->where(function ($inner) use ($q): void {
                $inner->where('name', 'like', '%'.$q.'%')
                    ->orWhere('sku', 'like', '%'.$q.'%');
            });
        }

        $products = $query->paginate(15)->withQueryString();

        // Plain arrays so Inertia always receives image_url + price_range (no model merge quirks).
        $products->getCollection()->transform(function (Product $p): array {
            $type = $p->type === Product::TYPE_VARIABLE
                ? Product::TYPE_VARIABLE
                : Product::TYPE_SIMPLE;

            $priceRange = null;
            if ($type === Product::TYPE_VARIABLE && $p->variations->isNotEmpty()) {
                $prices = $p->variations->pluck('price')->map(fn ($x): float => (float) $x);
                $priceRange = [
                    'min' => $prices->min(),
                    'max' => $prices->max(),
                ];
            }

            $imageUrl = $p->listImageUrl();

            return [
                'id' => $p->id,
                'slug' => $p->slug,
                'name' => $p->name,
                'type' => $type,
                'sku' => $p->sku,
                'is_active' => (bool) $p->is_active,
                'is_featured' => (bool) $p->is_featured,
                'price' => $p->price,
                'stock_quantity' => $p->stock_quantity,
                'category' => $p->category
                    ? [
                        'id' => $p->category->id,
                        'name' => $p->category->name,
                    ]
                    : null,
                'image_url' => $imageUrl,
                'price_range' => $priceRange,
            ];
        });

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => ['q' => (string) $request->input('q', '')],
        ]);
    }

    public function create(): Response
    {
        $categories = Category::query()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'can_mark_featured' => Product::query()->where('is_featured', true)->count() < Product::MAX_FEATURED,
            'featured_limit' => Product::MAX_FEATURED,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $type = $request->input('type') === Product::TYPE_VARIABLE
            ? Product::TYPE_VARIABLE
            : Product::TYPE_SIMPLE;

        $baseRules = [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'is_featured' => ['boolean'],
            'is_customizable' => ['boolean'],
            'custom_print_area_json' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'type' => ['required', Rule::in([Product::TYPE_SIMPLE, Product::TYPE_VARIABLE])],
        ];

        if ($type === Product::TYPE_SIMPLE) {
            $validated = $request->validate(array_merge($baseRules, [
                'sku' => ['required', 'string', 'max:100', Rule::unique('products', 'sku')],
                'price' => ['required', 'numeric', 'min:0'],
                'compare_at_price' => ['nullable', 'numeric', 'min:0'],
                'stock_quantity' => ['required', 'integer', 'min:0'],
                'attribute_defs_json' => ['nullable'],
                'variations_json' => ['nullable'],
                'gallery_images' => ['nullable', 'array', 'max:20'],
                'gallery_images.*' => ['image', 'max:4096'],
            ]));
        } else {
            $validated = $request->validate(array_merge($baseRules, [
                'sku' => ['nullable', 'string', 'max:100', Rule::unique('products', 'sku')],
                'price' => ['nullable', 'numeric', 'min:0'],
                'compare_at_price' => ['nullable', 'numeric', 'min:0'],
                'stock_quantity' => ['nullable', 'integer', 'min:0'],
                'attribute_defs_json' => ['required', 'string'],
                'variations_json' => ['required', 'string'],
                'variation_images' => ['nullable', 'array'],
                'variation_images.*' => ['nullable', 'image', 'max:4096'],
            ]));
        }

        $slug = $request->filled('slug')
            ? Str::slug((string) $request->input('slug'))
            : Str::slug($validated['name']);

        Validator::make(
            ['slug' => $slug],
            ['slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')]]
        )->validate();

        $this->ensureFeaturedSlotAvailable($request->boolean('is_featured'));

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        if ($type === Product::TYPE_SIMPLE) {
            $galleryPaths = [];
            if ($request->hasFile('gallery_images')) {
                foreach ($request->file('gallery_images', []) as $file) {
                    if ($file && $file->isValid()) {
                        $galleryPaths[] = $file->store('products', 'public');
                    }
                }
            }

            $product = Product::query()->create([
                'category_id' => (int) $validated['category_id'],
                'type' => Product::TYPE_SIMPLE,
                'variation_attribute_defs' => null,
                'name' => $validated['name'],
                'slug' => $slug,
                'sku' => $validated['sku'],
                'description' => $validated['description'] ?? null,
                'price' => $validated['price'],
                'compare_at_price' => $validated['compare_at_price'] ?? null,
                'stock_quantity' => (int) $validated['stock_quantity'],
                'image' => $imagePath,
                'gallery' => $galleryPaths === [] ? null : array_values($galleryPaths),
                'is_active' => $request->boolean('is_active'),
                'is_featured' => $request->boolean('is_featured'),
                'is_customizable' => $request->boolean('is_customizable'),
                'custom_print_area' => $this->parseCustomPrintAreaJson($request->input('custom_print_area_json')),
            ]);

            return redirect()->route('admin.products.index')->with('success', 'Product created.');
        }

        $defs = $this->parseAttributeDefs((string) $validated['attribute_defs_json']);
        $variations = $this->parseVariationsPayload((string) $validated['variations_json'], $defs);

        DB::transaction(function () use ($validated, $slug, $imagePath, $defs, $variations, $request): void {
            $product = Product::query()->create([
                'category_id' => (int) $validated['category_id'],
                'type' => Product::TYPE_VARIABLE,
                'variation_attribute_defs' => $defs,
                'name' => $validated['name'],
                'slug' => $slug,
                'sku' => ($validated['sku'] ?? '') !== '' ? $validated['sku'] : null,
                'description' => $validated['description'] ?? null,
                'price' => 0,
                'compare_at_price' => null,
                'stock_quantity' => 0,
                'image' => $imagePath,
                'gallery' => null,
                'is_active' => $request->boolean('is_active'),
                'is_featured' => $request->boolean('is_featured'),
                'is_customizable' => $request->boolean('is_customizable'),
                'custom_print_area' => $this->parseCustomPrintAreaJson($request->input('custom_print_area_json')),
            ]);

            foreach ($variations as $idx => $row) {
                $variationImagePath = null;
                if ($request->hasFile('variation_images.'.$idx)) {
                    $vf = $request->file('variation_images.'.$idx);
                    if ($vf && $vf->isValid()) {
                        $variationImagePath = $vf->store('products/variations', 'public');
                    }
                }

                ProductVariation::query()->create([
                    'product_id' => $product->id,
                    'sku' => $row['sku'],
                    'price' => $row['price'],
                    'compare_at_price' => $row['compare_at_price'],
                    'stock_quantity' => $row['stock_quantity'],
                    'attributes' => $row['attributes'],
                    'image' => $variationImagePath,
                ]);
            }

            $product->refreshVariationAggregates();
        });

        return redirect()->route('admin.products.index')->with('success', 'Variable product created.');
    }

    public function edit(Product $product): Response
    {
        $categories = Category::query()->orderBy('name')->get(['id', 'name']);

        $product->load(['category', 'variations']);

        $payload = $product->toArray();
        $payload['gallery'] = $product->gallery ?? [];
        $payload['variations'] = $product->variations->map(fn (ProductVariation $v) => [
            'id' => $v->id,
            'sku' => $v->sku,
            'price' => (string) $v->price,
            'compare_at_price' => $v->compare_at_price !== null ? (string) $v->compare_at_price : '',
            'stock_quantity' => (string) $v->stock_quantity,
            'attributes' => $v->attributes ?? [],
            'image_url' => $v->image_url,
        ])->values()->all();

        return Inertia::render('Admin/Products/Edit', [
            'product' => $payload,
            'categories' => $categories,
            'can_mark_featured' => $product->is_featured
                || Product::query()->where('is_featured', true)->where('id', '!=', $product->id)->count() < Product::MAX_FEATURED,
            'featured_limit' => Product::MAX_FEATURED,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $type = $request->input('type') === Product::TYPE_VARIABLE
            ? Product::TYPE_VARIABLE
            : Product::TYPE_SIMPLE;

        $baseRules = [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'is_featured' => ['boolean'],
            'is_customizable' => ['boolean'],
            'custom_print_area_json' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'remove_image' => ['boolean'],
            'type' => ['required', Rule::in([Product::TYPE_SIMPLE, Product::TYPE_VARIABLE])],
        ];

        if ($type === Product::TYPE_SIMPLE) {
            $validated = $request->validate(array_merge($baseRules, [
                'sku' => ['required', 'string', 'max:100', Rule::unique('products', 'sku')->ignore($product->id)],
                'price' => ['required', 'numeric', 'min:0'],
                'compare_at_price' => ['nullable', 'numeric', 'min:0'],
                'stock_quantity' => ['required', 'integer', 'min:0'],
                'attribute_defs_json' => ['nullable'],
                'variations_json' => ['nullable'],
                'gallery_images' => ['nullable', 'array', 'max:20'],
                'gallery_images.*' => ['image', 'max:4096'],
                'gallery_remove_indexes' => ['nullable', 'array'],
                'gallery_remove_indexes.*' => ['integer', 'min:0'],
            ]));
        } else {
            $validated = $request->validate(array_merge($baseRules, [
                'sku' => ['nullable', 'string', 'max:100', Rule::unique('products', 'sku')->ignore($product->id)],
                'attribute_defs_json' => ['required', 'string'],
                'variations_json' => ['required', 'string'],
                'variation_images' => ['nullable', 'array'],
                'variation_images.*' => ['nullable', 'image', 'max:4096'],
            ]));
        }

        $slug = $request->filled('slug')
            ? Str::slug((string) $request->input('slug'))
            : Str::slug($validated['name']);

        Validator::make(
            ['slug' => $slug],
            ['slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($product->id)]]
        )->validate();

        $this->ensureFeaturedSlotAvailable($request->boolean('is_featured'), $product->id);

        if ($type === Product::TYPE_SIMPLE) {
            $update = [
                'category_id' => (int) $validated['category_id'],
                'type' => Product::TYPE_SIMPLE,
                'variation_attribute_defs' => null,
                'name' => $validated['name'],
                'slug' => $slug,
                'sku' => $validated['sku'],
                'description' => $validated['description'] ?? null,
                'price' => $validated['price'],
                'compare_at_price' => $validated['compare_at_price'] ?? null,
                'stock_quantity' => (int) $validated['stock_quantity'],
                'is_active' => $request->boolean('is_active'),
                'is_featured' => $request->boolean('is_featured'),
                'is_customizable' => $request->boolean('is_customizable'),
                'custom_print_area' => $this->parseCustomPrintAreaJson($request->input('custom_print_area_json')),
            ];

            if ($request->boolean('remove_image') && $product->image) {
                Storage::disk('public')->delete($product->image);
                $update['image'] = null;
            }

            if ($request->hasFile('image')) {
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }
                $update['image'] = $request->file('image')->store('products', 'public');
            }

            $gallery = is_array($product->gallery) ? array_values($product->gallery) : [];
            foreach ($validated['gallery_remove_indexes'] ?? [] as $ri) {
                $i = (int) $ri;
                if (! isset($gallery[$i])) {
                    continue;
                }
                $path = $gallery[$i];
                if (is_string($path) && $path !== '') {
                    Storage::disk('public')->delete($path);
                }
                unset($gallery[$i]);
            }
            $gallery = array_values($gallery);

            if ($request->hasFile('gallery_images')) {
                foreach ($request->file('gallery_images', []) as $file) {
                    if ($file && $file->isValid()) {
                        $gallery[] = $file->store('products', 'public');
                    }
                }
            }
            $update['gallery'] = $gallery === [] ? null : array_values($gallery);

            DB::transaction(function () use ($product, $update): void {
                foreach ($product->variations as $variation) {
                    if ($variation->image) {
                        Storage::disk('public')->delete($variation->image);
                    }
                }
                $product->variations()->delete();
                $product->update($update);
            });

            return redirect()->route('admin.products.index')->with('success', 'Product updated.');
        }

        $defs = $this->parseAttributeDefs((string) $validated['attribute_defs_json']);
        $variations = $this->parseVariationsPayload((string) $validated['variations_json'], $defs, $product->id);

        DB::transaction(function () use ($request, $product, $validated, $slug, $defs, $variations): void {
            $update = [
                'category_id' => (int) $validated['category_id'],
                'type' => Product::TYPE_VARIABLE,
                'variation_attribute_defs' => $defs,
                'name' => $validated['name'],
                'slug' => $slug,
                'sku' => ($validated['sku'] ?? '') !== '' ? $validated['sku'] : null,
                'description' => $validated['description'] ?? null,
                'is_active' => $request->boolean('is_active'),
                'is_featured' => $request->boolean('is_featured'),
                'is_customizable' => $request->boolean('is_customizable'),
                'custom_print_area' => $this->parseCustomPrintAreaJson($request->input('custom_print_area_json')),
                'gallery' => null,
            ];

            if (is_array($product->gallery)) {
                foreach ($product->gallery as $path) {
                    if (is_string($path) && $path !== '') {
                        Storage::disk('public')->delete($path);
                    }
                }
            }

            if ($request->boolean('remove_image') && $product->image) {
                Storage::disk('public')->delete($product->image);
                $update['image'] = null;
            }

            if ($request->hasFile('image')) {
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }
                $update['image'] = $request->file('image')->store('products', 'public');
            }

            $product->update($update);

            $incomingIds = collect($variations)->pluck('id')->filter()->map(fn ($id) => (int) $id)->all();
            $removedVariations = $product->variations()->whereNotIn('id', $incomingIds)->get();
            foreach ($removedVariations as $removed) {
                if ($removed->image) {
                    Storage::disk('public')->delete($removed->image);
                }
            }
            $product->variations()->whereNotIn('id', $incomingIds)->delete();

            foreach ($variations as $idx => $row) {
                $newVariationImagePath = null;
                if ($request->hasFile('variation_images.'.$idx)) {
                    $vf = $request->file('variation_images.'.$idx);
                    if ($vf && $vf->isValid()) {
                        $newVariationImagePath = $vf->store('products/variations', 'public');
                    }
                }

                if (! empty($row['id'])) {
                    $v = ProductVariation::query()
                        ->where('product_id', $product->id)
                        ->whereKey((int) $row['id'])
                        ->first();
                    if ($v) {
                        $varUpdate = [
                            'sku' => $row['sku'],
                            'price' => $row['price'],
                            'compare_at_price' => $row['compare_at_price'],
                            'stock_quantity' => $row['stock_quantity'],
                            'attributes' => $row['attributes'],
                        ];
                        if ($newVariationImagePath !== null) {
                            if ($v->image) {
                                Storage::disk('public')->delete($v->image);
                            }
                            $varUpdate['image'] = $newVariationImagePath;
                        }
                        $v->update($varUpdate);

                        continue;
                    }
                }

                ProductVariation::query()->create([
                    'product_id' => $product->id,
                    'sku' => $row['sku'],
                    'price' => $row['price'],
                    'compare_at_price' => $row['compare_at_price'],
                    'stock_quantity' => $row['stock_quantity'],
                    'attributes' => $row['attributes'],
                    'image' => $newVariationImagePath,
                ]);
            }

            $product->refreshVariationAggregates();
        });

        return redirect()->route('admin.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->load('variations');

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        if (is_array($product->gallery)) {
            foreach ($product->gallery as $path) {
                if (is_string($path) && $path !== '') {
                    Storage::disk('public')->delete($path);
                }
            }
        }

        foreach ($product->variations as $v) {
            if ($v->image) {
                Storage::disk('public')->delete($v->image);
            }
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }

    /**
     * Home page shows at most {@see Product::MAX_FEATURED} featured products.
     */
    protected function ensureFeaturedSlotAvailable(bool $wantsFeatured, ?int $exceptProductId = null): void
    {
        if (! $wantsFeatured) {
            return;
        }

        $query = Product::query()->where('is_featured', true);
        if ($exceptProductId !== null) {
            $query->where('id', '!=', $exceptProductId);
        }

        if ($query->count() >= Product::MAX_FEATURED) {
            throw ValidationException::withMessages([
                'is_featured' => 'At most '.Product::MAX_FEATURED.' products can be featured on the home page. Edit another product and uncheck Featured first.',
            ]);
        }
    }

    /**
     * @return list<array{key: string, label: string, values: list<string>}>
     */
    protected function parseAttributeDefs(string $json): array
    {
        $decoded = json_decode($json, true);
        if (! is_array($decoded) || $decoded === []) {
            throw ValidationException::withMessages([
                'attribute_defs_json' => 'Add at least one variation attribute (e.g. Color, Size).',
            ]);
        }

        $defs = [];
        $seenKeys = [];

        foreach ($decoded as $i => $row) {
            if (! is_array($row)) {
                continue;
            }

            $label = isset($row['label']) ? trim((string) $row['label']) : '';
            $key = isset($row['key']) ? trim((string) $row['key']) : '';
            if ($key === '' && $label !== '') {
                $key = Str::slug($label);
            }
            if ($key === '') {
                throw ValidationException::withMessages([
                    'attribute_defs_json' => 'Each attribute needs a name or key (row '.($i + 1).').',
                ]);
            }

            if (isset($seenKeys[$key])) {
                throw ValidationException::withMessages([
                    'attribute_defs_json' => 'Duplicate attribute key: '.$key,
                ]);
            }
            $seenKeys[$key] = true;

            $valuesRaw = $row['values'] ?? [];
            if (is_string($valuesRaw)) {
                $values = array_values(array_filter(array_map('trim', explode(',', $valuesRaw))));
            } elseif (is_array($valuesRaw)) {
                $values = array_values(array_filter(array_map(fn ($v) => trim((string) $v), $valuesRaw)));
            } else {
                $values = [];
            }

            if ($values === []) {
                throw ValidationException::withMessages([
                    'attribute_defs_json' => 'Attribute "'.$label.'" needs at least one option value.',
                ]);
            }

            $defs[] = [
                'key' => Str::limit($key, 60, ''),
                'label' => $label !== '' ? $label : Str::title(str_replace('-', ' ', $key)),
                'values' => $values,
            ];
        }

        if ($defs === []) {
            throw ValidationException::withMessages([
                'attribute_defs_json' => 'Add at least one valid variation attribute.',
            ]);
        }

        return $defs;
    }

    /**
     * @param  list<array{key: string, label: string, values: list<string>}>  $defs
     * @return list<array{id?: int, sku: string, price: float, compare_at_price: ?float, stock_quantity: int, attributes: array<string, string>}>
     */
    protected function parseVariationsPayload(string $json, array $defs, ?int $productId = null): array
    {
        $decoded = json_decode($json, true);
        if (! is_array($decoded) || $decoded === []) {
            throw ValidationException::withMessages([
                'variations_json' => 'Add at least one variation row with SKU, price, stock, and attribute values.',
            ]);
        }

        $keys = array_column($defs, 'key');
        $allowedByKey = [];
        foreach ($defs as $d) {
            $allowedByKey[$d['key']] = array_fill_keys($d['values'], true);
        }

        $result = [];

        foreach ($decoded as $i => $row) {
            if (! is_array($row)) {
                continue;
            }

            Validator::make($row, [
                'sku' => ['required', 'string', 'max:100', Rule::unique('product_variations', 'sku')->ignore($row['id'] ?? null)],
                'price' => ['required', 'numeric', 'min:0'],
                'compare_at_price' => ['nullable', 'numeric', 'min:0'],
                'stock_quantity' => ['required', 'integer', 'min:0'],
            ])->validate();

            $attrsIn = $row['attributes'] ?? [];
            if (! is_array($attrsIn)) {
                $attrsIn = [];
            }

            $attrsOut = [];
            foreach ($keys as $k) {
                if (! array_key_exists($k, $attrsIn)) {
                    throw ValidationException::withMessages([
                        'variations_json' => 'Variation row '.($i + 1).': missing value for attribute "'.$k.'".',
                    ]);
                }
                $val = trim((string) $attrsIn[$k]);
                if ($val === '' || empty($allowedByKey[$k][$val] ?? null)) {
                    throw ValidationException::withMessages([
                        'variations_json' => 'Variation row '.($i + 1).': invalid value for "'.$k.'". Use one of the allowed options.',
                    ]);
                }
                $attrsOut[$k] = $val;
            }

            $entry = [
                'sku' => $row['sku'],
                'price' => (float) $row['price'],
                'compare_at_price' => isset($row['compare_at_price']) && $row['compare_at_price'] !== ''
                    ? (float) $row['compare_at_price']
                    : null,
                'stock_quantity' => (int) $row['stock_quantity'],
                'attributes' => $attrsOut,
            ];

            if (! empty($row['id'])) {
                $entry['id'] = (int) $row['id'];
                if ($productId) {
                    $exists = ProductVariation::query()
                        ->where('product_id', $productId)
                        ->whereKey($entry['id'])
                        ->exists();
                    if (! $exists) {
                        unset($entry['id']);
                    }
                }
            }

            $result[] = $entry;
        }

        if ($result === []) {
            throw ValidationException::withMessages([
                'variations_json' => 'No valid variation rows.',
            ]);
        }

        return $result;
    }

    protected function parseCustomPrintAreaJson(mixed $raw): ?array
    {
        if (! is_string($raw) || trim($raw) === '') {
            return null;
        }

        $decoded = json_decode(trim($raw), true);

        if (! is_array($decoded)) {
            throw ValidationException::withMessages([
                'custom_print_area_json' => 'Print area must be valid JSON (object with left, top, width, height).',
            ]);
        }

        $out = [];

        foreach (['left', 'top', 'width', 'height'] as $k) {
            if (! array_key_exists($k, $decoded) || ! is_numeric($decoded[$k])) {
                throw ValidationException::withMessages([
                    'custom_print_area_json' => 'Print area must include numeric fields left, top, width, and height.',
                ]);
            }

            $v = (float) $decoded[$k];

            if ($v < 0 || $v > 1) {
                throw ValidationException::withMessages([
                    'custom_print_area_json' => 'Print area fractions must be between 0 and 1.',
                ]);
            }

            $out[$k] = round($v, 4);
        }

        return $out;
    }
}
