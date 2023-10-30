<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductClasification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'clasificacion_producto',
    ];

    /**
     * 
     */
    public static function getAllProductsClassifications(){
        return self::all();
    }

    /**
     * 
     */
    public static function registerNewProductClassification($request)
    {
        return self::create(['clasificacion_producto' => $request->clasificacion_producto]);
    }

    /**
     * 
     */

    public static function updateProductClassificationInfo($request, $id)
    {
        $classification = self::find($id);
        $classification->clasificacion_producto = $request->clasificacion_producto;
        $classification->save();
        return $classification;
    }
    /**
     * 
     */
    public static function getProductClassificationDetailsInfo($id)
    {
        return self::find($id);
    }

    /**
     * 
     */
    public static function softDeleteProductClassification($id){
        $classification = self::find($id);
        $classification->delete();
        return $classification;
    }
}
