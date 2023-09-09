<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'body' => $this->body,
            'markdown_formatted' => \GrahamCampbell\Markdown\Facades\Markdown::convert($this->body)->getContent(),
            'likes_count' => $this->likes_count,
            'created_at' => $this->created_at->diffForHumans(),
            'author' => [
                'id' => $this->author->id,
                'name' => $this->author->name,
                'gravatar' => $this->author->gravatar(100),
            ],
            'can_be_replied' => $this->parent_id === null,
            'children_count' => $this->children_count,
            'children' => self::collection($this->children),
        ];
    }
}
