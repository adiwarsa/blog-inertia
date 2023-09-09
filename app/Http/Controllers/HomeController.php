<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleBlockResource;
use App\Models\Article;
use App\Models\Enums\ArticleStatusEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return inertia('Home', [
            'gotoLatestArticle' => route('articles.show', [Article::select('slug')->whereStatus(ArticleStatusEnum::Published)->latest()->value('slug')]),
            'popularArticles' => ArticleBlockResource::collection(
                Article::query()
                    ->select('id', 'title', 'slug', 'excerpt', 'thumbnail', 'published_at', 'author_id', 'category_id', 'status')
                    ->with('author', 'category')
                    ->whereStatus(ArticleStatusEnum::Published)
                    ->popularThisWeek()
                    ->limit(3)
                    ->get()
            ),
            'articles' => ArticleBlockResource::collection(
                Article::query()
                    ->select('id', 'title', 'slug', 'excerpt', 'thumbnail', 'published_at', 'author_id', 'category_id', 'status')
                    ->with('author', 'category')
                    ->whereStatus(ArticleStatusEnum::Published)
                    ->latest()
                    ->limit(6)
                    ->get()
            ),
        ]);
    }
}
