<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Role;


class CallController extends Controller
{
    public function addCall(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'call_custom_id' => 'required|string',
            'cutomer_nbr' => 'required|string',
            'base64_audio' => 'required|string',
            'duration' => 'required',
            'operator_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }


        $operator_role_obj = Role::select('id')->where('role', 'OPERATOR')->first();
        $operator_role_id = json_decode($operator_role_obj)->id;

        // Operator id validations
        try {
            $operator_to_find = User::findOrFail($request->operator_id);
        } catch (ModelNotFoundException $e) {
            abort(response()->json('Operator id is not valid', 400));
        }

        if ($operator_to_find->role_id != $operator_role_id) {
            abort(response()->json('User is not an operator', 400));
        }

        // TODO : handle sentiment analysis
        $audio_url = $this->uploadCall($request->base64_audio, $request->operator_id);

        $operator_to_find->calls()->create([
            'call_custom_id' => $request->call_custom_id,
            'cutomer_nbr' => $request->cutomer_nbr,
            'audio_url' => $audio_url,
        ]);

        return response()->json([
            'message' => 'Call successfully added',
            'status' => "success",
            'associated_operator' => $operator_to_find
        ], 201);
    }

    public function uploadCall(String $base64_audio, $operator_id)
    {

        $audio_url = $operator_id . time() . ".mp3";
        $replace = substr($base64_audio, 0, strpos($base64_audio, ',') + 1);
        $image = str_replace($replace, '', $base64_audio);
        $image = str_replace(' ', '+', $image);
        $folder = public_path("calls_folder/" . $operator_id);

        if (!File::exists($folder)); {
            File::makeDirectory($folder, 0777, true, true);
        }

        file_put_contents(public_path("calls_folder/" . $operator_id . "/") . $audio_url, base64_decode($base64_audio));
        return $audio_url;
    }


    //Upload local audio to AssemblyAI API for Transcription
    public function uploadAudioToAssemblyAI($operator_id, $audio_name)
    {
        set_time_limit(0);

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://api.assemblyai.com/v2/upload',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => file_get_contents('calls_folder/' . $operator_id . '/' . $audio_name),
            CURLOPT_HTTPHEADER => [
                'authorization: ' . env('ASSEMBLY_AI_TOKEN'),
            ],
        ]);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            echo 'cURL Error #:' . $err;
        }

        $given_audio_url = json_decode($response)->upload_url;

        return $given_audio_url;
    }
}
