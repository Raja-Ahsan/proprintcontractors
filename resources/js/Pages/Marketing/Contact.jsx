import InputError from '@/Components/InputError';
import { useScrollReveal } from '@/Components/Shop/MouseSpotlight';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useMemo } from 'react';

function Field({ label, error, ...props }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">{label}</span>
            <input
                {...props}
                className="w-full rounded-md border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            />
            <InputError message={error} className="mt-1.5" />
        </label>
    );
}

export default function Contact() {
    useScrollReveal();

    const { site } = usePage().props;
    const form = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const contactCards = useMemo(() => {
        const cards = [];
        if (site?.phone?.trim()) {
            cards.push({
                icon: Phone,
                title: 'Call us',
                value: site.phone,
                href: `tel:${site.phone.replace(/\s/g, '')}`,
            });
        }
        if (site?.email?.trim()) {
            cards.push({
                icon: Mail,
                title: 'Email us',
                value: site.email,
                href: `mailto:${site.email}`,
            });
        }
        if (site?.address?.trim()) {
            cards.push({
                icon: MapPin,
                title: 'Visit us',
                value: site.address,
                multiline: true,
            });
        }
        return cards;
    }, [site?.phone, site?.email, site?.address]);

    function submit(e) {
        e.preventDefault();
        form.post(route('marketing.contact.store'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    }

    return (
        <ShopLayout title="Contact">
            <Head>
                <meta
                    name="description"
                    content="Get in touch for custom quotes, bulk orders, or branding consultations."
                />
            </Head>

            <section className="relative overflow-hidden border-b border-border bg-hero">
                <div className="absolute inset-0 animate-grid bg-grid opacity-50" />
                <div
                    className="orb animate-orb -top-20 right-1/3 h-80 w-80"
                    style={{ background: 'var(--gradient-primary)' }}
                />
                <div className="scan-line" />
                <div className="container relative mx-auto space-y-4 px-4 py-20 text-center">
                    <p className="reveal reveal-1 text-sm font-bold uppercase tracking-widest text-primary">
                        Get in touch
                    </p>
                    <h1 className="reveal reveal-2 text-5xl font-black md:text-6xl">
                        Let&apos;s{' '}
                        <span className="gradient-text-animated">talk</span>.
                    </h1>
                    <p className="reveal reveal-3 mx-auto max-w-2xl text-muted-foreground">
                        Custom quote, bulk order, or branding project — we reply within
                        one business day.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-4">
                        {contactCards.length > 0 ? (
                            contactCards.map(({ icon: Icon, title, value, href, multiline }) => (
                                <div
                                    key={title}
                                    className="hover-lift rounded-2xl border border-border bg-card p-6"
                                >
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {title}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="mt-1 block font-bold hover:text-primary"
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p
                                            className={`mt-1 font-bold ${multiline ? 'whitespace-pre-line' : ''}`}
                                        >
                                            {value}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
                                Contact details can be configured in Admin → Settings → General.
                            </p>
                        )}
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-3xl border border-border bg-card p-8 lg:col-span-2"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Name"
                                name="name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                required
                                error={form.errors.name}
                            />
                            <Field
                                label="Email"
                                name="email"
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                required
                                error={form.errors.email}
                            />
                        </div>
                        <Field
                            label="Subject"
                            name="subject"
                            value={form.data.subject}
                            onChange={(e) => form.setData('subject', e.target.value)}
                            required
                            error={form.errors.subject}
                        />
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-semibold">
                                Message
                            </span>
                            <textarea
                                required
                                rows={6}
                                name="message"
                                value={form.data.message}
                                onChange={(e) => form.setData('message', e.target.value)}
                                className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                            />
                            <InputError message={form.errors.message} className="mt-1.5" />
                        </label>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />{' '}
                            {form.processing ? 'Sending…' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </section>
        </ShopLayout>
    );
}
