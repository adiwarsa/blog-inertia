<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'title' => $title = 'Cara menggunakan seeder Laravel',
                'slug' => str($title)->slug(),
                'excerpt' => 'Laravel menyertakan kemampuan untuk menyemai basis data Anda dengan data menggunakan kelas benih.',
                'body' => 'Laravel menyertakan kemampuan untuk menyemai basis data Anda dengan data menggunakan kelas benih.',
                'status' => 2,
                'category_id' => 3,
                'author_id' => 1,
                'published_at' => now()
            ],
            [
                'title' => $title = 'Tailwind Responsive Design',
                'slug' => str($title)->slug(),
                'excerpt' => 'Using responsive utility variants to build adaptive user interfaces.',
                'body' => 'Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.',
                'status' => 2,
                'category_id' => 7,
                'author_id' => 1,
                'published_at' => now()
            ],
        ])->each(fn ($article) => \App\Models\Article::query()->create($article));
    }
}
