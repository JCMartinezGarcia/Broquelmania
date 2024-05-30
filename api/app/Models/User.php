<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
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
     * 
     */
    public static function getById($id)
    {
        return self::find($id);
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
     * 
     */

    public static function deleteUser($id)
    {
        $user = self::find($id);
        $user->delete();
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
