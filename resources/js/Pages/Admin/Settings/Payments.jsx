import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function Payments({ settings, secretsSet }) {
    const form = useForm({
        stripe_publishable_key: settings.stripe_publishable_key ?? '',
        stripe_secret: '',
        stripe_webhook_secret: '',
        paypal_client_id: settings.paypal_client_id ?? '',
        paypal_secret: '',
        paypal_mode: settings.paypal_mode ?? 'sandbox',
        paypal_enabled: settings.paypal_enabled ?? false,
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('admin.settings.payments.update'), {
            preserveScroll: true,
        });
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Settings
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        Stripe & PayPal
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Checkout uses Stripe today. PayPal fields are stored for future
                        checkout integration. Leave secret fields blank to keep saved
                        values.
                    </p>
                </div>
            }
        >
            <Head title="Payment settings" />

            <div className="w-full space-y-8">
                <form
                    onSubmit={submit}
                    className="neon-card space-y-5 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                >
                    <p className="text-sm font-bold text-primary">Stripe</p>
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Publishable key
                        </label>
                        <input
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={form.data.stripe_publishable_key}
                            onChange={(e) =>
                                form.setData(
                                    'stripe_publishable_key',
                                    e.target.value,
                                )
                            }
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Secret key{' '}
                            {secretsSet.stripe_secret && (
                                <span className="font-normal text-muted-foreground">
                                    (saved — enter only to replace)
                                </span>
                            )}
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={form.data.stripe_secret}
                            onChange={(e) =>
                                form.setData('stripe_secret', e.target.value)
                            }
                            autoComplete="new-password"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Webhook signing secret{' '}
                            {secretsSet.stripe_webhook && (
                                <span className="font-normal text-muted-foreground">
                                    (saved — enter only to replace)
                                </span>
                            )}
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={form.data.stripe_webhook_secret}
                            onChange={(e) =>
                                form.setData(
                                    'stripe_webhook_secret',
                                    e.target.value,
                                )
                            }
                            autoComplete="new-password"
                            placeholder="whsec_…"
                        />
                    </div>

                    <div className="border-t border-border pt-6">
                        <p className="mb-4 text-sm font-bold text-primary">
                            PayPal
                        </p>
                        <label className="flex cursor-pointer items-center gap-2 py-2">
                            <input
                                type="checkbox"
                                checked={form.data.paypal_enabled}
                                onChange={(e) =>
                                    form.setData(
                                        'paypal_enabled',
                                        e.target.checked,
                                    )
                                }
                                className="rounded border-border bg-background text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-foreground">
                                Enable PayPal (stored for future checkout support)
                            </span>
                        </label>
                        <div className="mt-3">
                            <label className="text-sm font-semibold text-foreground">
                                Mode
                            </label>
                            <select
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.paypal_mode}
                                onChange={(e) =>
                                    form.setData('paypal_mode', e.target.value)
                                }
                            >
                                <option value="sandbox">Sandbox</option>
                                <option value="live">Live</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <label className="text-sm font-semibold text-foreground">
                                Client ID
                            </label>
                            <input
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.paypal_client_id}
                                onChange={(e) =>
                                    form.setData(
                                        'paypal_client_id',
                                        e.target.value,
                                    )
                                }
                                autoComplete="off"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-sm font-semibold text-foreground">
                                Secret{' '}
                                {secretsSet.paypal_secret && (
                                    <span className="font-normal text-muted-foreground">
                                        (saved — enter only to replace)
                                    </span>
                                )}
                            </label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.paypal_secret}
                                onChange={(e) =>
                                    form.setData(
                                        'paypal_secret',
                                        e.target.value,
                                    )
                                }
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                </form>
            </div>
        </AdminLayout>
    );
}
