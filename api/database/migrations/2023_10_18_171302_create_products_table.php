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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_proveedor');
            $table->foreignId('id_clasificacion');
            $table->foreignId('id_linea_producto');
            $table->string('modelo', 20)->unique();
            $table->string('material', 10);
            $table->decimal('peso', $precision = 3, $scale = 2)->nullable();
            $table->decimal('precio_unitario',$precision = 6, $scale = 2);
            $table->integer('stock_unitario')->nullable();
            $table->decimal('stock_gramos', $precision = 6, $scale = 2)->nullable();
            $table->text('descripcion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
