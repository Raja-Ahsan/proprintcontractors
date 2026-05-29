import DangerButton from '@/Components/DangerButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(amount));
}

export default function Index({ packages }) {
    function destroy(id) {
        if (confirm('Delete this service package?')) {
            router.delete(route('admin.service-packages.destroy', id));
        }
    }

    return (
        <AdminLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Services</p>
                        <h1 className="mt-1 text-2xl font-black md:text-3xl">Service packages</h1>
                    </div>
                    <Link href={route('admin.service-packages.create')} className="btn-shimmer inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
                        Add package
                    </Link>
                </div>
            }
        >
            <Head title="Service packages" />
            <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-secondary/80">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Popular</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Active</th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {packages.data.map((p) => (
                            <tr key={p.id}>
                                <td className="px-4 py-3 text-sm font-semibold">{p.name}</td>
                                <td className="px-4 py-3 text-sm text-muted-foreground">{p.category?.name}</td>
                                <td className="px-4 py-3 text-sm">{money(p.price)}</td>
                                <td className="px-4 py-3 text-sm">{p.popular ? 'Yes' : '—'}</td>
                                <td className="px-4 py-3 text-sm">{p.is_active ? <span className="text-emerald-400">Yes</span> : 'No'}</td>
                                <td className="px-4 py-3 text-right text-sm">
                                    <Link href={route('admin.service-packages.edit', p.slug)} className="font-medium text-primary hover:underline">Edit</Link>
                                    <DangerButton type="button" className="ms-4" onClick={() => destroy(p.slug)}>Delete</DangerButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
