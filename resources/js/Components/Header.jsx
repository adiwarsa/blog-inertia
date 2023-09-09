import Container from '@/Components/Container.jsx';

export default function Header({ title, subtitle }) {
    return (
        <div className="border-b border-t border-gray-800 bg-gray-900 py-10 sm:py-20">
            <Container>
                <div className="max-w-xl">
                    <div>
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">{title}</h2>
                        <p className="text-lg leading-8 text-gray-400">{subtitle}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
}