<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
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
            'name' => $this->name,
            'gravatar' => $this->gravatar(50),
            'email' => $this->email,
            'is_writer' => $this->when($this->can('create article'), true),
            'is_admin' => $this->when($this->hasRole('admin'), true),
        ];
    }
}
