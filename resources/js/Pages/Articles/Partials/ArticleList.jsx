import { Link, usePage } from '@inertiajs/react';
import {
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    EyeIcon,
    InformationCircleIcon,
    PencilIcon,
    TrashIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline/index.js';
import useSwal from '@/Hooks/useSwal.js';
import clsx from 'clsx';
import { useTheme } from '@/Context/ThemeContext';

export default function ArticleList({ articles }) {
    const { ask } = useSwal();
    const { auth } = usePage().props;
    const { theme } = useTheme();
    return (
        <div className="grid grid-cols-1 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {articles.map((article) => (
                <div
                    key={article.id}
                    className="flex flex-col items-start justify-between rounded-2xl border border-transparent bg-sky-950/20 p-4 shadow-lg"
                >
                    <div className="mb-2 flex w-full items-center justify-between">
                        <div className="flex items-center gap-x-2 rounded-full bg-sky-900/50 px-2 py-1 text-xs">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-sky-400" />
                            <span className="text-sky-300">{article.comments_count}</span>
                        </div>
                        <div
                            className={clsx(
                                'flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium capitalize',
                                article.status === 'published'
                                    ? 'bg-emerald-900/50 text-emerald-400'
                                    : 'bg-orange-900/50 text-orange-400',
                            )}
                        >
                            {article.status === 'published' ? (
                                <CheckCircleIcon className="h-3.5 w-3.5" />
                            ) : (
                                <InformationCircleIcon className="h-3.5 w-3.5" />
                            )}
                            {article.status}
                        </div>
                    </div>
                    <div className="mt-2 max-w-xl space-y-3">
                        <div className="flex items-center justify-between gap-x-4 text-xs">
                            <time dateTime={article.published_at} className="text-gray-400">
                                {article.published_at}
                            </time>
                            <span className="text-sky-500 hover:underline">{article.category.name}</span>
                        </div>
                        <div className="group relative">
                            <h3 className="line-clamp-1 font-semibold leading-6 text-gray-300 group-hover:text-white">
                                <Link href={article.href}>{article.title}</Link>
                            </h3>
                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">{article.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            {article.author ? (
                                <div className="relative flex items-center gap-x-2 text-xs font-semibold">
                                    <UserCircleIcon className="h-4 w-4" />
                                    <Link href={article.author.href}>{article.author.name}</Link>
                                </div>
                            ) : (
                                <Link
                                    href={article.href}
                                    className="grid h-7 w-7 place-items-center rounded-xl text-gray-400 hover:bg-sky-600/20 hover:text-sky-400"
                                >
                                    <EyeIcon className="h-3.5 w-3.5" />
                                </Link>
                            )}

                            <div className="flex items-center gap-x-1">
                                {auth.user?.is_admin && (
                                    <>
                                        {article.status !== 'published' && (
                                            <button
                                                onClick={() => {
                                                    ask({
                                                        url: route('articles.publish', [article]),
                                                        method: 'put',
                                                        message: 'Are you sure you want to publish this article?',
                                                    });
                                                }}
                                                className="grid h-7 w-7 place-items-center rounded-xl text-gray-400 hover:bg-emerald-600/20 hover:text-emerald-400"
                                            >
                                                <CheckCircleIcon className="h-3.5 w-3.5" />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                ask({
                                                    url: route('articles.destroy', [article]),
                                                    method: 'delete',
                                                });
                                            }}
                                            className="grid h-7 w-7 place-items-center rounded-xl text-gray-400 hover:bg-rose-600/20 hover:text-rose-400"
                                        >
                                            <TrashIcon className="h-3.5 w-3.5" />
                                        </button>
                                    </>
                                )}
                                <Link
                                    href={route('articles.edit', [article])}
                                    className="grid h-7 w-7 place-items-center rounded-xl text-gray-400 hover:bg-blue-600/20 hover:text-blue-400"
                                >
                                    <PencilIcon className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}