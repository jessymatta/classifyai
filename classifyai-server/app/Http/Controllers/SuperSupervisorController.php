<?php

namespace App\Http\Controllers;

use App\Services\SuperSupervisorService;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use App\Models\Call;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;

class SuperSupervisorController extends Controller
{
    /**
     * Add a user to the 'users' database table with a SUPERVISOR role
     *
     * @param \Illuminate\Http\Request $request
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function addSupervisor(Request $request, SuperSupervisorService $superSupervisorService)
    {
        $res = $superSupervisorService->handleAddSupervisor($request);
        return $res;
    }

    /**
     * Add a user to the 'users' database table with a OPERATOR role
     *
     * @param \Illuminate\Http\Request $request
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function addOperator(Request $request, SuperSupervisorService $superSupervisorService)
    {
        $res = $superSupervisorService->handleAddOperator($request);
        return $res;
    }

    /**
     * Get all users with an OPERATOR role
     *
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOperators(SuperSupervisorService $superSupervisorService)
    {
        $operators = $superSupervisorService->handleGetOperators();
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

    public function getEmployeeProfile(int $id)
    {
        try {
            $employee = User::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Employee not found'], 400);
        }
        return response()->json([
            'message' => 'employee profile successfully retrieved',
            'user' => $employee
        ], 200);
    }

    public function getCall(int $id)
    {

        try {
            $call = Call::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Call not found'], 400);
        }

        return response()->json([
            'message' => 'Call successfully retrieved',
            'call' => $call
        ], 200);
    }
}
