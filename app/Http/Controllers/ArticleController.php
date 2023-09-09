<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleBlockResource;
use App\Http\Resources\ArticleSingleResource;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Enums\ArticleStatusEnum;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::query()
            ->select('id', 'title', 'slug', 'excerpt', 'published_at', 'author_id', 'category_id', 'status')
            ->with('author', 'category')
            ->whereStatus(ArticleStatusEnum::Published)
            ->latest()
            ->paginate(9);

        return inertia('Articles/Index', [
            'articles' => ArticleBlockResource::collection($articles)->additional([
                'meta' => [
                    'has_pages' => $articles->hasPages(),
                ],
            ]),

            'params' => [
                'title' => 'Latest Articles',
                'subtitle' => 'The latest articles from our blog.',
            ],
        ]);
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
    public function show(Article $article)
    {
        $article->visit()->hourlyIntervals()->withIp()->withSession()->withUser();

        return inertia('Articles/Show', [
            'article' => new ArticleSingleResource($article->load('author', 'category')),
            'comments' => CommentResource::collection(
                $article->comments()
                    ->withCount('children')->where('parent_id', null)
                    ->where('spam_reports', '<>', 10)
                    ->get(),
            ),
        ]);
    }

    public function popular($key)
    {
        match ($key) {
            'week' => $articles = Article::query()->with('author', 'category')->popularThisWeek()->paginate(9),
            'month' => $articles = Article::query()->with('author', 'category')->popularThisMonth()->paginate(9),
            'year' => $articles = Article::query()->with('author', 'category')->popularThisYear()->paginate(9),
            'all-time' => $articles = Article::query()->with('author', 'category')->popularAllTime()->paginate(9),
            'trending' => $articles = Article::query()->with('author', 'category')->trending()->paginate(9),
        };

        $params = match ($key) {
            'week' => [
                'title' => 'Popular This Week',
                'subtitle' => 'The most popular articles this week.',
            ],
            'month' => [
                'title' => 'Popular This Month',
                'subtitle' => 'The most popular articles this month.',
            ],
            'year' => [
                'title' => 'Popular This Year',
                'subtitle' => 'The most popular articles this year.',
            ],
            'all-time' => [
                'title' => 'Popular All Time',
                'subtitle' => 'The most popular articles of all time.',
            ],
            'trending' => [
                'title' => 'Trending Articles',
                'subtitle' => 'The most trending articles.',
            ],
        };

        return inertia('Articles/Index', [
            'articles' => ArticleBlockResource::collection($articles),
            'params' => $params,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
