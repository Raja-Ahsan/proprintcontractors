import { Kinetic } from '@/Components/Shop/Kinetic';
import {
    MouseSpotlight,
    useScrollReveal,
} from '@/Components/Shop/MouseSpotlight';
import {
    heroImageUrl,
    marketingProducts,
} from '@/data/marketingProducts';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    CheckCircle2,
    Globe,
    Palette,
    Sparkles,
    TrendingUp,
    Truck,
    Zap,
} from 'lucide-react';
import { useMemo } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function Home() {
    useScrollReveal();

    const marquee = useMemo(
        () => [...marketingProducts, ...marketingProducts],
        [],
    );

    return (
        <ShopLayout title="Home">
            <Head>
                <meta
                    name="description"
                    content="Premium print on demand for contractors. Custom apparel, signage, business cards, plus logo, web design and digital marketing packages."
                />
            </Head>
            {/* HERO + MARQUEE */}
            <MouseSpotlight className="relative overflow-hidden bg-hero noise">
                <div className="aurora" />
                <div className="absolute inset-0 animate-grid bg-grid opacity-60" />
                <div className="absolute inset-0 bg-glow" />
                <div
                    className="orb animate-orb -left-20 -top-20 h-96 w-96"
                    style={{ background: 'var(--gradient-primary)' }}
                />
                <div
                    className="orb animate-orb -right-32 top-40 h-[28rem] w-[28rem]"
                    style={{
                        background:
                            'radial-gradient(circle, oklch(0.78 0.22 50 / 0.6), transparent)',
                        animationDelay: '-4s',
                    }}
                />
                <div className="scan-line" />

                <div className="container relative z-10 mx-auto px-4 pb-16 pt-24">
                    <div className="mx-auto max-w-4xl space-y-8 text-center">
                        <div className="glass reveal reveal-1 inline-flex items-center gap-2 rounded-full border-pulse px-4 py-2">
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary animate-ping-soft">
                                <span className="absolute inset-0 rounded-full bg-primary" />
                            </span>
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-xs font-semibold uppercase tracking-wider">
                                Print On Demand · Branding · Marketing
                            </span>
                        </div>
                        <h1 className="text-5xl font-black leading-[1.05] md:text-7xl lg:text-8xl">
                            <Kinetic text="Print Anything." />
                            <br />
                            <span className="gradient-text-animated">
                                <Kinetic text="Brand Everything." delay={0.6} />
                            </span>
                        </h1>
                        <p className="reveal reveal-3 mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                            From custom apparel to full brand identity — Pro Print
                            Contractors is the all-in-one platform for contractors who
                            refuse to look ordinary.
                        </p>
                        <div className="reveal reveal-4 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href={route('products.index')}
                                className="btn-shimmer group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                            >
                                Shop Products{' '}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href={route('marketing.services')}
                                className="btn-shimmer inline-flex items-center gap-2 rounded-full glass px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary"
                            >
                                Browse Packages
                            </Link>
                        </div>
                    </div>

                    <div className="group card-3d relative mt-20 overflow-hidden rounded-3xl border border-border shadow-elegant">
                        <div className="conic-glow absolute inset-0 opacity-30 transition-opacity duration-1000 group-hover:opacity-60" />
                        <div className="relative m-[2px] overflow-hidden rounded-3xl">
                            <img
                                src={heroImageUrl}
                                alt="Pro Print Contractors product range"
                                width={1600}
                                height={900}
                                className="h-auto w-full transition-transform duration-[2000ms] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                                {[
                                    '48hr ship',
                                    'Premium quality',
                                    'Free over $99',
                                    'Brand-grade print',
                                ].map((t, i) => (
                                    <div
                                        key={t}
                                        className="glass reveal rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider"
                                        style={{
                                            animationDelay: `${0.4 + i * 0.1}s`,
                                        }}
                                    >
                                        <span className="text-primary">●</span> {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marquee */}
                <div className="relative space-y-4 overflow-hidden border-y border-border bg-card/50 py-8">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
                    <div className="animate-marquee flex w-max gap-6">
                        {marquee.map((p, i) => (
                            <div key={`a-${p.id}-${i}`} className="group w-56 shrink-0">
                                <div className="neon-card relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        width={400}
                                        height={400}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                            {p.category}
                                        </p>
                                        <p className="truncate font-semibold">{p.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="animate-marquee-reverse flex w-max gap-6">
                        {[...marquee].reverse().map((p, i) => (
                            <div key={`b-${p.id}-${i}`} className="group w-56 shrink-0">
                                <div className="neon-card relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        width={400}
                                        height={400}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                            {p.category}
                                        </p>
                                        <p className="truncate font-semibold">{p.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MouseSpotlight>

            {/* FEATURES */}
            <section className="relative container mx-auto px-4 py-24">
                <div className="grid gap-6 md:grid-cols-4">
                    {[
                        {
                            icon: Zap,
                            title: 'Lightning Fast',
                            desc: 'Most orders ship in 48 hours',
                        },
                        {
                            icon: Award,
                            title: 'Premium Quality',
                            desc: 'Industry-leading materials',
                        },
                        {
                            icon: Truck,
                            title: 'Free Shipping',
                            desc: 'On orders over $99',
                        },
                        {
                            icon: CheckCircle2,
                            title: 'Satisfaction',
                            desc: '100% happiness guarantee',
                        },
                    ].map(({ icon: Icon, title, desc }, i) => (
                        <div
                            key={title}
                            className="neon-card card-3d reveal-on-scroll rounded-2xl glass p-6"
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                <div className="absolute inset-0 rounded-xl bg-primary/30 blur-md" />
                                <Icon className="relative h-6 w-6" />
                            </div>
                            <h3 className="mb-1 font-bold">{title}</h3>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURED PRODUCTS GRID */}
            <section className="container mx-auto px-4 py-12">
                <div className="reveal-on-scroll mb-12 flex items-end justify-between">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
                            Our Range
                        </p>
                        <h2 className="text-4xl font-black md:text-5xl">
                            Featured{' '}
                            <span className="gradient-text-animated">Products</span>
                        </h2>
                    </div>
                    <Link
                        href={route('products.index')}
                        className="hidden items-center gap-2 font-semibold text-primary transition-all hover:gap-3 md:inline-flex"
                    >
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {marketingProducts.slice(0, 8).map((p, i) => (
                        <Link
                            key={p.id}
                            href={route('products.index')}
                            className="neon-card card-3d reveal-on-scroll group overflow-hidden rounded-2xl border border-border bg-card"
                            style={{ transitionDelay: `${(i % 4) * 0.08}s` }}
                        >
                            <div className="relative aspect-square overflow-hidden bg-secondary">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="absolute right-3 top-3 translate-y-2 rounded-full glass px-2 py-1 text-[10px] font-bold uppercase tracking-wider opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                    View →
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                    {p.category}
                                </p>
                                <h3 className="mt-1 mb-2 font-bold transition-colors group-hover:text-primary">
                                    {p.name}
                                </h3>
                                <p className="text-2xl font-black gradient-text">
                                    {money(p.price)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 md:hidden">
                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center gap-2 font-semibold text-primary"
                    >
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* SERVICES TEASER */}
            <section className="container mx-auto px-4 py-24">
                <MouseSpotlight className="noise reveal-on-scroll relative overflow-hidden rounded-3xl glass p-8 md:p-16">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="aurora opacity-60" />
                    <div
                        className="orb animate-orb -right-32 -top-32 h-96 w-96"
                        style={{ background: 'var(--gradient-primary)' }}
                    />
                    <div
                        className="orb animate-orb -bottom-20 -left-20 h-72 w-72"
                        style={{
                            background:
                                'radial-gradient(circle, oklch(0.78 0.22 50 / 0.5), transparent)',
                            animationDelay: '-3s',
                        }}
                    />
                    <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
                        <div className="animate-slide-left space-y-6">
                            <p className="text-sm font-bold uppercase tracking-widest text-primary">
                                Beyond Print
                            </p>
                            <h2 className="text-4xl font-black md:text-5xl">
                                Full creative &{' '}
                                <span className="gradient-text-animated">
                                    digital services
                                </span>
                                .
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                We don&apos;t just print — we build brands. Choose a
                                package that fits your stage and let our team handle the
                                rest.
                            </p>
                            <Link
                                href={route('marketing.services')}
                                className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-1 hover:scale-105"
                            >
                                Explore Packages{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="animate-slide-right grid gap-4">
                            {[
                                {
                                    icon: Palette,
                                    title: 'Logo Design',
                                    desc: 'Identity that sticks',
                                },
                                {
                                    icon: Globe,
                                    title: 'Web Design',
                                    desc: 'Sites that convert',
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'Digital Marketing',
                                    desc: 'Growth on autopilot',
                                },
                            ].map(({ icon: Icon, title, desc }, i) => (
                                <div
                                    key={title}
                                    className="neon-card card-3d flex items-center gap-4 rounded-2xl glass p-5"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                >
                                    <div
                                        className="relative flex h-14 w-14 items-center justify-center rounded-xl"
                                        style={{
                                            background: 'var(--gradient-primary)',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-60 blur-md"
                                            style={{
                                                background: 'var(--gradient-primary)',
                                            }}
                                        />
                                        <Icon className="relative h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </MouseSpotlight>
            </section>
        </ShopLayout>
    );
}
