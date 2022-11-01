<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class DashboardController extends Controller
{
    public function getOperatorsCount()
    {
        $operators_count = User::whereHas('role', function ($query) {
            $query->where('role', 'OPERATOR');
        })->where('is_deleted', false)->count();

        return response()->json(['operators_count' => $operators_count], 200);

    }

}
