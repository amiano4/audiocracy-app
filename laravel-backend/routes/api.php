<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('throttle:5,1')->controller(AuthenticationController::class)->group(function () {
    Route::post('sign-up', 'signUp');
});
