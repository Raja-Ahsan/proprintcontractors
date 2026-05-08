<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderPaymentService
{
    public function __construct(
        protected TransactionalMailService $mail
    ) {}

    public function markPaid(Order $order, ?string $stripeSessionId = null): void
    {
        if ($order->payment_status === 'paid') {
            return;
        }

        $order->load(['items.product', 'items.productVariation']);

        DB::transaction(function () use ($order, $stripeSessionId): void {
            foreach ($order->items as $item) {
                if ($item->product_variation_id && $item->productVariation) {
                    if ($item->productVariation->stock_quantity < $item->quantity) {
                        throw new \RuntimeException(
                            'Insufficient stock for: '.$item->product_name
                        );
                    }

                    continue;
                }

                $product = $item->product;
                if ($product && $product->stock_quantity < $item->quantity) {
                    throw new \RuntimeException(
                        'Insufficient stock for: '.$item->product_name
                    );
                }
            }

            foreach ($order->items as $item) {
                if ($item->product_variation_id && $item->productVariation) {
                    $item->productVariation->decrement('stock_quantity', $item->quantity);
                    $item->product?->refreshVariationAggregates();

                    continue;
                }

                if ($item->product_id && $item->product) {
                    $item->product->decrement('stock_quantity', $item->quantity);
                }
            }

            if ($order->coupon_id) {
                Coupon::query()->whereKey($order->coupon_id)->increment('times_used');
            }

            $order->update([
                'payment_status' => 'paid',
                'status' => 'pending',
                'paid_at' => now(),
                'stripe_checkout_session_id' => $stripeSessionId ?? $order->stripe_checkout_session_id,
            ]);
        });

        $this->mail->sendOrderConfirmation($order->fresh(['items']));
    }
}
