import '../css/app.css';
import './bootstrap';

import InitialPageLoader from '@/Components/Shop/InitialPageLoader';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function AppShell({ App, inertiaProps }) {
    const [showInitialLoader, setShowInitialLoader] = useState(true);
    const site = inertiaProps?.initialPage?.props?.site;

    const handleLoaderDone = useCallback(() => {
        setShowInitialLoader(false);
    }, []);

    return (
        <>
            {showInitialLoader && (
                <InitialPageLoader
                    onDone={handleLoaderDone}
                    loaderLogoUrl={site?.loaderLogoUrl}
                    siteName={site?.siteName}
                />
            )}
            <App {...inertiaProps} />
        </>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<AppShell App={App} inertiaProps={props} />);
    },
    progress: {
        color: '#f97316',
    },
});
