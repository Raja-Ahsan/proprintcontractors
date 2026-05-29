<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\ServiceBooking;
use App\Models\ServicePackage;
use App\Services\StripeCheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceBookingController extends Controller
{
    public function __construct(
        protected StripeCheckoutService $stripe
    ) {}

    public function create(ServicePackage $servicePackage): Response|RedirectResponse
    {
        if (! $servicePackage->is_active || ! $servicePackage->category?->is_active) {
            return redirect()->route('marketing.services')->withErrors(['service' => 'This service is not available.']);
        }

        $servicePackage->load('category:id,name,is_active');

        return Inertia::render('Marketing/ServiceBook', [
            'package' => [
                'id' => $servicePackage->id,
                'name' => $servicePackage->name,
                'slug' => $servicePackage->slug,
                'price' => (float) $servicePackage->price,
                'popular' => $servicePackage->popular,
                'features' => $servicePackage->features ?? [],
                'category_name' => $servicePackage->category->name,
            ],
            'stripeConfigured' => $this->stripe->isConfigured(),
            'stripePublishableConfigured' => $this->stripe->publishableConfigured(),
            'defaults' => [
                'customer_name' => request()->user()?->name ?? '',
                'customer_email' => request()->user()?->email ?? '',
            ],
        ]);
    }

    public function store(Request $request, ServicePackage $servicePackage): RedirectResponse|HttpResponse
    {
        if (! $this->stripe->isConfigured()) {
            return back()->withErrors([
                'stripe' => 'Online payments are not configured. Add Stripe keys in Admin → Settings → Payments.',
            ]);
        }

        if (! $servicePackage->is_active || ! $servicePackage->category?->is_active) {
            return redirect()->route('marketing.services')->withErrors(['service' => 'This service is not available.']);
        }

        $servicePackage->load('category:id,name,is_active');

        $validated = $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $total = (float) $servicePackage->price;

        $booking = ServiceBooking::query()->create([
            'booking_number' => 'SRV-'.strtoupper(bin2hex(random_bytes(4))).'-'.now()->format('His'),
            'user_id' => $request->user()?->id,
            'service_package_id' => $servicePackage->id,
            'category_name' => $servicePackage->category->name,
            'service_name' => $servicePackage->name,
            'service_price' => number_format($total, 2, '.', ''),
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'status' => 'awaiting_payment',
            'payment_status' => 'unpaid',
            'total' => number_format($total, 2, '.', ''),
            'placed_at' => now(),
        ]);

        $checkoutUrl = $this->stripe->createServiceBookingCheckoutSession($booking);

        $request->session()->put('pending_service_booking_id', $booking->id);

        return Inertia::location($checkoutUrl);
    }
}
