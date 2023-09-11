import Navbar from '@/Layouts/Navbar.jsx';
import Footer from '@/Layouts/Footer.jsx';
import FlashMessage from '@/Components/FlashMessage';
import { useTheme } from '@/Context/ThemeContext';

export default function AppLayout({ children }) {
    const {theme} = useTheme();
    return (
        <div className={`min-h-screen bg-white ${theme === 'light' ? 'text-black' : 'text-gray-400'} dark:bg-gray-950 `}>
            <Navbar />
            <FlashMessage />
            <main>{children}</main>
            <Footer />
        </div>
    );
}