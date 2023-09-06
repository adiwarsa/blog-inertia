<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect(['General', 'PHP', 'Laravel', 'JavaScript', 'Vue.js', 'React.js', 'Angular.js'])->each(function ($category) {
            \App\Models\Category::create([
                'name' => $category,
                'slug' => str()->slug($category),
            ]);
        });
    }
}
