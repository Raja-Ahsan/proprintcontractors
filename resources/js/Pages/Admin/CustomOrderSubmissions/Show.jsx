import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function formatDate(value) {
    if (!value) {
        return '—';
    }

    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export default function Show({ submission }) {
    const items = submission.order_items ?? [];
    const artworkFiles = submission.artwork_files ?? [];

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Custom order
                    </p>
                    <h1 className="mt-1 text-2xl font-black">
                        {submission.submission_number}
                    </h1>
                </div>
            }
        >
            <Head title={`Order form — ${submission.submission_number}`} />

            <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant">
                <div className="border-b border-border px-6 py-4 text-sm">
                    <div className="grid gap-3 sm:grid-cols-2">
                        <p>
                            <span className="text-muted-foreground">Customer:</span>{' '}
                            <strong>{submission.name}</strong>
                        </p>
                        <p>
                            <span className="text-muted-foreground">Phone:</span>{' '}
                            {submission.phone || '—'}
                        </p>
                        <p>
                            <span className="text-muted-foreground">Email:</span>{' '}
                            <a
                                href={`mailto:${submission.email}`}
                                className="font-semibold text-primary hover:underline"
                            >
                                {submission.email}
                            </a>
                        </p>
                        <p>
                            <span className="text-muted-foreground">Order date:</span>{' '}
                            {formatDate(submission.order_date)}
                        </p>
                        <p>
                            <span className="text-muted-foreground">Submitted:</span>{' '}
                            {new Date(submission.created_at).toLocaleString()}
                        </p>
                        <p>
                            <span className="text-muted-foreground">Categories:</span>{' '}
                            {submission.categories_summary}
                        </p>
                    </div>
                </div>

                <div className="border-b border-border px-6 py-5">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                        Order items
                    </h2>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-secondary/50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Category
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Qty
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Size / specs
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Color
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium uppercase text-muted-foreground">
                                        Notes
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {items.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-3 py-4 text-muted-foreground"
                                        >
                                            No items recorded.
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-3 font-medium">
                                                {item.category || '—'}
                                            </td>
                                            <td className="px-3 py-3">
                                                {item.quantity ?? '—'}
                                            </td>
                                            <td className="px-3 py-3">
                                                {item.size_specs || '—'}
                                            </td>
                                            <td className="px-3 py-3">
                                                {item.color_material ? (
                                                    <span className="inline-flex items-center gap-2">
                                                        <span
                                                            className="inline-block h-4 w-4 rounded border border-border"
                                                            style={{
                                                                backgroundColor:
                                                                    item.color_material,
                                                            }}
                                                        />
                                                        {item.color_material}
                                                    </span>
                                                ) : (
                                                    '—'
                                                )}
                                            </td>
                                            <td className="px-3 py-3 whitespace-pre-wrap">
                                                {item.notes || '—'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {submission.design_notes && (
                    <div className="border-b border-border px-6 py-5">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                            Design &amp; instructions
                        </h2>
                        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
                            {submission.design_notes}
                        </p>
                    </div>
                )}

                {artworkFiles.length > 0 && (
                    <div className="border-b border-border px-6 py-5">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                            Artwork files
                        </h2>
                        <ul className="mt-4 space-y-2 text-sm">
                            {artworkFiles.map((file) => (
                                <li key={file.path}>
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        {file.original_name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="px-6 py-4">
                    <Link
                        href={route('admin.custom-order-submissions.index')}
                        className="text-sm font-semibold text-primary hover:underline"
                    >
                        ← Back to submissions
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
