<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\File;

class AuthService
{
    /**
     * Register new users
     *
     * @param \Illuminate\Http\Request $request
     * @param int $user_role_id
     * @return object
     */
    public function handleRegister(Request $request, int $user_role_id)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'username' => 'required|string|unique:users',
            'dob' => 'required',
            'password' => 'required|string|confirmed|min:7'
        ]);

        if ($validator->fails()) {
            abort(response()->json($validator->errors()->toJson(), 400));
        }

        $role_to_find = Role::findOrFail($user_role_id);

        $id = $role_to_find->users()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'username' => $request->username,
            'dob' => $request->dob,
            'password' => bcrypt($request->password),
            'profile_pic_url' => NULL

        ]);
        $new_user_id = $id->id;

        $image_url = NULL;
        if ($request->has('profile_pic_base64')) {
            $image_url = $this->uploadPP($request->profile_pic_base64, $new_user_id);
        }

        $id->profile_pic_url = $image_url;
        $id->save();
        return $role_to_find;
    }

    /**
     * Login and get a JWT via given credentials.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            abort(response()->json($validator->errors()->toJson(), 400));
        }

        if (!$token = auth()->attempt($validator->validated())) {
            abort(response()->json(['error' => 'Unauthorized'], 401));
        }
        return $this->createNewToken($token);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     * @return \Illuminate\Http\JsonResponse
     */
    private function createNewToken(String $token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    /**
     * Decode a base64 image and store it in the appropriate folder
     *
     * @param  string $image_received
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadPP(String $image_received, int $id)
    {
        $extension = explode('/', explode(':', substr($image_received, 0, strpos($image_received, ';')))[1])[1];   // .jpg .png .pdf
        $replace = substr($image_received, 0, strpos($image_received, ',') + 1);
        $image = str_replace($replace, '', $image_received);
        $image = str_replace(' ', '+', $image);
        $image_special_name = $id . time();
        $image_url = $image_special_name . '.' . $extension;

        $folder = public_path("images/profile_pictures/" . $id);

        if (!File::exists($folder)); {
            File::makeDirectory($folder, 0777, true, true);
        }
        Image::make($image_received)->save(public_path('images/profile_pictures/' . $id . "/") . $image_url);
        return $image_url;
    }
}
