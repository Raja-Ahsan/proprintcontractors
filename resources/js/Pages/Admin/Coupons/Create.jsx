import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const selectClass =
    'mt-1 block w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Create() {
    const form = useForm({
        code: '',
        type: 'percent',
        value: '',
        max_uses: '',
        starts_at: '',
        ends_at: '',
        min_subtotal: '',
        is_active: true,
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('admin.coupons.store'));
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Coupons
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        New coupon
                    </h1>
                </div>
            }
        >
            <Head title="New coupon" />

            <div className="w-full">
                <form
                    onSubmit={submit}
                    className="neon-card space-y-4 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                >
                    <div>
                        <InputLabel htmlFor="code" value="Code" />
                        <TextInput
                            id="code"
                            value={form.data.code}
                            onChange={(e) =>
                                form.setData('code', e.target.value.toUpperCase())
                            }
                            className="mt-1 block w-full font-mono"
                            required
                        />
                        <InputError message={form.errors.code} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="type" value="Type" />
                        <select
                            id="type"
                            value={form.data.type}
                            onChange={(e) => form.setData('type', e.target.value)}
                            className={selectClass}
                        >
                            <option value="percent">Percent off</option>
                            <option value="fixed">Fixed amount (USD)</option>
                        </select>
                        <InputError message={form.errors.type} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="value" value="Value" />
                        <TextInput
                            id="value"
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.data.value}
                            onChange={(e) => form.setData('value', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={form.errors.value} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="max_uses" value="Max uses (optional)" />
                        <TextInput
                            id="max_uses"
                            type="number"
                            min="1"
                            value={form.data.max_uses}
                            onChange={(e) =>
                                form.setData('max_uses', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError message={form.errors.max_uses} className="mt-2" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="starts_at"
                                value="Starts at (optional)"
                            />
                            <TextInput
                                id="starts_at"
                                type="datetime-local"
                                value={form.data.starts_at}
                                onChange={(e) =>
                                    form.setData('starts_at', e.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={form.errors.starts_at}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="ends_at" value="Ends at (optional)" />
                            <TextInput
                                id="ends_at"
                                type="datetime-local"
                                value={form.data.ends_at}
                                onChange={(e) =>
                                    form.setData('ends_at', e.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError message={form.errors.ends_at} className="mt-2" />
                        </div>
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="min_subtotal"
                            value="Minimum subtotal (optional)"
                        />
                        <TextInput
                            id="min_subtotal"
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.data.min_subtotal}
                            onChange={(e) =>
                                form.setData('min_subtotal', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={form.errors.min_subtotal}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={form.data.is_active}
                            onChange={(e) =>
                                form.setData('is_active', e.target.checked)
                            }
                            className="rounded border-border bg-background text-primary shadow-sm focus:ring-primary"
                        />
                        <label
                            htmlFor="is_active"
                            className="text-sm text-foreground"
                        >
                            Active
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                        <Link
                            href={route('admin.coupons.index')}
                            className="inline-flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
