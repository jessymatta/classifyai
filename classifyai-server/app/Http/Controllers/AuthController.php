<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\File;


class AuthController extends Controller
{

    public function register(Request $request, $user_role_id)
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
            return response()->json($validator->errors()->toJson(), 400);
        }
        $image_url = NULL;
        if ($request->has('profile_pic_base64')) {
            $image_url = $this->uploadPP($request->profile_pic_base64, $request->username);
        }

        $role_to_find = Role::findOrFail($user_role_id);

        $role_to_find->users()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'username' => $request->username,
            'dob' => $request->dob,
            'password' => bcrypt($request->password),
            'profile_pic_url' => $image_url

        ]);

        return response()->json([
            'message' => 'User successfully registered',
            'status' => "success",
            'user' => $role_to_find
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }

    public function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function uploadPP(String $image_received, $username)
    {
        $extension = explode('/', explode(':', substr($image_received, 0, strpos($image_received, ';')))[1])[1];   // .jpg .png .pdf
        $replace = substr($image_received, 0, strpos($image_received, ',') + 1);
        $image = str_replace($replace, '', $image_received);
        $image = str_replace(' ', '+', $image);
        $image_special_name = $username . time();
        $image_url = $image_special_name . '.' . $extension;

        $folder = public_path("images/profile_pictures/" . $username);
        if (!File::exists($folder)); {
            File::makeDirectory($folder, 0777, true, true);
        }
        Image::make($image_received)->save($folder);

        return $image_url;
    }
}
