<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(CommentRequest $request, Article $article)
    {
        $request->user()->comments()->create([
            'body' => $request->body,
            'article_id' => $article->id,
        ]);

        return back();
    }

    public function reply(CommentRequest $request, Comment $comment)
    {
        abort_if($comment->parent_id, 403, 'You can not reply to a reply.');

        $comment->children()->create([
            'body' => $request->body,
            'author_id' => $request->user()->id,
            'article_id' => $comment->article_id,
        ]);

        return back();
    }

    public function update(CommentRequest $request, Article $article, Comment $comment)
    {
        $this->authorize('update', $comment);

        $comment->update($request->validated());

        return back();
    }

    public function destroy(Article $article, Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->children()->delete();
        $comment->delete();

        return back();
    }
    
    public function reportSpam(Comment $comment, Request $request)
    {
        if (!auth()->user()->hasReportedComment($comment)) {
            if ($comment->spam_reports >= 10) {
                $comment->update(['is_spam' => true]);
            }

            $request->user()->reports()->attach($comment, [
                'reason' => $request->reason,
            ]);
        }

        return back();
    }

    public function like(Request $request, Comment $comment)
    {
        $like = $comment->likes()->where('user_id', $request->user()->id)->first();

        if ($like) {
            $like->delete();
        } else {
            $comment->likes()->create(['user_id' => $request->user()->id]);
        }

        return back();
    }
}
