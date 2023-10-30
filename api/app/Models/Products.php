<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Products extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_proveedor',
        'id_clasificacion',
        'id_linea_producto',
        'modelo',
        'material',
        'peso',
        'precio_unitario',
        'stock_unitario',
        'stock_gramos',
        'descripcion'
    ];

    /**
     * 
     */
    public static function getAllProductsInfo()
    {
        return self::all();
    }

    /**
     * 
     */
    public static function registerNewProduct($request)
    {
        return self::create([
            'id_proveedor' => $request->id_proveedor,
            'id_clasificacion' => $request->id_clasificacion,
            'id_linea_producto' => $request->id_linea_producto,
            'modelo' => $request->modelo,
            'material' => $request->material,
            'peso' => $request->peso,
            'precio_unitario' => $request->precio_unitario,
            'stock_unitario' => $request->stock_unitario,
            'stock_gramos' => $request->stock_gramos,
            'descripcion' => $request->descripcion
        ]);
    }

    /**
     * 
     */
    public static function updateProductInfo($request, $id)
    {
        $product = self::find($id);

        $product->id_proveedor = $request->id_proveedor;
        $product->id_clasificacion = $request->id_clasificacion;
        $product->id_linea_producto = $request->id_linea_producto;
        $product->modelo = $request->modelo;
        $product->material = $request->material;
        $product->peso = $request->peso;
        $product->precio_unitario = $request->precio_unitario;
        $product->stock_unitario = $request->stock_unitario;
        $product->stock_gramos = $request->stock_gramos;
        $product->descripcion = $request->descripcion;

        $product->save();
        return $product;
    }
    /**
     * 
     */
    public static function getProductsDetailsInfo($id){
        return self::find($id);
    }

    /**
     * 
     */
    public static function softDeleteProduct($id){
        $product = self::find($id);
        $product->delete();
        return $product;
    }
}
