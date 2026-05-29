import ShopLayout from '@/Layouts/ShopLayout';
import { Link } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function ServiceBookSuccess({ booking }) {
    return (
        <ShopLayout title="Booking confirmed">
            <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                    Payment received
                </p>
                <h1 className="mt-2 text-3xl font-bold text-foreground">Thank you!</h1>
                <p className="mt-4 text-muted-foreground">
                    Your booking{' '}
                    <span className="font-semibold text-foreground">
                        {booking.booking_number}
                    </span>{' '}
                    for{' '}
                    <span className="font-semibold text-foreground">
                        {booking.service_name}
                    </span>{' '}
                    was confirmed. We will reach out at{' '}
                    <span className="font-medium text-foreground">
                        {booking.customer_email}
                    </span>{' '}
                    to get started.
                </p>
                <p className="mt-6 text-lg font-semibold text-foreground">
                    Total paid: {money(booking.total)}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href={route('marketing.services')}
                        className="btn-shimmer inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
                    >
                        View more services
                    </Link>
                    <Link
                        href={route('home')}
                        className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </ShopLayout>
    );
}
