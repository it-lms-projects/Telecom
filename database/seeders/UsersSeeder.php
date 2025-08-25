<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['email' => 'bmbuyi@lms-group.net', 'password' => 'Bm123456*', 'name' => 'Benjamin MBUYI'],
            ['email' => 'vmahoneo@lms-group.net', 'password' => 'Vm123456*', 'name' => 'Vintiane MAHONEO'],
            ['email' => 'dilunga@lms-group.net', 'password' => 'Di123456*', 'name' => 'Debruss ILUNGA'],
            ['email' => 'kkatadi@lms-group.net', 'password' => 'Kk123456*', 'name' => 'Kathy KATADI'],
            ['email' => 'lkipioka@lms-group.net', 'password' => 'Lk123456*', 'name' => 'Libert KIPIOKA'],
        ];

        for ($i = 0; $i < count($users); $i++) {
            DB::table('users')->insert([
                'name' => $users[$i]['name'],
                'email' => $users[$i]['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($users[$i]['password']), // Default password for all users
                'remember_token' => \Illuminate\Support\Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
