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

    /**
     * Get all users with an SUPERVISOR role
     *
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSupervisors(SuperSupervisorService $superSupervisorService)
    {
        $supervisors = $superSupervisorService->handleGetSupervisors();
        return response()->json($supervisors, 200);
    }

    /**
     * Get all calls
     *
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCalls(SuperSupervisorService $superSupervisorService)
    {
        $calls = $superSupervisorService->handleGetCalls();
        return response()->json($calls, 200);
    }

    /**
     * Edit profile of an employee 
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function editEmployeeProfile(Request $request, int $id, SuperSupervisorService $superSupervisorService)
    {
        $superSupervisorService->handleEditEmployeeProfile($request, $id);
        return response()->json(['message' => 'Employee profile updated successfully'], 201);
    }

    /**
     * Delete employee from the database
     *
     * @param int $id
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteEmployee(int $id, SuperSupervisorService $superSupervisorService)
    {
        $superSupervisorService->handleDeleteEmployee($id);
        return response()->json(['message' => 'Employee deleted successfully'], 201);
    }

    /**
     * Get employee profile
     *
     * @param int $id
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEmployeeProfile(int $id, SuperSupervisorService $superSupervisorService)
    {
        $employee = $superSupervisorService->handleGetEmployeeProfile($id);
        return response()->json([
            'message' => 'employee profile successfully retrieved',
            'user' => $employee
        ], 200);
    }

    /**
     * Get a call by id
     *
     * @param int $id
     * @param App\Services\SuperSupervisorService $super_supervisor_service
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCall(int $id, SuperSupervisorService $superSupervisorService)
    {
        $call = $superSupervisorService->handleGetCall($id);
        return response()->json([
            'message' => 'Call successfully retrieved',
            'call' => $call
        ], 200);
    }
}
