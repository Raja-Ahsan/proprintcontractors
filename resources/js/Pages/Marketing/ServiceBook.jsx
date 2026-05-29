import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check } from 'lucide-react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function ServiceBook({
    package: pkg,
    stripeConfigured,
    stripePublishableConfigured,
    defaults,
}) {
    const form = useForm({
        customer_name: defaults.customer_name ?? '',
        customer_email: defaults.customer_email ?? '',
        customer_phone: '',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('services.book.store', pkg.slug));
    }

    return (
        <ShopLayout title={`Book ${pkg.name}`}>
            <Head title={`Book ${pkg.name}`} />

            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href={route('marketing.services')}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to services
                </Link>

                <h1 className="mt-6 text-3xl font-bold text-foreground">
                    Book {pkg.name}
                </h1>
                <p className="mt-2 text-muted-foreground">
                    {pkg.category_name} · {money(pkg.price)} — complete your details
                    below, then pay securely with Stripe.
                </p>

                {!stripeConfigured && (
                    <div className="mt-6 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                        {stripePublishableConfigured ? (
                            <>
                                Stripe publishable key is saved, but checkout also needs
                                the secret key in Admin → Settings → Payments.
                            </>
                        ) : (
                            <>
                                Online payment is not configured. Add Stripe keys in
                                Admin → Settings → Payments before customers can book.
                            </>
                        )}
                    </div>
                )}

                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                    <form onSubmit={submit} className="space-y-6">
                        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground">
                                Your details
                            </h2>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <InputLabel htmlFor="customer_name" value="Full name" />
                                    <TextInput
                                        id="customer_name"
                                        value={form.data.customer_name}
                                        onChange={(e) =>
                                            form.setData('customer_name', e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={form.errors.customer_name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="customer_email" value="Email" />
                                    <TextInput
                                        id="customer_email"
                                        type="email"
                                        value={form.data.customer_email}
                                        onChange={(e) =>
                                            form.setData('customer_email', e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={form.errors.customer_email} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="customer_phone" value="Phone (optional)" />
                                    <TextInput
                                        id="customer_phone"
                                        value={form.data.customer_phone}
                                        onChange={(e) =>
                                            form.setData('customer_phone', e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={form.errors.customer_phone} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="notes" value="Project notes (optional)" />
                                    <textarea
                                        id="notes"
                                        value={form.data.notes}
                                        onChange={(e) =>
                                            form.setData('notes', e.target.value)
                                        }
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                    <InputError message={form.errors.notes} className="mt-2" />
                                </div>
                            </div>
                        </section>

                        <InputError message={form.errors.stripe} className="mt-2" />

                        <PrimaryButton disabled={form.processing || !stripeConfigured}>
                            Continue to secure payment
                        </PrimaryButton>
                    </form>

                    <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-sm lg:sticky lg:top-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">
                            {pkg.category_name}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-foreground">
                            {pkg.name}
                        </h2>
                        <p className="mt-3 text-3xl font-black gradient-text">
                            {money(pkg.price)}
                        </p>
                        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                            {(pkg.features ?? []).map((f) => (
                                <li key={f} className="flex items-start gap-2">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </ShopLayout>
    );
}
