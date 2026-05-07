import { useScrollReveal } from '@/Components/Shop/MouseSpotlight';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

function Field({ label, ...props }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">{label}</span>
            <input
                {...props}
                className="w-full rounded-md border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            />
        </label>
    );
}

export default function Contact() {
    useScrollReveal();

    const [sent, setSent] = useState(false);

    function submit(e) {
        e.preventDefault();
        setSent(true);
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
                        {[
                            {
                                icon: Phone,
                                title: 'Call us',
                                value: '+1 (555) 123-4567',
                            },
                            {
                                icon: Mail,
                                title: 'Email us',
                                value: 'hello@proprintcontractors.com',
                            },
                            {
                                icon: MapPin,
                                title: 'Visit us',
                                value: '123 Print Avenue, Design District',
                            },
                        ].map(({ icon: Icon, title, value }) => (
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
                                <p className="mt-1 font-bold">{value}</p>
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-3xl border border-border bg-card p-8 lg:col-span-2"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Name" name="name" required />
                            <Field
                                label="Email"
                                name="email"
                                type="email"
                                required
                            />
                        </div>
                        <Field label="Subject" name="subject" required />
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-semibold">
                                Message
                            </span>
                            <textarea
                                required
                                rows={6}
                                name="message"
                                className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={sent}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />{' '}
                            {sent ? 'Sent!' : 'Send Message'}
                        </button>
                        {sent && (
                            <p className="text-sm text-emerald-400">
                                Thanks — we&apos;ll be in touch soon.
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </ShopLayout>
    );
}
