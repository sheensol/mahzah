<?php

namespace Database\Seeders;

// use App\Models\User;
// use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        // $this->call(CourseTemplatesTableSeeder::class);
        // Course::factory()->count(5)->create();
        Schema::disableForeignKeyConstraints();
        $this->call([
            // PermissionsTableSeeder::class,
            // RolesTableSeeder::class,
            PermissionRoleTableSeeder::class,
            RoleUserTableSeeder::class,
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
