<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * One-time: turn customization on so the storefront shows "Customize product"
     * unless you disable it per product in Admin.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('products', 'is_customizable')) {
            return;
        }

        DB::table('products')->update(['is_customizable' => true]);
    }

    public function down(): void
    {
        if (! Schema::hasColumn('products', 'is_customizable')) {
            return;
        }

        DB::table('products')->update(['is_customizable' => false]);
    }
};
