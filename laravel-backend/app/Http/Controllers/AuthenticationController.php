<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\AuthUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function signUp(AuthRequest $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed'
        ]);

        User::create($validated);
        return response()->json(['message' => 'Successfully registered.']);
    }

    public function login(AuthRequest $request)
    {
        try {
            $request->authenticate($request->only(['email', 'password']));

            $token = $request->tokenize();
            $user = Auth::user();

            return response()
                ->json(new AuthUserResource($user))
                ->header('Resource-Token', $token->plainTextToken); // send token to header

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?? 500);
        }
    }

    public function me(AuthRequest $request)
    {
        try {
            $token = $request->tokenize();
            $user = Auth::user();

            return response()
                ->json(new AuthUserResource($user))
                ->header('Resource-Token', $token->plainTextToken); // send token to header

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?? 500);
        }
    }

    public function logout(AuthRequest $request)
    {
        $request->revokeToken();
        return response()->noContent();
    }
}
