import { useScrollReveal } from '@/Components/Shop/MouseSpotlight';
import { catalogCategories } from '@/data/catalog';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

function priceLabel(p) {
    if (
        p.price_range &&
        Number(p.price_range.min) !== Number(p.price_range.max)
    ) {
        return `${money(p.price_range.min)} – ${money(p.price_range.max)}`;
    }

    return money(p.price);
}

export default function Index({ products }) {
    useScrollReveal();

    const [cat, setCat] = useState('All');
    const [q, setQ] = useState('');

    const pills = useMemo(() => {
        const fromDb = [
            ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
        ];
        if (fromDb.length > 0) {
            return ['All', ...fromDb.sort()];
        }
        return catalogCategories;
    }, [products]);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const catName = p.category?.name ?? '';
            const okCat = cat === 'All' || catName === cat;
            const qLower = q.toLowerCase();
            const okQ =
                !q ||
                p.name.toLowerCase().includes(qLower) ||
                (p.sku && String(p.sku).toLowerCase().includes(qLower));
            return okCat && okQ;
        });
    }, [products, cat, q]);

    return (
        <ShopLayout title="Products">
            <Head>
                <meta
                    name="description"
                    content="Browse our full range of customizable print on demand products: apparel, drinkware, signage, marketing materials and more."
                />
            </Head>

            <section className="relative overflow-hidden border-b border-border bg-hero">
                <div className="absolute inset-0 animate-grid bg-grid opacity-50" />
                <div
                    className="orb animate-orb -top-20 left-1/4 h-80 w-80"
                    style={{ background: 'var(--gradient-primary)' }}
                />
                <div className="scan-line" />
                <div className="container relative mx-auto space-y-4 px-4 py-20 text-center">
                    <p className="reveal reveal-1 text-sm font-bold uppercase tracking-widest text-primary">
                        Shop
                    </p>
                    <h1 className="reveal reveal-2 text-5xl font-black md:text-6xl">
                        Custom{' '}
                        <span className="gradient-text-animated">Products</span>
                    </h1>
                    <p className="reveal reveal-3 mx-auto max-w-2xl text-muted-foreground">
                        Customize any product. Choose your colors, sizes and add your
                        branding — we&apos;ll print it to perfection.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <div className="mb-10 flex flex-col gap-4 lg:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 outline-none transition-colors focus:border-primary"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                        {pills.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setCat(c)}
                                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                                    cat === c
                                        ? 'bg-primary text-primary-foreground shadow-glow'
                                        : 'border border-border bg-card hover:border-primary'
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((p) => (
                        <Link
                            key={p.id}
                            href={route('products.show', p.slug)}
                            className="group neon-card animate-fade-up overflow-hidden rounded-2xl border border-border bg-card tilt-card"
                        >
                            <div className="relative aspect-square overflow-hidden bg-secondary">
                                {p.image_url ? (
                                    <img
                                        src={p.image_url}
                                        alt={p.name}
                                        width={500}
                                        height={500}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                        No image
                                    </div>
                                )}
                                <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-bold backdrop-blur">
                                    {p.category?.name}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="mb-2 font-bold transition-colors group-hover:text-primary">
                                    {p.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-black gradient-text">
                                        {priceLabel(p)}
                                    </p>
                                    <span className="text-xs text-muted-foreground">
                                        Customize →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground">
                        No products match your search.
                    </div>
                )}
            </section>
        </ShopLayout>
    );
}
