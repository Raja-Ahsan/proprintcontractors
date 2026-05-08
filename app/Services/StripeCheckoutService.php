<?php

namespace App\Services;

use App\Models\Order;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class StripeCheckoutService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function isConfigured(): bool
    {
        return ! empty(config('services.stripe.secret'));
    }

    public function createCheckoutSession(Order $order): string
    {
        $currency = strtolower((string) config('shop.currency', 'usd'));

        $unitAmount = (int) round(((float) $order->total) * 100);

        $session = Session::create([
            'mode' => 'payment',
            'success_url' => route('checkout.success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.cancel').'?order='.$order->id,
            'customer_email' => $order->shipping_email,
            'client_reference_id' => (string) $order->id,
            'metadata' => [
                'order_id' => (string) $order->id,
            ],
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'quantity' => 1,
                    'price_data' => [
                        'currency' => $currency,
                        'unit_amount' => $unitAmount,
                        'product_data' => [
                            'name' => 'Order '.$order->order_number,
                        ],
                    ],
                ],
            ],
        ]);

        $order->update([
            'stripe_checkout_session_id' => $session->id,
        ]);

        return $session->url;
    }
}
