import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Target, Users, Award, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pro Print Contractors" },
      { name: "description", content: "We're the print and branding partner for contractors who refuse to look ordinary." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="relative bg-hero border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid animate-grid opacity-50" />
        <div className="orb animate-orb h-80 w-80 -top-20 left-1/3" style={{ background: "var(--gradient-primary)" }} />
        <div className="scan-line" />
        <div className="container mx-auto px-4 py-20 text-center space-y-4 relative">
          <p className="reveal reveal-1 text-primary font-bold text-sm tracking-widest uppercase">Our Story</p>
          <h1 className="reveal reveal-2 text-5xl md:text-6xl font-black">Print with <span className="gradient-text-animated">purpose</span>.</h1>
          <p className="reveal reveal-3 text-muted-foreground max-w-2xl mx-auto text-lg">
            Pro Print Contractors started with one belief — every contractor deserves a brand that looks as professional as their work.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-4xl font-black">A decade of <span className="gradient-text">premium print</span>.</h2>
            <p className="text-muted-foreground">
              We combine industrial-grade printing with creative branding services to give contractors a one-stop shop. From a single t-shirt to full brand identity — same studio, same standard.
            </p>
            <p className="text-muted-foreground">
              Our team has shipped over 250,000 custom products and built brands for hundreds of growing companies across North America.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform">
              Work with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "250K+", label: "Products Printed" },
              { num: "1,200+", label: "Brands Built" },
              { num: "10+", label: "Years Experience" },
              { num: "98%", label: "Repeat Customers" },
            ].map((s) => (
              <div key={s.label} className="p-6 rounded-2xl bg-card border border-border text-center hover-lift">
                <div className="text-4xl font-black gradient-text">{s.num}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-black text-center mb-12">Our <span className="gradient-text">Values</span></h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Target, title: "Precision", desc: "Every job printed to exacting standards." },
            { icon: Users, title: "Partnership", desc: "We're an extension of your team." },
            { icon: Award, title: "Quality", desc: "Premium materials, every order." },
            { icon: Heart, title: "Passion", desc: "Print is craft. We treat it that way." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}