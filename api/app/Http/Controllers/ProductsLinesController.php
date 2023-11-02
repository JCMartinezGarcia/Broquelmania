<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductLine;

class ProductsLinesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lines = ProductLine::getAllProductsLinesInfo();
        return response()->json($lines);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $line = ProductLine::registerNewProductLine($request);
        return response()->json($line);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $line = ProductLine::updateProductLineInfo($request, $id);
        return response()->json($line);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $line = ProductLine::deleteProductsLine($id);
        return response()->json($line);
    }
}
