<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Call;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OperatorStatsController extends Controller
{

    private function commonRoutesValidations($id)
    {
        //Get the id of the OPERATOR role
        $role_id_obj = Role::select('id')->where('role', 'OPERATOR')->first();

        if (!$role_id_obj) {
            abort(response()->json(['error' => 'Not a valid role'], 400));
        }
        $role_id = json_decode($role_id_obj)->id;

        //Check if logged in user is an operator and prevent them from accessing other operators stats
        $logged_in_user = auth()->user();
        if ($logged_in_user->role_id == $role_id  && $id != $logged_in_user->id) {
            abort(response()->json(['error' => 'Unauthorized'], 403));
        }

        //If id is sent then check that the employee exist
        try {
            $employee = User::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            abort(response()->json(['error' => 'Employee not found'], 400));
        }

        //Check if the role of the sent the employee is operator
        if ($employee->role_id != $role_id) {
            abort(response()->json(['error' => 'Not a valid operator'], 400));
        }
    }
}
