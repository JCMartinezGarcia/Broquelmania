<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Auth\Events\Validated;

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
            'proveedor' => 'required|integer|numeric',
            'clasificacion' => 'required|integer|numeric',
            'linea' => 'required|integer|numeric',
            'modelo' => 'required|string',
            'peso' => 'required|numeric',
            'precio' => 'required|numeric',
            'stock_unitario' => 'required|numeric',
            'descripcion' => 'required|string',
            'image' => 'required',
            'material' => 'required|integer|numeric',
        ]);
        //upload image to cloudinary
        $image = $request->file('image');
        // Upload image to Cloudinary
        $uploadResult = Cloudinary::upload(
            $image[0]->getPathname(),
            [
                'public_id' => $validated['modelo'],
                'folder' => 'broquelmania/clients/broquelmania/products',
                //'use_filename' => TRUE,
                'overwrite' => TRUE
            ]
        );
        // Get the URL of the uploaded image
        $imageUrl = $uploadResult->getSecurePath();        
        //call register method
        $validated['image'] = $imageUrl;
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
