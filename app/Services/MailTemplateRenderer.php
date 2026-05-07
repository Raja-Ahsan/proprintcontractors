<?php

namespace App\Services;

use App\Models\Order;

class MailTemplateRenderer
{
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

        $lines = '';
        foreach ($order->items as $item) {
            $lines .= '<tr>'
                .'<td style="padding:8px;border:1px solid #eee;">'.e($item->product_name).'</td>'
                .'<td style="padding:8px;border:1px solid #eee;text-align:right;">'.e((string) $item->quantity).'</td>'
                .'<td style="padding:8px;border:1px solid #eee;text-align:right;">$'.e((string) $item->unit_price).'</td>'
                .'<td style="padding:8px;border:1px solid #eee;text-align:right;">$'.e((string) $item->line_total).'</td>'
                .'</tr>';
        }

        $itemsTable = '<table style="width:100%;border-collapse:collapse;font-size:14px;">'
            .'<thead><tr>'
            .'<th align="left" style="padding:8px;border:1px solid #eee;">Item</th>'
            .'<th align="right" style="padding:8px;border:1px solid #eee;">Qty</th>'
            .'<th align="right" style="padding:8px;border:1px solid #eee;">Price</th>'
            .'<th align="right" style="padding:8px;border:1px solid #eee;">Total</th>'
            .'</tr></thead><tbody>'.$lines.'</tbody></table>';

        $ship = e($order->shipping_name).'<br>'
            .e($order->shipping_email).'<br>'
            .e($order->shipping_address_line1)
            .($order->shipping_address_line2 ? '<br>'.e($order->shipping_address_line2) : '')
            .'<br>'.e($order->shipping_city).', '.e($order->shipping_postal_code)
            .'<br>'.e($order->shipping_country);

        return array_merge($this->globalVars(), [
            'order_number' => $order->order_number,
            'order_total' => (string) $order->total,
            'order_status' => (string) $order->status,
            'shipping_address' => $ship,
            'order_items_html' => $itemsTable,
        ]);
    }
}
