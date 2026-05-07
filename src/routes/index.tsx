import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import { ArrowRight, Sparkles, Zap, Award, Truck, CheckCircle2, Palette, Globe, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-products.jpg";
import { Kinetic } from "@/components/Kinetic";
import { MouseSpotlight, useScrollReveal } from "@/components/MouseSpotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pro Print Contractors — Custom Print on Demand & Branding" },
      { name: "description", content: "Premium print on demand for contractors. Custom apparel, signage, business cards, plus logo, web design and digital marketing packages." },
      { property: "og:title", content: "Pro Print Contractors — Custom Print on Demand & Branding" },
      { property: "og:description", content: "Custom apparel, signage, business cards, plus logo, web design and digital marketing packages." },
    ],
  }),
  component: Index,
});

function Index() {
  const marquee = [...products, ...products];
  useScrollReveal();
  return (
    <Layout>
      {/* HERO */}
      <MouseSpotlight className="relative overflow-hidden bg-hero noise">
        <div className="aurora" />
        <div className="absolute inset-0 bg-grid animate-grid opacity-60" />
        <div className="absolute inset-0 bg-glow" />
        <div className="orb animate-orb h-96 w-96 -top-20 -left-20" style={{ background: "var(--gradient-primary)" }} />
        <div className="orb animate-orb h-[28rem] w-[28rem] top-40 -right-32" style={{ background: "radial-gradient(circle, oklch(0.78 0.22 50 / 0.6), transparent)", animationDelay: "-4s" }} />
        <div className="scan-line" />

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="reveal reveal-1 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-pulse">
              <span className="relative h-2 w-2 rounded-full bg-primary animate-ping-soft"><span className="absolute inset-0 rounded-full bg-primary" /></span>
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-wider uppercase">Print On Demand · Branding · Marketing</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05]">
              <Kinetic text="Print Anything." />
              <br />
              <span className="gradient-text-animated"><Kinetic text="Brand Everything." delay={0.6} /></span>
            </h1>
            <p className="reveal reveal-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From custom apparel to full brand identity — Pro Print Contractors is the all-in-one platform for contractors who refuse to look ordinary.
            </p>
            <div className="reveal reveal-4 flex flex-wrap items-center justify-center gap-4">
              <Link to="/products" className="btn-shimmer group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                Shop Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full glass hover:border-primary hover:-translate-y-1 transition-all duration-300 font-semibold">
                Browse Packages
              </Link>
            </div>
          </div>

          <div className="relative mt-20 rounded-3xl overflow-hidden border border-border shadow-elegant group card-3d">
            <div className="absolute inset-0 conic-glow opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
            <div className="relative rounded-3xl overflow-hidden m-[2px]">
              <img src={heroImg} alt="Pro Print Contractors product range" width={1600} height={900} className="w-full h-auto transition-transform duration-[2000ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                {["48hr ship", "Premium quality", "Free over $99", "Brand-grade print"].map((t, i) => (
                  <div key={t} className="glass px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase reveal" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                    <span className="text-primary">●</span> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative py-8 overflow-hidden border-y border-border bg-card/50 space-y-4">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee gap-6 w-max">
            {marquee.map((p, i) => (
              <div key={`a-${i}`} className="w-56 shrink-0 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary relative neon-card">
                  <img src={p.image} alt={p.name} width={400} height={400} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs uppercase tracking-wider text-primary font-bold">{p.category}</p>
                    <p className="font-semibold truncate">{p.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-reverse gap-6 w-max">
            {[...marquee].reverse().map((p, i) => (
              <div key={`b-${i}`} className="w-56 shrink-0 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary relative neon-card">
                  <img src={p.image} alt={p.name} width={400} height={400} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs uppercase tracking-wider text-primary font-bold">{p.category}</p>
                    <p className="font-semibold truncate">{p.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MouseSpotlight>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Most orders ship in 48 hours" },
            { icon: Award, title: "Premium Quality", desc: "Industry-leading materials" },
            { icon: Truck, title: "Free Shipping", desc: "On orders over $99" },
            { icon: CheckCircle2, title: "Satisfaction", desc: "100% happiness guarantee" },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="reveal-on-scroll p-6 rounded-2xl glass neon-card card-3d" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-xl bg-primary/30 blur-md" />
                <Icon className="h-6 w-6 relative" />
              </div>
              <h3 className="font-bold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-12 reveal-on-scroll">
          <div>
            <p className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Our Range</p>
            <h2 className="text-4xl md:text-5xl font-black">Featured <span className="gradient-text-animated">Products</span></h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p, i) => (
            <Link
              key={p.id}
              to="/products/$id"
              params={{ id: p.id }}
              className="reveal-on-scroll group rounded-2xl overflow-hidden bg-card border border-border card-3d neon-card"
              style={{ transitionDelay: `${(i % 4) * 0.08}s` }}
            >
              <div className="aspect-square overflow-hidden bg-secondary relative">
                <img src={p.image} alt={p.name} width={500} height={500} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full glass text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                  View →
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-primary font-bold uppercase tracking-wider">{p.category}</p>
                <h3 className="font-bold mt-1 mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-2xl font-black gradient-text">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="container mx-auto px-4 py-24">
        <MouseSpotlight className="rounded-3xl glass p-8 md:p-16 relative overflow-hidden noise reveal-on-scroll">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="aurora opacity-60" />
          <div className="orb animate-orb h-96 w-96 -top-32 -right-32" style={{ background: "var(--gradient-primary)" }} />
          <div className="orb animate-orb h-72 w-72 -bottom-20 -left-20" style={{ background: "radial-gradient(circle, oklch(0.78 0.22 50 / 0.5), transparent)", animationDelay: "-3s" }} />
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 animate-slide-left">
              <p className="text-primary font-bold text-sm tracking-widest uppercase">Beyond Print</p>
              <h2 className="text-4xl md:text-5xl font-black">Full creative & <span className="gradient-text-animated">digital services</span>.</h2>
              <p className="text-lg text-muted-foreground">
                We don't just print — we build brands. Choose a package that fits your stage and let our team handle the rest.
              </p>
              <Link to="/services" className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 hover:-translate-y-1 transition-all">
                Explore Packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 animate-slide-right">
              {[
                { icon: Palette, title: "Logo Design", desc: "Identity that sticks" },
                { icon: Globe, title: "Web Design", desc: "Sites that convert" },
                { icon: TrendingUp, title: "Digital Marketing", desc: "Growth on autopilot" },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="flex items-center gap-4 p-5 rounded-2xl glass neon-card card-3d" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="h-14 w-14 rounded-xl flex items-center justify-center relative" style={{ background: "var(--gradient-primary)" }}>
                    <div className="absolute inset-0 rounded-xl blur-md opacity-60" style={{ background: "var(--gradient-primary)" }} />
                    <Icon className="h-6 w-6 text-primary-foreground relative" />
                  </div>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MouseSpotlight>
      </section>
    </Layout>
  );
}
