import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pro Print Contractors" },
      { name: "description", content: "Get in touch for custom quotes, bulk orders, or branding consultations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll be in touch soon.");
  };

  return (
    <Layout>
      <section className="relative bg-hero border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid animate-grid opacity-50" />
        <div className="orb animate-orb h-80 w-80 -top-20 right-1/3" style={{ background: "var(--gradient-primary)" }} />
        <div className="scan-line" />
        <div className="container mx-auto px-4 py-20 text-center space-y-4 relative">
          <p className="reveal reveal-1 text-primary font-bold text-sm tracking-widest uppercase">Get in touch</p>
          <h1 className="reveal reveal-2 text-5xl md:text-6xl font-black">Let's <span className="gradient-text-animated">talk</span>.</h1>
          <p className="reveal reveal-3 text-muted-foreground max-w-2xl mx-auto">
            Custom quote, bulk order, or branding project — we reply within one business day.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: Phone, title: "Call us", value: "+1 (555) 123-4567" },
              { icon: Mail, title: "Email us", value: "hello@proprintcontractors.com" },
              { icon: MapPin, title: "Visit us", value: "123 Print Avenue, Design District" },
            ].map(({ icon: Icon, title, value }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover-lift">
                <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{title}</p>
                <p className="font-bold mt-1">{value}</p>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="lg:col-span-2 p-8 rounded-3xl bg-card border border-border space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" required />
              <Field label="Email" type="email" required />
            </div>
            <Field label="Subject" required />
            <label className="block">
              <span className="text-sm font-semibold mb-1.5 block">Message</span>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary outline-none transition-colors resize-none"
              />
            </label>
            <button
              type="submit"
              disabled={sent}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> {sent ? "Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold mb-1.5 block">{label}</span>
      <input {...props} className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary outline-none transition-colors" />
    </label>
  );
}