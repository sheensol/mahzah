<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            [
                'title'      => 'dashboard_access',
                'display_name' => 'Dashboard Access'
            ],
            [
                'title'      => 'user_access',
                'display_name' => 'User Access'
            ],
            [
                'title'      => 'user_create',
                'display_name' => 'User Create'
            ],
            [
                'title'      => 'user_edit',
                'display_name' => 'User Edit'
            ],
            [
                'title'      => 'user_show',
                'display_name' => 'User Show'
            ],
            [
                'title'      => 'group_access',
                'display_name' => 'Group Access'
            ],
            [
                'title'      => 'group_create',
                'display_name' => 'Group Create'
            ],
            [
                'title'      => 'group_edit',
                'display_name' => 'Group Edit'
            ],
            [
                'title'      => 'group_delete',
                'display_name' => 'Group Delete'
            ],
            [
                'title'      => 'group_members_access',
                'display_name' => 'Group Members Access'
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}
