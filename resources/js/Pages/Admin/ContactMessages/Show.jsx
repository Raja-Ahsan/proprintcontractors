import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ message }) {
    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Contact message
                    </p>
                    <h1 className="mt-1 text-2xl font-black">{message.subject}</h1>
                </div>
            }
        >
            <Head title={`Message — ${message.subject}`} />

            <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant">
                <div className="border-b border-border px-6 py-4 text-sm">
                    <p>
                        <span className="text-muted-foreground">From:</span>{' '}
                        <strong>{message.name}</strong>
                    </p>
                    <p className="mt-2">
                        <span className="text-muted-foreground">Email:</span>{' '}
                        <a
                            href={`mailto:${message.email}`}
                            className="font-semibold text-primary hover:underline"
                        >
                            {message.email}
                        </a>
                    </p>
                    <p className="mt-2">
                        <span className="text-muted-foreground">Received:</span>{' '}
                        {new Date(message.created_at).toLocaleString()}
                    </p>
                </div>

                <div className="px-6 py-5">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                        Message
                    </h2>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {message.message}
                    </p>
                </div>

                <div className="border-t border-border px-6 py-4">
                    <Link
                        href={route('admin.contact-messages.index')}
                        className="text-sm font-semibold text-primary hover:underline"
                    >
                        ← Back to messages
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
