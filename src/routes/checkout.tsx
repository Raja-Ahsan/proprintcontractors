import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/lib/cart";
import { CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Pro Print Contractors" }, { name: "description", content: "Complete your custom print order." }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [done, setDone] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const shipping = total > 99 || total === 0 ? 0 : 9.99;
  const tax = total * 0.08;
  const grand = total + shipping + tax;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      toast.success("Order placed successfully!");
      clear();
    }, 1500);
  };

  if (items.length === 0 && !done) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Cart is empty</h1>
          <Link to="/products" className="text-primary font-semibold">Browse products →</Link>
        </div>
      </Layout>
    );
  }

  if (done) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center max-w-xl">
          <div className="h-20 w-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6 animate-glow">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black mb-3">Order <span className="gradient-text">Confirmed!</span></h1>
          <p className="text-muted-foreground mb-8">Thanks for your order. You'll receive a confirmation email shortly with tracking info.</p>
          <button onClick={() => navigate({ to: "/" })} className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform">
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-10">Secure <span className="gradient-text">Checkout</span></h1>

        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Section title="Contact">
              <Input label="Email" type="email" required />
              <Input label="Phone" type="tel" required />
            </Section>
            <Section title="Shipping Address">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" required />
                <Input label="Last Name" required />
              </div>
              <Input label="Street Address" required />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" required />
                <Input label="State" required />
                <Input label="ZIP" required />
              </div>
            </Section>
            <Section title="Payment">
              <Input label="Card Number" placeholder="1234 5678 9012 3456" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry" placeholder="MM/YY" required />
                <Input label="CVC" placeholder="123" required />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2"><Lock className="h-3 w-3" /> Demo checkout — no real charges processed.</p>
            </Section>
          </div>

          <div className="h-fit p-6 rounded-2xl bg-card border border-border space-y-4 sticky top-24">
            <h3 className="font-bold text-lg">Order Summary</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 text-sm">
                  <img src={it.image} alt={it.name} width={48} height={48} className="h-12 w-12 rounded-lg object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{it.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {it.quantity}</p>
                  </div>
                  <p className="font-bold">${(it.price * it.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border"><span>Total</span><span className="gradient-text">${grand.toFixed(2)}</span></div>
            </div>
            <button
              type="submit"
              disabled={processing}
              className="w-full px-6 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {processing ? "Processing..." : `Pay $${grand.toFixed(2)}`}
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
      <h3 className="font-bold text-lg">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary outline-none transition-colors"
      />
    </label>
  );
}