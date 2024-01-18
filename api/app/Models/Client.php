<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use function Laravel\Prompts\search;

class Client extends Model
{
    use HasFactory, SoftDeletes;
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'tipo_cliente' => 'Público',
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
     * validate that email are the same
     * 
     */
    private static function validateMatchingEmails($firstEmail, $secondEmail)
    {
        return $firstEmail === $secondEmail;
    }

    /**
     * get all client registers
     */

    public static function getAllClients()
    {
        return self::orderBy('id', 'desc')
            ->get();
    }
    /**
     * register a new client on database
     */
    public static function registerNewClient($request)
    {
        return self::create([
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'dirección' => $request->dirección,
            'telefono_movil' => $request->telefono_movil,
            'tipo_cliente' => ($request->tipo_cliente) ? "Mayorista" : "Público",
        ]);
    }
    /**
     * updates a client register
     */
    public static function updateClientInfo($request, $id)
    {
        $client = self::find($id);

        $client->nombres = $request->nombres;
        $client->apellidos = $request->apellidos;
        (!self::validateMatchingEmails($client->email, $request->email)) ? $client->email = $request->email : null;
        $client->dirección = $request->dirección;
        $client->telefono_movil = $request->telefono_movil;
        $client->tipo_cliente = ($request->tipo_cliente) ? 'Mayorista' : 'Público';

        $client->save();
        return $client;
    }

    /**
     * retrieves a clients by id
     * 
     */
    public static function getClientById($id)
    {
        return self::find($id);
    }
    /**
     * softs delete a client from database
     */

    public static function softDeleteClient($id)
    {
        $client = self::find($id);
        $client->delete();
        return $client;
    }
    /**
     * retrieves all clients tha matches the search string parameter
     */
    public static function searchClients($search)
    {
        $starts = $search . '%';
        $contains = '%' . $search . '%';
        $clients = self::where('nombres', 'like', $contains)
            ->orWhere('apellidos', 'like', $contains)
            ->orderBy('id', 'desc')
            ->get();
        return $clients;
    }
}
