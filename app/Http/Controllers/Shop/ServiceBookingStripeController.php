<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\ServiceBooking;
use App\Services\ServiceBookingPaymentService;
use App\Services\StripeCheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Stripe;

class ServiceBookingStripeController extends Controller
{
    public function __construct(
        protected ServiceBookingPaymentService $payments,
        protected StripeCheckoutService $stripeCheckout
    ) {}

    public function success(Request $request): RedirectResponse|Response
    {
        $secret = $this->stripeCheckout->stripeSecret();

        if ($secret === null) {
            return redirect()->route('marketing.services')->withErrors(['stripe' => 'Payments are not configured.']);
        }

        Stripe::setApiKey($secret);

        $sessionId = $request->query('session_id');
        if (! $sessionId) {
            return redirect()->route('marketing.services')->withErrors(['booking' => 'Missing payment session.']);
        }

        $session = StripeSession::retrieve($sessionId);

        $meta = $session->metadata !== null
            ? $session->metadata->toArray()
            : [];
        $bookingId = (int) ($meta['service_booking_id'] ?? 0);

        $booking = ServiceBooking::query()->find($bookingId);

        if (! $booking || $booking->status !== 'awaiting_payment') {
            return redirect()->route('marketing.services')->withErrors(['booking' => 'Booking not found or already processed.']);
        }

        if ($session->payment_status !== 'paid') {
            return redirect()->route('marketing.services')->withErrors(['booking' => 'Payment was not completed.']);
        }

        $expectedTotal = (int) round(((float) $booking->total) * 100);
        if ((int) $session->amount_total !== $expectedTotal) {
            abort(403);
        }

        $this->payments->markPaid($booking, $session->id);

        $request->session()->forget('pending_service_booking_id');

        return Inertia::render('Marketing/ServiceBookSuccess', [
            'booking' => $booking->fresh(),
        ]);
    }

    public function cancel(Request $request): RedirectResponse
    {
        $bookingId = (int) $request->query('booking', 0);
        $pendingId = $request->session()->get('pending_service_booking_id');

        if (! $bookingId || ! $pendingId || $pendingId !== $bookingId) {
            return redirect()->route('marketing.services')->withErrors(['booking' => 'Unable to cancel checkout session.']);
        }

        $booking = ServiceBooking::query()
            ->where('status', 'awaiting_payment')
            ->whereKey($bookingId)
            ->first();

        if ($booking) {
            $booking->delete();
        }

        $request->session()->forget('pending_service_booking_id');

        return redirect()
            ->route('marketing.services')
            ->with('success', 'Booking cancelled. You can choose a package again when ready.');
    }
}
