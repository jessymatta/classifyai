<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use App\Models\Call;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;

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
        })->where('is_deleted', false)->get();

        if (!$operators) {
            return response()->json(['error' => 'No operators found'], 400);
        }

        return response()->json($operators, 200);
    }

    public function getSupervisors()
    {
        $supervisors = User::whereHas('role', function ($query) {
            $query->where('role', 'SUPERVISOR');
        })->where('is_deleted', false)->get();

        if (!$supervisors) {
            return response()->json(['error' => 'No supervisors found'], 400);
        }

        return response()->json($supervisors, 200);
    }

    public function getCalls()
    {
        $calls = Call::all();
        if (!$calls) {
            return response()->json(['error' => 'No calls found'], 400);
        }
        return response()->json($calls, 200);
    }

    public function editEmployeeProfile(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'string|min:2',
            'last_name' => 'string|min:2',
            'email' => 'email|unique:users,email',
            'username' => 'string|unique:users,username',
            'dob' => 'string',
            'profile_pic_base64' => 'string',
        ]);

        try {
            $employee = User::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Employee not found'], 400);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $employee->update($request->all());

        if ($request->has('profile_pic_base64')) {
            $image_url = app('App\Http\Controllers\AuthController')->uploadPP($request->profile_pic_base64, $id);
            $employee->profile_pic_url = $image_url;
            $employee->save();
        }


        return response()->json(['message' => 'Employee profile updated successfully'], 200);
    }

    public function deleteEmployee(int $id)
    {
        try {
            $employee = User::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Employee not found'], 400);
        }

        $employee->is_deleted = true;
        $employee->save();
        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
