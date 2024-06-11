<?php

namespace App\Http\Controllers;

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
        //validate incoming data
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => [
                'required',
                //'confirmed', 
                Rules\Password::defaults()
            ],
        ]);
        //call model method register user
        $usr = User::register($validated);
        //return registered user
        return response()->json($usr);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //call model method 
        $user = User::getById($id);
        //returns the result
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
     * @param id
     * @return 
     */
    public function destroy(string $id)
    {
        //calls model function 
        $user = User::remove($id);
        //returns deleted user
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
