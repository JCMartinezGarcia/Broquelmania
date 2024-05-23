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
        //set img url to validated data 
        $validated['image'] = $imageUrl;
        //call register method
        $product = Products::register($validated);
        //return registered product
        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Products::getProductDetails($id);
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //validate incoming request data 
        $validated = $request->validate([
            'proveedor' => 'required|string',
            'clasificacion' => 'required|string',
            'linea' => 'required|string',
            'modelo' => 'required|string',
            'peso' => 'required|numeric',
            'precio' => 'required|numeric',
            'stock' => 'required|numeric',
            'descripcion' => 'required|string',
            'imagen' => 'required|string',
            'material' => 'required|string',
        ]);
        //call edit function 
        $p = Products::edit($request, $id);
        //returns json response
        return response()->json($p);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //call to delete function
        $p = Products::remove($id);
        //returns deleted product
        return response()->json($p);
    }
    /**
     * gets the product to be updated
     */
    public function showEdit(string $id)
    {
        $product = Products::getProductEdit($id);
        return response()->json($product);
    }

    /**
     * uploads product images to cloudinary
     * @param request
     */
    public function fileUpload(Request $request)
    {
        //validate incoming request data 
        $validated = $request->validate([
            'model' => 'required|string',
            'file' => 'required',
        ]);
        //get file from request
        $image = $request->file('file');
        // Upload image to Cloudinary
        $uploadResult = Cloudinary::upload(
            $image[0]->getPathname(),
            [
                'public_id' => $validated['model'],
                'folder' => 'broquelmania/clients/broquelmania/products',
                //'use_filename' => TRUE,
                'overwrite' => TRUE
            ]
        );
        // Get the URL of the uploaded image
        $imageUrl = $uploadResult->getSecurePath();
        return response()->json($imageUrl);
    }
}
