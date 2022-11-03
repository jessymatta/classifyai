<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Role;

class CallService
{
    /**
     * Computes sentiment analysis percentages using the below helper functions and add the call to the database
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleAddCall(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cutomer_nbr' => 'required|string',
            'base64_audio' => 'required|string',
            'operator_id' => 'required'
        ]);

        if ($validator->fails()) {
            abort(response()->json($validator->errors()->toJson(), 400));
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
        //Add script scipt same name as audio bas .json

        $operator_to_find->calls()->create([
            // 'call_custom_id' => $request->call_custom_id,
            'cutomer_nbr' => $request->cutomer_nbr,
            'audio_url' => $audio_url,
            'duration' => $duration_to_add,
            'positive_emotions_pct' => $proccessed_data['POSITIVE'],
            'negative_emotions_pct' => $proccessed_data['NEGATIVE'],
            'neutral_emotions_pct' => $proccessed_data['NEUTRAL'],
            'script_url' => explode('.', $audio_url)[0] . '.json'
        ]);

        return response()->json([
            'message' => 'Call successfully added',
            'status' => "success",
            'associated_operator' => $operator_to_find
        ], 201);
    }

    /**
     * Decode received base64 audio and create a corresponding folder to store it in (if it doesn't exist yet) 
     * 
     * @param String $base64_audio
     * @param int $operator_id
     * @return String
     */
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

    /**
     * Upload the audio to AssemblyAI in order to save it there and be able to access it later for transcription 
     * 
     * @param String $base64_audio
     * @param int $operator_id
     * @return String
     */
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
            abort(response()->json('cURL Error #:' . $err, 400));
        }

        $given_audio_url = json_decode($response)->upload_url;
        $response_id_obj = $this->submitAudioForTranscription($given_audio_url);
        $response_id = json_decode($response_id_obj)->id;
        $to_return = $this->getAssemblyAIResults($response_id);
        $to_upload_to_db = $this->processResponseData($to_return, $operator_id, $audio_name);

        return $to_upload_to_db;
    }

    /**
     * Submit previously uploaded audio to AssemblyAI for transcription
     * 
     * @param String $returned_url
     * @return String
     */
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
            abort(response()->json('cURL Error #:' . $err, 400));
        }
        return $response_with_id;
    }

    /**
     * Get the transcription results from AssemblyAI, keep sending the request and the audio processing is completed
     * 
     * @param String $id
     * @return String
     */
    private function getAssemblyAIResults(String $id): String
    {
        while (true) {
            $curl = curl_init();

            curl_setopt_array($curl, [
                CURLOPT_URL => 'https://api.assemblyai.com/v2/transcript/' . $id,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_HTTPHEADER => [
                    'authorization: ' . env('ASSEMBLY_AI_TOKEN'),
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
                abort(response()->json('cURL Error #:' . $err, 400));
            }
        }

        return $response;
    }

    /**
     * Process the data received from AssemblyAI, save it to a csv file and return it in the required format
     * 
     * @param String $id
     * @return array
     */
    private function processResponseData(String $response, $operator_id, $audio_url): array
    {

        $array_results_to_return = [];
        $response_in_json = json_decode($response);
        $audio_duration = $response_in_json->audio_duration;
        $array_results_to_return['audio_duration'] = $audio_duration;

        $sentiment_analysis = $response_in_json->sentiment_analysis_results;

        $audio_name = explode('.', $audio_url)[0];
        $this->convertToCSV(json_encode($sentiment_analysis), $audio_name, $operator_id);

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

    /**
     * Convert the JSON data to CSV and save it in the calls folder of the corresponding operator
     *
     * @param String $jsondata
     * @param String $csvfile_name
     * @param int $operator_id
     * @return String
     */
    private function convertToCSV(String $jsondata,String $csvfile_name, int $operator_id)
    {
        $jsonans = json_decode($jsondata, true);
        $csv = $csvfile_name .'.csv';
        $path = public_path("calls_folder/" . $operator_id . "/") . $csv;
        $file_pointer = fopen($path, 'w');
        fputcsv($file_pointer, ['text', 'start', 'end', 'sentiment', 'confidence', 'speaker']);
        foreach ($jsonans as $i) {
            fputcsv($file_pointer, $i);
        }
        fclose($file_pointer);
        return $csv;
    }
}
