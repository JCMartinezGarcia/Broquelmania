<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'tipo_cliente' => 'regular',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombres',
        'apellidos',
        'email',
        'dirección',
        'telefono_movil',
        'tipo_cliente'
    ];
    /**
     * 
     * 
     */
    private static function validateMatchingEmails($firstEmail, $secondEmail)
    {
        return $firstEmail === $secondEmail;
    }

    /**
     * 
     */

    public static function getAllClients()
    {
        return self::all();
    }
    /**
     * 
     */
    public static function registerNewClient($request)
    {
        return self::create([
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'dirección' => $request->dirección,
            'telefono_movil' => $request->telefono_movil,
            'tipo_cliente' => $request->tipo_cliente,
        ]);
    }
    /**
     * 
     */
    public static function updateClientInfo($request, $id)
    {
        $client = self::find($id);

        $client->nombres = $request->nombres;
        $client->apellidos = $request->apellidos;
        (!self::validateMatchingEmails($client->email, $request->email)) ? $client->email = $request->email : null;
        $client->dirección = $request->dirección;
        $client->telefono_movil = $request->telefono_movil;
        $client->tipo_cliente = $request->tipo_cliente;

        $client->save();
        return $client;
    }

    /**
     * 
     * 
     */
    public static function getClientById($id)
    {
        return self::find($id);
    }
    /**
     * 
     */

    public static function softDeleteClient($id){
        $client = self::find($id);
        $client->delete();
        return $client;
    }
}

