<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Products::getAllProductsInfo();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate incoming request data 
        $validated = $request->validate([
            'id_proveedor' => 'required|integer|numeric',
            'id_clasificacion' => 'required|integer|numeric',
            'id_linea_producto' => 'required|integer|numeric',
            'modelo' => 'required|string',
            'peso' => 'required|numeric',
            'precio_unitario' => 'required|numeric',
            'stock_unitario' => 'required|numeric',
            'stock_gramos' => 'required|numeric',
            'descripcion' => 'required|string',
            'imagen' => 'required|string',
            'id_material' => 'required|integer|numeric',
        ]);
        //call register method
        $product = Products::registerNewProduct($validated);
        //return registered product
        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Products::getProductsDetailsInfo($id);
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Products::updateProductInfo($request, $id);
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Products::softDeleteProduct($id);
        return response()->json($product);
    }
}
