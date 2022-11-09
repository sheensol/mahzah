<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'id'         => 1,
                'title'      => 'Admin',
                'created_at' => '2022-10-12 05:41:36',
                'updated_at' => '2022-10-12 05:41:36',
            ],
        ];

        DB::table('roles')->insert($roles);
    }
}
