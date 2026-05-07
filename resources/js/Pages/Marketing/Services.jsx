import { useScrollReveal } from '@/Components/Shop/MouseSpotlight';
import { servicePackages } from '@/data/catalog';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head } from '@inertiajs/react';
import { Check, Sparkles } from 'lucide-react';

export default function Services() {
    useScrollReveal();

    return (
        <ShopLayout title="Services">
            <Head>
                <meta
                    name="description"
                    content="Logo design, web design and digital marketing packages built for contractors. Choose your tier and let our team handle the rest."
                />
            </Head>

            <section className="relative overflow-hidden border-b border-border bg-hero">
                <div className="absolute inset-0 animate-grid bg-grid opacity-50" />
                <div
                    className="orb animate-orb -top-20 right-1/4 h-80 w-80"
                    style={{ background: 'var(--gradient-primary)' }}
                />
                <div className="scan-line" />
                <div className="container relative mx-auto space-y-4 px-4 py-20 text-center">
                    <p className="reveal reveal-1 text-sm font-bold uppercase tracking-widest text-primary">
                        Service Packages
                    </p>
                    <h1 className="reveal reveal-2 text-5xl font-black md:text-6xl">
                        Build your{' '}
                        <span className="gradient-text-animated">brand</span>.
                    </h1>
                    <p className="reveal reveal-3 mx-auto max-w-2xl text-muted-foreground">
                        From a sharp new logo to a converting website to a full
                        marketing engine — fixed-price packages, no surprises.
                    </p>
                </div>
            </section>

            <section className="container mx-auto space-y-20 px-4 py-16">
                {servicePackages.map((group) => (
                    <div key={group.category} className="animate-fade-up space-y-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-black">{group.category}</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {group.tiers.map((tier) => (
                                <div
                                    key={tier.name}
                                    className={`neon-card relative overflow-hidden rounded-3xl border p-8 transition-all tilt-card ${
                                        tier.popular
                                            ? 'glass border-primary shadow-glow'
                                            : 'glass border-border'
                                    }`}
                                >
                                    {tier.popular && (
                                        <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-40 conic-glow" />
                                    )}
                                    {tier.popular && (
                                        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                                            <Sparkles className="h-3 w-3" /> MOST
                                            POPULAR
                                        </div>
                                    )}
                                    <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
                                    <div className="mb-6">
                                        <span className="text-5xl font-black gradient-text">
                                            $
                                            {tier.price}
                                        </span>
                                    </div>
                                    <ul className="mb-8 space-y-3">
                                        {tier.features.map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-start gap-2 text-sm"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        type="button"
                                        className={`w-full rounded-full py-3 font-semibold transition-all ${
                                            tier.popular
                                                ? 'bg-primary text-primary-foreground shadow-glow hover:scale-105'
                                                : 'border border-border bg-secondary hover:border-primary'
                                        }`}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </ShopLayout>
    );
}
