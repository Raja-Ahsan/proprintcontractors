<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Services\CustomOrderSubmissionService;
use App\Services\TransactionalMailService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OrderFormController extends Controller
{
    public const PRODUCT_CATEGORIES = [
        'Beanies',
        'Bottles',
        'Calendars',
        'Door Hanger',
        'Envelopes',
        'Hats',
        'Hoodies',
        'Jacket',
        'Mugs',
        'Notebook',
        'Pens',
        'Post Cards',
        'Stickers',
        'Sweatshirts',
        'T-shirt',
        'Tote Bag',
        'Yard Signs',
        'Business Cards',
    ];

    public function create(): Response
    {
        return Inertia::render('Marketing/OrderForm', [
            'defaultOrderDate' => now()->format('Y-m-d'),
            'productCategories' => $this->productCategoriesWithImages(),
        ]);
    }

    public function store(
        Request $request,
        CustomOrderSubmissionService $submissions,
        TransactionalMailService $mail,
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'order_date' => ['nullable', 'date'],
            'design_notes' => ['nullable', 'string', 'max:5000'],
            'order_items' => ['required', 'array', 'min:1', 'max:20'],
            'order_items.*.category' => ['required', 'string', Rule::in(self::PRODUCT_CATEGORIES)],
            'order_items.*.quantity' => ['nullable', 'integer', 'min:0', 'max:99999'],
            'order_items.*.size_specs' => ['nullable', 'string', 'max:255'],
            'order_items.*.color_material' => ['nullable', 'string', 'max:7'],
            'order_items.*.notes' => ['nullable', 'string', 'max:1000'],
            'artwork_files' => ['nullable', 'array', 'max:5'],
            'artwork_files.*' => [
                'file',
                'max:10240',
                'extensions:pdf,ai,eps,svg,psd,jpg,jpeg,png,webp,zip',
            ],
        ]);

        $submission = $submissions->create($request, $validated);

        $customerSent = $mail->sendCustomOrderConfirmation($submission);
        $adminSent = $mail->sendAdminCustomOrder($submission);

        if (! $customerSent || ! $adminSent) {
            Log::warning('Custom order form saved but one or more emails failed.', [
                'custom_order_submission_id' => $submission->id,
                'customer_sent' => $customerSent,
                'admin_sent' => $adminSent,
            ]);
        }

        return back()->with(
            'success',
            'Thank you — your order form '.$submission->submission_number.' has been received. We will contact you shortly to confirm details.',
        );
    }

    /**
     * @return list<array{name: string, image_url: string|null}>
     */
    private function productCategoriesWithImages(): array
    {
        $categoriesByName = Category::query()
            ->whereIn('name', self::PRODUCT_CATEGORIES)
            ->get(['id', 'name', 'image'])
            ->keyBy('name');

        $productImageByCategoryId = Product::query()
            ->whereIn('category_id', $categoriesByName->pluck('id'))
            ->whereNotNull('image')
            ->orderByDesc('id')
            ->get(['category_id', 'image'])
            ->unique('category_id')
            ->keyBy('category_id');

        return collect(self::PRODUCT_CATEGORIES)
            ->map(function (string $name) use ($categoriesByName, $productImageByCategoryId): array {
                $category = $categoriesByName->get($name);

                $imageUrl = $category?->image_url;

                if (! $imageUrl && $category) {
                    $product = $productImageByCategoryId->get($category->id);
                    $imageUrl = $product?->image
                        ? asset('storage/'.$product->image)
                        : null;
                }

                if (! $imageUrl) {
                    $imageUrl = $this->defaultCategoryImageUrl($name);
                }

                return [
                    'name' => $name,
                    'image_url' => $imageUrl,
                ];
            })
            ->values()
            ->all();
    }

    private function defaultCategoryImageUrl(string $name): string
    {
        $seed = 'ppc-'.Str::slug($name);

        return 'https://picsum.photos/seed/'.$seed.'/400/400';
    }
}
