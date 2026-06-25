import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const selectClass =
    'mt-1 rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Index({ submissions, filters }) {
    const [read, setRead] = useState(filters.read ?? '');

    function applyFilter(e) {
        e.preventDefault();
        router.get(
            route('admin.custom-order-submissions.index'),
            { read },
            { preserveState: true, replace: true },
        );
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Custom orders
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        Order form submissions
                    </h1>
                </div>
            }
        >
            <Head title="Order form submissions" />

            <form
                onSubmit={applyFilter}
                className="mb-6 flex flex-wrap items-end gap-3"
            >
                <div>
                    <label className="block text-xs font-medium text-muted-foreground">
                        Status
                    </label>
                    <select
                        value={read}
                        onChange={(e) => setRead(e.target.value)}
                        className={selectClass}
                    >
                        <option value="">All</option>
                        <option value="0">Unread</option>
                        <option value="1">Read</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                    Filter
                </button>
            </form>

            <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-secondary/80">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Reference
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Customer
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Categories
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Submitted
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {submissions.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                                >
                                    No order form submissions yet.
                                </td>
                            </tr>
                        ) : (
                            submissions.data.map((submission) => (
                                <tr
                                    key={submission.id}
                                    className={!submission.is_read ? 'bg-primary/5' : ''}
                                >
                                    <td className="px-4 py-3 text-sm font-semibold">
                                        <Link
                                            href={route(
                                                'admin.custom-order-submissions.show',
                                                submission.submission_number,
                                            )}
                                            className="text-primary hover:underline"
                                        >
                                            {submission.submission_number}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <p className="font-semibold">{submission.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {submission.email}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {submission.categories_summary}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(submission.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                submission.is_read
                                                    ? 'bg-secondary text-muted-foreground'
                                                    : 'bg-primary/20 text-primary'
                                            }`}
                                        >
                                            {submission.is_read ? 'Read' : 'New'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
