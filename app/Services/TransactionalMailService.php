<?php

namespace App\Services;

use App\Models\ContactMessage;
use App\Models\Order;
use App\Models\ServiceBooking;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TransactionalMailService
{
    public function __construct(
        protected MailTemplateRenderer $templates
    ) {}

    protected function adminEmail(): ?string
    {
        $email = trim((string) (SiteSettings::get('general.email') ?: config('mail.from.address', '')));

        return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null;
    }

    protected function ensureQuoteOrderEmailTemplates(): void
    {
        $defaults = [
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
            'email.order_processing_quote.subject' => 'We\'re preparing order {{order_number}}',
            'email.order_processing_quote.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Your order <strong>{{order_number}}</strong> is now being processed.</p>
<p>We will contact you with pricing details if we have not already.</p>
<p>— {{site_name}}</p>
HTML,
        ];

        $this->ensureDefaults($defaults);
    }

    protected function ensureAdminEmailTemplates(): void
    {
        $defaults = [
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
        ];

        $this->ensureDefaults($defaults);
    }

    /**
     * @param  array<string, string>  $defaults
     */
    protected function ensureDefaults(array $defaults): void
    {
        foreach ($defaults as $key => $value) {
            if (! Setting::get($key)) {
                Setting::set($key, $value);
            }
        }
    }

    public function sendFromKeys(
        string $subjectKey,
        string $bodyKey,
        string $toEmail,
        array $vars,
        ?string $replyToEmail = null,
        ?string $replyToName = null,
    ): bool {
        $subjectTpl = Setting::get($subjectKey);
        $bodyTpl = Setting::get($bodyKey);

        if (! $subjectTpl || ! $bodyTpl) {
            return false;
        }

        $rendered = $this->templates->render($subjectTpl, $bodyTpl, $vars);

        try {
            Mail::send([], [], function (\Illuminate\Mail\Message $message) use ($rendered, $toEmail, $replyToEmail, $replyToName) {
                $message->to($toEmail)->subject($rendered['subject'])->html($rendered['html']);

                if ($replyToEmail) {
                    $message->replyTo($replyToEmail, $replyToName ?? '');
                }
            });

            return true;
        } catch (\Throwable $e) {
            Log::warning('Transactional mail failed: '.$e->getMessage());

            return false;
        }
    }

    protected function notifyAdmin(
        string $subjectKey,
        string $bodyKey,
        array $vars,
        ?string $replyToEmail = null,
        ?string $replyToName = null,
    ): bool {
        $admin = $this->adminEmail();
        if (! $admin) {
            return false;
        }

        return $this->sendFromKeys($subjectKey, $bodyKey, $admin, $vars, $replyToEmail, $replyToName);
    }

    public function sendWelcome(User $user): void
    {
        $vars = array_merge($this->templates->globalVars(), [
            'user_name' => $user->name,
            'user_email' => $user->email,
        ]);

        $this->sendFromKeys(
            'email.welcome.subject',
            'email.welcome.body_html',
            $user->email,
            $vars
        );
    }

    public function sendPasswordReset(User $user, string $token): void
    {
        $resetUrl = url(route('password.reset', [
            'token' => $token,
            'email' => $user->email,
        ], false));

        $vars = array_merge($this->templates->globalVars(), [
            'user_name' => $user->name,
            'user_email' => $user->email,
            'reset_url' => $resetUrl,
        ]);

        $this->sendFromKeys(
            'email.password_reset.subject',
            'email.password_reset.body_html',
            $user->email,
            $vars
        );
    }

    public function sendOrderConfirmation(Order $order): void
    {
        $order->loadMissing('items');
        $email = $order->shipping_email;
        if (! $email) {
            return;
        }

        $vars = $this->templates->orderVars($order);
        $isQuote = $order->payment_status === 'not_required';

        if ($isQuote) {
            $this->ensureQuoteOrderEmailTemplates();
        }

        $this->sendFromKeys(
            $isQuote
                ? 'email.order_confirmation_quote.subject'
                : 'email.order_confirmation.subject',
            $isQuote
                ? 'email.order_confirmation_quote.body_html'
                : 'email.order_confirmation.body_html',
            $email,
            $vars
        );

        $this->ensureAdminEmailTemplates();
        $this->notifyAdmin(
            'email.order_admin.subject',
            'email.order_admin.body_html',
            $vars,
            $order->shipping_email,
            $order->shipping_name
        );
    }

    public function sendOrderProcessing(Order $order): void
    {
        $email = $order->shipping_email;
        if (! $email) {
            return;
        }

        $vars = $this->templates->orderVars($order);
        $isQuote = $order->payment_status === 'not_required';

        if ($isQuote) {
            $this->ensureQuoteOrderEmailTemplates();
        }

        $this->sendFromKeys(
            $isQuote
                ? 'email.order_processing_quote.subject'
                : 'email.order_processing.subject',
            $isQuote
                ? 'email.order_processing_quote.body_html'
                : 'email.order_processing.body_html',
            $email,
            $vars
        );
    }

    public function sendOrderShipped(Order $order): void
    {
        $email = $order->shipping_email;
        if (! $email) {
            return;
        }

        $this->sendFromKeys(
            'email.order_shipped.subject',
            'email.order_shipped.body_html',
            $email,
            $this->templates->orderVars($order)
        );
    }

    public function sendContactMessage(ContactMessage $message, ?string $toEmail = null): bool
    {
        $recipient = $toEmail ?: $this->adminEmail();
        if (! $recipient) {
            return false;
        }

        $this->ensureAdminEmailTemplates();
        $vars = $this->templates->contactMessageVars($message);

        return $this->sendFromKeys(
            'email.contact_notification.subject',
            'email.contact_notification.body_html',
            $recipient,
            $vars,
            $message->email,
            $message->name
        );
    }

    public function sendServiceBookingConfirmation(ServiceBooking $booking): bool
    {
        if (! $booking->customer_email) {
            return false;
        }

        $this->ensureAdminEmailTemplates();

        return $this->sendFromKeys(
            'email.service_booking_confirmation.subject',
            'email.service_booking_confirmation.body_html',
            $booking->customer_email,
            $this->serviceBookingTemplateVars($booking)
        );
    }

    public function sendAdminServiceBooking(ServiceBooking $booking): bool
    {
        $this->ensureAdminEmailTemplates();

        return $this->notifyAdmin(
            'email.service_booking_admin.subject',
            'email.service_booking_admin.body_html',
            $this->serviceBookingTemplateVars($booking),
            $booking->customer_email,
            $booking->customer_name
        );
    }

    /**
     * @return array<string, string|null>
     */
    protected function serviceBookingTemplateVars(ServiceBooking $booking): array
    {
        $vars = $this->templates->serviceBookingVars($booking);
        $notes = trim((string) ($booking->notes ?? ''));
        $vars['booking_notes_block'] = $notes !== ''
            ? '<h3>Notes</h3><p style="white-space:pre-wrap;">'.e($notes).'</p>'
            : '';
        $vars['customer_phone'] = $booking->customer_phone ?: '—';

        return $vars;
    }
}
