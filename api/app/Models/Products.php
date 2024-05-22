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
    public static function register($product)
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
     * Edits product info
     * @param request
     * @param id
     * returns
     */
    public static function edit($product, $id)
    {
        //values to be evaluated
        $l = $product['linea'];
        $m = $product['material'];
        $s = $product['proveedor'];
        $c = $product['clasificacion'];
        //validate if the values are numeric
        if (!is_numeric($l)) {
            # if is not numeric, find the id value...
            $lId = DB::table('product_lines')
                ->select('id')
                ->where('linea_producto', $l)
                ->get();
            #replace with id value
            $product['linea'] = $lId[0]->id;
        }
        if (!is_numeric($m)) {
            # if is not numeric, find the id value...
            $mId = DB::table('materiales')
                ->select('id')
                ->where('material', $m)
                ->get();
            #replace with id value
            $product['material'] = $mId[0]->id;
        }
        if (!is_numeric($s)) {
            # if is not numeric, find the id value...
            $sId = DB::table('suppliers')
                ->select('id')
                ->where('compañia', $s)
                ->get();
            #replace with id value
            $product['proveedor'] = $sId[0]->id;
        }
        if (!is_numeric($c)) {
            # if is not numeric, find the id value...
            $cId = DB::table('product_clasifications')
                ->select('id')
                ->where('clasificacion_producto', $c)
                ->get();
            #replace with id value
            $product['clasificacion'] = $cId[0]->id;
        }
        //find product to be updated
        $p = self::find($id);
        //update values
        $p->id_proveedor = $product['proveedor'];
        $p->id_clasificacion = $product['clasificacion'];
        $p->id_linea_producto = $product['linea'];
        $p->id_material = $product['material'];
        $p->image = $product['imagen'];
        $p->modelo = $product['modelo'];
        $p->peso = $product['peso'];
        $p->precio_unitario = $product['precio'];
        $p->stock_unitario = $product['stock'];
        $p->stock_gramos = $product['gramos'];
        $p->descripcion = $product['descripcion'];
        //save changes
        $p->save();
        //return product
        return $p;
    }
    /**
     * gets a product by id
     */
    public static function getProductDetails($id)
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
            ->where('pd.id',  $id)
            ->get();
    }
    /**
     * gets the product to be updated info
     */
    public static function getProductEdit($id)
    {
        return DB::table('products as pd')
            ->select(
                'pd.id',
                'pd.image as imagen',
                'pd.modelo',
                'pd.peso',
                'pd.precio_unitario as precio',
                'pd.stock_unitario as stock',
                'pd.stock_gramos as gramos',
                'pd.descripcion',
                'pd.id_clasificacion as clasificacion',
                'pd.id_linea_producto as linea',
                'pd.id_material as material',
                'pd.id_proveedor as proveedor'
            )
            ->where('id', $id)
            ->get();
    }

    /**
     * Softs delete a product
     * @param id
     * @return
     */
    public static function remove($id)
    {
        //finds product to be deleted
        $p = self::find($id);
        //delete product
        $p->delete();
        //returns deleted product
        return $p;
    }
}
