<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
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

        return Inertia::render('Shop/Home', [
            'featuredProducts' => $featuredProducts,
        ]);
    }
}
