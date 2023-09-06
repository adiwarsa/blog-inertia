import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import Header from '@/Components/Header';

export default function Home() {
    return (
        <div>
            <Head title="Read it when you relax" />
            <Header
                title="Point of You"
                subtitle="Read it when you relax is a knowledge base for all the questions you have about our products."
            />
            <Container>
                <div className="py-24">
                    {/* Articles go here */}
                </div>
            </Container>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;