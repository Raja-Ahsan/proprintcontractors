<?php

namespace App\Services;

use App\Models\ServiceBooking;

class ServiceBookingPaymentService
{
    public function markPaid(ServiceBooking $booking, ?string $stripeSessionId = null): void
    {
        if ($booking->payment_status === 'paid') {
            return;
        }

        $booking->update([
            'payment_status' => 'paid',
            'status' => 'pending',
            'paid_at' => now(),
            'stripe_checkout_session_id' => $stripeSessionId ?? $booking->stripe_checkout_session_id,
        ]);
    }
}
