import Container from '@/Components/Container.jsx';
import { useTheme } from '@/Context/ThemeContext';

export default function Header({ title, subtitle }) {
    const { theme } = useTheme();
    return (
        <div className="border-b border-t border-gray-800 bg-slate-300 dark:bg-gray-900 py-10 sm:py-20">
            <Container>
                <div className="max-w-xl">
                    <div>
                    <h2 className={`mb-2 text-3xl font-bold tracking-tight ${theme === 'light' ? 'text-black' : 'text-white'}`}>{title}</h2>
                        <p className={`text-lg leading-8 ${theme === 'light' ? 'text-black' : 'text-gray-400'}`}>{subtitle}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
}