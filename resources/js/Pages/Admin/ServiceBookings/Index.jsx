import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(amount));
}

const selectClass = 'mt-1 rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Index({ bookings, filters, statuses }) {
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilter(e) {
        e.preventDefault();
        router.get(route('admin.service-bookings.index'), { status }, { preserveState: true, replace: true });
    }

    return (
        <AdminLayout header={<div><p className="text-xs font-bold uppercase tracking-widest text-primary">Services</p><h1 className="mt-1 text-2xl font-black md:text-3xl">Service bookings</h1></div>}>
            <Head title="Service bookings" />
            <form onSubmit={applyFilter} className="mb-6 flex flex-wrap items-end gap-3">
                <div>
                    <label className="block text-xs font-medium text-muted-foreground">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
                        <option value="">All</option>
                        {statuses.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                </div>
                <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Filter</button>
            </form>
            <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-secondary/80">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Booking</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Service</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Customer</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Status</th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-muted-foreground">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {bookings.data.map((b) => (
                            <tr key={b.id}>
                                <td className="px-4 py-3 text-sm">
                                    <Link href={route('admin.service-bookings.show', b.id)} className="font-semibold text-primary hover:underline">{b.booking_number}</Link>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <span className="block font-medium">{b.service_name}</span>
                                    <span className="text-xs text-muted-foreground">{b.category_name}</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-muted-foreground">{b.customer_name}<br />{b.customer_email}</td>
                                <td className="px-4 py-3 text-sm capitalize">{b.status}</td>
                                <td className="px-4 py-3 text-right text-sm font-semibold">{money(b.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
