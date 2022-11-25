<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
            
                'first_name' => 'admin',
                'last_name' => 'admin',
                'email' => 'admin@classifyai.io',
                'username' => 'admin',
                'password' => bcrypt('admin'),
                'role_id' => 1
            ]
            
        ];

        foreach ($users as $user) {
            \App\Models\User::create($user);
        }


    }
}
