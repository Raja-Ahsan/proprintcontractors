<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\ServiceBooking;
use App\Models\ServicePackage;
use App\Services\ServiceBriefService;
use App\Services\StripeCheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceBookingController extends Controller
{
    public function __construct(
        protected StripeCheckoutService $stripe,
        protected ServiceBriefService $briefs,
    ) {}

    public function create(ServicePackage $servicePackage): Response|RedirectResponse
    {
        if (! $servicePackage->is_active || ! $servicePackage->category?->is_active) {
            return redirect()->route('marketing.services')->withErrors(['service' => 'This service is not available.']);
        }

        $servicePackage->load('category:id,name,slug,is_active');

        $briefType = $this->briefs->briefTypeForCategory($servicePackage->category);

        return Inertia::render('Marketing/ServiceBook', [
            'package' => [
                'id' => $servicePackage->id,
                'name' => $servicePackage->name,
                'slug' => $servicePackage->slug,
                'price' => (float) $servicePackage->price,
                'popular' => $servicePackage->popular,
                'features' => $servicePackage->features ?? [],
                'category_name' => $servicePackage->category->name,
                'category_slug' => $servicePackage->category->slug,
            ],
            'briefType' => $briefType,
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

        $servicePackage->load('category:id,name,slug,is_active');

        $briefType = $this->briefs->briefTypeForCategory($servicePackage->category);

        $rules = [
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];

        if ($briefType === 'logo') {
            $rules = array_merge($rules, $this->briefs->logoBriefValidationRules());
        }

        if ($briefType === 'web') {
            $rules = array_merge($rules, $this->briefs->webBriefValidationRules());
        }

        if ($briefType === 'digital_marketing') {
            $rules = array_merge($rules, $this->briefs->digitalMarketingBriefValidationRules());
        }

        $validated = $request->validate($rules);

        $briefJson = null;

        if ($briefType === 'logo') {
            $briefJson = $this->briefs->normalizeLogoBrief($validated['brief'] ?? []);
        }

        if ($briefType === 'digital_marketing') {
            $briefJson = $this->briefs->normalizeDigitalMarketingBrief($validated['brief'] ?? []);
        }

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
            'brief_json' => $briefJson,
            'status' => 'awaiting_payment',
            'payment_status' => 'unpaid',
            'total' => number_format($total, 2, '.', ''),
            'placed_at' => now(),
        ]);

        if ($briefType === 'web') {
            $briefJson = $this->briefs->normalizeWebBrief($validated['brief'] ?? []);
            $briefJson['content_files'] = $this->briefs->storeWebBriefContentFiles($request, $booking);
            $booking->update(['brief_json' => $briefJson]);
        }

        $checkoutUrl = $this->stripe->createServiceBookingCheckoutSession($booking);

        $request->session()->put('pending_service_booking_id', $booking->id);

        return Inertia::location($checkoutUrl);
    }
}
