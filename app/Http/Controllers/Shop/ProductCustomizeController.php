<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Services\ProductCustomizationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCustomizeController extends Controller
{
    public function __construct(
        protected ProductCustomizationService $customization
    ) {}

    public function show(Request $request, Product $product): Response
    {
        abort_unless($product->is_active && $product->is_customizable, 404);

        $product->load(['category', 'variations']);

        $variationId = $request->query('variation_id');
        $variation = null;

        if ($variationId !== null && $variationId !== '') {
            $variation = ProductVariation::query()
                ->where('product_id', $product->id)
                ->find((int) $variationId);
        }

        if ($product->isVariable()) {
            if (! $variation) {
                return redirect()
                    ->route('products.show', $product->getRouteKey())
                    ->withErrors(['variation_id' => 'Choose product options before opening the designer.']);
            }
        }

        $printAreas = $this->customization->resolvePrintAreas($product->custom_print_area);

        $frontImageUrl =
            $variation?->image_url
            ?? $product->image_url
            ?? null;

        $backImageUrl =
            $variation?->back_image_url
            ?? $product->back_image_url
            ?? $frontImageUrl;

        return Inertia::render('Shop/ProductCustomize', [
            'product' => $product,
            'initialVariation' => $variation,
            'printArea' => $printAreas['front'],
            'printAreaBack' => $printAreas['back'],
            'frontImageUrl' => $frontImageUrl,
            'backImageUrl' => $backImageUrl,
        ]);
    }
}
