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
    /** @return list<string> */
    protected function templateIds(): array
    {
        return [
            'welcome',
            'password_reset',
            'order_confirmation',
            'order_confirmation_quote',
            'order_processing',
            'order_processing_quote',
            'order_shipped',
            'service_booking_confirmation',
            'custom_order_confirmation',
            'contact_notification',
            'order_admin',
            'service_booking_admin',
            'custom_order_admin',
        ];
    }

    /** @return array<string, array{subject: string, body_html: string}> */
    protected function settingKeys(): array
    {
        return [
            'welcome' => ['email.welcome.subject', 'email.welcome.body_html'],
            'password_reset' => ['email.password_reset.subject', 'email.password_reset.body_html'],
            'order_confirmation' => ['email.order_confirmation.subject', 'email.order_confirmation.body_html'],
            'order_confirmation_quote' => ['email.order_confirmation_quote.subject', 'email.order_confirmation_quote.body_html'],
            'order_processing' => ['email.order_processing.subject', 'email.order_processing.body_html'],
            'order_processing_quote' => ['email.order_processing_quote.subject', 'email.order_processing_quote.body_html'],
            'order_shipped' => ['email.order_shipped.subject', 'email.order_shipped.body_html'],
            'service_booking_confirmation' => ['email.service_booking_confirmation.subject', 'email.service_booking_confirmation.body_html'],
            'custom_order_confirmation' => ['email.custom_order_confirmation.subject', 'email.custom_order_confirmation.body_html'],
            'contact_notification' => ['email.contact_notification.subject', 'email.contact_notification.body_html'],
            'order_admin' => ['email.order_admin.subject', 'email.order_admin.body_html'],
            'service_booking_admin' => ['email.service_booking_admin.subject', 'email.service_booking_admin.body_html'],
            'custom_order_admin' => ['email.custom_order_admin.subject', 'email.custom_order_admin.body_html'],
        ];
    }

    /** @return array<string, array{subject: ?string, body_html: ?string}> */
    protected function loadTemplates(): array
    {
        $out = [];
        foreach ($this->settingKeys() as $key => [$subKey, $bodyKey]) {
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
            'adminEmail' => SiteSettings::get('general.email'),
            'placeholderHint' => [
                'Global' => '{{site_name}}, {{support_email}}, {{support_phone}}, {{address}}',
                'Auth' => '{{user_name}}, {{user_email}}, {{reset_url}}',
                'Orders' => '{{order_number}}, {{order_total}}, {{order_status}}, {{shipping_address}}, {{order_items_html}}, {{order_pricing_html}}',
                'Contact (admin)' => '{{contact_name}}, {{contact_email}}, {{contact_subject}}, {{contact_message}}',
                'Service bookings' => '{{booking_number}}, {{service_name}}, {{category_name}}, {{customer_name}}, {{customer_email}}, {{customer_phone}}, {{booking_total}}, {{booking_notes_block}}, {{booking_brief_html}}',
                'Custom order forms' => '{{submission_number}}, {{customer_name}}, {{customer_email}}, {{customer_phone}}, {{order_date}}, {{order_items_html}}, {{design_notes_block}}, {{artwork_files_html}}',
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $rules = ['templates' => ['required', 'array']];
        foreach ($this->templateIds() as $id) {
            $rules["templates.{$id}.subject"] = ['nullable', 'string', 'max:255'];
            $rules["templates.{$id}.body_html"] = ['nullable', 'string', 'max:50000'];
        }

        $request->validate($rules);

        $templates = $request->input('templates', []);

        foreach ($this->settingKeys() as $id => [$sk, $bk]) {
            $block = $templates[$id] ?? [];
            Setting::set($sk, (string) ($block['subject'] ?? ''));
            Setting::set($bk, (string) ($block['body_html'] ?? ''));
        }

        return back()->with('success', 'Email templates saved.');
    }
}
