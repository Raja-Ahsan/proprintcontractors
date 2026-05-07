<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\EmailTemplatesController as AdminEmailTemplatesController;
use App\Http\Controllers\Admin\GeneralSettingsController as AdminGeneralSettingsController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\PaymentSettingsController as AdminPaymentSettingsController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\SeoSettingsController as AdminSeoSettingsController;
use App\Http\Controllers\Admin\ShippingSettingsController as AdminShippingSettingsController;
use App\Http\Controllers\Dashboard\OrderController as CustomerOrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Shop\CartController;
use App\Http\Controllers\Shop\CartCouponController;
use App\Http\Controllers\Shop\CheckoutController;
use App\Http\Controllers\Shop\CustomizationUploadController;
use App\Http\Controllers\Shop\HomeController;
use App\Http\Controllers\Shop\ProductCustomizeController;
use App\Http\Controllers\Shop\ProductController;
use App\Http\Controllers\Shop\StripeCheckoutController;
use App\Http\Controllers\StripeWebhookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/services', fn () => Inertia::render('Marketing/Services'))->name(
    'marketing.services',
);
Route::get('/about', fn () => Inertia::render('Marketing/About'))->name(
    'marketing.about',
);
Route::get('/contact', fn () => Inertia::render('Marketing/Contact'))->name(
    'marketing.contact',
);

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}/customize', [ProductCustomizeController::class, 'show'])
    ->name('products.customize');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::post('/customization/upload', [CustomizationUploadController::class, 'store'])
    ->middleware('throttle:60,1')
    ->name('customization.upload');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

Route::post('/cart/coupon', [CartCouponController::class, 'store'])->name('cart.coupon.store');
Route::delete('/cart/coupon', [CartCouponController::class, 'destroy'])->name('cart.coupon.destroy');

Route::get('/checkout', [CheckoutController::class, 'create'])->name('checkout.create');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

Route::get('/checkout/success', [StripeCheckoutController::class, 'success'])->name('checkout.success');
Route::get('/checkout/cancel', [StripeCheckoutController::class, 'cancel'])->name('checkout.cancel');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/orders', [CustomerOrderController::class, 'index'])->name('dashboard.orders.index');
    Route::get('/dashboard/orders/{order}', [CustomerOrderController::class, 'show'])->name('dashboard.orders.show');
});

Route::post('/stripe/webhook', StripeWebhookController::class)->name('stripe.webhook');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', AdminDashboardController::class)->name('dashboard');

    Route::resource('categories', AdminCategoryController::class)->except(['show']);

    Route::resource('products', AdminProductController::class)->except(['show']);

    Route::resource('coupons', AdminCouponController::class)->except(['show']);

    Route::get('orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.status');

    Route::get('settings/general', [AdminGeneralSettingsController::class, 'edit'])->name('settings.general');
    Route::post('settings/general', [AdminGeneralSettingsController::class, 'update'])->name('settings.general.update');

    Route::get('settings/seo', [AdminSeoSettingsController::class, 'edit'])->name('settings.seo');
    Route::post('settings/seo', [AdminSeoSettingsController::class, 'update'])->name('settings.seo.update');

    Route::get('settings/emails', [AdminEmailTemplatesController::class, 'edit'])->name('settings.emails');
    Route::put('settings/emails', [AdminEmailTemplatesController::class, 'update'])->name('settings.emails.update');

    Route::get('settings/payments', [AdminPaymentSettingsController::class, 'edit'])->name('settings.payments');
    Route::post('settings/payments', [AdminPaymentSettingsController::class, 'update'])->name('settings.payments.update');

    Route::get('settings/shipping', [AdminShippingSettingsController::class, 'edit'])->name('settings.shipping');
    Route::post('settings/shipping', [AdminShippingSettingsController::class, 'update'])->name('settings.shipping.update');
});

require __DIR__.'/auth.php';
