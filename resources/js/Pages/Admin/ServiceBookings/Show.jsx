import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(amount));
}

const selectClass = 'mt-1 rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Show({ booking, statuses }) {
    const form = useForm({ status: booking.status });

    return (
        <AdminLayout header={<div><p className="text-xs font-bold uppercase tracking-widest text-primary">Service booking</p><h1 className="mt-1 text-2xl font-black">{booking.booking_number}</h1></div>}>
            <Head title={`Booking ${booking.booking_number}`} />
            <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant">
                <div className="border-b border-border px-6 py-4 text-sm">
                    <p><span className="text-muted-foreground">Service:</span> <strong>{booking.category_name} — {booking.service_name}</strong></p>
                    <p className="mt-2"><span className="text-muted-foreground">Customer:</span> {booking.customer_name} ({booking.customer_email})</p>
                    {booking.customer_phone && <p className="mt-1"><span className="text-muted-foreground">Phone:</span> {booking.customer_phone}</p>}
                    <p className="mt-2"><span className="text-muted-foreground">Payment:</span> <span className="capitalize">{booking.payment_status}</span></p>
                    <p className="mt-1"><span className="text-muted-foreground">Placed:</span> {booking.placed_at ? new Date(booking.placed_at).toLocaleString() : '—'}</p>
                    {booking.notes && <p className="mt-4 rounded-lg bg-secondary/40 p-3 text-muted-foreground"><span className="font-semibold text-foreground">Notes:</span> {booking.notes}</p>}
                </div>
                <div className="border-b border-border px-6 py-4">
                    <p className="text-2xl font-bold">{money(booking.total)}</p>
                    <p className="text-xs text-muted-foreground">Package price at booking: {money(booking.service_price)}</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); form.patch(route('admin.service-bookings.status', booking.id)); }} className="flex flex-wrap items-end gap-3 px-6 py-4">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground">Status</label>
                        <select value={form.data.status} onChange={(e) => form.setData('status', e.target.value)} className={selectClass}>
                            {statuses.map((s) => (<option key={s} value={s}>{s}</option>))}
                        </select>
                        <InputError message={form.errors.status} className="mt-2" />
                    </div>
                    <PrimaryButton disabled={form.processing}>Update status</PrimaryButton>
                </form>
                <div className="border-t border-border px-6 py-4">
                    <Link href={route('admin.service-bookings.index')} className="text-sm font-semibold text-primary hover:underline">← Back to bookings</Link>
                </div>
            </div>
        </AdminLayout>
    );
}
