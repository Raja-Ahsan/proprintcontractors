import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

function priceCell(p) {
    if (p.type === 'variable') {
        const range = p.price_range;
        if (
            range != null &&
            typeof range.min !== 'undefined' &&
            typeof range.max !== 'undefined'
        ) {
            const min = Number(range.min);
            const max = Number(range.max);
            if (!Number.isFinite(min)) {
                return '—';
            }

            return min !== max
                ? `${money(min)} – ${money(max)}`
                : money(min);
        }

        if (p.price != null && p.price !== '') {
            return money(p.price);
        }

        return '—';
    }

    if (p.price == null || p.price === '') {
        return '—';
    }

    return money(p.price);
}

function thumbnailUrl(p) {
    return p.image_url ?? p.imageUrl ?? null;
}

function ProductThumb({ url }) {
    const [failed, setFailed] = useState(false);
    if (!url || failed) {
        return (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                —
            </div>
        );
    }

    return (
        <img
            src={url}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
        />
    );
}

const fieldClass =
    'mt-1 rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

function productRouteKey(p) {
    return p.slug ?? p.id;
}

export default function Index({ products, filters }) {
    const [q, setQ] = useState(filters.q ?? '');

    function search(e) {
        e.preventDefault();
        router.get(
            route('admin.products.index'),
            { q },
            { preserveState: true, replace: true },
        );
    }

    function deleteProduct(p) {
        if (
            !window.confirm(
                `Delete "${p.name}"? This permanently removes the product and its images.`,
            )
        ) {
            return;
        }

        router.delete(
            route('admin.products.destroy', {
                product: productRouteKey(p),
            }),
            {
                preserveScroll: true,
            },
        );
    }

    return (
        <AdminLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">
                            Catalog
                        </p>
                        <h1 className="mt-1 text-2xl font-black md:text-3xl">
                            Products
                        </h1>
                    </div>
                    <Link
                        href={route('admin.products.create')}
                        className="btn-shimmer inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
                    >
                        Add product
                    </Link>
                </div>
            }
        >
            <Head title="Products" />

            <div className="w-full">
                <form
                    onSubmit={search}
                    className="mb-6 flex flex-wrap items-end gap-3"
                >
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground">
                            Search
                        </label>
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className={`${fieldClass} px-3 py-2`}
                            placeholder="Name or SKU"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
                    >
                        Search
                    </button>
                </form>

                <div className="overflow-x-auto rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-sm">
                    <table className="min-w-[860px] w-full divide-y divide-border">
                        <thead className="bg-secondary/80">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Image
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Product
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    SKU
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Category
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Stock
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {products.data.map((p) => (
                                <tr
                                    key={p.id}
                                    className="group transition-colors hover:bg-secondary/30"
                                >
                                    <td className="px-4 py-2 align-top">
                                        <div className="h-11 w-11 overflow-hidden rounded-lg border border-border bg-secondary ring-1 ring-border/80">
                                            <ProductThumb
                                                key={`${p.id}-${thumbnailUrl(p) ?? ''}`}
                                                url={thumbnailUrl(p)}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 align-top text-sm font-semibold text-foreground">
                                        {p.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm capitalize text-muted-foreground">
                                        {p.type === 'variable'
                                            ? 'Variable'
                                            : 'Simple'}
                                    </td>
                                    <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                                        {p.sku ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {p.category?.name}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm tabular-nums text-foreground">
                                        {priceCell(p)}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                                        {p.stock_quantity}
                                    </td>
                                    <td className="sticky right-0 z-10 bg-card/95 px-4 py-3 align-middle shadow-[-10px_0_16px_-10px_rgba(0,0,0,0.12)] backdrop-blur-sm group-hover:bg-secondary/40">
                                        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                                            <a
                                                href={route(
                                                    'products.show',
                                                    productRouteKey(p),
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={
                                                    p.is_active
                                                        ? 'Open on store (new tab)'
                                                        : 'Inactive — store page may 404'
                                                }
                                                className="inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm ring-1 ring-border/50 hover:border-primary hover:text-primary"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                                View
                                            </a>
                                            <Link
                                                href={route(
                                                    'admin.products.edit',
                                                    productRouteKey(p),
                                                )}
                                                className="inline-flex items-center justify-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary shadow-sm hover:bg-primary/20"
                                            >
                                                <Pencil className="h-3.5 w-3.5 shrink-0" />
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteProduct(p)
                                                }
                                                className="inline-flex items-center justify-center gap-1 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-semibold text-destructive shadow-sm hover:bg-destructive/20"
                                            >
                                                <Trash2 className="h-3.5 w-3.5 shrink-0" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.links?.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 border-t border-border px-4 py-4">
                            {products.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`rounded-full px-3 py-1 text-sm transition-colors ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-foreground ring-1 ring-border hover:border-primary'
                                    } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
