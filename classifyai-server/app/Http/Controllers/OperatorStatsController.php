<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Call;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Carbon\Carbon;

class OperatorStatsController extends Controller
{
    public function getOperatorCallsAndCount($id = null)
    {
        $operator_calls = Call::where('operator_id', $id)->get();

        return [
            'total_calls_number' => $operator_calls->count(),
            'operator_calls' => $operator_calls
        ];
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

        return $employee;
    }

    public function getOperatorTotalCallsDurationPerMonth($id = null)
    {

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

        return $total_duration;
    }

    public function getOperatorMonthlySentimentAnalysis($id = null)
    {
        $current_month = now()->month;

        $calls = Call::select('*')
            ->whereMonth('created_at', $current_month)
            ->where('operator_id', $id)
            ->get();

        $positive_percentages = [];
        $negative_percentages = [];
        $neutral_percentages = [];

        foreach ($calls as $call) {
            array_push($positive_percentages, $call['positive_emotions_pct']);
            array_push($negative_percentages, $call['negative_emotions_pct']);
            array_push($neutral_percentages, $call['neutral_emotions_pct']);
        }

        $total_calls = count($positive_percentages);
        $average_positive_pct = array_sum($positive_percentages) / $total_calls;
        $average_negative_pct = array_sum($negative_percentages) / $total_calls;
        $average_neutral_pct = array_sum($neutral_percentages) / $total_calls;

        return response()->json([
            'average_positive_pct' => round($average_positive_pct, 2),
            'average_negative_pct' => round($average_negative_pct, 2),
            'average_neutral_pct' => round($average_neutral_pct, 2)
        ]);
    }

    public function getOperatorLast7DaysSentimentsAvg($id = null)
    {
        $date = Carbon::now()->subDays(7);

        $calls = Call::where('created_at', '>=', $date)
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function ($item) {
                return $item->created_at->format('d');
            })
            ->toArray();

        $results_to_return = [];
        foreach ($calls as $key => $value) {

            $positive_percentages = [];
            $negative_percentages = [];
            $neutral_percentages = [];
            foreach ($value as $k => $v) {

                array_push($positive_percentages, $v['positive_emotions_pct']);
                array_push($negative_percentages, $v['negative_emotions_pct']);
                array_push($neutral_percentages, $v['neutral_emotions_pct']);
            }

            $average_positive_pct = array_sum($positive_percentages) / count($positive_percentages);
            $average_negative_pct = array_sum($negative_percentages) / count($negative_percentages);
            $average_neutral_pct = array_sum($neutral_percentages) / count($neutral_percentages);

            $results_to_return[$key] = [
                'average_positive_pct' => round($average_positive_pct, 2),
                'average_negative_pct' => round($average_negative_pct, 2),
                'average_neutral_pct' => round($average_neutral_pct, 2)
            ];
        }
        return  $results_to_return;
    }

    public function getOperatorStats($id = NULL)
    {
        if (!$id) {
            $id = auth()->user()->id;
        }

        $operator = $this->commonRoutesValidations($id);

        $results['operator_profile'] = $operator;
        $results['operator_calls_count'] = $this->getOperatorCallsAndCount($id)['total_calls_number'];
        $results['operator_calls_info'] = $this->getOperatorCallsAndCount($id)['operator_calls'];
        $results['operator_monthly_total_calls_duration'] = $this->getOperatorTotalCallsDurationPerMonth($id);
        $results['operator_last7_days_analysis'] = $this->getOperatorLast7DaysSentimentsAvg($id);
        return $results;
    }
}
