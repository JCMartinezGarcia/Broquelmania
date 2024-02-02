<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductLine extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'linea_producto',
    ];

    /**
     * 
     */
    public static function getAllProductsLinesInfo()
    {
        return self::orderBy('id', 'desc')
            ->get();
    }
    public static function getLine($id)
    {
        return self::find($id);
    }
    /**
     * 
     */
    public static function registerNewProductLine($request)
    {
        return self::create(['linea_producto' => $request->linea_producto]);
    }

    /**
     * 
     */
    public static function updateProductLineInfo($request, $id)
    {
        $line = self::find($id);
        $line->linea_producto = $request->linea_producto;
        $line->save();
        return $line;
    }

    /**
     * 
     */
    public static function deleteProductsLine($id)
    {
        $line = self::find($id);
        $line->delete();
        return $line;
    }

    public static function searchLines($search)
    {
        $contains = '%' . $search . '%';
        $lines = self::where('linea_producto', 'like', $contains)
            ->orderBy('id', 'desc')
            ->get();
        return $lines;
    }
}
