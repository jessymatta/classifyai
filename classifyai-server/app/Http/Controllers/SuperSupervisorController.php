<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class SuperSupervisorController extends Controller
{
    public function addSupervisor(Request $request)
    {
        $role_id_obj = Role::select('id')->where('role', 'SUPERVISOR')->first();
        if (!$role_id_obj) {
            return response()->json(['error' => 'Not a valid role'], 400);
        }
        $role_id = json_decode($role_id_obj)->id;
        $res = app('App\Http\Controllers\AuthController')->register($request, $role_id);
        return $res;
    }

    public function addOperator(Request $request)
    {
        $role_id_obj = Role::select('id')->where('role', 'OPERATOR')->first();
        if (!$role_id_obj) {
            return response()->json(['error' => 'Not a valid role'], 400);
        }
        $role_id = json_decode($role_id_obj)->id;
        $res = app('App\Http\Controllers\AuthController')->register($request, $role_id);
        return $res;
    }
}
