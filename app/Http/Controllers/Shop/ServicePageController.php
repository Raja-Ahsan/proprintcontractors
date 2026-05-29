<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategory;
use Inertia\Inertia;
use Inertia\Response;

class ServicePageController extends Controller
{
    public function __invoke(): Response
    {
        $categories = ServiceCategory::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->with(['activePackages'])
            ->get()
            ->map(fn (ServiceCategory $cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'packages' => $cat->activePackages->map(fn ($pkg) => [
                    'id' => $pkg->id,
                    'name' => $pkg->name,
                    'slug' => $pkg->slug,
                    'price' => (float) $pkg->price,
                    'popular' => $pkg->popular,
                    'features' => $pkg->features ?? [],
                ])->values(),
            ])
            ->filter(fn (array $cat) => count($cat['packages']) > 0)
            ->values();

        return Inertia::render('Marketing/Services', [
            'categories' => $categories,
        ]);
    }
}
