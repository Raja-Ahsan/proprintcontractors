import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function Shipping({ settings }) {
    const form = useForm({
        flat_rate: settings.flat_rate ?? '',
        tax_rate: settings.tax_rate ?? '',
        free_shipping_minimum: settings.free_shipping_minimum ?? '',
        currency: settings.currency ?? 'usd',
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('admin.settings.shipping.update'), {
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
                        Shipping & tax
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Flat shipping applies before tax. Set a free-shipping minimum
                        (subtotal after discounts) to waive the flat fee — leave empty
                        to disable.
                    </p>
                </div>
            }
        >
            <Head title="Shipping settings" />

            <div className="w-full">
                <form
                    onSubmit={submit}
                    className="neon-card space-y-5 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-semibold text-foreground">
                                Flat shipping (USD)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.flat_rate}
                                onChange={(e) =>
                                    form.setData('flat_rate', e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-foreground">
                                Tax rate (decimal)
                            </label>
                            <input
                                type="number"
                                step="0.0001"
                                min="0"
                                max="1"
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.tax_rate}
                                onChange={(e) =>
                                    form.setData('tax_rate', e.target.value)
                                }
                                placeholder="e.g. 0.0825"
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                                Example: 8.25% → 0.0825
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-foreground">
                                Free shipping minimum (USD)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.free_shipping_minimum}
                                onChange={(e) =>
                                    form.setData(
                                        'free_shipping_minimum',
                                        e.target.value,
                                    )
                                }
                                placeholder="Optional"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-foreground">
                                Checkout currency (ISO)
                            </label>
                            <input
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.currency}
                                onChange={(e) =>
                                    form.setData(
                                        'currency',
                                        e.target.value.toLowerCase(),
                                    )
                                }
                                placeholder="usd"
                            />
                        </div>
                    </div>

                    <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                </form>
            </div>
        </AdminLayout>
    );
}
