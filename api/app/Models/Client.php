<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'tipo_cliente' => 'regular',
    ];
}
