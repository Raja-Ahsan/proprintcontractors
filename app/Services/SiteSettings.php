<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Schema;

class SiteSettings
{
    /** @var list<string> */
    public const ENCRYPTED_KEYS = [
        'payment.stripe_secret',
        'payment.stripe_webhook_secret',
        'payment.paypal_secret',
    ];

    public static function tableReady(): bool
    {
        return Schema::hasTable('settings');
    }

    public static function get(string $key, ?string $default = null): ?string
    {
        if (! self::tableReady()) {
            return $default;
        }

        return Setting::get($key, $default);
    }

    public static function set(string $key, ?string $value): void
    {
        Setting::set($key, $value);
    }

    public static function getDecrypted(string $key): ?string
    {
        $raw = self::get($key);
        if ($raw === null || $raw === '') {
            return null;
        }

        try {
            return Crypt::decryptString($raw);
        } catch (\Throwable) {
            return $raw;
        }
    }

    public static function setEncrypted(string $key, ?string $plain): void
    {
        if ($plain === null || $plain === '') {
            Setting::query()->where('key', $key)->delete();

            return;
        }

        Setting::set($key, Crypt::encryptString($plain));
    }

    /**
     * Merge DB settings into Laravel config (secrets, rates, Stripe keys).
     */
    public static function syncToConfig(): void
    {
        if (! self::tableReady()) {
            return;
        }

        $merge = [];

        $pub = self::get('payment.stripe_publishable_key');
        if ($pub !== null && $pub !== '') {
            $merge['services.stripe.key'] = $pub;
        }

        $sec = self::getDecrypted('payment.stripe_secret');
        if ($sec) {
            $merge['services.stripe.secret'] = $sec;
        }

        $wh = self::getDecrypted('payment.stripe_webhook_secret');
        if ($wh) {
            $merge['services.stripe.webhook_secret'] = $wh;
        }

        $flat = self::get('shipping.flat_rate');
        if ($flat !== null && $flat !== '') {
            $merge['shop.shipping_flat'] = (float) $flat;
        }

        $tax = self::get('shipping.tax_rate');
        if ($tax !== null && $tax !== '') {
            $merge['shop.tax_rate'] = (float) $tax;
        }

        $currency = self::get('shop.currency');
        if ($currency !== null && $currency !== '') {
            $merge['shop.currency'] = strtolower($currency);
        }

        if ($merge !== []) {
            Config::set($merge);
        }
    }

    /**
     * Public branding + contact for Inertia (shop UI).
     *
     * @return array<string, mixed>
     */
    public static function appearanceForFrontend(): array
    {
        $url = static function (?string $path): ?string {
            if (! $path) {
                return null;
            }
            if (str_starts_with($path, 'http')) {
                return $path;
            }

            // Root-relative so logos work when APP_URL host differs from the browser (e.g. localhost vs 127.0.0.1).
            return '/storage/'.str_replace('\\', '/', ltrim($path, '/'));
        };

        return [
            'headerLogoUrl' => $url(self::get('general.header_logo')),
            'footerLogoUrl' => $url(self::get('general.footer_logo')),
            'loaderLogoUrl' => $url(self::get('general.loader_logo')),
            'faviconUrl' => $url(self::get('general.favicon')),
            'siteName' => self::get('general.site_name') ?: config('app.name', 'Pro Print Contractors'),
            'phone' => self::get('general.phone'),
            'email' => self::get('general.email'),
            'address' => self::get('general.address'),
            'socials' => [
                'facebook' => self::get('general.social_facebook'),
                'instagram' => self::get('general.social_instagram'),
                'twitter' => self::get('general.social_twitter'),
                'linkedin' => self::get('general.social_linkedin'),
                'youtube' => self::get('general.social_youtube'),
            ],
        ];
    }

    /**
     * SEO defaults for meta tags (ShopLayout can consume).
     *
     * @return array<string, string|null>
     */
    public static function seoForFrontend(): array
    {
        $og = self::get('seo.og_image');
        $ogUrl = null;
        if ($og) {
            $ogUrl = str_starts_with($og, 'http')
                ? $og
                : '/storage/'.str_replace('\\', '/', ltrim($og, '/'));
        }

        return [
            'metaTitle' => self::get('seo.meta_title'),
            'metaDescription' => self::get('seo.meta_description'),
            'metaKeywords' => self::get('seo.meta_keywords'),
            'ogImageUrl' => $ogUrl,
        ];
    }

    public static function secretsAreSet(): array
    {
        return [
            'stripe_secret' => (bool) self::getDecrypted('payment.stripe_secret'),
            'stripe_webhook' => (bool) self::getDecrypted('payment.stripe_webhook_secret'),
            'paypal_secret' => (bool) self::getDecrypted('payment.paypal_secret'),
        ];
    }

    /** Flat shipping cost after free-shipping threshold rules (USD). */
    public static function shippingFlatForSubtotal(float $subtotal): float
    {
        $rateRaw = self::get('shipping.flat_rate');
        $rate = $rateRaw !== null && $rateRaw !== ''
            ? (float) $rateRaw
            : (float) config('shop.shipping_flat', 9.99);

        $minRaw = self::get('shipping.free_shipping_minimum');
        $min = $minRaw !== null && $minRaw !== '' ? (float) $minRaw : 0;

        if ($min > 0 && $subtotal >= $min) {
            return 0;
        }

        return $rate;
    }
}
