import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useCart } from "@/lib/cart";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Pro Print Contractors" }, { name: "description", content: "Review your custom print order before checkout." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, updateQty, total } = useCart();
  const shipping = total > 99 || total === 0 ? 0 : 9.99;
  const tax = total * 0.08;
  const grand = total + shipping + tax;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-2">Your <span className="gradient-text">Cart</span></h1>
        <p className="text-muted-foreground mb-10">{items.length} item{items.length !== 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-card border border-border">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Cart is empty</h2>
            <p className="text-muted-foreground mb-6">Time to print something amazing.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow">
              Shop Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border animate-fade-up">
                  <img src={it.image} alt={it.name} width={120} height={120} className="h-28 w-28 rounded-xl object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{it.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {[it.options.color, it.options.size, it.options.customText && `"${it.options.customText}"`].filter(Boolean).join(" · ")}
                      {it.options.uploadedLogo && " · Logo uploaded"}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full p-1">
                        <button onClick={() => updateQty(it.id, it.quantity - 1)} className="h-7 w-7 rounded-full hover:bg-secondary flex items-center justify-center">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{it.quantity}</span>
                        <button onClick={() => updateQty(it.id, it.quantity + 1)} className="h-7 w-7 rounded-full hover:bg-secondary flex items-center justify-center">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-black text-lg gradient-text">${(it.price * it.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="h-fit p-6 rounded-2xl bg-card border border-border space-y-4 sticky top-24">
              <h3 className="font-bold text-lg">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                <span>Total</span><span className="gradient-text">${grand.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-muted-foreground text-center">Free shipping on orders over $99</p>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}