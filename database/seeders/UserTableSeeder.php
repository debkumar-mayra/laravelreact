<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdminUser = User::create([
            'first_name' => "Admin",
            'last_name' => "Admin",
            'email' => "admin@admin.com",
            'password' => "11111111",
        ]);
        $superAdminUser->assignRole('SUPER-ADMIN');
        $user = User::create([
            'first_name' => "Demo",
            'last_name' => "Demo",
            'email' => "demo@yopmail.com",
            'password' => "11111111",
        ]);
        $user->assignRole('USER');
       
        User::factory(20)->create()->each(function ($user) {
            $user->assignRole('USER');
        });
    }
}