<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\CartService;
use App\Services\CouponService;
use App\Services\ProductCustomizationService;
use App\Services\SiteSettings;
use App\Services\StripeCheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function __construct(
        protected CartService $cart,
        protected CouponService $coupons,
        protected StripeCheckoutService $stripe,
        protected ProductCustomizationService $customization
    ) {}

    public function create(Request $request): Response|RedirectResponse
    {
        $lines = $this->cart->lines($request);

        if ($lines->isEmpty()) {
            return redirect()->route('cart.index')->withErrors(['cart' => 'Your cart is empty.']);
        }

        $subtotal = (float) $this->cart->subtotal($request);
        $couponId = $request->session()->get('checkout.coupon_id');
        $coupon = $this->coupons->findValid($couponId ? (int) $couponId : null, $subtotal);
        if (! $coupon && $couponId) {
            $request->session()->forget('checkout.coupon_id');
        }

        $discount = $coupon ? $this->coupons->discountAmount($coupon, $subtotal) : 0;
        $taxRate = (float) config('shop.tax_rate', 0);
        $afterDiscount = max(0, round($subtotal - $discount, 2));
        $shippingTotal = SiteSettings::shippingFlatForSubtotal($afterDiscount);

        $tax = round($afterDiscount * $taxRate, 2);
        $total = round($afterDiscount + $tax + $shippingTotal, 2);

        return Inertia::render('Shop/Checkout', [
            'lines' => $lines,
            'subtotal' => number_format($subtotal, 2, '.', ''),
            'discount' => number_format($discount, 2, '.', ''),
            'coupon' => $coupon ? [
                'code' => $coupon->code,
                'id' => $coupon->id,
            ] : null,
            'shipping_flat' => $shippingTotal,
            'free_shipping_minimum' => SiteSettings::get('shipping.free_shipping_minimum'),
            'tax_rate' => $taxRate,
            'tax' => number_format($tax, 2, '.', ''),
            'total' => number_format($total, 2, '.', ''),
            'stripeConfigured' => $this->stripe->isConfigured(),
            'stripePublishableConfigured' => $this->stripe->publishableConfigured(),
            'defaults' => [
                'shipping_name' => $request->user()?->name ?? '',
                'shipping_email' => $request->user()?->email ?? '',
                'shipping_state' => '',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse|HttpResponse
    {
        if (! $this->stripe->isConfigured()) {
            return back()->withErrors([
                'stripe' => 'Online payments are not configured. Add Stripe secret keys in Admin → Settings → Payments or set STRIPE_SECRET in your environment.',
            ]);
        }

        $lines = $this->cart->lines($request);

        if ($lines->isEmpty()) {
            return redirect()->route('cart.index')->withErrors(['cart' => 'Your cart is empty.']);
        }

        $sameBilling = filter_var($request->input('billing_same_as_shipping'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        $sameBilling = $sameBilling !== false;

        $rules = [
            'shipping_name' => ['required', 'string', 'max:255'],
            'shipping_email' => ['required', 'email', 'max:255'],
            'shipping_phone' => ['nullable', 'string', 'max:50'],
            'shipping_address_line1' => ['required', 'string', 'max:255'],
            'shipping_address_line2' => ['nullable', 'string', 'max:255'],
            'shipping_city' => ['required', 'string', 'max:120'],
            'shipping_state' => ['nullable', 'string', 'max:120'],
            'shipping_postal_code' => ['required', 'string', 'max:30'],
            'shipping_country' => ['required', 'string', 'max:120'],
            'billing_same_as_shipping' => ['required', 'boolean'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];

        if (! $sameBilling) {
            $rules = array_merge($rules, [
                'billing_name' => ['required', 'string', 'max:255'],
                'billing_phone' => ['nullable', 'string', 'max:50'],
                'billing_address_line1' => ['required', 'string', 'max:255'],
                'billing_address_line2' => ['nullable', 'string', 'max:255'],
                'billing_city' => ['required', 'string', 'max:120'],
                'billing_state' => ['nullable', 'string', 'max:120'],
                'billing_postal_code' => ['required', 'string', 'max:30'],
                'billing_country' => ['required', 'string', 'max:120'],
            ]);
        }

        $validated = $request->validate($rules);

        $taxRate = (float) config('shop.tax_rate', 0);

        $subtotal = 0;
        foreach ($lines as $line) {
            if (! $line->product) {
                continue;
            }

            $line->loadMissing(['productVariation', 'product']);

            if ($line->product_variation_id && $line->productVariation) {
                if ($line->productVariation->stock_quantity < (int) $line->quantity) {
                    return back()->withErrors(['cart' => 'One or more items are no longer in stock.']);
                }
            } elseif ($line->product->stock_quantity < (int) $line->quantity) {
                return back()->withErrors(['cart' => 'One or more items are no longer in stock.']);
            }

            $subtotal += $line->unit_price * (int) $line->quantity;
        }

        $couponId = $request->session()->get('checkout.coupon_id');
        $coupon = $this->coupons->findValid($couponId ? (int) $couponId : null, $subtotal);
        if ($couponId && ! $coupon) {
            $request->session()->forget('checkout.coupon_id');

            return back()->withErrors(['coupon' => 'Your coupon is no longer valid for this cart.']);
        }

        $discount = $coupon ? $this->coupons->discountAmount($coupon, $subtotal) : 0;
        $afterDiscount = max(0, round($subtotal - $discount, 2));
        $shippingTotal = SiteSettings::shippingFlatForSubtotal($afterDiscount);
        $tax = round($afterDiscount * $taxRate, 2);
        $total = round($afterDiscount + $tax + $shippingTotal, 2);

        $order = DB::transaction(function () use ($request, $lines, $validated, $coupon, $subtotal, $discount, $tax, $shippingTotal, $total) {
            $billingSame = (bool) $validated['billing_same_as_shipping'];
            $billing = $billingSame ? [
                'billing_name' => $validated['shipping_name'],
                'billing_phone' => $validated['shipping_phone'] ?? null,
                'billing_address_line1' => $validated['shipping_address_line1'],
                'billing_address_line2' => $validated['shipping_address_line2'] ?? null,
                'billing_city' => $validated['shipping_city'],
                'billing_state' => $validated['shipping_state'] ?? null,
                'billing_postal_code' => $validated['shipping_postal_code'],
                'billing_country' => $validated['shipping_country'],
            ] : [
                'billing_name' => $validated['billing_name'],
                'billing_phone' => $validated['billing_phone'] ?? null,
                'billing_address_line1' => $validated['billing_address_line1'],
                'billing_address_line2' => $validated['billing_address_line2'] ?? null,
                'billing_city' => $validated['billing_city'],
                'billing_state' => $validated['billing_state'] ?? null,
                'billing_postal_code' => $validated['billing_postal_code'],
                'billing_country' => $validated['billing_country'],
            ];

            $order = Order::query()->create(array_merge([
                'order_number' => 'ORD-'.strtoupper(bin2hex(random_bytes(4))).'-'.now()->format('His'),
                'user_id' => $request->user()?->id,
                'coupon_id' => $coupon?->id,
                'status' => 'awaiting_payment',
                'subtotal' => number_format($subtotal, 2, '.', ''),
                'discount_amount' => number_format($discount, 2, '.', ''),
                'tax' => number_format($tax, 2, '.', ''),
                'shipping_total' => number_format($shippingTotal, 2, '.', ''),
                'total' => number_format($total, 2, '.', ''),
                'payment_status' => 'unpaid',
                'shipping_name' => $validated['shipping_name'],
                'shipping_email' => $validated['shipping_email'],
                'shipping_phone' => $validated['shipping_phone'] ?? null,
                'shipping_address_line1' => $validated['shipping_address_line1'],
                'shipping_address_line2' => $validated['shipping_address_line2'] ?? null,
                'shipping_city' => $validated['shipping_city'],
                'shipping_state' => $validated['shipping_state'] ?? null,
                'shipping_postal_code' => $validated['shipping_postal_code'],
                'shipping_country' => $validated['shipping_country'],
                'notes' => $validated['notes'] ?? null,
                'placed_at' => now(),
            ], $billing));

            foreach ($lines as $line) {
                $product = $line->product;
                if (! $product) {
                    continue;
                }

                $line->loadMissing('productVariation');

                $unit = $line->unit_price;
                $qty = (int) $line->quantity;
                $lineTotal = round($unit * $qty, 2);

                $variation = $line->productVariation;
                $variationSnapshot = null;

                if ($variation && $product->isVariable() && is_array($product->variation_attribute_defs)) {
                    $variationSnapshot = [];
                    foreach ($product->variation_attribute_defs as $def) {
                        $k = $def['key'];
                        if (isset($variation->attributes[$k])) {
                            $variationSnapshot[$def['label']] = $variation->attributes[$k];
                        }
                    }
                }

                $fab = is_array($line->customization_json)
                    ? ($line->customization_json['fabric'] ?? null)
                    : null;
                $assetPaths = is_array($fab)
                    ? $this->customization->extractReferencedStoragePaths($fab)
                    : [];

                OrderItem::query()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_variation_id' => $variation?->id,
                    'product_name' => $product->name,
                    'product_sku' => $variation?->sku ?? $product->sku,
                    'variation_attributes' => $variationSnapshot,
                    'unit_price' => number_format($unit, 2, '.', ''),
                    'quantity' => $qty,
                    'line_total' => number_format($lineTotal, 2, '.', ''),
                    'customization_json' => $line->customization_json,
                    'customization_preview_path' => $line->customization_preview_path,
                    'customization_asset_paths' => $assetPaths === [] ? null : $assetPaths,
                ]);
            }

            CartItem::query()->whereIn('id', $lines->pluck('id'))->delete();

            return $order->fresh(['items']);
        });

        $checkoutUrl = $this->stripe->createCheckoutSession($order);

        $request->session()->put('pending_checkout_order_id', $order->id);

        /*
         * Inertia submits via XHR. A 302 to checkout.stripe.com would be followed
         * inside Axios and hit Stripe's CORS policy. Inertia::location() returns
         * 409 + X-Inertia-Location so the client performs a full window navigation.
         */
        return Inertia::location($checkoutUrl);
    }
}
