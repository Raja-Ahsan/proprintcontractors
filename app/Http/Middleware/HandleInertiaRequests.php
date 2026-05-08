<?php

namespace App\Http\Middleware;

use App\Services\CartService;
use App\Services\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var CartService $cart */
        $cart = app(CartService::class);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? $request->user()->only(['id', 'name', 'email', 'is_admin'])
                    : null,
            ],
            'cartCount' => $cart->itemCount($request),
            'cartPreview' => $cart->headerPreview($request),
            'cartSubtotal' => $cart->subtotal($request),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'site' => SiteSettings::tableReady()
                ? SiteSettings::appearanceForFrontend()
                : [
                    'headerLogoUrl' => null,
                    'footerLogoUrl' => null,
                    'loaderLogoUrl' => null,
                    'faviconUrl' => null,
                    'siteName' => config('app.name'),
                    'phone' => null,
                    'email' => null,
                    'address' => null,
                    'socials' => [
                        'facebook' => null,
                        'instagram' => null,
                        'twitter' => null,
                        'linkedin' => null,
                        'youtube' => null,
                    ],
                ],
            'seo' => SiteSettings::tableReady()
                ? SiteSettings::seoForFrontend()
                : [
                    'metaTitle' => null,
                    'metaDescription' => null,
                    'metaKeywords' => null,
                    'ogImageUrl' => null,
                ],
        ];
    }
}
