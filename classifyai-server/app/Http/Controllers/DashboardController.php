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

    private function parseDuration(String $duration)
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
}
