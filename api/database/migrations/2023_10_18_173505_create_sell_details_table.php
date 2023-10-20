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
        Schema::create('sell_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_producto');
            $table->foreignId('id_venta');
            $table->integer('cantidad_producto_unitario')->nullable();
            $table->decimal('cantidad_producto_gramo', $presicion = 4, $scale = 2)->nullable();
            $table->decimal('precio', $presicion = 5, $scale = 2);
            $table->decimal('total', $presicion = 5, $scale = 2);
            $table->decimal('total_iva', $presicion = 5, $scale = 2);
            $table->decimal('total_monto', $presicion = 5, $scale = 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sell_details');
    }
};
