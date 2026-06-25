<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_order_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('submission_number')->unique();
            $table->string('name');
            $table->string('email');
            $table->string('phone', 50);
            $table->date('order_date')->nullable();
            $table->text('design_notes')->nullable();
            $table->json('order_items');
            $table->json('artwork_files')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_order_submissions');
    }
};
