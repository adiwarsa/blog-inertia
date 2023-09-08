<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleBlockResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Enums\ArticleStatusEnum;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    /**
 * Display the specified resource.
 */
    public function show(Category $category)
    {
        $articles = Article::query()
            ->select('id', 'title', 'slug', 'excerpt', 'thumbnail', 'published_at', 'author_id', 'category_id', 'status')
            ->whereBelongsTo($category)
            ->with('author', 'category')
            ->whereStatus(ArticleStatusEnum::Published)
            ->latest()
            ->paginate(9);

        return inertia('Articles/Index', [
            'articles' => ArticleBlockResource::collection($articles)->additional([
                'meta' => ['has_pages' => $articles->hasPages()],
            ]),
            'params' => [
                'title' => $category->name,
                'subtitle' => $category->description ?? 'All articles is all about ' . $category->name,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
