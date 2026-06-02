<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Services\TransactionalMailService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request, TransactionalMailService $mail): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:10000'],
        ]);

        $contactMessage = ContactMessage::create($validated);

        $sent = $mail->sendContactMessage($contactMessage);
        if (! $sent) {
            Log::warning('Contact form saved but notification email failed.', [
                'contact_message_id' => $contactMessage->id,
            ]);
        }

        return back()->with('success', 'Thanks — your message has been sent. We\'ll be in touch soon.');
    }
}
