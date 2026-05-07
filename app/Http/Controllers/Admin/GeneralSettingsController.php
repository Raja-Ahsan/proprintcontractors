<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\SiteSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GeneralSettingsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/General', [
            'settings' => [
                'site_name' => SiteSettings::get('general.site_name'),
                'phone' => SiteSettings::get('general.phone'),
                'email' => SiteSettings::get('general.email'),
                'address' => SiteSettings::get('general.address'),
                'social_facebook' => SiteSettings::get('general.social_facebook'),
                'social_instagram' => SiteSettings::get('general.social_instagram'),
                'social_twitter' => SiteSettings::get('general.social_twitter'),
                'social_linkedin' => SiteSettings::get('general.social_linkedin'),
                'social_youtube' => SiteSettings::get('general.social_youtube'),
                'header_logo' => SiteSettings::get('general.header_logo'),
                'footer_logo' => SiteSettings::get('general.footer_logo'),
                'loader_logo' => SiteSettings::get('general.loader_logo'),
                'favicon' => SiteSettings::get('general.favicon'),
            ],
            'appearance' => SiteSettings::appearanceForFrontend(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:80'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string', 'max:2000'],
            'social_facebook' => ['nullable', 'string', 'max:500'],
            'social_instagram' => ['nullable', 'string', 'max:500'],
            'social_twitter' => ['nullable', 'string', 'max:500'],
            'social_linkedin' => ['nullable', 'string', 'max:500'],
            'social_youtube' => ['nullable', 'string', 'max:500'],
            'header_logo' => ['nullable', 'image', 'max:4096'],
            'footer_logo' => ['nullable', 'image', 'max:4096'],
            'loader_logo' => ['nullable', 'image', 'max:4096'],
            'favicon' => ['nullable', 'file', 'max:1024', 'mimes:ico,png,gif,jpg,jpeg,svg,webp'],
        ]);

        Setting::set('general.site_name', (string) $request->input('site_name', ''));
        Setting::set('general.phone', (string) $request->input('phone', ''));
        Setting::set('general.email', (string) $request->input('email', ''));
        Setting::set('general.address', (string) $request->input('address', ''));
        Setting::set('general.social_facebook', (string) $request->input('social_facebook', ''));
        Setting::set('general.social_instagram', (string) $request->input('social_instagram', ''));
        Setting::set('general.social_twitter', (string) $request->input('social_twitter', ''));
        Setting::set('general.social_linkedin', (string) $request->input('social_linkedin', ''));
        Setting::set('general.social_youtube', (string) $request->input('social_youtube', ''));

        $disk = Storage::disk('public');

        foreach (['header_logo' => 'general.header_logo', 'footer_logo' => 'general.footer_logo', 'loader_logo' => 'general.loader_logo', 'favicon' => 'general.favicon'] as $upload => $key) {
            if ($request->hasFile($upload)) {
                $path = $request->file($upload)->store('branding', 'public');
                $old = Setting::get($key);
                if ($old && ! str_starts_with($old, 'http') && $disk->exists($old)) {
                    $disk->delete($old);
                }
                Setting::set($key, $path);
            }
        }

        return back()->with('success', 'General settings saved.');
    }
}
