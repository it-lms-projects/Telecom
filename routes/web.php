<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReportController;

//GET API Requests
Route::get('/', [HomeController::class, 'index']);
Route::get('/report', [ReportController::class, 'getWorkJobReport']);
// Microsoft login EndPoint
Route::get('auth/microsoft', [AuthController::class, 'redirectToMicrosoft'])->name('microsoft.login');
Route::get('auth/microsoft/callback', [AuthController::class, 'handleMicrosoftCallback']);
// Add a catch-all to serve the React application whatever the route
Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');