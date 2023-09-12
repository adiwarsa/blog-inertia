import AppLayout from '@/Layouts/AppLayout.jsx';
import Container from '@/Components/Container.jsx';
import { Head, Link, usePage } from '@inertiajs/react';
import ArticleList from '@/Pages/Articles/Partials/ArticleList.jsx';
import Pagination from '@/Components/Pagination.jsx';
import { useState } from 'react';
import { useFilter } from '@/Hooks/useFilter.js';
import Select from '@/Components/Select.jsx';
import SearchInput from '@/Components/SearchInput.jsx';
import { ArrowPathIcon } from '@heroicons/react/24/outline/index.js';
import clsx from 'clsx';

export default function List({filters}) {
    const { auth } = usePage().props;
    const { data: articles, meta, links } = usePage().props.articles;
    const [params, setParams] = useState(filters.state);
    useFilter({
        route: route('articles.list'),
        values: params,
        only: ['articles'],
    });
    return (
        <div>
            <Head title="List article" />
            <header className="bg-white dark:bg-gray-950 pb-10 pt-16">
            <Container>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">List article</h2>
                        <p className="text-lg leading-8 text-gray-400">All articles will be displayed here.</p>
                    </div>
            
                    <div>
                        <Link
                            href={route('articles.create')}
                            className="text-sky-500 hover:text-sky-400 hover:underline"
                        >
                            New article
                        </Link>
                    </div>
                </div>
                <div
                    className={clsx(
                        'ml-auto mt-8 grid max-w-4xl items-center gap-x-1',
                        auth.user.is_admin ? 'grid-cols-5' : 'grid-cols-4',
                    )}
                >
                    {!Array.isArray(params) ? (
                        <div className="col-span-1 grid place-items-end">
                            <Link
                                href={route('articles.list')}
                                className="grid h-9 w-9 place-items-center rounded-md text-gray-400 hover:bg-white/5 hover:text-white"
                            >
                                <ArrowPathIcon className="h-6 w-6" />
                            </Link>
                        </div>
                    ) : (
                        <div className="col-span-1" />
                    )}
                    <Select
                        value={params.category}
                        placeholder="Select a category"
                        onChange={(e) => setParams({ ...params, category: e.target.value })}
                        options={filters.categories}
                    />
                    {auth.user.is_admin && (
                        <Select
                            value={params.category}
                            placeholder="Select an author"
                            onChange={(e) => setParams({ ...params, user: e.target.value })}
                            options={filters.users}
                        />
                    )}
                    <Select
                        value={params.status}
                        placeholder="Select a status"
                        onChange={(e) => setParams({ ...params, status: e.target.value })}
                        options={filters.statuses}
                    />
                    <SearchInput
                        value={params.search}
                        onChange={(e) => setParams({ ...params, search: e.target.value })}
                    />
                </div>
            </Container>
        </header>

            <Container>
                {articles.length > 0 ? <ArticleList articles={articles} /> : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-300">No articles found</h2>
                        <p className="text-lg leading-8 text-gray-400">There are no articles to display.</p>
                    </div>
                )}
                {meta.has_pages && (
                    <div className="mt-16">
                        <Pagination meta={meta} links={links} />
                    </div>
                )}
            </Container>
        </div>
    );
}

List.layout = (page) => <AppLayout children={page} />;