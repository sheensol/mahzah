<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        // Create predefined admin
        $user = new User();
        $user->first_name = "Imran";
        $user->last_name = "Haider";
        $user->email = "admin@example.org";
        $user->password = "secret";
        $user->type = 3;
        $user->save();

        User::factory()->count(10)->create();

    }
}
