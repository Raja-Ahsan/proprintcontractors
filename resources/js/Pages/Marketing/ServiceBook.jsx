import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import DigitalMarketingBriefForm from '@/Components/Marketing/DigitalMarketingBriefForm';
import LogoBriefForm from '@/Components/Marketing/LogoBriefForm';
import WebBriefForm from '@/Components/Marketing/WebBriefForm';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { emptyDigitalMarketingBrief } from '@/data/digitalMarketingBriefOptions';
import { emptyLogoBrief } from '@/data/logoBriefOptions';
import { emptyWebBrief } from '@/data/webBriefOptions';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check } from 'lucide-react';
import { useMemo, useState } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

function emptyBriefForType(briefType) {
    if (briefType === 'logo') {
        return emptyLogoBrief();
    }

    if (briefType === 'web') {
        return emptyWebBrief();
    }

    if (briefType === 'digital_marketing') {
        return emptyDigitalMarketingBrief();
    }

    return null;
}

export default function ServiceBook({
    package: pkg,
    briefType,
    stripeConfigured,
    stripePublishableConfigured,
    defaults,
}) {
    const showBrief =
        briefType === 'logo' ||
        briefType === 'web' ||
        briefType === 'digital_marketing';
    const [contentFiles, setContentFiles] = useState([]);

    const form = useForm({
        customer_name: defaults.customer_name ?? '',
        customer_email: defaults.customer_email ?? '',
        customer_phone: '',
        notes: '',
        brief: showBrief ? emptyBriefForType(briefType) : null,
    });

    const briefErrors = useMemo(() => {
        const out = {};

        for (const [key, value] of Object.entries(form.errors)) {
            if (!key.startsWith('brief.')) {
                continue;
            }

            out[key.slice('brief.'.length)] = value;
        }

        return out;
    }, [form.errors]);

    const briefLabel =
        briefType === 'logo'
            ? 'logo brief'
            : briefType === 'web'
              ? 'website brief'
              : briefType === 'digital_marketing'
                ? 'digital marketing brief'
                : '';

    function setBriefField(key, value) {
        form.setData('brief', {
            ...form.data.brief,
            [key]: value,
        });
    }

    function toggleBriefArray(key, option) {
        const current = form.data.brief?.[key] ?? [];
        const next = current.includes(option)
            ? current.filter((item) => item !== option)
            : [...current, option];

        form.setData('brief', {
            ...form.data.brief,
            [key]: next,
        });
    }

    function submit(e) {
        e.preventDefault();

        if (briefType === 'web' && contentFiles.length > 0) {
            form.transform((data) => {
                const next = { ...data };

                contentFiles.forEach((file, idx) => {
                    if (file instanceof File) {
                        next[`brief_content_files[${idx}]`] = file;
                    }
                });

                return next;
            });
        }

        form.post(route('services.book.store', pkg.slug), {
            forceFormData: briefType === 'web' && contentFiles.length > 0,
        });
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
                    {showBrief ? ` and ${briefLabel}` : ''} below, then pay securely
                    with Stripe.
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
                        {briefType === 'logo' ? (
                            <LogoBriefForm
                                brief={form.data.brief}
                                errors={briefErrors}
                                onField={setBriefField}
                                onToggleArray={toggleBriefArray}
                            />
                        ) : null}

                        {briefType === 'web' ? (
                            <WebBriefForm
                                brief={form.data.brief}
                                errors={briefErrors}
                                onField={setBriefField}
                                contentFiles={contentFiles}
                                onContentFilesChange={setContentFiles}
                                fileError={
                                    form.errors['brief_content_files'] ??
                                    form.errors['brief_content_files.0']
                                }
                            />
                        ) : null}

                        {briefType === 'digital_marketing' ? (
                            <DigitalMarketingBriefForm
                                brief={form.data.brief}
                                errors={briefErrors}
                                onField={setBriefField}
                            />
                        ) : null}

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
                                {!showBrief ? (
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
                                ) : null}
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
