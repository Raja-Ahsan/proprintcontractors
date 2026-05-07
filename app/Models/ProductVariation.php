<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariation extends Model
{
    protected $appends = [
        'image_url',
    ];

    protected $fillable = [
        'product_id',
        'sku',
        'price',
        'compare_at_price',
        'stock_quantity',
        'attributes',
        'image',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'compare_at_price' => 'decimal:2',
            'attributes' => 'array',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        return asset('storage/'.$this->image);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function variationLabel(): string
    {
        $attrs = $this->getAttribute('attributes');
        if (! is_array($attrs) || $attrs === []) {
            return '';
        }

        return collect($attrs)
            ->map(fn (mixed $v, string $k): string => $k.': '.$v)
            ->implode(' · ');
    }
}
