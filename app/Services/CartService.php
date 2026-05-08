<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CartService
{
    public function cartQuery(Request $request): \Illuminate\Database\Eloquent\Builder
    {
        $query = CartItem::query()->with([
            'product.category',
            'productVariation',
        ]);

        if ($request->user()) {
            $query->where('user_id', $request->user()->id);
        } else {
            $query->where('session_id', $request->session()->getId())->whereNull('user_id');
        }

        return $query;
    }

    public function itemCount(Request $request): int
    {
        return (int) $this->cartQuery($request)->sum('quantity');
    }

    /**
     * @return Collection<int, CartItem>
     */
    public function lines(Request $request): Collection
    {
        return $this->cartQuery($request)->get();
    }

    public function subtotal(Request $request): string
    {
        $total = 0.0;
        foreach ($this->lines($request) as $line) {
            $total += $line->unit_price * (int) $line->quantity;
        }

        return number_format($total, 2, '.', '');
    }

    /**
     * Lightweight cart lines for header mini-cart (avoids oversized payloads).
     *
     * @return list<array{id: int, product_name: string, quantity: int, line_total: string, image_url: ?string, variation_summary: ?string}>
     */
    public function headerPreview(Request $request): array
    {
        return $this->cartQuery($request)
            ->orderByDesc('id')
            ->limit(10)
            ->get()
            ->map(function (CartItem $item): array {
                return [
                    'id' => (int) $item->id,
                    'product_name' => $item->product?->name ?? 'Product',
                    'quantity' => (int) $item->quantity,
                    'line_total' => number_format($item->line_total, 2, '.', ''),
                    'image_url' => $item->line_image_url,
                    'variation_summary' => $item->variation_summary,
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @param  non-empty-string|null  $customizationChecksum
     */
    public function findOrNewCartItem(Request $request, Product $product, ?int $variationId, ?string $customizationChecksum = null): CartItem
    {
        $query = CartItem::query()->where('product_id', $product->id);

        if ($variationId) {
            $query->where('product_variation_id', $variationId);
        } else {
            $query->whereNull('product_variation_id');
        }

        if ($customizationChecksum !== null && $customizationChecksum !== '') {
            $query->where('customization_checksum', $customizationChecksum);
        } else {
            $query->whereNull('customization_checksum');
        }

        if ($request->user()) {
            $query->where('user_id', $request->user()->id);
        } else {
            $query->where('session_id', $request->session()->getId())->whereNull('user_id');
        }

        return $query->first() ?? new CartItem([
            'product_id' => $product->id,
            'product_variation_id' => $variationId,
            'quantity' => 0,
        ]);
    }
}
