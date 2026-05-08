<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('is_customizable')->default(false)->after('is_active');
            $table->json('custom_print_area')->nullable()->after('is_customizable');
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->longText('customization_json')->nullable()->after('quantity');
            $table->string('customization_preview_path', 512)->nullable()->after('customization_json');
            $table->char('customization_checksum', 64)->nullable()->after('customization_preview_path')->index();
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->longText('customization_json')->nullable()->after('line_total');
            $table->string('customization_preview_path', 512)->nullable()->after('customization_json');
            $table->json('customization_asset_paths')->nullable()->after('customization_preview_path');
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn([
                'customization_json',
                'customization_preview_path',
                'customization_asset_paths',
            ]);
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropColumn([
                'customization_json',
                'customization_preview_path',
                'customization_checksum',
            ]);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['is_customizable', 'custom_print_area']);
        });
    }
};
