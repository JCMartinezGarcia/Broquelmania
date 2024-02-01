<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Suppliers;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Suppliers::getAllSuppliersInfo();
        return response()->json($suppliers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $supplier = Suppliers::registerNewSupplier($request);
        return response()->json($supplier);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $supplier = Suppliers::getSupplierInfo($id);
        return response()->json($supplier);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $supplier = Suppliers::updateSupplierInfo($request, $id);
        return response()->json($supplier);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Suppliers::softDeleteSupplier($id);
        return response()->json($supplier);
    }
    /**
     * 
     */
    public function search(string $searchParam)
    {
        $suppliers = Suppliers::searchSuppliers($searchParam);
        return response()->json($suppliers);
    }
}
