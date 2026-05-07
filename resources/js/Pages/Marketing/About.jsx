import { useScrollReveal } from '@/Components/Shop/MouseSpotlight';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Award, Heart, Target, Users } from 'lucide-react';

export default function About() {
    useScrollReveal();

    return (
        <ShopLayout title="About">
            <Head>
                <meta
                    name="description"
                    content="We're the print and branding partner for contractors who refuse to look ordinary."
                />
            </Head>

            <section className="relative overflow-hidden border-b border-border bg-hero">
                <div className="absolute inset-0 animate-grid bg-grid opacity-50" />
                <div
                    className="orb animate-orb -top-20 left-1/3 h-80 w-80"
                    style={{ background: 'var(--gradient-primary)' }}
                />
                <div className="scan-line" />
                <div className="container relative mx-auto space-y-4 px-4 py-20 text-center">
                    <p className="reveal reveal-1 text-sm font-bold uppercase tracking-widest text-primary">
                        Our Story
                    </p>
                    <h1 className="reveal reveal-2 text-5xl font-black md:text-6xl">
                        Print with{' '}
                        <span className="gradient-text-animated">purpose</span>.
                    </h1>
                    <p className="reveal reveal-3 mx-auto max-w-2xl text-lg text-muted-foreground">
                        Pro Print Contractors started with one belief — every
                        contractor deserves a brand that looks as professional as
                        their work.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-20">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div className="animate-fade-up space-y-6">
                        <h2 className="text-4xl font-black">
                            A decade of{' '}
                            <span className="gradient-text">premium print</span>.
                        </h2>
                        <p className="text-muted-foreground">
                            We combine industrial-grade printing with creative
                            branding services to give contractors a one-stop shop.
                            From a single t-shirt to full brand identity — same
                            studio, same standard.
                        </p>
                        <p className="text-muted-foreground">
                            Our team has shipped over 250,000 custom products and
                            built brands for hundreds of growing companies across
                            North America.
                        </p>
                        <Link
                            href={route('marketing.contact')}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                        >
                            Work with us <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { num: '250K+', label: 'Products Printed' },
                            { num: '1,200+', label: 'Brands Built' },
                            { num: '10+', label: 'Years Experience' },
                            { num: '98%', label: 'Repeat Customers' },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="hover-lift rounded-2xl border border-border bg-card p-6 text-center"
                            >
                                <div className="text-4xl font-black gradient-text">
                                    {s.num}
                                </div>
                                <div className="mt-1 text-sm text-muted-foreground">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="mb-12 text-center text-4xl font-black">
                    Our <span className="gradient-text">Values</span>
                </h2>
                <div className="grid gap-6 md:grid-cols-4">
                    {[
                        {
                            icon: Target,
                            title: 'Precision',
                            desc: 'Every job printed to exacting standards.',
                        },
                        {
                            icon: Users,
                            title: 'Partnership',
                            desc: "We're an extension of your team.",
                        },
                        {
                            icon: Award,
                            title: 'Quality',
                            desc: 'Premium materials, every order.',
                        },
                        {
                            icon: Heart,
                            title: 'Passion',
                            desc: 'Print is craft. We treat it that way.',
                        },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="hover-lift rounded-2xl border border-border bg-card p-6"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 font-bold">{title}</h3>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </ShopLayout>
    );
}
