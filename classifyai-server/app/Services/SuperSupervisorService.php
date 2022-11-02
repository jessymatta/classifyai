<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Role;

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
}
