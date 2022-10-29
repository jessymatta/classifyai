<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;

Route::group(['prefix' => 'v0.1'], function () {

    //Super Supervisors routes
    Route::group(['prefix' => 'super'], function () {
        Route::group(['middleware' => 'super_supervisor.role'], function () {
            Route::post('/role', [RoleController::class, 'addRole'])->name('add-role');
        });
    });

    //Supervisors routes
    Route::group(['prefix' => 'supervisor'], function () {
        Route::group(['middleware' => 'supervisor.role'], function () {
        });
    });

    //Operators routes
    Route::group(['prefix' => 'operator'], function () {
        Route::group(['middleware' => 'operator.role'], function () {
        });
    });

    Route::post('/login', [AuthController::class, 'login'])->name('login');
});
