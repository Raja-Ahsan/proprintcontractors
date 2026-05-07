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

class SeoSettingsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/Seo', [
            'settings' => [
                'meta_title' => SiteSettings::get('seo.meta_title'),
                'meta_description' => SiteSettings::get('seo.meta_description'),
                'meta_keywords' => SiteSettings::get('seo.meta_keywords'),
                'og_image' => SiteSettings::get('seo.og_image'),
            ],
            'seo' => SiteSettings::seoForFrontend(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:2000'],
            'meta_keywords' => ['nullable', 'string', 'max:500'],
            'og_image' => ['nullable', 'image', 'max:4096'],
        ]);

        Setting::set('seo.meta_title', (string) $request->input('meta_title', ''));
        Setting::set('seo.meta_description', (string) $request->input('meta_description', ''));
        Setting::set('seo.meta_keywords', (string) $request->input('meta_keywords', ''));

        if ($request->hasFile('og_image')) {
            $path = $request->file('og_image')->store('branding', 'public');
            $disk = Storage::disk('public');
            $old = Setting::get('seo.og_image');
            if ($old && ! str_starts_with($old, 'http') && $disk->exists($old)) {
                $disk->delete($old);
            }
            Setting::set('seo.og_image', $path);
        }

        return back()->with('success', 'SEO settings saved.');
    }
}
