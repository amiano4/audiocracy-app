<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::middleware('throttle:5,1')->controller(AuthenticationController::class)->group(function () {
    Route::post('sign-up', 'signUp');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(AuthenticationController::class)->group(function () {
        Route::middleware('throttle:10,1')->get('me', 'me');
        Route::get('logout', 'logout');
    });

    Route::get('user', function () {
        $user = Auth::user();
        return response()->json($user);
    });
});
