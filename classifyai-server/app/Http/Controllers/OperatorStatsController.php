<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Call;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OperatorStatsController extends Controller
{
    public function getOperatorCallsAndCount($id = null)
    {
        if (!$id) {
            $id = auth()->user()->id;
        }

        $this->commonRoutesValidations($id);

        $operator_calls = Call::where('operator_id', $id)->get();

        return response()->json([
            'total_calls_number' => $operator_calls->count(),
            'operator_calls' => $operator_calls
        ], 200);
    }

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

    public function getOperatorTotalCallsDurationPerMonth($id = null)
    {
        if (!$id) {
            $id = auth()->user()->id;
        }

        $this->commonRoutesValidations($id);

        $current_month = now()->month;
        $calls_duration = Call::select('duration')
            ->whereMonth('created_at', $current_month)
            ->where('operator_id', $id)
            ->get()
            ->toArray();

        $minutes_array = [];
        $seconds_array = [];
        foreach ($calls_duration as $dur) {
            $parsed_duration = app('App\Http\Controllers\DashboardController')->parseDuration($dur['duration']);
            array_push($minutes_array, $parsed_duration[0]);
            array_push($seconds_array, $parsed_duration[1]);
        }
        $total_minutes = array_sum($minutes_array);
        $total_seconds_in_minutes = array_sum($seconds_array) / 60;
        $total_duration = round($total_minutes + $total_seconds_in_minutes);

        return response()->json(['Total calls duration for this month' => $total_duration], 200);
    }
}
