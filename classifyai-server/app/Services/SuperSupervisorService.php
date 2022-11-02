<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;

class SuperSupervisorService
{
    /**
     * Add a user to the 'users' database table with a SUPERVISOR role
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleAddSupervisor(Request $request)
    {
        $role_id_obj = Role::select('id')->where('role', 'SUPERVISOR')->first();
        if (!$role_id_obj) {
            return response()->json(['error' => 'Not a valid role'], 400);
        }
        $role_id = json_decode($role_id_obj)->id;
        $res = app('App\Http\Controllers\AuthController')->register($request, $role_id);
        return $res;
    }

    /**
     * Add a user to the 'users' database table with a OPERATOR role
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleAddOperator(Request $request)
    {
        $role_id_obj = Role::select('id')->where('role', 'OPERATOR')->first();
        if (!$role_id_obj) {
            return response()->json(['error' => 'Not a valid role'], 400);
        }
        $role_id = json_decode($role_id_obj)->id;
        $res = app('App\Http\Controllers\AuthController')->register($request, $role_id);
        return $res;
    }

    /**
     * Get all users with an OPERATOR role
     *
     * @return object
     */
    public function handleGetOperators()
    {
        $operators = User::whereHas('role', function ($query) {
            $query->where('role', 'OPERATOR');
        })->where('is_deleted', false)->get();

        if (!$operators) {
            // return response()->json(['error' => 'No operators found'], 400);
            abort(response()->json(['error' => 'No operators found'], 400));
        }
        print(gettype($operators));
        return $operators;
    }
}
