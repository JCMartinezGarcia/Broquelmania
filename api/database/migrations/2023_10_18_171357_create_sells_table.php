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
        Schema::create('sells', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_cliente');
            $table->foreignId('id_usuario');
            $table->foreignId('id_linea_producto');
            $table->decimal('monto', $precision = 6, $scale = 2);
            $table->decimal('monto_iva', $precision = 6, $scale = 2);
            $table->decimal('monto_total', $precision = 6, $scale = 2);
            $table->string('estatus',10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sells');
    }
};
