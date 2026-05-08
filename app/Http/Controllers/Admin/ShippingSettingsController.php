<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\SiteSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShippingSettingsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/Shipping', [
            'settings' => [
                'flat_rate' => SiteSettings::get('shipping.flat_rate'),
                'tax_rate' => SiteSettings::get('shipping.tax_rate'),
                'free_shipping_minimum' => SiteSettings::get('shipping.free_shipping_minimum'),
                'currency' => SiteSettings::get('shop.currency') ?: config('shop.currency', 'usd'),
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'flat_rate' => ['nullable', 'numeric', 'min:0'],
            'tax_rate' => ['nullable', 'numeric', 'min:0', 'max:1'],
            'free_shipping_minimum' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:10'],
        ]);

        Setting::set('shipping.flat_rate', $validated['flat_rate'] !== null ? (string) $validated['flat_rate'] : '');
        Setting::set('shipping.tax_rate', $validated['tax_rate'] !== null ? (string) $validated['tax_rate'] : '');
        Setting::set('shipping.free_shipping_minimum', $validated['free_shipping_minimum'] !== null ? (string) $validated['free_shipping_minimum'] : '');
        Setting::set('shop.currency', $validated['currency'] ? strtolower($validated['currency']) : 'usd');

        SiteSettings::syncToConfig();

        return back()->with('success', 'Shipping & tax settings saved.');
    }
}
