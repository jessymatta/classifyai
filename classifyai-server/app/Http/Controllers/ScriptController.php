<?php

namespace App\Http\Controllers;

use App\Services\ScriptService;
use Illuminate\Http\Request;

class ScriptController extends Controller
{
    /**
     * Get a call script by id
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCallScript(int $id)
    {
        $scriptService = new ScriptService();
        $script_url = $scriptService->handleGetCallScript($id);
        return response()->json(['script_url' => $script_url], 200);
    }

    /**
     * Receive a script in base64, decode it,parse it, analyze it and return analyzed data
     *
     * @param Request $request
     * @param ScriptService $scriptService
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadScriptAndGetAnalyze(Request $request, ScriptService $scriptService)
    {
        $analysis = $scriptService->handleUploadScriptAndGetAnalysis($request);
        return $analysis;
    }
}
