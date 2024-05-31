<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::get();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => [
                'required',
                //'confirmed', 
                Rules\Password::defaults()
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user);
        // event(new Registered($user));

        // Auth::login($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::getById($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::updateUser($request, $id);
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::deleteUser($id);
        return response()->json($user);
    }

    /**
     * Search for users 
     * @param user
     * @return 
     */
    public function search(string $user)
    {
        //calls model search method 
        $users = User::search($user);
        //returns results
        return response()->json($users);
    }
}
