<?php

namespace App\Services;

use App\Models\ContactMessage;
use App\Models\Order;
use App\Models\ServiceBooking;

class MailTemplateRenderer
{
    public function __construct(
        protected ServiceBriefService $briefs
    ) {}

    /**
     * @param  array<string, string|null>  $vars
     */
    public function render(string $subjectTemplate, string $htmlTemplate, array $vars): array
    {
        $replacements = [];
        foreach ($vars as $k => $v) {
            $replacements['{{'.$k.'}}'] = $v ?? '';
        }

        $subject = strtr($subjectTemplate, $replacements);
        $html = strtr($htmlTemplate, $replacements);

        return compact('subject', 'html');
    }

    /**
     * @return array<string, string|null>
     */
    public function globalVars(): array
    {
        return [
            'site_name' => SiteSettings::get('general.site_name') ?: config('app.name'),
            'support_email' => SiteSettings::get('general.email'),
            'support_phone' => SiteSettings::get('general.phone'),
            'address' => SiteSettings::get('general.address'),
        ];
    }

    /**
     * @return array<string, string|null>
     */
    public function orderVars(Order $order): array
    {
        $order->loadMissing('items');
        $showPrices = $order->payment_status !== 'not_required';

        $lines = '';
        foreach ($order->items as $item) {
            $line = '<tr>'
                .'<td style="padding:8px;border:1px solid #eee;">'.e($item->product_name).'</td>'
                .'<td style="padding:8px;border:1px solid #eee;text-align:right;">'.e((string) $item->quantity).'</td>';

            if ($showPrices) {
                $line .= '<td style="padding:8px;border:1px solid #eee;text-align:right;">$'.e((string) $item->unit_price).'</td>'
                    .'<td style="padding:8px;border:1px solid #eee;text-align:right;">$'.e((string) $item->line_total).'</td>';
            }

            $line .= '</tr>';
            $lines .= $line;
        }

        $header = '<thead><tr>'
            .'<th align="left" style="padding:8px;border:1px solid #eee;">Item</th>'
            .'<th align="right" style="padding:8px;border:1px solid #eee;">Qty</th>';

        if ($showPrices) {
            $header .= '<th align="right" style="padding:8px;border:1px solid #eee;">Price</th>'
                .'<th align="right" style="padding:8px;border:1px solid #eee;">Total</th>';
        }

        $header .= '</tr></thead>';

        $itemsTable = '<table style="width:100%;border-collapse:collapse;font-size:14px;">'
            .$header.'<tbody>'.$lines.'</tbody></table>';

        $ship = e($order->shipping_name).'<br>'
            .e($order->shipping_email).'<br>'
            .e($order->shipping_address_line1)
            .($order->shipping_address_line2 ? '<br>'.e($order->shipping_address_line2) : '')
            .'<br>'.e($order->shipping_city).', '.e($order->shipping_postal_code)
            .'<br>'.e($order->shipping_country);

        $pricingBlock = $showPrices
            ? '<p><strong>Total:</strong> $'.e((string) $order->total).'</p>'
            : '<p>We will review your order and contact you with pricing.</p>';

        return array_merge($this->globalVars(), [
            'order_number' => $order->order_number,
            'order_total' => $showPrices ? (string) $order->total : '',
            'order_status' => (string) $order->status,
            'shipping_address' => $ship,
            'order_items_html' => $itemsTable,
            'order_pricing_html' => $pricingBlock,
        ]);
    }

    /**
     * @return array<string, string|null>
     */
    public function contactMessageVars(ContactMessage $message): array
    {
        return array_merge($this->globalVars(), [
            'contact_name' => $message->name,
            'contact_email' => $message->email,
            'contact_subject' => $message->subject,
            'contact_message' => $message->message,
        ]);
    }

    /**
     * @return array<string, string|null>
     */
    public function serviceBookingVars(ServiceBooking $booking): array
    {
        $briefHtml = $this->briefs->briefHtmlForEmail($booking->brief_json);

        return array_merge($this->globalVars(), [
            'booking_number' => $booking->booking_number,
            'service_name' => $booking->service_name,
            'category_name' => $booking->category_name,
            'customer_name' => $booking->customer_name,
            'customer_email' => $booking->customer_email,
            'customer_phone' => $booking->customer_phone,
            'booking_total' => (string) $booking->total,
            'booking_notes' => $booking->notes,
            'booking_brief_html' => $briefHtml !== '' ? $briefHtml : '<p><em>No brief submitted.</em></p>',
        ]);
    }
}
