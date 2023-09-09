<?php

namespace App\Models;

use App\Models\Enums\ArticleStatusEnum;
use Coderflex\Laravisit\Concerns\CanVisit;
use Coderflex\Laravisit\Concerns\HasVisits;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Article extends Model implements CanVisit
{
    use HasFactory, HasVisits;
    protected $casts = [
        'status' => ArticleStatusEnum::class,
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
    ];
    
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

    public function scopeTrending($query)
    {
        return $query->withCount('comments')->orderBy('comments_count', 'desc');
    }
}
