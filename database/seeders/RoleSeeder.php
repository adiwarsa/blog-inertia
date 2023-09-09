<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect(['admin', 'writer'])->each(function ($role) {
            \Spatie\Permission\Models\Role::create(['name' => $role]);
        });

        $permissions = collect([
            'publish article',
            'create article',
            'read article',
            'update article',
            'delete article',
        ]);

        $permissions->each(function ($permission) {
            \Spatie\Permission\Models\Permission::create(['name' => $permission]);
        });

        \Spatie\Permission\Models\Role::find(2)->givePermissionTo([
            'create article',
            'update article',
        ]);


        \App\Models\User::find(1)->assignRole('admin');
        \App\Models\User::find(2)->assignRole('writer');
    }
}
