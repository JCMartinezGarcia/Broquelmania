<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Utils\ModelsUtils;

class Suppliers extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombres',
        'apellidos',
        'compañia',
        'email',
        'telefono_contacto',
        'direccion',
    ];

    /**
     * Add an element to an array using "dot" notation if it doesn't exist.
     *
     * @param  array  $array
     * @param  string|int|float  $key
     * @param  mixed  $value
     * @return array
     */

    /**
     * get a supplier by id
     * @param id
     */
    public static function getSupplierInfo($id)
    {
        return self::find($id);
    }
    /**
     * get all suppliers 
     */
    public static function getAllSuppliersInfo()
    {
        return self::orderBy('id', 'desc')
            ->get();
    }
    /**
     * registers a new supplier
     * @param request
     * @return 
     */
    public static function registerNewSupplier($request)
    {
        return self::create([
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'compañia' => $request->compañia,
            'email' => $request->email,
            'telefono_contacto' => $request->telefono_contacto,
            'direccion' => $request->direccion,
        ]);
    }
    /**
     * updates supplier info
     * @param request
     * @param id
     */
    public static function updateSupplierInfo($request, $id)
    {
        $supplier = self::find($id);

        $supplier->nombres = $request->nombres;
        $supplier->apellidos = $request->apellidos;
        $supplier->compañia = $request->compañia;
        (!ModelsUtils::validateMatchingEmails($supplier->email, $request->email)) ? $supplier->email = $request->email : null;
        $supplier->telefono_contacto = $request->telefono_contacto;
        $supplier->direccion = $request->direccion;

        $supplier->save();
        return $supplier;
    }
    /**
     * soft deletes a supplier by id
     * @param id
     * @return supplier
     */
    public static function softDeleteSupplier($id)
    {
        $supplier = self::find($id);
        $supplier->delete();
        return $supplier;
    }
    /**
     * search for suppliers matching the param 
     * @param search
     * @return suppliers
     */
    public static function searchSuppliers($search)
    {
        $contains = '%' . $search . '%';
        $suppliers = self::where('nombres', 'like', $contains)
            ->orWhere('apellidos', 'like', $contains)
            ->orWhere('compañia', 'like', $contains)
            ->orderBy('id', 'desc')
            ->get();
        return $suppliers;
    }
}
