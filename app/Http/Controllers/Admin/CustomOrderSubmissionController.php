<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomOrderSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomOrderSubmissionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = CustomOrderSubmission::query()->latest();

        if ($request->filled('read')) {
            $read = $request->input('read') === '1';
            $query->where('is_read', $read);
        }

        $submissions = $query->paginate(20)->withQueryString();

        $submissions->getCollection()->transform(function (CustomOrderSubmission $submission): CustomOrderSubmission {
            $submission->setAttribute('categories_summary', $submission->categoriesSummary());

            return $submission;
        });

        return Inertia::render('Admin/CustomOrderSubmissions/Index', [
            'submissions' => $submissions,
            'filters' => ['read' => (string) $request->input('read', '')],
        ]);
    }

    public function show(CustomOrderSubmission $customOrderSubmission): Response
    {
        if (! $customOrderSubmission->is_read) {
            $customOrderSubmission->update(['is_read' => true]);
            $customOrderSubmission->refresh();
        }

        return Inertia::render('Admin/CustomOrderSubmissions/Show', [
            'submission' => [
                ...$customOrderSubmission->toArray(),
                'categories_summary' => $customOrderSubmission->categoriesSummary(),
            ],
        ]);
    }
}
