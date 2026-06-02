<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ContactMessage::query()->latest();

        if ($request->filled('read')) {
            $read = $request->input('read') === '1';
            $query->where('is_read', $read);
        }

        $messages = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => $messages,
            'filters' => ['read' => (string) $request->input('read', '')],
        ]);
    }

    public function show(ContactMessage $contactMessage): Response
    {
        if (! $contactMessage->is_read) {
            $contactMessage->update(['is_read' => true]);
            $contactMessage->refresh();
        }

        return Inertia::render('Admin/ContactMessages/Show', [
            'message' => $contactMessage,
        ]);
    }
}
