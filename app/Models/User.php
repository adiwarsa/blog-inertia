<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function gravatar($size = 150): string
    {
        return 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($this->email))) . '?s=' . $size . '&d=mp';
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'author_id');
    }
    
    public function reports(): BelongsToMany
    {
        return $this->belongsToMany(Comment::class, 'spam_comments')->withTimestamps();
    }

    public function hasReportedComment(Comment $comment): bool
    {
        return $this->reports()->where('comment_id', $comment->id)->exists();
    }
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'author_id');
    }
}
