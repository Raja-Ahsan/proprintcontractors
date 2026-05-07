import ShopLayout from '@/Layouts/ShopLayout';
import { Link } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function CheckoutSuccess({ order }) {
    return (
        <ShopLayout title="Thank you">
            <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                    Payment received
                </p>
                <h1 className="mt-2 text-3xl font-bold text-foreground">Thank you!</h1>
                <p className="mt-4 text-muted-foreground">
                    Your order{' '}
                    <span className="font-semibold text-foreground">
                        {order.order_number}
                    </span>{' '}
                    was placed successfully. A confirmation has been sent to{' '}
                    <span className="font-medium text-foreground">
                        {order.shipping_email}
                    </span>
                    .
                </p>
                <p className="mt-6 text-lg font-semibold text-foreground">
                    Total paid: {money(order.total)}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href={route('products.index')}
                        className="btn-shimmer inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
                    >
                        Continue shopping
                    </Link>
                    <Link
                        href={route('register')}
                        className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary"
                    >
                        Create an account to track orders
                    </Link>
                </div>
            </div>
        </ShopLayout>
    );
}
