<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CallController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SuperSupervisorController;

Route::group(['prefix' => 'v0.1'], function () {

    //Super Supervisors routes
    Route::group(['prefix' => 'super'], function () {
        Route::group(['middleware' => 'super_supervisor.role'], function () {
            Route::post('/role', [RoleController::class, 'addRole'])->name('add-role');
            Route::post('/supervisors', [SuperSupervisorController::class, 'addSupervisor'])->name('add-supervisor');
            Route::post('/operators', [SuperSupervisorController::class, 'addOperator'])->name('add-operator');
            Route::post('/calls', [CallController::class, 'addCall'])->name('add-call');
            Route::get('/operators', [SuperSupervisorController::class, 'getOperators'])->name('get-operators');
            Route::get('/supervisors', [SuperSupervisorController::class, 'getSupervisors'])->name('get-supervisors');
            Route::get('/calls', [SuperSupervisorController::class, 'getCalls'])->name('get-calls');
            Route::put('/employees', [SuperSupervisorController::class, 'editEmployeeProfile'])->name('edit-employee');
            Route::post('/employees/{id}', [SuperSupervisorController::class, 'deleteEmployee'])->name('delete-employee');
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
