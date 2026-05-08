<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    public const TYPE_SIMPLE = 'simple';

    public const TYPE_VARIABLE = 'variable';

    protected $appends = [
        'image_url',
        'gallery_urls',
    ];

    protected $fillable = [
        'category_id',
        'type',
        'variation_attribute_defs',
        'name',
        'slug',
        'sku',
        'description',
        'price',
        'compare_at_price',
        'stock_quantity',
        'image',
        'gallery',
        'is_active',
        'is_customizable',
        'custom_print_area',
    ];

    protected function casts(): array
    {
        return [
            'variation_attribute_defs' => 'array',
            'gallery' => 'array',
            'custom_print_area' => 'array',
            'price' => 'decimal:2',
            'compare_at_price' => 'decimal:2',
            'is_active' => 'boolean',
            'is_customizable' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class)->orderBy('id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        return asset('storage/'.$this->image);
    }

    /**
     * @return list<string>
     */
    public function getGalleryUrlsAttribute(): array
    {
        $paths = $this->gallery;
        if (! is_array($paths) || $paths === []) {
            return [];
        }

        return array_values(array_filter(array_map(function (mixed $p): ?string {
            if (! is_string($p) || $p === '') {
                return null;
            }

            return asset('storage/'.$p);
        }, $paths)));
    }

    public function isSimple(): bool
    {
        return $this->type === self::TYPE_SIMPLE || $this->type === null;
    }

    public function isVariable(): bool
    {
        return $this->type === self::TYPE_VARIABLE;
    }

    /**
     * Cache min price, optional compare range max, and sum stock on the parent variable product.
     */
    public function refreshVariationAggregates(): void
    {
        if (! $this->isVariable()) {
            return;
        }

        $vars = $this->variations()->get(['price', 'compare_at_price', 'stock_quantity']);
        if ($vars->isEmpty()) {
            $this->forceFill([
                'price' => null,
                'compare_at_price' => null,
                'stock_quantity' => 0,
            ])->save();

            return;
        }

        $minPrice = $vars->min(fn ($v) => (float) $v->price);
        $withCompare = $vars->filter(fn ($v) => $v->compare_at_price !== null);
        $maxCompare = $withCompare->isNotEmpty()
            ? $withCompare->max(fn ($v) => (float) $v->compare_at_price)
            : null;

        $this->forceFill([
            'price' => $minPrice !== null ? number_format((float) $minPrice, 2, '.', '') : null,
            'compare_at_price' => $maxCompare !== null ? number_format((float) $maxCompare, 2, '.', '') : null,
            'stock_quantity' => (int) $vars->sum(fn ($v) => (int) $v->stock_quantity),
        ])->save();
    }
}
