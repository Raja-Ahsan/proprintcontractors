import CustomerAccountLayout from '@/Layouts/CustomerAccountLayout';
import { Head, Link } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function Index({ orders }) {
    return (
        <CustomerAccountLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Purchases
                    </p>
                    <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">
                        My orders
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Track status and open any order for full details.
                    </p>
                </div>
            }
        >
            <Head title="My orders" />

            <div className="w-full">
                <div className="neon-card overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-secondary/60">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Order
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {orders.data.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="transition hover:bg-secondary/40"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            <Link
                                                href={route(
                                                    'dashboard.orders.show',
                                                    order.id,
                                                )}
                                                className="font-semibold text-primary hover:text-primary/90"
                                            >
                                                {order.order_number}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-muted-foreground">
                                            {order.placed_at
                                                ? new Date(
                                                      order.placed_at,
                                                  ).toLocaleString()
                                                : '—'}
                                        </td>
                                        <td className="px-4 py-3 text-sm capitalize text-foreground">
                                            {order.status}
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-foreground">
                                            {money(order.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {orders.links?.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 border-t border-border px-4 py-4">
                            {orders.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                                        link.active
                                            ? 'border border-primary/40 bg-primary/15 text-primary'
                                            : 'border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary'
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
        </CustomerAccountLayout>
    );
}
