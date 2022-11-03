<?php

namespace App\Http\Controllers;

use App\Services\OperatorStatsService;

class OperatorStatsController extends Controller
{
    /**
     * Get all the stats of an operator by id, through calling the corrsponding method in the OperatorStatsService class 
     * 
     * @param mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOperatorStats($id = NULL)
    {
        $operatorStatsService = new OperatorStatsService();
        $results = $operatorStatsService->handleGetOperatorStats($id);
        return response()->json($results, 200);
    }
}
