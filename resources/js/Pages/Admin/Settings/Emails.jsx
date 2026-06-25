import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const customerTabs = [
    { id: 'welcome', label: 'Welcome (signup)' },
    { id: 'password_reset', label: 'Forgot password' },
    { id: 'order_confirmation', label: 'Order confirmation' },
    { id: 'order_confirmation_quote', label: 'Order confirmation (quote)' },
    { id: 'order_processing', label: 'Order processing' },
    { id: 'order_processing_quote', label: 'Order processing (quote)' },
    { id: 'order_shipped', label: 'Order shipped' },
    { id: 'service_booking_confirmation', label: 'Service booking confirmation' },
    { id: 'custom_order_confirmation', label: 'Custom order form (customer)' },
];

const adminTabs = [
    { id: 'contact_notification', label: 'Contact form (admin)' },
    { id: 'order_admin', label: 'New order (admin)' },
    { id: 'service_booking_admin', label: 'Service booking (admin)' },
    { id: 'custom_order_admin', label: 'Custom order form (admin)' },
];

const allTabs = [...customerTabs, ...adminTabs];

function emptyTemplate() {
    return { subject: '', body_html: '' };
}

export default function Emails({ templates, placeholderHint, adminEmail }) {
    const [tab, setTab] = useState('welcome');

    const initialTemplates = Object.fromEntries(
        allTabs.map(({ id }) => [
            id,
            {
                subject: templates[id]?.subject ?? '',
                body_html: templates[id]?.body_html ?? '',
            },
        ]),
    );

    const form = useForm({ templates: initialTemplates });

    function setField(field, value) {
        form.setData('templates', {
            ...form.data.templates,
            [tab]: {
                ...form.data.templates[tab],
                [field]: value,
            },
        });
    }

    function submit(e) {
        e.preventDefault();
        form.put(route('admin.settings.emails.update'), {
            preserveScroll: true,
        });
    }

    const current = form.data.templates[tab] ?? emptyTemplate();
    const isAdminTab = adminTabs.some((t) => t.id === tab);

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Settings
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        Email templates
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Customer emails go to shoppers. Admin notifications go to{' '}
                        {adminEmail ? (
                            <strong className="text-foreground">{adminEmail}</strong>
                        ) : (
                            <Link
                                href={route('admin.settings.general')}
                                className="font-semibold text-primary hover:underline"
                            >
                                set an admin email in General settings
                            </Link>
                        )}
                        .
                    </p>
                </div>
            }
        >
            <Head title="Email templates" />

            <div className="w-full space-y-6">
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Customer emails
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {customerTabs.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    tab === t.id
                                        ? 'bg-primary text-primary-foreground shadow-glow'
                                        : 'border border-border bg-secondary text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Admin notifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {adminTabs.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    tab === t.id
                                        ? 'bg-primary text-primary-foreground shadow-glow'
                                        : 'border border-border bg-secondary text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {isAdminTab && !adminEmail && (
                    <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                        Add an email address in{' '}
                        <Link
                            href={route('admin.settings.general')}
                            className="font-semibold underline"
                        >
                            General settings
                        </Link>{' '}
                        so admin notifications can be delivered.
                    </p>
                )}

                <form
                    onSubmit={submit}
                    className="neon-card space-y-5 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                >
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Subject
                        </label>
                        <input
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={current.subject}
                            onChange={(e) =>
                                setField('subject', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            HTML body
                        </label>
                        <textarea
                            rows={16}
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={current.body_html}
                            onChange={(e) =>
                                setField('body_html', e.target.value)
                            }
                        />
                    </div>

                    <PrimaryButton disabled={form.processing}>
                        Save all templates
                    </PrimaryButton>
                </form>

                <div className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm">
                    <p className="font-bold text-foreground">Placeholders</p>
                    <ul className="mt-3 space-y-2 text-muted-foreground">
                        {Object.entries(placeholderHint).map(([title, body]) => (
                            <li key={title}>
                                <span className="font-semibold text-foreground">
                                    {title}:{' '}
                                </span>
                                <code className="whitespace-pre-wrap break-all text-xs">
                                    {body}
                                </code>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
