<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategory;
use App\Models\ServicePackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ServicePackageController extends Controller
{
    public function index(): Response
    {
        $packages = ServicePackage::query()
            ->with('category:id,name')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(20);

        return Inertia::render('Admin/ServicePackages/Index', [
            'packages' => $packages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/ServicePackages/Create', [
            'categories' => ServiceCategory::query()->orderBy('sort_order')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'service_category_id' => ['required', 'exists:service_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('service_packages', 'slug')],
            'price' => ['required', 'numeric', 'min:0'],
            'popular' => ['boolean'],
            'features_text' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        $category = ServiceCategory::query()->findOrFail($validated['service_category_id']);

        ServicePackage::query()->create([
            'service_category_id' => $category->id,
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?? Str::slug($category->name.'-'.$validated['name']),
            'price' => $validated['price'],
            'popular' => $request->boolean('popular'),
            'features' => $this->parseFeatures($validated['features_text'] ?? ''),
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.service-packages.index')->with('success', 'Service package created.');
    }

    public function edit(ServicePackage $servicePackage): Response
    {
        $servicePackage->load('category:id,name');

        return Inertia::render('Admin/ServicePackages/Edit', [
            'package' => [
                ...$servicePackage->toArray(),
                'features_text' => implode("\n", $servicePackage->features ?? []),
            ],
            'categories' => ServiceCategory::query()->orderBy('sort_order')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, ServicePackage $servicePackage): RedirectResponse
    {
        $validated = $request->validate([
            'service_category_id' => ['required', 'exists:service_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('service_packages', 'slug')->ignore($servicePackage->id)],
            'price' => ['required', 'numeric', 'min:0'],
            'popular' => ['boolean'],
            'features_text' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        $category = ServiceCategory::query()->findOrFail($validated['service_category_id']);

        $servicePackage->update([
            'service_category_id' => $category->id,
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?? Str::slug($category->name.'-'.$validated['name']),
            'price' => $validated['price'],
            'popular' => $request->boolean('popular'),
            'features' => $this->parseFeatures($validated['features_text'] ?? ''),
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.service-packages.index')->with('success', 'Service package updated.');
    }

    public function destroy(ServicePackage $servicePackage): RedirectResponse
    {
        $servicePackage->delete();

        return redirect()->route('admin.service-packages.index')->with('success', 'Service package deleted.');
    }

    /** @return list<string> */
    protected function parseFeatures(string $text): array
    {
        return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $text) ?: [])));
    }
}
