<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserAuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create token for the user
        $token = $user->createToken('MyApp')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully!',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    // Login User
    public function login(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6', // Add min length for password security
        ]);

        // Check for validation errors
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        // Attempt to authenticate user
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Fetch the authenticated user
            
            $user = Auth::user();
            Auth::login($user);
            // Create token for the user
            $token = $user->createToken('MyApp')->plainTextToken;

            // Return response with token and user data
            return response()->json([
                'message' => 'User Login successful!',
                'user' => $user,
                'token' => $token,
            ], 200);
        }

        // If authentication fails
        return response()->json([
            'message' => 'Invalid credentials!',
        ], 401);
    }

    // Logout User
    public function logout(Request $request)
    {
        // Revoke all tokens for the user
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json([
            'message' => 'Logged out successfully!',
        ], 200);
    }
}
