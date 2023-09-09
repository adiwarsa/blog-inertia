<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleListResource extends JsonResource
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
            'status' => str($this->status->name)->lower(),
            'href' => route('articles.show', $this->slug),
            'excerpt' => $this->excerpt,
            'thumbnail' => $this->getPicture(),
            'comments_count' => $this->comments_count,
            'published_at' => $this->published_at?->diffForHumans(),
            'category' => [
                'name' => $this->category->name,
                'href' => route('categories.show', $this->category->slug),
            ],
            'author' => $this->when($request->user()->hasRole('admin'), [
                'picture' => $this->author->gravatar(),
                'name' => $this->author->name,
                'href' => '#',
            ]),

            'delete' => $this->when($request->user()->hasRole('admin'), [
                'href' => route('articles.destroy', $this->slug),
            ]),
        ];
    }
}
