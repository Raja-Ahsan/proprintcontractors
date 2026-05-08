<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\SiteSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentSettingsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/Payments', [
            'settings' => [
                'stripe_publishable_key' => SiteSettings::get('payment.stripe_publishable_key'),
                'paypal_client_id' => SiteSettings::get('payment.paypal_client_id'),
                'paypal_mode' => SiteSettings::get('payment.paypal_mode') ?: 'sandbox',
                'paypal_enabled' => SiteSettings::get('payment.paypal_enabled') === '1',
            ],
            'secretsSet' => SiteSettings::secretsAreSet(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'stripe_publishable_key' => ['nullable', 'string', 'max:255'],
            'stripe_secret' => ['nullable', 'string', 'max:500'],
            'stripe_webhook_secret' => ['nullable', 'string', 'max:500'],
            'paypal_client_id' => ['nullable', 'string', 'max:255'],
            'paypal_secret' => ['nullable', 'string', 'max:500'],
            'paypal_mode' => ['nullable', 'in:sandbox,live'],
        ]);

        Setting::set('payment.stripe_publishable_key', $validated['stripe_publishable_key'] ?? '');

        if (! empty($validated['stripe_secret'])) {
            SiteSettings::setEncrypted('payment.stripe_secret', $validated['stripe_secret']);
        }

        if (! empty($validated['stripe_webhook_secret'])) {
            SiteSettings::setEncrypted('payment.stripe_webhook_secret', $validated['stripe_webhook_secret']);
        }

        Setting::set('payment.paypal_client_id', $validated['paypal_client_id'] ?? '');

        if (! empty($validated['paypal_secret'])) {
            SiteSettings::setEncrypted('payment.paypal_secret', $validated['paypal_secret']);
        }

        Setting::set('payment.paypal_mode', $validated['paypal_mode'] ?? 'sandbox');
        Setting::set('payment.paypal_enabled', $request->boolean('paypal_enabled') ? '1' : '0');

        SiteSettings::syncToConfig();

        return back()->with('success', 'Payment settings saved.');
    }
}
