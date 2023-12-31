import './bootstrap';
import '../css/app.css';

import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Context/ThemeContext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*')),
    setup({ el, App, props }) {
        hydrateRoot(el, <ThemeProvider>
            <App {...props} />
        </ThemeProvider>)
    },
    progress: {
        color: '#4B5563',
    },
});