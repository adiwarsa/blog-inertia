import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import ArticleBlock from '@/Pages/Articles/Partials/ArticleBlock';
import Pagination from '@/Components/Pagination.jsx';
import Filter from '@/Pages/Articles/Partials/Filter.jsx';
import MetaTags from '@/Components/MetaTag';

export default function Index({ params }) {
    const { data: articles, meta, links } = usePage().props.articles;
    return (
        <div>
            <Head title={params.title} />
            <MetaTags
                title={params.title}
                description={params.subtitle}
                url={route('articles.index')}
            />
            <div className="bg-gray-950 pb-10 pt-16">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">{params.title}</h2>
                            <p className="text-lg leading-8 text-gray-300">{params.subtitle}</p>
                        </div>

                        <Filter />
                    </div>
                </Container>
            </div>
            <Container>
                <div className="py-24">
                    <ArticleBlock articles={articles} />
                    {meta.has_pages && (
                        <div className="mt-24">
                            <Pagination meta={meta} links={links} />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} />;