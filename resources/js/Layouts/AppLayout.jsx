import Navbar from '@/Layouts/Navbar.jsx';
import Footer from '@/Layouts/Footer.jsx';
import FlashMessage from '@/Components/FlashMessage';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <FlashMessage />
            <main>{children}</main>
            <Footer />
        </div>
    );
}