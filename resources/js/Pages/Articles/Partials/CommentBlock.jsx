import Prose from '@/Components/Prose.jsx';
import { ChatBubbleOvalLeftIcon, HeartIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline/index.js';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CommentForm from '@/Pages/Articles/Partials/CommentForm.jsx';
import CommentOptions from './CommentOption';

export default function CommentBlock({ comments }) {
    const { auth, article } = usePage().props;
    const [open, setOpen] = useState(false);
    const [attributes, setAttributes] = useState({
        body: '',
        url: '',
        method: 'post',
        item: {},
        submitText: 'Comment',
    });
    return (
        <>
        {open && (
            <CommentForm
                {...{
                    attributes,
                    auth,
                    open,
                    close: () => setOpen(false),
                }}
            />
        )}
            {comments.length > 0 && (
                <div className="mt-6 space-y-6">
                    {comments.map((comment) => (
                        <div className="flex" key={comment.id}>
                            <div className="mr-4 flex-shrink-0">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={comment.author.gravatar}
                                    alt={comment.author.name}
                                />
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">
                                        {comment.author.name}
                                        <small className="ml-2 text-sm text-gray-400">{comment.created_at}</small>
                                    </h4>
                                        <CommentOptions {...{ auth, article, comment }} />
                                </div>
                                <div className="mt-1 leading-relaxed text-gray-400">
                                    <div
                                        className="prose prose-invert prose-cyan prose-pre:bg-gray-800"
                                        dangerouslySetInnerHTML={{ __html: comment.markdown_formatted}}
                                    />

                                    <div className="mt-4 flex items-center gap-x-6 py-2">
                                        {comment.can_be_replied && (
                                            <button 
                                            onClick={() => {
                                                setOpen(true);
                                                setAttributes({
                                                    ...attributes,
                                                    body: null,
                                                    url: route('comments.reply', [comment]),
                                                    item: comment,
                                                    submitText: 'Reply',
                                                });
                                            }}
                                            className="flex items-center text-gray-500 hover:text-white focus:outline-none">
                                                <ChatBubbleOvalLeftIcon className="h-4 w-4" />
                                                {comment.children_count > 0 && (
                                                    <span className="ml-2 text-sm">{comment.children_count}</span>
                                                )}
                                            </button>
                                        )}
                                        {auth.user?.id === comment.author.id && (
                                            <button
                                                onClick={() => {
                                                    setOpen(true);
                                                    setAttributes({
                                                        url: route('comments.update', [article, comment]),
                                                        body: comment.body,
                                                        item: comment,
                                                        method: 'put',
                                                        submitText: 'Update',
                                                    });
                                                }}
                                                className="text-gray-500 hover:text-white focus:outline-none"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                        )}
                                        <Link
                                            as="button"
                                            method="post"
                                            preserveScroll
                                            href={route('comments.like', [comment])}
                                            className="inline-flex h-6 w-6 items-center justify-center text-gray-500 hover:text-pink-500 focus:outline-none"
                                        >
                                            <HeartIcon className="h-4 w-4 shrink-0" />
                                            {comment.likes_count > 0 && (
                                                <span className="ml-2 text-sm">{comment.likes_count}</span>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                                <CommentBlock comments={comment.children} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}