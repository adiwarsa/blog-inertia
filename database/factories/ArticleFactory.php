<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author_id' => rand(1, 2),
            'category_id' => rand(1, 7),
            'title' => $title = $this->faker->sentence,
            'slug' => str($title)->slug(),
            'excerpt' => $this->faker->paragraph,
            'body' => $this->faker->paragraph,
            'published_at' => $this->faker->dateTimeBetween('-1 month'),
            'status' => 2,
        ];
    }
}
