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
            'general.show_product_prices' => '1',
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
{{order_pricing_html}}
<h3>Items</h3>
{{order_items_html}}
<h3>Ship to</h3>
<p>{{shipping_address}}</p>
<p>— {{site_name}}</p>
HTML,

            'email.order_confirmation_quote.subject' => 'Order {{order_number}} received — {{site_name}}',
            'email.order_confirmation_quote.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Thank you for submitting order <strong>{{order_number}}</strong>.</p>
{{order_pricing_html}}
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
{{order_pricing_html}}
<h3>Items</h3>
{{order_items_html}}
<p>— {{site_name}}</p>
HTML,

            'email.order_processing_quote.subject' => 'We\'re preparing order {{order_number}}',
            'email.order_processing_quote.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Your order <strong>{{order_number}}</strong> is now being processed.</p>
<p>We will contact you with pricing details if we have not already.</p>
<p>— {{site_name}}</p>
HTML,

            'email.order_shipped.subject' => 'Order {{order_number}} has shipped',
            'email.order_shipped.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Good news — order <strong>{{order_number}}</strong> has shipped.</p>
<h3>Items</h3>
{{order_items_html}}
<p>— {{site_name}}</p>
HTML,

            'email.contact_notification.subject' => 'New contact message: {{contact_subject}} — {{site_name}}',
            'email.contact_notification.body_html' => <<<'HTML'
<p>You have received a new message from your contact form.</p>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
<tr><td><strong>Name</strong></td><td>{{contact_name}}</td></tr>
<tr><td><strong>Email</strong></td><td>{{contact_email}}</td></tr>
<tr><td><strong>Subject</strong></td><td>{{contact_subject}}</td></tr>
</table>
<h3>Message</h3>
<p style="white-space:pre-wrap;">{{contact_message}}</p>
<p>— {{site_name}}</p>
HTML,

            'email.order_admin.subject' => 'New order {{order_number}} — {{site_name}}',
            'email.order_admin.body_html' => <<<'HTML'
<p>A new order has been placed.</p>
<p><strong>Order:</strong> {{order_number}}<br>
<strong>Status:</strong> {{order_status}}</p>
{{order_pricing_html}}
<h3>Items</h3>
{{order_items_html}}
<h3>Ship to</h3>
<p>{{shipping_address}}</p>
<p>— {{site_name}}</p>
HTML,

            'email.service_booking_admin.subject' => 'New service booking {{booking_number}} — {{site_name}}',
            'email.service_booking_admin.body_html' => <<<'HTML'
<p>A new service booking has been received.</p>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
<tr><td><strong>Booking</strong></td><td>{{booking_number}}</td></tr>
<tr><td><strong>Service</strong></td><td>{{category_name}} — {{service_name}}</td></tr>
<tr><td><strong>Customer</strong></td><td>{{customer_name}}</td></tr>
<tr><td><strong>Email</strong></td><td>{{customer_email}}</td></tr>
<tr><td><strong>Phone</strong></td><td>{{customer_phone}}</td></tr>
<tr><td><strong>Total</strong></td><td>${{booking_total}}</td></tr>
</table>
{{booking_notes_block}}
<h3>Project brief</h3>
{{booking_brief_html}}
<p>— {{site_name}}</p>
HTML,

            'email.service_booking_confirmation.subject' => 'Booking {{booking_number}} confirmed — {{site_name}}',
            'email.service_booking_confirmation.body_html' => <<<'HTML'
<p>Hi {{customer_name}},</p>
<p>Thank you for booking <strong>{{service_name}}</strong> ({{category_name}}).</p>
<p>Your booking reference is <strong>{{booking_number}}</strong>.</p>
<p>Total paid: ${{booking_total}}</p>
{{booking_notes_block}}
<h3>Your brief</h3>
{{booking_brief_html}}
<p>We will be in touch soon. Questions? Email us at {{support_email}}.</p>
<p>— {{site_name}}</p>
HTML,

            'email.custom_order_confirmation.subject' => 'Order form {{submission_number}} received — {{site_name}}',
            'email.custom_order_confirmation.body_html' => <<<'HTML'
<p>Hi {{customer_name}},</p>
<p>Thank you for submitting custom order form <strong>{{submission_number}}</strong>.</p>
<p>We have received your request and will contact you shortly to confirm details and pricing.</p>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
<tr><td><strong>Order date</strong></td><td>{{order_date}}</td></tr>
<tr><td><strong>Phone</strong></td><td>{{customer_phone}}</td></tr>
</table>
<h3>Order items</h3>
{{order_items_html}}
{{design_notes_block}}
{{artwork_files_html}}
<p>Questions? Reply to this email or contact us at {{support_email}}.</p>
<p>— {{site_name}}</p>
HTML,

            'email.custom_order_admin.subject' => 'New custom order form {{submission_number}} — {{site_name}}',
            'email.custom_order_admin.body_html' => <<<'HTML'
<p>A new custom order form has been submitted.</p>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
<tr><td><strong>Reference</strong></td><td>{{submission_number}}</td></tr>
<tr><td><strong>Customer</strong></td><td>{{customer_name}}</td></tr>
<tr><td><strong>Email</strong></td><td>{{customer_email}}</td></tr>
<tr><td><strong>Phone</strong></td><td>{{customer_phone}}</td></tr>
<tr><td><strong>Order date</strong></td><td>{{order_date}}</td></tr>
</table>
<h3>Order items</h3>
{{order_items_html}}
{{design_notes_block}}
{{artwork_files_html}}
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
