<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author_id' => $this->faker->randomElement([1, 2, 3]),
            'article_id' => \App\Models\Article::factory(),
            'parent_id' => null,
            'body' => $this->faker->sentence,
        ];
    }
}
