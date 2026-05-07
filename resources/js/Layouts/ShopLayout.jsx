import { ShopFooter } from '@/Components/Shop/ShopFooter';
import { ShopHeader } from '@/Components/Shop/ShopHeader';
import { Head, usePage } from '@inertiajs/react';

export default function ShopLayout({ title, children }) {
    const { flash, seo, site } = usePage().props;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Head title={title}>
                {seo?.metaDescription && (
                    <meta name="description" content={seo.metaDescription} />
                )}
                {seo?.metaKeywords && (
                    <meta name="keywords" content={seo.metaKeywords} />
                )}
                {seo?.ogImageUrl && (
                    <meta property="og:image" content={seo.ogImageUrl} />
                )}
                {site?.faviconUrl && (
                    <link rel="icon" href={site.faviconUrl} />
                )}
            </Head>

            <ShopHeader />

            {flash?.success && (
                <div className="border-b border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-100">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="border-b border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100">
                    {flash.error}
                </div>
            )}

            <main className="flex-1">{children}</main>

            <ShopFooter />
        </div>
    );
}
