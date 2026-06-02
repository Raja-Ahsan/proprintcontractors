import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const selectClass =
    'mt-1 rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Index({ messages, filters }) {
    const [read, setRead] = useState(filters.read ?? '');

    function applyFilter(e) {
        e.preventDefault();
        router.get(
            route('admin.contact-messages.index'),
            { read },
            { preserveState: true, replace: true },
        );
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Inbox
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        Contact messages
                    </h1>
                </div>
            }
        >
            <Head title="Contact messages" />

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
                                From
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Subject
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Received
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {messages.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                                >
                                    No contact messages yet.
                                </td>
                            </tr>
                        ) : (
                            messages.data.map((m) => (
                                <tr key={m.id} className={!m.is_read ? 'bg-primary/5' : ''}>
                                    <td className="px-4 py-3 text-sm">
                                        <Link
                                            href={route('admin.contact-messages.show', m.id)}
                                            className="font-semibold text-primary hover:underline"
                                        >
                                            {m.name}
                                        </Link>
                                        <p className="text-xs text-muted-foreground">
                                            {m.email}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{m.subject}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(m.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                m.is_read
                                                    ? 'bg-secondary text-muted-foreground'
                                                    : 'bg-primary/20 text-primary'
                                            }`}
                                        >
                                            {m.is_read ? 'Read' : 'New'}
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
