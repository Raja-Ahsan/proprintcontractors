import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Upload, Check, ArrowLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({
  head: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — Pro Print Contractors` },
        { name: "description", content: p?.description ?? "Custom print product" },
        { property: "og:title", content: `${p?.name ?? "Product"} — Pro Print Contractors` },
        { property: "og:image", content: p?.image ?? "" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <Layout><div className="container py-20 text-center">Product not found</div></Layout>
  ),
});

function ProductDetail() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [size, setSize] = useState(product?.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [customText, setCustomText] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  if (!product) {
    return <Layout><div className="container mx-auto px-4 py-20 text-center">Product not found.</div></Layout>;
  }

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleAdd = () => {
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: qty,
      options: { color, size, customText, uploadedLogo: logoPreview ?? undefined },
    });
    toast.success(`${product.name} added to cart!`);
  };

  const buyNow = () => {
    handleAdd();
    navigate({ to: "/cart" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* IMAGE + PREVIEW */}
          <div className="space-y-4 animate-fade-up">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border border-border shadow-elegant">
              <img src={product.image} alt={product.name} width={800} height={800} className="w-full h-full object-cover" />
              {logoPreview && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img src={logoPreview} alt="Your logo preview" className="max-w-[40%] max-h-[40%] opacity-90 drop-shadow-2xl animate-fade-up" />
                </div>
              )}
              {customText && (
                <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                  <span className="px-4 py-2 rounded-md bg-background/70 backdrop-blur text-foreground font-bold text-xl">{customText}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">Live preview · final print quality will exceed this preview</p>
          </div>

          {/* CONFIG */}
          <div className="space-y-6 animate-fade-up">
            <div>
              <p className="text-primary font-bold text-sm tracking-widest uppercase">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-black mt-2">{product.name}</h1>
              <p className="text-3xl font-black gradient-text mt-3">${product.price}</p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* CUSTOMIZER */}
            <div className="space-y-5 p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-bold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-glow" />
                Customize
              </h3>

              <div>
                <label className="text-sm font-semibold mb-2 block">Color / Style</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        color === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {product.sizes && (
                <div>
                  <label className="text-sm font-semibold mb-2 block">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`h-10 w-12 rounded-md text-sm font-semibold border transition-all ${
                          size === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold mb-2 block">Custom Text (optional)</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Your tagline or name"
                  className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Upload Logo / Artwork</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-dashed border-border hover:border-primary hover:bg-card transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {logoPreview ? "Change file" : "Choose file (PNG, JPG, SVG)"}
                </button>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Quantity</label>
                <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-9 w-9 rounded-full hover:bg-secondary flex items-center justify-center">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="h-9 w-9 rounded-full hover:bg-secondary flex items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-secondary border border-border font-semibold hover:border-primary transition-colors"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}