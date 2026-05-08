<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('type', 20)->default('simple')->after('category_id');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('sku')->nullable()->change();
            $table->decimal('price', 10, 2)->nullable()->change();
        });

        Schema::create('product_variations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2);
            $table->decimal('compare_at_price', 10, 2)->nullable();
            $table->unsignedInteger('stock_quantity')->default(0);
            $table->json('attributes');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->foreignId('product_variation_id')->nullable()->after('product_id')->constrained('product_variations')->nullOnDelete();
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->foreignId('product_variation_id')->nullable()->after('product_id')->constrained('product_variations')->nullOnDelete();
            $table->json('variation_attributes')->nullable()->after('product_sku');
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['product_variation_id']);
            $table->dropColumn(['product_variation_id', 'variation_attributes']);
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropForeign(['product_variation_id']);
            $table->dropColumn('product_variation_id');
        });

        Schema::dropIfExists('product_variations');

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('type');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('sku')->nullable(false)->change();
            $table->decimal('price', 10, 2)->nullable(false)->change();
        });
    }
};
