<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredProducts = Product::query()
            ->with([
                'category:id,name',
                'variations:id,product_id,price,image',
            ])
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderByDesc('id')
            ->limit(Product::MAX_FEATURED)
            ->get()
            ->map(function (Product $p): array {
                $price = $p->isVariable() && $p->variations->isNotEmpty()
                    ? (float) $p->variations->min(fn ($v) => (float) $v->price)
                    : (float) $p->price;

                return [
                    'slug' => $p->slug,
                    'name' => $p->name,
                    'price' => $price,
                    'image_url' => $p->listImageUrl(),
                    'category_name' => $p->category?->name ?? 'Shop',
                ];
            })
            ->values()
            ->all();

        $shopCategories = $this->shopCategoriesForMarquee();

        return Inertia::render('Shop/Home', [
            'featuredProducts' => $featuredProducts,
            'shopCategories' => $shopCategories,
        ]);
    }

    /**
     * Active categories for the home marquee (image, label, sample product subtitle).
     *
     * @return list<array{name: string, slug: string, image_url: string|null, subtitle: string}>
     */
    private function shopCategoriesForMarquee(): array
    {
        $categories = Category::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        if ($categories->isEmpty()) {
            return [];
        }

        $sampleByCategory = Product::query()
            ->where('is_active', true)
            ->whereIn('category_id', $categories->pluck('id'))
            ->orderByDesc('id')
            ->get(['category_id', 'name'])
            ->unique('category_id')
            ->keyBy('category_id');

        return $categories
            ->map(function (Category $category) use ($sampleByCategory): array {
                $sample = $sampleByCategory->get($category->id);

                $subtitle = $sample?->name
                    ?? ($category->description
                        ? Str::limit(strip_tags($category->description), 52)
                        : 'Browse '.$category->name);

                return [
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'image_url' => $category->image_url,
                    'subtitle' => $subtitle,
                ];
            })
            ->values()
            ->all();
    }
}
