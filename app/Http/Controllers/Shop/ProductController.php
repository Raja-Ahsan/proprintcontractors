<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->with(['category', 'variations:id,product_id,price'])
            ->where('is_active', true)
            ->latest()
            ->get();

        $products->each(function (Product $p): void {
            if (! $p->isVariable() || $p->variations->isEmpty()) {
                $p->setAttribute('price_range', null);

                return;
            }

            $prices = $p->variations->pluck('price')->map(fn ($x) => (float) $x);
            $p->setAttribute('price_range', [
                'min' => $prices->min(),
                'max' => $prices->max(),
            ]);
        });

        return Inertia::render('Shop/Products/Index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        $product->load(['category', 'variations']);

        $related = Product::query()
            ->with(['category', 'variations:id,product_id,price'])
            ->where('is_active', true)
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        $related->each(function (Product $p): void {
            if (! $p->isVariable() || $p->variations->isEmpty()) {
                $p->setAttribute('price_range', null);

                return;
            }

            $prices = $p->variations->pluck('price')->map(fn ($x) => (float) $x);
            $p->setAttribute('price_range', [
                'min' => $prices->min(),
                'max' => $prices->max(),
            ]);
        });

        return Inertia::render('Shop/Products/Show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}
