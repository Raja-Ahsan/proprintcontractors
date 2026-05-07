import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { products, categories } from "@/data/products";
import { Search } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Custom Products — Pro Print Contractors" },
      { name: "description", content: "Browse our full range of customizable print on demand products: apparel, drinkware, signage, marketing materials and more." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const okCat = cat === "All" || p.category === cat;
      const okQ = !q || p.name.toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
  }, [cat, q]);

  return (
    <Layout>
      <section className="relative bg-hero border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid animate-grid opacity-50" />
        <div className="orb animate-orb h-80 w-80 -top-20 left-1/4" style={{ background: "var(--gradient-primary)" }} />
        <div className="scan-line" />
        <div className="container mx-auto px-4 py-20 text-center space-y-4 relative">
          <p className="reveal reveal-1 text-primary font-bold text-sm tracking-widest uppercase">Shop</p>
          <h1 className="reveal reveal-2 text-5xl md:text-6xl font-black">Custom <span className="gradient-text-animated">Products</span></h1>
          <p className="reveal reveal-3 text-muted-foreground max-w-2xl mx-auto">
            Customize any product. Choose your colors, sizes and add your branding — we'll print it to perfection.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  cat === c ? "bg-primary text-primary-foreground shadow-glow" : "bg-card border border-border hover:border-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to="/products/$id"
              params={{ id: p.id }}
              className="group rounded-2xl overflow-hidden bg-card border border-border tilt-card neon-card animate-fade-up"
            >
              <div className="aspect-square overflow-hidden bg-secondary relative">
                <img src={p.image} alt={p.name} width={500} height={500} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-bold">
                  {p.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-black gradient-text">${p.price}</p>
                  <span className="text-xs text-muted-foreground">Customize →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No products match your search.</div>
        )}
      </section>
    </Layout>
  );
}