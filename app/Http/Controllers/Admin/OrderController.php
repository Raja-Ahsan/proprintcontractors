<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\TransactionalMailService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Order::query()->with(['user:id,name,email'])->latest();

        if ($request->filled('status')) {
            $query->where('status', (string) $request->input('status'));
        }

        $orders = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => ['status' => (string) $request->input('status', '')],
            'statuses' => ['awaiting_payment', 'pending', 'processing', 'shipped', 'completed', 'cancelled'],
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load(['items.product', 'user:id,name,email']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
            'statuses' => ['awaiting_payment', 'pending', 'processing', 'shipped', 'completed', 'cancelled'],
        ]);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['awaiting_payment', 'pending', 'processing', 'shipped', 'completed', 'cancelled'])],
        ]);

        $previous = $order->status;

        $order->update(['status' => $validated['status']]);

        $order->refresh();

        $mail = app(TransactionalMailService::class);

        if ($validated['status'] === 'processing' && $previous !== 'processing') {
            $mail->sendOrderProcessing($order);
        }

        if ($validated['status'] === 'shipped' && $previous !== 'shipped') {
            $mail->sendOrderShipped($order);
        }

        return back()->with('success', 'Order status updated.');
    }
}
