<?php

namespace App\Http\Controllers;

use App\Models\Call;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getOperatorsCount()
    {
        $operators_count = User::whereHas('role', function ($query) {
            $query->where('role', 'OPERATOR');
        })->where('is_deleted', false)->count();

        return response()->json(['operators_count' => $operators_count], 200);
    }

    public function getCurrentMonthCallsDuration()
    {

        $current_month = now()->month;
        $calls_duration = Call::select('duration')
            ->whereMonth('created_at', $current_month)
            ->get()
            ->toArray();

        $minutes_array = [];
        $seconds_array = [];
        foreach ($calls_duration as $dur) {
            $parsed_duration = $this->parseDuration($dur['duration']);
            array_push($minutes_array, $parsed_duration[0]);
            array_push($seconds_array, $parsed_duration[1]);
        }
        $total_minutes = array_sum($minutes_array);
        $total_seconds_in_minutes = array_sum($seconds_array) / 60;
        $total_duration = round($total_minutes + $total_seconds_in_minutes);

        return response()->json(['Total calls duration for this month' => $total_duration], 200);
    }

    public function parseDuration(String $duration)
    {
        $duration = explode(':', $duration);
        $minutes = $duration[0];
        $seconds = $duration[1];
        $to_return = [$minutes, $seconds];

        return $to_return;
    }

    public function dailyAvgSentiments()
    {
        $calls = Call::whereDate('created_at', Carbon::today())->get();

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

    public function getLast7DaysCallsAvg()
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
        return response()->json([
            'message' => "Average sentiment analysis for the last 7 days retrieved successfully",
            'results' => $results_to_return,
        ], 200);
    }

    public function getBestWorstOperator()
    {
        $current_month = now()->month;
        $calls = Call::select('*')
            ->whereMonth('created_at', $current_month)
            ->get()
            ->groupBy('operator_id')
            ->toArray();

        $results = [];
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

            $results[$key] = [
                'average_positive_pct' => round($average_positive_pct, 2),
                'average_negative_pct' => round($average_negative_pct, 2),
                'average_neutral_pct' => round($average_neutral_pct, 2)
            ];
        }

        $MAX = array_combine(array_keys($results), array_column($results, 'average_positive_pct'));
        $MIN = array_combine(array_keys($results), array_column($results, 'average_negative_pct'));
        $results_to_return = [];

        $max_employee_positive_pct = max($MAX);
        $max_employee_positive_pct_id = array_search($max_employee_positive_pct, $MAX);

        $max_employee_negative_pct = max($MIN);
        $max_employee_negative_pct_id = array_search($max_employee_negative_pct, $MIN);

        $results_to_return['best_operator'] = array(
            'average_positive_pct' => $max_employee_positive_pct,
            'operator' => User::findOrFail($max_employee_positive_pct_id),
        );

        $results_to_return['worst_operator'] = array(
            'average_negative_pct' => $max_employee_negative_pct,
            'operator' => User::findOrFail($max_employee_negative_pct_id),
        );

        return $results_to_return;
    }
}
