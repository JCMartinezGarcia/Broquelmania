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
        Schema::create('credit_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario');
            $table->decimal('monto', $precision = 5, $scale = 2);
            $table->string('estatus', 10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_lines');
    }
};
