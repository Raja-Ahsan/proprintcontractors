<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        if (! \App\Services\SiteSettings::tableReady()) {
            return;
        }

        $defaults = [
            'general.site_name' => 'Pro Print Contractors',
            'general.phone' => '+1 (555) 123-4567',
            'general.email' => 'hello@proprintcontractors.test',
            'general.address' => "123 Print Lane\nContractor City, ST 12345",
            'shipping.tax_rate' => '0',
            'shipping.flat_rate' => '9.99',
            'shipping.free_shipping_minimum' => '',
            'shop.currency' => 'usd',

            'seo.meta_title' => 'Pro Print Contractors — Print & Branding',
            'seo.meta_description' => 'Premium print on demand, branding and digital services for contractors.',
            'seo.meta_keywords' => 'print, contractors, branding, signage',

            'email.welcome.subject' => 'Welcome to {{site_name}}',
            'email.welcome.body_html' => <<<'HTML'
<p>Hi {{user_name}},</p>
<p>Thanks for creating an account at <strong>{{site_name}}</strong>.</p>
<p>If you have questions, reply to this email or reach us at {{support_email}}.</p>
<p>— {{site_name}}</p>
HTML,

            'email.password_reset.subject' => 'Reset your {{site_name}} password',
            'email.password_reset.body_html' => <<<'HTML'
<p>Hi {{user_name}},</p>
<p>We received a request to reset your password. Click the link below to choose a new password:</p>
<p><a href="{{reset_url}}">Reset password</a></p>
<p>If you did not request this, you can ignore this email.</p>
<p>— {{site_name}}</p>
HTML,

            'email.order_confirmation.subject' => 'Order {{order_number}} confirmed — {{site_name}}',
            'email.order_confirmation.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Thank you for your order <strong>{{order_number}}</strong>.</p>
<p><strong>Total:</strong> ${{order_total}}</p>
<h3>Items</h3>
{{order_items_html}}
<h3>Ship to</h3>
<p>{{shipping_address}}</p>
<p>— {{site_name}}</p>
HTML,

            'email.order_processing.subject' => 'We\'re preparing order {{order_number}}',
            'email.order_processing.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Your order <strong>{{order_number}}</strong> is now being processed.</p>
<p>Total paid: ${{order_total}}</p>
<p>— {{site_name}}</p>
HTML,

            'email.order_shipped.subject' => 'Order {{order_number}} has shipped',
            'email.order_shipped.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Good news — order <strong>{{order_number}}</strong> has shipped.</p>
<p>— {{site_name}}</p>
HTML,
        ];

        foreach ($defaults as $key => $value) {
            if (Setting::query()->where('key', $key)->exists()) {
                continue;
            }
            Setting::set($key, $value);
        }
    }
}
