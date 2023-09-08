<?php

namespace App\Http\Resources;

use GrahamCampbell\Markdown\Facades\Markdown;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleSingleResource extends JsonResource
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
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'body' => Markdown::convert($this->body)->getContent(),
            'thumbnail' => $this->getPicture('1080x720'),
            'published_at' => $this->published_at?->diffForHumans(),
            'category' => [
                'name' => $this->category->name,
                'href' => route('categories.show', $this->category->slug),
            ],
            'author' => [
                'gravatar' => $this->author->gravatar(),
                'name' => $this->author->name,
                'href' => '#',
                'role' => 'Software Engineer',
            ],
        ];
    }
}
