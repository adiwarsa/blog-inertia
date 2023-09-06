import Container from '@/Components/Container.jsx';

export default function Header({ title, subtitle }) {
    return (
        <div className="bg-gray-950 py-10 sm:py-32">
            <Container>
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{title}</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">{subtitle}</p>
                </div>
            </Container>
        </div>
    );
}