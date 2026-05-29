<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->decimal('price', 10, 2);
            $table->boolean('popular')->default(false);
            $table->json('features')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('service_package_id')->nullable()->constrained()->nullOnDelete();
            $table->string('category_name');
            $table->string('service_name');
            $table->decimal('service_price', 10, 2);
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->text('notes')->nullable();
            $table->string('status')->default('awaiting_payment');
            $table->string('payment_status')->default('unpaid');
            $table->decimal('total', 10, 2);
            $table->string('stripe_checkout_session_id')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('placed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_bookings');
        Schema::dropIfExists('service_packages');
        Schema::dropIfExists('service_categories');
    }
};
