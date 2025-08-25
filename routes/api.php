<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobsController;

// 1. Auth
Route::post('/login', [AuthController::class, 'signIn'])->name('signin');
Route::post('/signup', [AuthController::class, 'signUp'])->name('signup');
Route::post('/logout', [AuthController::class, 'signOut'])->name('signout');
// 2. Jobs
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('jobs')->controller(JobsController::class)->group(function(){
        Route::post('/create', 'addOrUpdate');
        Route::post('/update', 'addOrUpdate');
        Route::post('/copy', 'duplicateJob');
        Route::post('/delete', 'deleteJob');
        Route::post('/complete', 'completeJob');
        Route::post('/cancel', 'cancelJob');
        Route::post('/reset', 'resetJob');
        Route::post('/ongoing', 'getOngoingJobs');
        Route::post('/completed', 'getCompletedJobs');
        Route::post('/sequence', 'getNextJobSequence');
        Route::post('/daily', 'getJobs');
        Route::post('/details', 'getJobDetails');
    });    

    Route::post('/drivers/all', [JobsController::class, 'getAllDrivers']);
    Route::post('/trucks/all', [JobsController::class, 'getAllTrucks']);
});

