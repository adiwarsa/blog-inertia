import { Head, usePage } from '@inertiajs/react';
import ArticleBlock from '@/Pages/Articles/Partials/ArticleBlock';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import Header from '@/Components/Header';

export default function Home() {
    const { data: articles } = usePage().props.articles
    return (
        <div>
            <Head title="Read it when you relax" />
            <Header
                title="Point of You"
                subtitle="Read it when you relax is a knowledge base for all the questions you have about our products."
            />
            <Container>
                <div className="py-24">
                    <ArticleBlock articles={articles} />
                </div>
            </Container>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;