<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_option_id')->nullable()->constrained('product_options')->onDelete('set null');
            $table->string('name');
            $table->string('phone_number');
            $table->string('address')->nullable();
            $table->integer('quantity')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed','cancelled'])->default('pending');
            $table->boolean('is_consulted')->default(false);
            $table->timestamp('consulted_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
