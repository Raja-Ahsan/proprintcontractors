<?php

namespace App\Models;

use App\Services\ProductCustomizationService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'session_id',
        'product_id',
        'product_variation_id',
        'quantity',
        'customization_json',
        'customization_preview_path',
        'customization_checksum',
    ];

    protected function casts(): array
    {
        return [
            'customization_json' => 'array',
        ];
    }

    protected $appends = [
        'unit_price',
        'line_total',
        'line_image_url',
        'variation_summary',
        'stock_available',
        'customization_preview_url',
        'customization_summary_text',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productVariation(): BelongsTo
    {
        return $this->belongsTo(ProductVariation::class);
    }

    public function getUnitPriceAttribute(): float
    {
        $this->loadMissing(['productVariation', 'product']);

        if ($this->product_variation_id && $this->productVariation) {
            return (float) $this->productVariation->price;
        }

        return $this->product ? (float) $this->product->price : 0.0;
    }

    public function getLineTotalAttribute(): float
    {
        return round($this->unit_price * (int) $this->quantity, 2);
    }

    public function getLineImageUrlAttribute(): ?string
    {
        if (filled($this->customization_preview_path)) {
            return asset('storage/'.$this->customization_preview_path);
        }

        $this->loadMissing(['productVariation', 'product']);

        if ($this->product_variation_id && $this->productVariation && $this->productVariation->image) {
            return asset('storage/'.$this->productVariation->image);
        }

        return $this->product?->image_url;
    }

    public function getCustomizationPreviewUrlAttribute(): ?string
    {
        if (! filled($this->customization_preview_path)) {
            return null;
        }

        return asset('storage/'.$this->customization_preview_path);
    }

    public function getCustomizationSummaryTextAttribute(): ?string
    {
        if (! is_array($this->customization_json) || $this->customization_json === []) {
            return null;
        }

        $svc = app(ProductCustomizationService::class);
        $texts = $svc->summarizeTexts($this->customization_json);

        if ($texts === []) {
            return null;
        }

        $s = implode(' · ', $texts);

        return mb_strlen($s) > 280 ? mb_substr($s, 0, 277).'…' : $s;
    }

    public function getVariationSummaryAttribute(): ?string
    {
        $this->loadMissing(['product', 'productVariation']);

        if (! $this->product_variation_id || ! $this->productVariation || ! $this->product?->isVariable()) {
            return null;
        }

        $defs = $this->product->variation_attribute_defs ?? [];
        $attrs = $this->productVariation->attributes ?? [];
        $parts = [];

        foreach ($defs as $d) {
            $k = $d['key'] ?? '';
            if ($k !== '' && isset($attrs[$k])) {
                $parts[] = ($d['label'] ?? $k).': '.$attrs[$k];
            }
        }

        return $parts !== [] ? implode(' · ', $parts) : null;
    }

    public function getStockAvailableAttribute(): int
    {
        $this->loadMissing(['productVariation', 'product']);

        if ($this->product_variation_id && $this->productVariation) {
            return (int) $this->productVariation->stock_quantity;
        }

        return $this->product ? (int) $this->product->stock_quantity : 0;
    }
}
