<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductsClasificationController;
use App\Http\Controllers\ProductsLinesController;
use App\Http\Controllers\MaterialsController;
//use App\Models\Suppliers;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


//routes
Route::post('/user', [RegisteredUserController::class, 'store']);
Route::get('/clients/search/{search}', [ClientsController::class, 'search']);
Route::get('/suppliers/search/{search}', [SuppliersController::class, 'search']);
Route::get('/products-lines/search/{search}', [ProductsLinesController::class, 'search']);
Route::post('/products/fileupload', [ProductsController::class, 'fileUpload']);
Route::get('/products/edit/{id}', [ProductsController::class, 'showEdit']);
// api routes, creates api routes for methods index, store, show, update, delete
Route::apiResources([
    'users' => UserController::class,
    'clients' => ClientsController::class,
    'suppliers' => SuppliersController::class,
    'products' => ProductsController::class,
    'products-classification' => ProductsClasificationController::class,
    'products-lines' => ProductsLinesController::class,
    'materials' => MaterialsController::class,
]);
