<?php

namespace App\Services;

use App\Models\Call;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use SplFileObject;

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

    /**
     * Receive a script in base64, decode it,parse it, analyze it and return analyzed data
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleUploadScriptAndGetAnalysis(Request $request)
    {
        $script_base64 = $request->script_base64;

        //Check if the sent string is a valid base64 string
        if (base64_decode($script_base64, true)) {
            $script = base64_decode($script_base64);
        } else {
            abort(response()->json(['error' => 'Script is not valid'], 400));
        }

        $myArray = explode("\n", $script);

        $operator_confidence_lvls = [];
        $customer_confidence_lvls = [];

        $operator_sentiments = [];
        $customer_sentiments = [];
        for ($i = 1; $i < count($myArray); $i++) {
            $sentences = $this->splitAtSecondOccurenceOfQuotes($myArray[$i]);
            if (!$sentences[0]) {
                continue;
            }
            if (!$sentences[1]) {
                $array_separated_at_commas = explode(",", $sentences[0]);
            } else {
                $array_separated_at_commas = explode(",", $sentences[1]);
            }

            if ($array_separated_at_commas[5] == "A") {
                array_push($operator_confidence_lvls, $array_separated_at_commas[4]);
                array_push($operator_sentiments, $array_separated_at_commas[3]);
            } else {
                array_push($customer_confidence_lvls, $array_separated_at_commas[4]);
                array_push($customer_sentiments, $array_separated_at_commas[3]);
            }
        }

        $avg_operator_confidence_pct = array_sum($operator_confidence_lvls) / count($operator_confidence_lvls);
        $avg_customer_confidence_pct = array_sum($customer_confidence_lvls) / count($customer_confidence_lvls);

        $count_sentiment_operator = array_count_values($operator_sentiments);
        $count_sentiment_customer = array_count_values($customer_sentiments);

        foreach ($count_sentiment_operator as $key => $value) {
            $operator_sentiments_to_return[$key] = round($value * (100 / count($operator_sentiments)), 2);
        }

        foreach ($count_sentiment_customer as $key => $value) {
            $customer_sentiments_to_return[$key] = round($value * (100 / count($customer_sentiments)), 2);
        }

        $operator_sentiments_to_return = $this->checkForMissingSentiments($operator_sentiments_to_return);
        $customer_sentiments_to_return = $this->checkForMissingSentiments($customer_sentiments_to_return);

        return response()->json([
            'operator_confidence' => round($avg_operator_confidence_pct, 2) * 100,
            'customer_confidence' => round($avg_customer_confidence_pct, 2) * 100,
            'operator_sentiments_avg' => $operator_sentiments_to_return,
            'customer_sentiments_avg' => $customer_sentiments_to_return,
            'operator_sentences_number' => count($operator_sentiments),
            'customer_sentences_number' => count($customer_sentiments)
        ], 200);
    }

    /**
     * Split a string at the second occurence of the double quotes character
     *
     * @param String $string
     * @return array
     */
    private function splitAtSecondOccurenceOfQuotes(String $string)
    {
        $max = strlen($string);
        $n = 0;
        for ($i = 0; $i < $max; $i++) {
            if ($string[$i] == "\"") {
                $n++;
                if ($n >= 2) {
                    break;
                }
            }
        }
        $arr[] = substr($string, 0, $i);
        $arr[] = substr($string, $i + 1, $max);

        return $arr;
    }

    /**
     * Check for missing sentiments (due to absence of negative emotions for example) and add them with 0 value
     *
     * @param array $array_sentiment_count
     * @return array
     */
    private function checkForMissingSentiments(array $array_sentiment_count): array
    {
        $possible_sentiments = ["POSITIVE", "NEGATIVE", "NEUTRAL"];
        if (count($array_sentiment_count) != 0) {
            $missing_sentiments = [];
            foreach ($possible_sentiments as $sentiment) {
                if (!array_key_exists($sentiment, $array_sentiment_count)) {
                    array_push($missing_sentiments, $sentiment);
                }
            }
            foreach ($missing_sentiments as $missing_sentiment) {
                $array_sentiment_count[$missing_sentiment] = 0;
            }
        }
        return $array_sentiment_count;
    }
}
