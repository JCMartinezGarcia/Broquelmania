<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'materiales';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'material'
    ];
    /**
     * returns all materials
     */
    public static function getMaterials()
    {
        return self::orderBy('id', 'desc')
            ->get();
    }
    /**
     * registers new material
     */
    public static function registerMaterial($material)
    {
        return self::create(['material' => $material['material']]);
    }
}
