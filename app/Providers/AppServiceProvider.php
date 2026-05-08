<?php

namespace App\Providers;

use App\Models\Product;
use App\Services\SiteSettings;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Shop + admin share `{product}`: allow numeric id (e.g. Ziggy/legacy links) or slug.
        Route::bind('product', function (string $value): Product {
            if (ctype_digit($value)) {
                return Product::query()->findOrFail((int) $value);
            }

            return Product::query()->where('slug', $value)->firstOrFail();
        });

        Vite::prefetch(concurrency: 3);

        if (SiteSettings::tableReady()) {
            SiteSettings::syncToConfig();
        }
    }
}
