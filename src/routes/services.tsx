import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { servicePackages } from "@/data/products";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Service Packages — Pro Print Contractors" },
      { name: "description", content: "Logo design, web design and digital marketing packages built for contractors. Choose your tier and let our team handle the rest." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <Layout>
      <section className="relative bg-hero border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid animate-grid opacity-50" />
        <div className="orb animate-orb h-80 w-80 -top-20 right-1/4" style={{ background: "var(--gradient-primary)" }} />
        <div className="scan-line" />
        <div className="container mx-auto px-4 py-20 text-center space-y-4 relative">
          <p className="reveal reveal-1 text-primary font-bold text-sm tracking-widest uppercase">Service Packages</p>
          <h1 className="reveal reveal-2 text-5xl md:text-6xl font-black">Build your <span className="gradient-text-animated">brand</span>.</h1>
          <p className="reveal reveal-3 text-muted-foreground max-w-2xl mx-auto">
            From a sharp new logo to a converting website to a full marketing engine — fixed-price packages, no surprises.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-20">
        {servicePackages.map((group) => (
          <div key={group.category} className="space-y-8 animate-fade-up">
            <div className="text-center">
              <h2 className="text-4xl font-black">{group.category}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {group.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative p-8 rounded-3xl border transition-all tilt-card neon-card overflow-hidden ${
                    "popular" in tier && tier.popular
                      ? "glass border-primary shadow-glow"
                      : "glass border-border"
                  }`}
                >
                  {"popular" in tier && tier.popular && (
                    <div className="absolute -inset-px rounded-3xl conic-glow opacity-40 pointer-events-none" />
                  )}
                  {"popular" in tier && tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-bold text-xl mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-black gradient-text">${tier.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                    "popular" in tier && tier.popular
                      ? "bg-primary text-primary-foreground shadow-glow hover:scale-105"
                      : "bg-secondary border border-border hover:border-primary"
                  }`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}