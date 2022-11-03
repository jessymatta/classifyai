<?php

namespace App\Services;

use App\Models\Call;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ScriptService
{
    /**
     * Get a call by id
     *
     * @param int $call_id
     * @return String
     */
    public function handleGetCallScript(int $id)
    {
        try {
            $call = Call::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            abort(response()->json(['error' => 'Call not found'], 400));
        }

        $script_url = $call->script_url;

        return $script_url;
    }
}