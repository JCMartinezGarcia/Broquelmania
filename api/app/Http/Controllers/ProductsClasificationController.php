<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductClasification;

class ProductsClasificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classifications = ProductClasification::getAllProductsClassifications();
        return response()->json($classifications);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $classification = ProductClasification::registerNewProductClassification($request);
        return response()->json($classification);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $classification = ProductClasification::getProductClassificationDetailsInfo($id);
        return response()->json($classification);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $classification = ProductClasification::updateProductClassificationInfo($request, $id);
        return response()->json($classification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $classification = ProductClasification::softDeleteProductClassification($id);
        return response()->json($classification);
    }
}
