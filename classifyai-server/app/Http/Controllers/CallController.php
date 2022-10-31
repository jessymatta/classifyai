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

        $audio_url = $this->uploadCall($request->base64_audio, $request->operator_id);
        $proccessed_data = $this->uploadAudioToAssemblyAI($request->operator_id, $audio_url);

        $duration_in_sec = $proccessed_data['audio_duration'];
        $duration_to_add = intval($duration_in_sec / 60) . ':' . str_pad(($duration_in_sec % 60), 2, '0', STR_PAD_LEFT);

        $operator_to_find->calls()->create([
            'call_custom_id' => $request->call_custom_id,
            'cutomer_nbr' => $request->cutomer_nbr,
            'audio_url' => $audio_url,
            'duration' => $duration_to_add,
            'positive_emotions_pct' => $proccessed_data['POSITIVE'],
            'negative_emotions_pct' => $proccessed_data['NEGATIVE'],
            'neutral_emotions_pct' => $proccessed_data['NEUTRAL']
        ]);

        return response()->json([
            'message' => 'Call successfully added',
            'status' => "success",
            'associated_operator' => $operator_to_find
        ], 201);
    }

    private function uploadCall(String $base64_audio, $operator_id)
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
    private function uploadAudioToAssemblyAI($operator_id, $audio_name)
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
        $response_id_obj = $this->submitAudioForTranscription($given_audio_url);
        $response_id = json_decode($response_id_obj)->id;
        $to_return = $this->getAssemblyAIResults($response_id);
        $to_upload_to_db = $this->processResponseData($to_return);

        return $to_upload_to_db;
    }

    //A method that submit upload for transcription
    private function submitAudioForTranscription(String $returned_url)
    {
        $body = array("audio_url" => $returned_url, "sentiment_analysis" => true, "speaker_labels" => true);
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://api.assemblyai.com/v2/transcript',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($body),
            CURLOPT_HTTPHEADER => [
                'authorization: ' . env('ASSEMBLY_AI_TOKEN'),
                'content-type: application/json',
            ],
        ]);
        $response_with_id = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            echo 'cURL Error #:' . $err;
        }
        return $response_with_id;
    }

    //A method that get the transcription result
    private function getAssemblyAIResults($id)
    {
        while (true) {
            $curl = curl_init();

            curl_setopt_array($curl, [
                CURLOPT_URL => 'https://api.assemblyai.com/v2/transcript/' . $id,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_HTTPHEADER => [
                    'authorization: a78900a1eef641ca94b9ab9584ce0166',
                    'content-type: application/json',
                ],
            ]);
            $response = curl_exec($curl);

            if (json_decode($response)->status == "completed") {
                break;
            }

            $err = curl_error($curl);
            curl_close($curl);
            if ($err) {
                echo 'cURL Error #:' . $err;
            }
        }

        return $response;
    }

    //A method that cleans the data according to the database needs
    private function processResponseData($response)
    {

        $array_results_to_return = [];
        $response_in_json = json_decode($response);
        $audio_duration = $response_in_json->audio_duration;
        $array_results_to_return['audio_duration'] = $audio_duration;

        $sentiment_analysis = $response_in_json->sentiment_analysis_results;

        foreach ($sentiment_analysis as $value) {
            $current_speaker = $value->speaker;
            if ($current_speaker == 'B') {
                $count_sentiment[] = $value->sentiment;
            }
        }

        $array_total_count = array_count_values($count_sentiment);

        $total_customer_sentences = count($count_sentiment);
        foreach ($array_total_count as $key => $value) {
            $percentage = round($value * (100 / $total_customer_sentences), 2);
            $array_results_to_return[$key] = $percentage;
        }

        return $array_results_to_return;
    }
}
