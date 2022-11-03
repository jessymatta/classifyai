<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function getDashboardStats(DashboardService $dashboardService)
    {
        /**
         * Get all the stats that will be displayed on the Super Supervisors and Supervisors Dashboard
         * 
         * @return \Illuminate\Http\JsonResponse
         */
        $results = $dashboardService->handleGetDashboardStats();
        return response()->json($results, 200);
    }
}
