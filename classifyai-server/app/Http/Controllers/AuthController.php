<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;


class AuthController extends Controller
{

    /**
     * Register new users
     *
     * @param \Illuminate\Http\Request $request
     * @param int $user_role_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request, $user_role_id)
    {
        $authService = new AuthService();
        $role_to_find = $authService->handleRegister($request, $user_role_id);
        return response()->json([
            'message' => 'User successfully registered',
            'status' => "success",
            'user' => $role_to_find
        ], 201);
    }

    /**
     * Login and get a JWT via given credentials.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $authService = new AuthService();
        $token = $authService->handleLogin($request);
        return $token;
    }
}
