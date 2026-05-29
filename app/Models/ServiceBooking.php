<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceBooking extends Model
{
    protected $fillable = [
        'booking_number',
        'user_id',
        'service_package_id',
        'category_name',
        'service_name',
        'service_price',
        'customer_name',
        'customer_email',
        'customer_phone',
        'notes',
        'brief_json',
        'status',
        'payment_status',
        'total',
        'stripe_checkout_session_id',
        'paid_at',
        'placed_at',
    ];

    protected function casts(): array
    {
        return [
            'brief_json' => 'array',
            'service_price' => 'decimal:2',
            'total' => 'decimal:2',
            'paid_at' => 'datetime',
            'placed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function servicePackage(): BelongsTo
    {
        return $this->belongsTo(ServicePackage::class);
    }
}
