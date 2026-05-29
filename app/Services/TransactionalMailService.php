<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TransactionalMailService
{
    public function __construct(
        protected MailTemplateRenderer $templates
    ) {}

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
            'email.order_processing_quote.body_html' => <<<'HTML'
<p>Hi,</p>
<p>Your order <strong>{{order_number}}</strong> is now being processed.</p>
<p>We will contact you with pricing details if we have not already.</p>
<p>— {{site_name}}</p>
HTML,
        ];

        foreach ($defaults as $key => $value) {
            if (! Setting::get($key)) {
                Setting::set($key, $value);
            }
        }
    }

    public function sendFromKeys(string $subjectKey, string $bodyKey, string $toEmail, array $vars): bool
    {
        $subjectTpl = Setting::get($subjectKey);
        $bodyTpl = Setting::get($bodyKey);

        if (! $subjectTpl || ! $bodyTpl) {
            return false;
        }

        $rendered = $this->templates->render($subjectTpl, $bodyTpl, $vars);

        try {
            Mail::send([], [], function (\Illuminate\Mail\Message $message) use ($rendered, $toEmail) {
                $message->to($toEmail)->subject($rendered['subject'])->html($rendered['html']);
            });

            return true;
        } catch (\Throwable $e) {
            Log::warning('Transactional mail failed: '.$e->getMessage());

            return false;
        }
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
            'email.order_processing.subject',
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
}
