<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceBooking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ServiceBookingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ServiceBooking::query()
            ->with(['user:id,name,email', 'servicePackage:id,name'])
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', (string) $request->input('status'));
        }

        $bookings = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/ServiceBookings/Index', [
            'bookings' => $bookings,
            'filters' => ['status' => (string) $request->input('status', '')],
            'statuses' => ['awaiting_payment', 'pending', 'in_progress', 'completed', 'cancelled'],
        ]);
    }

    public function show(ServiceBooking $serviceBooking): Response
    {
        $serviceBooking->load(['user:id,name,email', 'servicePackage.category']);

        return Inertia::render('Admin/ServiceBookings/Show', [
            'booking' => $serviceBooking,
            'statuses' => ['awaiting_payment', 'pending', 'in_progress', 'completed', 'cancelled'],
        ]);
    }

    public function updateStatus(Request $request, ServiceBooking $serviceBooking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['awaiting_payment', 'pending', 'in_progress', 'completed', 'cancelled'])],
        ]);

        $serviceBooking->update(['status' => $validated['status']]);

        return back()->with('success', 'Booking status updated.');
    }
}
