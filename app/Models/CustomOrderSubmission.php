<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomOrderSubmission extends Model
{
    protected $fillable = [
        'submission_number',
        'name',
        'email',
        'phone',
        'order_date',
        'design_notes',
        'order_items',
        'artwork_files',
        'is_read',
    ];

    protected function casts(): array
    {
        return [
            'order_date' => 'date',
            'order_items' => 'array',
            'artwork_files' => 'array',
            'is_read' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'submission_number';
    }

    public function categoriesSummary(): string
    {
        $categories = collect($this->order_items ?? [])
            ->pluck('category')
            ->filter()
            ->unique()
            ->values();

        return $categories->isEmpty() ? '—' : $categories->join(', ');
    }
}
