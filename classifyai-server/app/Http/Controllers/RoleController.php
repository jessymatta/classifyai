<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function addRole(Request $request){
    
        $request->validate([
            'role' => 'required|string',
        ]);
        
        $role_to_add = new Role([
            'role' => $request->role
        ]);

        $role_to_add->save();

        return response()->json([
            'message' => 'Successfully added role',
            'role' => $role_to_add
        ], 201);
    }
}
