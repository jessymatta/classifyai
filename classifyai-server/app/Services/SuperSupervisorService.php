<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use App\Models\Call;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;

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
            abort(response()->json(['error' => 'No operators found'], 400));
        }

        return $operators;
    }

    /**
     * Get all users with an SUPERVISOR role
     *
     * @return object
     */
    public function handleGetSupervisors()
    {

        $supervisors = User::whereHas('role', function ($query) {
            $query->where('role', 'SUPERVISOR');
        })->where('is_deleted', false)->get();

        if (!$supervisors) {
            abort(response()->json(['error' => 'No supervisors found'], 400));
        }

        return $supervisors;
    }

    /**
     * Get all calls
     *
     * @return object
     */
    public function handleGetCalls()
    {
        $calls = Call::all();
        if (!$calls) {
            abort(response()->json(['error' => 'No calls found'], 400));
        }
        return $calls;
    }

    /**
     * Edit profile of an employee
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return void
     */
    public function handleEditEmployeeProfile(Request $request, int $id)
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
            abort(response()->json(['error' => 'Employee not found'], 400));
        }

        if ($validator->fails()) {
            abort(response()->json($validator->errors()->toJson(), 400));
        }

        $employee->update($request->all());

        if ($request->has('profile_pic_base64')) {
            $image_url = app('App\Http\Controllers\AuthController')->uploadPP($request->profile_pic_base64, $id);
            $employee->profile_pic_url = $image_url;
            $employee->save();
        }
    }

    /**
     * Delete employee from the database
     *
     * @param int $id
     * @return void
     */
    public function handleDeleteEmployee(int $id)
    {
        try {
            $employee = User::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            abort(response()->json(['error' => 'Employee not found'], 400));
        }
        $employee->is_deleted = true;
        $employee->save();
    }
}
