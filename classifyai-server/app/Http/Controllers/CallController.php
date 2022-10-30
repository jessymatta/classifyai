<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CallController extends Controller
{
    public function addCall(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'call_custom_id' => 'required|string',
            'cutomer_nbr' => 'required|string',
            'audio_url' => 'required|string',
            'duration' => 'required',
            'positive_emotions_pct' => 'required',
            'negative_emotions_pct' => 'required',
            'neutral_emotions_pct' => 'required',
            'operator_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $operator_to_find = User::findOrFail($request->operator_id);

        // TODO : handle audio upload + sentiment analysis

        $operator_to_find->calls()->create([
            'call_custom_id' => $request->call_custom_id,
            'cutomer_nbr' => $request->cutomer_nbr,
            'audio_url' => $request->audio_url,
            'duration' => $request->duration,
            'positive_emotions_pct' => $request->positive_emotions_pct,
            'negative_emotions_pct' => $request->negative_emotions_pct,
            'neutral_emotions_pct' => $request->neutral_emotions_pct
        ]);

        return response()->json([
            'message' => 'Call successfully added',
            'status' => "success",
            'associated_operator' => $operator_to_find
        ], 201);
    }

}
