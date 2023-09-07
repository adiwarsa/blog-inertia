import AppLayout from '@/Layouts/AppLayout.jsx';
import { Head, Link } from '@inertiajs/react';
import Container from '@/Components/Container.jsx';
import Prose from '@/Components/Prose.jsx';
import Image from '@/Components/Image.jsx';

export default function Show({ article }) {
    return (
        <div>
            <Head title={article.title} />

            <div className="mb-4 border-b border-gray-900 bg-gray-950 py-8 sm:py-32 lg:mb-16">
                <div className="grid lg:grid-cols-6 lg:gap-24">
                    <div className="flex h-full flex-col pl-4 pr-4 lg:col-span-3 lg:col-start-1 lg:pl-28">
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold tracking-tight text-white">{article.title}</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-400">{article.excerpt}</p>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <div className="text-sm text-gray-300">
                                Fill in:{' '}
                                <Link className="font-medium text-sky-500" href={article.category.href}>
                                    {article.category.name}
                                </Link>
                            </div>

                            <div className="flex items-center gap-x-3">
                                <div className="shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={article.author.gravatar}
                                        alt={article.author.name}
                                    />
                                </div>
                                <div>
                                    <h4>{article.author.name}</h4>
                                    <div className="text-sm text-gray-300">
                                        <span>Published on</span>{' '}
                                        <time dateTime={article.published_at}>{article.published_at}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:col-span-3 lg:col-start-4 lg:block">
                        <Image
                            className="h-[26rem] w-full rounded-l-2xl object-cover object-center"
                            src={article.thumbnail}
                            alt={article.title}
                        />
                    </div>
                </div>
            </div>
            <Container>
                <div className="relative flex flex-col gap-20 lg:flex-row">
                    <div className="hidden w-1/4 lg:block" />
                    <div className="w-full lg:w-2/3">
                        <Prose value={article.body} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} />;