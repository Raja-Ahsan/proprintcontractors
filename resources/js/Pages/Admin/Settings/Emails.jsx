import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const tabs = [
    { id: 'welcome', label: 'Welcome (signup)' },
    { id: 'password_reset', label: 'Forgot password' },
    { id: 'order_confirmation', label: 'Order confirmation' },
    { id: 'order_processing', label: 'Order processing' },
    { id: 'order_shipped', label: 'Order shipped' },
];

export default function Emails({ templates, placeholderHint }) {
    const [tab, setTab] = useState('welcome');

    const form = useForm({
        templates: {
            welcome: {
                subject: templates.welcome?.subject ?? '',
                body_html: templates.welcome?.body_html ?? '',
            },
            password_reset: {
                subject: templates.password_reset?.subject ?? '',
                body_html: templates.password_reset?.body_html ?? '',
            },
            order_confirmation: {
                subject: templates.order_confirmation?.subject ?? '',
                body_html: templates.order_confirmation?.body_html ?? '',
            },
            order_processing: {
                subject: templates.order_processing?.subject ?? '',
                body_html: templates.order_processing?.body_html ?? '',
            },
            order_shipped: {
                subject: templates.order_shipped?.subject ?? '',
                body_html: templates.order_shipped?.body_html ?? '',
            },
        },
    });

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

    const current = form.data.templates[tab];

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
                        HTML snippets support placeholders below. Order templates
                        receive line-item HTML via{' '}
                        <code className="rounded bg-secondary px-1 text-xs">
                            {'{{order_items_html}}'}
                        </code>
                        .
                    </p>
                </div>
            }
        >
            <Head title="Email templates" />

            <div className="w-full space-y-6">
                <div className="flex flex-wrap gap-2">
                    {tabs.map((t) => (
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
