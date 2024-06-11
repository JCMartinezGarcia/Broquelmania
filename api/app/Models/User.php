<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;


class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * 
     */

    public static function get()
    {
        return self::all();
    }

    /**
     * Gets an user info by id
     * @param id
     * @return
     */
    public static function getById($id)
    {
        //returns user found
        return self::find($id);
    }
    /**
     * Registers new user 
     * @param user
     * @return 
     */
    public static function register($user)
    {
        $newUser = self::create([
            'name' => $user['name'],
            'email' => $user['email'],
            'password' => Hash::make($user['password']),
        ]);

        event(new Registered($newUser));

        // Auth::login($user);
    }
    /**
     * 
     */

    public static function updateUser($request, $id)
    {
        $user = self::find($id);
        $user->name = $request->name;
        $user->save();
        return $user;
    }

    /**
     * Deletes an user
     * @param id
     * @return 
     */
    public static function remove($id)
    {
        //find user by id
        $user = self::find($id);
        //deletes user
        $user->forceDelete();
        //returns deleted user
        return $user;
    }

    /**
     * Search for users 
     * @param user
     * @return 
     */
    public static function search($user)
    {
        //condition to search users
        $condition = '%' . $user . '%';
        //Query DB
        $users = self::where('name', 'like', $condition)
            ->orWhere('email', 'like', $condition)
            ->orderBy('id', 'desc')
            ->get();
        //return results
        return $users;
    }
}
