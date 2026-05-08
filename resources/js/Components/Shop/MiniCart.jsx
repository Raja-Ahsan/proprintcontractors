import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export function MiniCart() {
    const { cartPreview, cartSubtotal, cartCount } = usePage().props;
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const close = () => setOpen(false);
        const id = window.setTimeout(() => {
            document.addEventListener('click', close);
        }, 0);

        return () => {
            window.clearTimeout(id);
            document.removeEventListener('click', close);
        };
    }, [open]);

    const preview = Array.isArray(cartPreview) ? cartPreview : [];

    return (
        <div className="relative" ref={wrapRef}>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen((o) => !o);
                }}
                className="relative inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary"
                aria-expanded={open}
                aria-haspopup="true"
            >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                        {cartCount > 99 ? '99+' : cartCount}
                    </span>
                )}
            </button>

            {open && (
                <div
                    className="animate-fade-up absolute right-0 z-[60] mt-2 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
                    role="dialog"
                    aria-label="Cart preview"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="border-b border-border bg-secondary/50 px-4 py-3">
                        <p className="text-sm font-bold text-foreground">
                            Your cart
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {cartCount > 0
                                ? `${cartCount} item${cartCount === 1 ? '' : 's'}`
                                : 'Empty'}
                        </p>
                    </div>

                    {preview.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                            Nothing here yet — add something from the store.
                            <Link
                                href={route('products.index')}
                                className="mt-4 block font-semibold text-primary hover:underline"
                                onClick={() => setOpen(false)}
                            >
                                Browse products
                            </Link>
                        </div>
                    ) : (
                        <>
                            <ul className="max-h-[min(50vh,20rem)] divide-y divide-border overflow-y-auto px-3 py-2">
                                {preview.map((line) => (
                                    <li
                                        key={line.id}
                                        className="flex gap-3 py-3"
                                    >
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                                            {line.image_url ? (
                                                <img
                                                    src={line.image_url}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                                                    —
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-foreground">
                                                {line.product_name}
                                            </p>
                                            {line.variation_summary ? (
                                                <p className="truncate text-xs text-primary">
                                                    {line.variation_summary}
                                                </p>
                                            ) : null}
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Qty {line.quantity} ·{' '}
                                                <span className="font-semibold text-foreground">
                                                    {money(line.line_total)}
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="space-y-2 border-t border-border bg-secondary/30 px-4 py-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span className="font-bold text-foreground">
                                        {money(cartSubtotal)}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={route('cart.index')}
                                        className="block rounded-full border border-border bg-background py-2.5 text-center text-sm font-semibold text-foreground transition hover:border-primary"
                                        onClick={() => setOpen(false)}
                                    >
                                        View cart
                                    </Link>
                                    <Link
                                        href={route('checkout.create')}
                                        className="block rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
                                        onClick={() => setOpen(false)}
                                    >
                                        Checkout
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
