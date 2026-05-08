import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

const selectClass =
    'mt-1 rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Index({ orders, filters, statuses }) {
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilter(e) {
        e.preventDefault();
        router.get(
            route('admin.orders.index'),
            { status },
            { preserveState: true, replace: true },
        );
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Sales
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">Orders</h1>
                </div>
            }
        >
            <Head title="Orders" />

            <div className="w-full">
                <form
                    onSubmit={applyFilter}
                    className="mb-6 flex flex-wrap items-end gap-3"
                >
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={selectClass}
                        >
                            <option value="">All</option>
                            {statuses.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
                    >
                        Filter
                    </button>
                </form>

                <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-sm">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-secondary/80">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Order
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {orders.data.map((order) => (
                                <tr
                                    key={order.id}
                                    className="transition-colors hover:bg-secondary/30"
                                >
                                    <td className="px-4 py-3 text-sm">
                                        <Link
                                            href={route(
                                                'admin.orders.show',
                                                order.id,
                                            )}
                                            className="font-semibold text-primary hover:underline"
                                        >
                                            {order.order_number}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-foreground/90">
                                        {order.user?.name}
                                        <span className="block text-xs text-muted-foreground">
                                            {order.user?.email}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {order.placed_at
                                            ? new Date(
                                                  order.placed_at,
                                              ).toLocaleString()
                                            : '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm capitalize text-muted-foreground">
                                        {order.status}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                                        {money(order.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.links?.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 border-t border-border px-4 py-4">
                            {orders.links.map((link, idx) => (
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
