<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Products extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'image',
        'id_proveedor',
        'id_clasificacion',
        'id_linea_producto',
        'id_material',
        'modelo',
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
        return DB::table('products as pd')
            ->join('suppliers as sp', 'pd.id_proveedor', '=', 'sp.id')
            ->join('product_clasifications as cls', 'pd.id_clasificacion', '=', 'cls.id')
            ->join('product_lines as pl', 'pd.id_linea_producto', '=', 'pl.id')
            ->join('materiales as mt', 'pd.id_material', '=', 'mt.id')
            ->select(
                'pd.id',
                'pd.image as imagen',
                'pd.modelo',
                'pd.peso',
                'pd.precio_unitario as precio',
                'pd.stock_unitario as stock',
                'pd.stock_gramos as gramos',
                'pd.descripcion',
                'sp.compañia as proveedor',
                'cls.clasificacion_producto as clasificacion',
                'pl.linea_producto as linea',
                'mt.material'
            )
            ->where('pd.deleted_at',  null)
            ->orderBy('pd.id', 'desc')
            ->get();
    }

    /**
     * 
     */
    public static function registerNewProduct($product)
    {
        //calulate gr to insert 
        $stockGr = $product['peso'] * $product['stock_unitario'];
        //insert into db
        return self::create([
            'image' => $product['image'],
            'id_proveedor' => $product['proveedor'],
            'id_clasificacion' => $product['clasificacion'],
            'id_linea_producto' => $product['linea'],
            'id_material' => $product['material'],
            'modelo' => $product['modelo'],
            'peso' => $product['peso'],
            'precio_unitario' => $product['precio'],
            'stock_unitario' => $product['stock_unitario'],
            'stock_gramos' => $stockGr,
            'descripcion' => $product['descripcion']
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
    public static function getProductsDetailsInfo($id)
    {
        return self::find($id);
    }

    /**
     * 
     */
    public static function softDeleteProduct($id)
    {
        $product = self::find($id);
        $product->delete();
        return $product;
    }
}
