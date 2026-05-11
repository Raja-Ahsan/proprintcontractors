<?php

namespace App\Http\Middleware;

use App\Services\SiteSettings;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Applies DB-backed settings (Stripe keys from admin, shipping, etc.) to runtime config each request.
 * Needed so payment flags stay accurate after saves, and compatible with workers that reuse the app shell.
 */
class HydrateSiteConfig
{
    public function handle(Request $request, Closure $next): Response
    {
        if (SiteSettings::tableReady()) {
            SiteSettings::syncToConfig();
        }

        return $next($request);
    }
}
