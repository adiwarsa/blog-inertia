<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? new AuthResource($request->user()) : null,
            ],
            'global_categories' => cache()->remember('categories', 3600, fn () => \App\Models\Category::query()->whereHas('articles')->select('slug', 'name')->take(10)->get()),
            'flash_message' => fn () => [
                'type' => $request->session()->get('type'),
                'title' => $request->session()->get('title'),
                'message' => $request->session()->get('message'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
