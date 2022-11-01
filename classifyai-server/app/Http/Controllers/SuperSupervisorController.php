<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use App\Models\Call;

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

    public function getOperators()
    {
        $operators = User::whereHas('role', function ($query) {
            $query->where('role', 'OPERATOR');
        })->get();

        if (!$operators) {
            return response()->json(['error' => 'No operators found'], 400);
        }

        return response()->json($operators, 200);
    }

    public function getSupervisors()
    {
        $supervisors = User::whereHas('role', function ($query) {
            $query->where('role', 'SUPERVISOR');
        })->get();

        if (!$supervisors) {
            return response()->json(['error' => 'No supervisors found'], 400);
        }

        return response()->json($supervisors, 200);
    }

    public function getCalls(){
        $calls = Call::all();
        if(!$calls){
            return response()->json(['error' => 'No calls found'], 400);
        }
        return response()->json($calls, 200);
    }
}
