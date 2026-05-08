<?php

namespace App\Http\Middleware;

use App\Models\CartItem;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MergeGuestCart
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && ! $request->session()->get('guest_cart_merged')) {
            $sessionId = $request->session()->getId();

            $guestItems = CartItem::query()
                ->where('session_id', $sessionId)
                ->whereNull('user_id')
                ->get();

            foreach ($guestItems as $item) {
                $existing = CartItem::query()
                    ->where('user_id', $request->user()->id)
                    ->where('product_id', $item->product_id)
                    ->when(
                        $item->product_variation_id,
                        fn ($q) => $q->where('product_variation_id', $item->product_variation_id),
                        fn ($q) => $q->whereNull('product_variation_id'),
                    )
                    ->when(
                        (bool) $item->customization_checksum,
                        fn ($q) => $q->where(
                            'customization_checksum',
                            (string) $item->customization_checksum,
                        ),
                        fn ($q) => $q->whereNull('customization_checksum'),
                    )
                    ->first();

                if ($existing) {
                    $existing->quantity += $item->quantity;
                    $existing->save();
                    $item->delete();
                } else {
                    $item->forceFill([
                        'user_id' => $request->user()->id,
                        'session_id' => null,
                    ])->save();
                }
            }

            $request->session()->put('guest_cart_merged', true);
        }

        return $next($request);
    }
}
