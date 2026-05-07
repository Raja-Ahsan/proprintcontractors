<?php

namespace App\Services;

use App\Models\Coupon;

class CouponService
{
    public function findValid(?int $couponId, float $subtotal): ?Coupon
    {
        if (! $couponId) {
            return null;
        }

        $coupon = Coupon::query()->whereKey($couponId)->first();

        return $coupon ? $this->validateCouponModel($coupon, $subtotal) : null;
    }

    public function validateByCode(string $code, float $subtotal): ?Coupon
    {
        $coupon = Coupon::query()
            ->whereRaw('UPPER(code) = ?', [mb_strtoupper($code)])
            ->first();

        return $coupon ? $this->validateCouponModel($coupon, $subtotal) : null;
    }

    protected function validateCouponModel(Coupon $coupon, float $subtotal): ?Coupon
    {
        if (! $coupon->is_active) {
            return null;
        }

        if ($coupon->max_uses !== null && $coupon->times_used >= $coupon->max_uses) {
            return null;
        }

        if ($coupon->starts_at && now()->lt($coupon->starts_at)) {
            return null;
        }

        if ($coupon->ends_at && now()->gt($coupon->ends_at)) {
            return null;
        }

        if ($coupon->min_subtotal !== null && $subtotal < (float) $coupon->min_subtotal) {
            return null;
        }

        return $coupon;
    }

    public function discountAmount(Coupon $coupon, float $subtotal): float
    {
        if ($coupon->type === 'percent') {
            return round($subtotal * ((float) $coupon->value / 100), 2);
        }

        return min((float) $coupon->value, $subtotal);
    }
}
