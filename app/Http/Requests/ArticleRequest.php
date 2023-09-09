<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'thumbnail' => Rule::when($this->hasFile('thumbnail'), ['image', 'max:2048']), // 2MB
            'title' => ['required', 'min:3', 'max:255'],
            'body' => ['required'],
            'excerpt' => ['required'],
            'category' => ['required', 'exists:categories,id'],
        ];
    }
}
