<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Services\CartService;
use App\Services\CouponService;
use App\Services\ProductCustomizationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(
        protected CartService $cart,
        protected CouponService $coupons,
        protected ProductCustomizationService $customization
    ) {}

    public function index(Request $request): Response
    {
        $lines = $this->cart->lines($request);
        $subtotal = (float) $this->cart->subtotal($request);
        $couponId = $request->session()->get('checkout.coupon_id');
        $coupon = $this->coupons->findValid($couponId ? (int) $couponId : null, $subtotal);
        if (! $coupon && $couponId) {
            $request->session()->forget('checkout.coupon_id');
        }

        $discount = $coupon ? $this->coupons->discountAmount($coupon, $subtotal) : 0;

        return Inertia::render('Shop/Cart', [
            'lines' => $lines,
            'subtotal' => number_format($subtotal, 2, '.', ''),
            'coupon' => $coupon ? ['code' => $coupon->code] : null,
            'discount' => number_format($discount, 2, '.', ''),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'product_variation_id' => ['nullable', 'integer', 'exists:product_variations,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'customization' => ['nullable', 'array'],
            'customization.design' => ['required_with:customization', 'array'],
            'customization.design.fabric' => ['required_with:customization', 'array'],
            'customization.design.canvas_width' => ['nullable', 'integer', 'min:320', 'max:4096'],
            'customization.design.canvas_height' => ['nullable', 'integer', 'min:320', 'max:4096'],
            'customization.preview_png' => ['required_with:customization', 'string', 'max:12000000'],
        ]);

        $product = Product::query()->where('is_active', true)->findOrFail($data['product_id']);
        $qty = (int) $data['quantity'];
        $variationId = isset($data['product_variation_id']) ? (int) $data['product_variation_id'] : null;

        $customEnvelope = null;
        $checksum = null;
        $previewStoredPath = null;

        if (isset($data['customization']) && is_array($data['customization'])) {
            if (! $product->is_customizable) {
                return back()->withErrors(['customization' => 'This product cannot be customized.']);
            }

            try {
                $designFromClient = [
                    'fabric' => $data['customization']['design']['fabric'],
                    'canvas_width' => $data['customization']['design']['canvas_width'] ?? null,
                    'canvas_height' => $data['customization']['design']['canvas_height'] ?? null,
                ];
                $customEnvelope = $this->customization->normalizeDesign($designFromClient, (int) $product->id);
                $customEnvelope['variation_id'] = $variationId;
                $checksum = $this->customization->checksumFabric($customEnvelope['fabric']);
            } catch (\Throwable $e) {
                report($e);

                return back()->withErrors([
                    'customization' => config('app.debug')
                        ? 'Could not save this design: '.$e->getMessage()
                        : 'Could not save this design. Please try again.',
                ]);
            }

            $previewStoredPath = $this->customization->storePreviewPng((string) $data['customization']['preview_png']);

            if ($previewStoredPath === false) {
                return back()->withErrors(['customization' => 'Invalid preview image. Please try exporting again.']);
            }
        }

        if ($product->isVariable()) {
            if (! $variationId) {
                return back()->withErrors(['product_variation_id' => 'Choose all options before adding to cart.']);
            }

            $variation = ProductVariation::query()
                ->where('product_id', $product->id)
                ->whereKey($variationId)
                ->first();

            if (! $variation) {
                return back()->withErrors(['product_variation_id' => 'Invalid variation.']);
            }

            if ($variation->stock_quantity < $qty) {
                return back()->withErrors(['quantity' => 'Not enough stock available.']);
            }

            $item = $this->cart->findOrNewCartItem($request, $product, $variationId, $checksum);
            $newQty = $item->exists ? ((int) $item->quantity + $qty) : $qty;

            if ($variation->stock_quantity < $newQty) {
                return back()->withErrors(['quantity' => 'Not enough stock available.']);
            }
        } else {
            if ($variationId) {
                return back()->withErrors(['product_variation_id' => 'This product does not use variations.']);
            }

            if ($product->stock_quantity < $qty) {
                return back()->withErrors(['quantity' => 'Not enough stock available.']);
            }

            $item = $this->cart->findOrNewCartItem($request, $product, null, $checksum);
            $newQty = $item->exists ? ((int) $item->quantity + $qty) : $qty;

            if ($product->stock_quantity < $newQty) {
                return back()->withErrors(['quantity' => 'Not enough stock available.']);
            }
        }

        $fill = [
            'quantity' => $newQty,
            'user_id' => $request->user()?->id,
            'session_id' => $request->user() ? null : $request->session()->getId(),
        ];

        if ($customEnvelope !== null && $previewStoredPath !== null) {
            $fill['customization_json'] = $customEnvelope;
            $fill['customization_preview_path'] = $previewStoredPath;
            $fill['customization_checksum'] = $checksum;
        }

        $item->fill($fill);
        $item->product_id = $product->id;
        $item->product_variation_id = $variationId;
        $item->save();

        return back()->with('success', 'Added to cart.');
    }

    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        $this->authorizeCartItem($request, $cartItem);

        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $qty = (int) $data['quantity'];
        $product = $cartItem->product;

        if ($cartItem->product_variation_id) {
            $cartItem->loadMissing('productVariation');
            $v = $cartItem->productVariation;
            if ($v && $v->stock_quantity < $qty) {
                return back()->withErrors(['quantity' => 'Not enough stock available.']);
            }
        } elseif ($product && $product->stock_quantity < $qty) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cartItem->update(['quantity' => $qty]);

        return back()->with('success', 'Cart updated.');
    }

    public function destroy(Request $request, CartItem $cartItem): RedirectResponse
    {
        $this->authorizeCartItem($request, $cartItem);
        $cartItem->delete();

        return back()->with('success', 'Item removed.');
    }

    protected function authorizeCartItem(Request $request, CartItem $cartItem): void
    {
        if ($request->user()) {
            abort_unless($cartItem->user_id === $request->user()->id, 403);
        } else {
            abort_unless(
                $cartItem->session_id === $request->session()->getId() && $cartItem->user_id === null,
                403
            );
        }
    }
}
