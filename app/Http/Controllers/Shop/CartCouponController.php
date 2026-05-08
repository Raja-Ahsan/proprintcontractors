<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Services\CartService;
use App\Services\CouponService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CartCouponController extends Controller
{
    public function __construct(
        protected CartService $cart,
        protected CouponService $coupons
    ) {}

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'max:50'],
        ]);

        $subtotal = (float) $this->cart->subtotal($request);
        $coupon = $this->coupons->validateByCode($data['code'], $subtotal);

        if (! $coupon) {
            return back()->withErrors(['code' => 'Invalid or expired coupon code.']);
        }

        $request->session()->put('checkout.coupon_id', $coupon->id);

        return back()->with('success', 'Coupon applied.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->forget('checkout.coupon_id');

        return back()->with('success', 'Coupon removed.');
    }
}
