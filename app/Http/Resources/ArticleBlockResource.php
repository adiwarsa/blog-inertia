<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleBlockResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'href' => route('articles.show', $this->slug),
            'excerpt' => $this->excerpt,
            'thumbnail' => $this->getPicture(),
            'published_at' => $this->published_at?->diffForHumans(),
            'category' => [
                'name' => $this->category->name,
                'href' => route('categories.show', $this->category->slug),
            ],
            'author' => [
                'picture' => $this->author->gravatar(),
                'name' => $this->author->name,
                'href' => '#',
                'role' => 'Yucuba',
            ],
        ];
    }
}
