<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\SiteSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailTemplatesController extends Controller
{
    /** @return array<string, array{subject: ?string, body_html: ?string}> */
    protected function loadTemplates(): array
    {
        $ids = [
            'welcome' => ['email.welcome.subject', 'email.welcome.body_html'],
            'password_reset' => ['email.password_reset.subject', 'email.password_reset.body_html'],
            'order_confirmation' => ['email.order_confirmation.subject', 'email.order_confirmation.body_html'],
            'order_processing' => ['email.order_processing.subject', 'email.order_processing.body_html'],
            'order_shipped' => ['email.order_shipped.subject', 'email.order_shipped.body_html'],
        ];

        $out = [];
        foreach ($ids as $key => [$subKey, $bodyKey]) {
            $out[$key] = [
                'subject' => SiteSettings::get($subKey),
                'body_html' => SiteSettings::get($bodyKey),
            ];
        }

        return $out;
    }

    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/Emails', [
            'templates' => $this->loadTemplates(),
            'placeholderHint' => [
                'Global' => '{{site_name}}, {{support_email}}, {{support_phone}}, {{address}}',
                'Auth' => '{{user_name}}, {{user_email}}, {{reset_url}}',
                'Orders' => '{{order_number}}, {{order_total}}, {{order_status}}, {{shipping_address}}, {{order_items_html}}',
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'templates' => ['required', 'array'],
            'templates.welcome.subject' => ['nullable', 'string', 'max:255'],
            'templates.welcome.body_html' => ['nullable', 'string', 'max:50000'],
            'templates.password_reset.subject' => ['nullable', 'string', 'max:255'],
            'templates.password_reset.body_html' => ['nullable', 'string', 'max:50000'],
            'templates.order_confirmation.subject' => ['nullable', 'string', 'max:255'],
            'templates.order_confirmation.body_html' => ['nullable', 'string', 'max:50000'],
            'templates.order_processing.subject' => ['nullable', 'string', 'max:255'],
            'templates.order_processing.body_html' => ['nullable', 'string', 'max:50000'],
            'templates.order_shipped.subject' => ['nullable', 'string', 'max:255'],
            'templates.order_shipped.body_html' => ['nullable', 'string', 'max:50000'],
        ]);

        $map = [
            'welcome' => ['email.welcome.subject', 'email.welcome.body_html'],
            'password_reset' => ['email.password_reset.subject', 'email.password_reset.body_html'],
            'order_confirmation' => ['email.order_confirmation.subject', 'email.order_confirmation.body_html'],
            'order_processing' => ['email.order_processing.subject', 'email.order_processing.body_html'],
            'order_shipped' => ['email.order_shipped.subject', 'email.order_shipped.body_html'],
        ];

        $templates = $request->input('templates', []);

        foreach ($map as $id => [$sk, $bk]) {
            $block = $templates[$id] ?? [];
            Setting::set($sk, (string) ($block['subject'] ?? ''));
            Setting::set($bk, (string) ($block['body_html'] ?? ''));
        }

        return back()->with('success', 'Email templates saved.');
    }
}
