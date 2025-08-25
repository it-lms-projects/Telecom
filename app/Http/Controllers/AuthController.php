<?php

namespace App\Http\Controllers;

use Exception;
use Socialite;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\User;

class AuthController extends Controller
{
    /**
     * Sign in the user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signIn(Request $request): JsonResponse
    {
        try {
            // Validate the request
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            // Attempt to log the user in
            if (Auth::attempt($credentials)) {
                return response()->json(
                    data: [
                        'success' => true,
                        'status' => 'success',
                        'message' => 'User successfully logged in',
                        'user' => Auth::user(),
                        'accessToken' => Auth::user()->createToken('auth_token')->plainTextToken,
                    ], 
                    status: 200,
                );
            }

            return response()->json(
                    data: [
                        'success' => false,
                        'status' => 'error',
                        'errors' => ['Adresse e-mail ou mot de passe incorrect'],
                    ], 
                    status: 401,
                );            
        } 
        catch (Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json(
                data:[
                    'success' => false,
                    'status' => 'error',
                    'message' => 'An error occurred during login',
                    'raw_message' => $e->getMessage(),
                    'errors' => ['An error occurred during login'],
                ], 
                status: 500,
            );
        }
    }

    /**
     * Sign out the user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signOut(): JsonResponse
    {
        Auth::logout();
        // Optionally, you can invalidate the session and regenerate the token
        // This is useful if you are using session-based authentication, which is not the case here
        //1. Invalidate the session
        //request()->session()->invalidate();
        // Regenerate the session token
        //2. request()->session()->regenerateToken();
        // Return a success response
        return response()->json(data: ['message' => 'Logout successful'], status: 200);
    }

    /**
     * Sign up a new user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signUp(Request $request): JsonResponse
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['message' => 'User created successfully'], 200);
    }

    /**
     * Redirect the user to the Microsoft authentication page.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToMicrosoft() {
        return Socialite::driver('microsoft')->redirect();
    }

    /**
     * Obtain the user information from Microsoft.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleMicrosoftCallback(): JsonResponse {
        try {
            $user = Socialite::driver('microsoft')->user();
            // Handle the user data as needed
            return response()->json($user);
        } 
        catch (Exception $e) {
            return response()->json(
                data: ['error' => 'Unable to login with Microsoft'], 
                status:500,
            );
        }
    }
}
