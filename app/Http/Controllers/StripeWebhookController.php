<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderPaymentService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Stripe\Stripe;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    public function __construct(
        protected OrderPaymentService $payments
    ) {}

    public function __invoke(Request $request): Response
    {
        $secret = config('services.stripe.webhook_secret');

        if (! $secret) {
            return response('Webhook secret not configured', 500);
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        $payload = $request->getContent();
        $sig = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent($payload, $sig, $secret);
        } catch (\Throwable $e) {
            return response('Invalid signature', 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $m = $session->metadata ?? null;
            $meta = $m === null ? [] : (is_array($m) ? $m : $m->toArray());
            $orderId = (int) ($meta['order_id'] ?? 0);

            $order = Order::query()->find($orderId);

            if ($order && $order->status === 'awaiting_payment' && $session->payment_status === 'paid') {
                $this->payments->markPaid($order, $session->id);
            }
        }

        return response('OK', 200);
    }
}
