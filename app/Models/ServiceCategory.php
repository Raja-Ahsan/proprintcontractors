<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function packages(): HasMany
    {
        return $this->hasMany(ServicePackage::class)->orderBy('sort_order')->orderBy('name');
    }

    public function activePackages(): HasMany
    {
        return $this->packages()->where('is_active', true);
    }
}
