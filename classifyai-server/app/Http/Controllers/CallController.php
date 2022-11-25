<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CallService;


class CallController extends Controller
{
    /**
     * Add a call to the database
     * 
     * @param Request $request
     * @param CallService $callService
     * @return \Illuminate\Http\JsonResponse
     */
    public function addCall(Request $request, CallService $callService)
    {
        $results = $callService->handleAddCall($request);
        return $results;
    }
}
