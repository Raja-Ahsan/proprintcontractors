<?php

namespace App\Models;

use App\Services\ProductCustomizationService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'product_variation_id',
        'product_name',
        'product_sku',
        'variation_attributes',
        'unit_price',
        'quantity',
        'line_total',
        'customization_json',
        'customization_preview_path',
        'customization_asset_paths',
    ];

    protected $appends = [
        'customization_preview_url',
        'customization_summary_text',
    ];

    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:2',
            'line_total' => 'decimal:2',
            'variation_attributes' => 'array',
            'customization_json' => 'array',
            'customization_asset_paths' => 'array',
        ];
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

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productVariation(): BelongsTo
    {
        return $this->belongsTo(ProductVariation::class);
    }
}
