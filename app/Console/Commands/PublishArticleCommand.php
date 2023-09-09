<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Enums\ArticleStatusEnum;
use Illuminate\Console\Command;

class PublishArticleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:publish-article-command';
    protected $description = 'Published the article.';

    /**
     * The console command description.
     *
     * @var string
     */

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Article::query()
            ->where('status', ArticleStatusEnum::Scheduled)
            ->where('scheduled_at', '>=', now())
            ->update([
                'status' => ArticleStatusEnum::Published,
                'published_at' => now(),
            ]);
    }
}
