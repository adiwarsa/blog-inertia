<?php

namespace App\Models;

use App\Models\Enums\ArticleStatusEnum;
use Coderflex\Laravisit\Concerns\CanVisit;
use Coderflex\Laravisit\Concerns\HasVisits;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Storage;

class Article extends Model implements CanVisit
{
    use HasFactory, HasVisits;
    protected $guarded = [];
    protected $casts = [
        'status' => ArticleStatusEnum::class,
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
    ];

    public function scopeFilter($query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'REGEXP', $search)
                    ->orWhere('excerpt', 'REGEXP', $search);
            });
        })->when($filters['status'] ?? null, function ($query, $item) {
            match ($item) {
                'draft' => $query->where('status', ArticleStatusEnum::Draft),
                'published' => $query->where('status', ArticleStatusEnum::Published),
                'scheduled' => $query->where('status', ArticleStatusEnum::Scheduled),
                'archived' => $query->where('status', ArticleStatusEnum::Archived),
                default => $query,
            };
        })->when($filters['category'] ?? null, fn ($query, $item) => $query->whereRelation('category', 'slug', $item))
            ->when($filters['user'] ?? null, fn ($query, $item) => $query->where('author_id', $item));
    }

    public function scopeSearchTerm($query, string $terms = null): void
    {
        collect(str_getcsv($terms, ' ', '"'))
            ->filter()
            ->each(function ($term) use ($query) {
                $term = '%' . $term . '%';
                $query->where('title', 'like', $term)
                    ->orWhere('excerpt', 'like', $term);
            });
    }

    public function scopeMostLikes($query)
    {
        return $query->whereHas('likes')->withCount('likes')->orderBy('likes_count', 'desc');
    }
        
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getPicture($size = 400): string
    {
        return $this->thumbnail !== null ? Storage::url($this->thumbnail) : 'https://placehold.co/' . $size . '/1F2937/FFFFFF/?font=lato&text=No+Image+Available';
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function scopeTrending($query)
    {
        return $query->withCount('comments')->orderBy('comments_count', 'desc');
    }
}
