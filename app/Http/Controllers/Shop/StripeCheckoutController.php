<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use App\Services\CartService;
use App\Services\OrderPaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Stripe;

class StripeCheckoutController extends Controller
{
    public function __construct(
        protected OrderPaymentService $payments,
        protected CartService $cart
    ) {}

    public function success(Request $request): RedirectResponse|Response
    {
        if (! config('services.stripe.secret')) {
            return redirect()->route('home')->withErrors(['stripe' => 'Payments are not configured.']);
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        $sessionId = $request->query('session_id');
        if (! $sessionId) {
            return redirect()->route('cart.index')->withErrors(['checkout' => 'Missing payment session.']);
        }

        $session = StripeSession::retrieve($sessionId);

        $meta = $session->metadata !== null
            ? $session->metadata->toArray()
            : [];
        $orderId = (int) ($meta['order_id'] ?? 0);

        $order = Order::query()->find($orderId);

        if (! $order || $order->status !== 'awaiting_payment') {
            return redirect()->route('cart.index')->withErrors(['checkout' => 'Order not found or already processed.']);
        }

        if ($session->payment_status !== 'paid') {
            return redirect()->route('cart.index')->withErrors(['checkout' => 'Payment was not completed.']);
        }

        $expectedTotal = (int) round(((float) $order->total) * 100);
        if ((int) $session->amount_total !== $expectedTotal) {
            abort(403);
        }

        $this->payments->markPaid($order, $session->id);

        $request->session()->forget('pending_checkout_order_id');
        $request->session()->forget('checkout.coupon_id');

        if ($request->user()) {
            return redirect()
                ->route('dashboard.orders.show', $order)
                ->with('success', 'Payment successful. Thank you!');
        }

        return Inertia::render('Shop/CheckoutSuccess', [
            'order' => $order->load('items'),
        ]);
    }

    public function cancel(Request $request): RedirectResponse
    {
        $orderId = (int) $request->query('order', 0);
        $pendingId = $request->session()->get('pending_checkout_order_id');

        if (! $orderId || ! $pendingId || $pendingId !== $orderId) {
            return redirect()->route('cart.index')->withErrors(['checkout' => 'Unable to cancel checkout session.']);
        }

        $order = Order::query()
            ->where('status', 'awaiting_payment')
            ->whereKey($orderId)
            ->first();

        if (! $order) {
            $request->session()->forget('pending_checkout_order_id');

            return redirect()->route('cart.index');
        }

        DB::transaction(function () use ($request, $order): void {
            foreach ($order->items as $item) {
                if (! $item->product_id) {
                    continue;
                }

                $query = CartItem::query()->where('product_id', $item->product_id);

                if ($request->user()) {
                    $query->where('user_id', $request->user()->id);
                } else {
                    $query->where('session_id', $request->session()->getId())->whereNull('user_id');
                }

                $existing = $query->first();

                if ($existing) {
                    $existing->increment('quantity', $item->quantity);
                } else {
                    CartItem::query()->create([
                        'user_id' => $request->user()?->id,
                        'session_id' => $request->user() ? null : $request->session()->getId(),
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                    ]);
                }
            }

            $order->items()->delete();
            $order->delete();
        });

        $request->session()->forget('pending_checkout_order_id');

        return redirect()
            ->route('cart.index')
            ->with('success', 'Checkout cancelled. Your cart has been restored.');
    }
}
