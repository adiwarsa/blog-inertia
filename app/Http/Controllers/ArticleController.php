<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleBlockResource;
use App\Http\Resources\ArticleListResource;
use App\Http\Resources\ArticleSingleResource;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Enums\ArticleStatusEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('can:create article')->except(['index', 'show', 'filter', 'like', 'search']);
    }

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

    public function list(Request $request)
    {
        $only = ['search', 'status', 'category'];
        $articles = Article::query()
            ->with('author', 'category')
            ->withCount('comments')
            ->when(! $request->user()->hasRole('admin'), fn ($query) => $query->whereBelongsTo($request->user(), 'author'))
            ->filter($request->only([...$only, 'user']))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('Articles/List', [
            'filters' => [
                'categories' => fn () => Category::select(['slug', 'name'])->get()->map(fn ($i) => [
                    'value' => $i->slug,
                    'label' => $i->name,
                ]),
        
                'statuses' => fn () => collect(ArticleStatusEnum::cases())->map(fn ($i) => [
                    'value' => strtolower($i->name),
                    'label' => $i->name,
                ]),
        
                'users' => fn () => User::select(['id', 'name'])->whereHas('articles')->get()->map(fn ($i) => [
                    'value' => $i->id,
                    'label' => $i->name,
                ]),
        
                'state' => $request->only([...$only, 'page']),
            ],

            'articles' => ArticleListResource::collection($articles)->additional([
                'meta' => [
                    'has_pages' => $articles->hasPages(),
                ],
            ]),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Articles/Form', [
            'article' => new Article,
            'statuses' => collect(ArticleStatusEnum::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => $status->label($status),
            ]),
            'categories' => Category::select('id', 'name')->get()->map(fn ($c) => [
                'value' => $c->id,
                'label' => $c->name,
            ]),
            'page_settings' => [
                'method' => 'post',
                'url' => route('articles.store'),
                'submit_text' => 'Create',
                'title' => 'Create new Article',
                'subtitle' => 'Grow your audience by creating the best articles.',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request)
    {
        $article = $request->user()->articles()->create([
            'thumbnail' => $request->hasFile('thumbnail') ? $request->file('thumbnail')->store('articles') : null,
            'title' => $title = $request->string('title'),
            'slug' => str($title.'-'.str()->random())->slug(),
            'excerpt' => $request->string('excerpt'),
            'body' => $request->string('body'),
            'status' => $status = $request->enum('status', ArticleStatus::class) ?? ArticleStatusEnum::Draft,
            'category_id' => $request->integer('category'),
            'published_at' => $status === ArticleStatusEnum::Published ? now() : null,
            'scheduled_at' => $status === ArticleStatusEnum::Scheduled ? $request->scheduled_at : null,
        ]);

        return to_route('articles.show', $article);
    }

    public function publish(Article $article)
    {
        $this->authorize('publish', $article);

        $article->update([
            'status' => ArticleStatusEnum::Published,
            'published_at' => now(),
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $this->authorize('view', $article);

        $article->visit()->hourlyIntervals()->withIp()->withSession()->withUser();

        return inertia('Articles/Show', [
            'article' => new ArticleSingleResource($article->loadCount('likes')->load('author', 'category')),
            'comments' => CommentResource::collection(
                $article->comments()
                    ->withCount('children')->where('parent_id', null)
                    ->where('spam_reports', '<>', 10)
                    ->get(),
            ),
        ]);
    }

    public function search(Request $request)
    {
        $articles = Article::query()
            ->select('id', 'title', 'slug', 'excerpt', 'thumbnail', 'published_at', 'author_id', 'category_id', 'status')
            ->searchTerm($request->search)
            ->with('author', 'category')
            ->whereStatus(ArticleStatusEnum::Published)
            ->latest()
            ->paginate(9);

        return inertia('Articles/Index', [
            'articles' => fn () => ArticleBlockResource::collection($articles)->additional([
                'meta' => [
                    'has_pages' => $articles->hasPages(),
                ],
            ]),

            'params' => [
                'title' => 'Search results',
                'subtitle' => 'You are searching for: "' . $request->search . '" return ' . $articles->count() . ' ' . str()->plural('result', $articles->count()) . '.',
            ],
        ]);

    }

    public function filter($key)
    {
        match ($key) {
            'week' => $articles = Article::query()->with('author', 'category')->popularThisWeek()->paginate(9),
            'month' => $articles = Article::query()->with('author', 'category')->popularThisMonth()->paginate(9),
            'year' => $articles = Article::query()->with('author', 'category')->popularThisYear()->paginate(9),
            'all-time' => $articles = Article::query()->with('author', 'category')->popularAllTime()->paginate(9),
            'trending' => $articles = Article::query()->with('author', 'category')->trending()->paginate(9),
            'most-likes' => $articles = Article::query()->with('author', 'category')->mostLikes()->paginate(9),
            'all-time' => $articles = Article::query()->with('author', 'category')->popularAllTime()->paginate(9),
            default => abort(404),
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
            'most-likes' => [
                'title' => 'Most Likes Article',
                'subtitle' => 'The most likes articles.',
            ],
            'all-time' => [
                'title' => 'Popular All Time',
                'subtitle' => 'The most popular articles of all time.',
            ],
        };

        return inertia('Articles/Index', [
            'articles' => ArticleBlockResource::collection($articles),
            'params' => $params,
        ]);
    }

    public function like(Request $request, Article $article)
    {
        if ($request->user()) {
            $like = $article->likes()->where('user_id', $request->user()->id)->first();

            if ($like) {
                $like->delete();
            } else {
                $article->likes()->create(['user_id' => $request->user()->id]);
            }
        } else {
            // flash message
        }

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $this->authorize('update', $article);

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);
        $article->delete();
        return back();
    }
}
