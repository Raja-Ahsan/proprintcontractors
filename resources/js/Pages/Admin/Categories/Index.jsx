import DangerButton from '@/Components/DangerButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ categories }) {
    function destroy(id) {
        if (confirm('Delete this category?')) {
            router.delete(route('admin.categories.destroy', id));
        }
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
                            Categories
                        </h1>
                    </div>
                    <Link
                        href={route('admin.categories.create')}
                        className="btn-shimmer inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
                    >
                        Add category
                    </Link>
                </div>
            }
        >
            <Head title="Categories" />

            <div className="w-full">
                <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-sm">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-secondary/80">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Slug
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Active
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.data.map((c) => (
                                <tr
                                    key={c.id}
                                    className="transition-colors hover:bg-secondary/30"
                                >
                                    <td className="px-4 py-3 text-sm font-semibold text-foreground">
                                        {c.name}
                                    </td>
                                    <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                                        {c.slug}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {c.is_active ? (
                                            <span className="text-emerald-400">Yes</span>
                                        ) : (
                                            'No'
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm">
                                        <Link
                                            href={route(
                                                'admin.categories.edit',
                                                c.id,
                                            )}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <DangerButton
                                            type="button"
                                            className="ms-4"
                                            onClick={() => destroy(c.id)}
                                        >
                                            Delete
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {categories.links?.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 border-t border-border px-4 py-4">
                            {categories.links.map((link, idx) => (
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
