import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import ArticleBlock from '@/Pages/Articles/Partials/ArticleBlock';
import Header from '@/Components/Header';

export default function Home({ articles, popularArticles }) {
    return (
        <div>
            <Head title="Blog Inertia" />
            <Header
                title="Blog with React Inertia"
                subtitle="Masukkan Sandi...👍 Masukkan, Sandi?...😲 Masukkan Sandi!...😋"
            />
            <Container>
                <div className="py-24">
                    <div className="mb-6">
                        <h4 className="text-xl font-semibold">Weekly Popular</h4>
                        <p className="text-gray-500">The most popular articles over the past 7 days</p>
                    </div>
                    <ArticleBlock articles={popularArticles} />
                    <div className="mt-12 text-right">
                        <Link className="text-sky-500 hover:underline" href={route('articles.popular', ['week'])}>
                            See more popular articles
                        </Link>
                    </div>

                    <div className="mb-6 mt-24">
                        <h4 className="text-xl font-semibold">Latest Articles</h4>
                        <p className="text-gray-500">The most recent articles on the site</p>
                    </div>

                    <ArticleBlock articles={articles} />
                    <div className="mt-12 text-right">
                        <Link className="text-sky-500 hover:underline" href={route('articles.index')}>
                            See more articles
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;