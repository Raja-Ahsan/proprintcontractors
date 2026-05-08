import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${scrolled ? "bg-background/85 border-primary/40 shadow-[0_8px_40px_-10px_oklch(0.72_0.20_45_/_0.5)] h-16" : "bg-background/60 border-primary/15 h-20"}`}>
      <div className={`container mx-auto px-4 h-full flex items-center justify-between transition-all duration-500`}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={logo} alt="Pro Print Contractors" className={`relative w-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${scrolled ? "h-10" : "h-12"}`} width={48} height={48} />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-semibold tracking-wide text-foreground/80 hover:text-primary transition-all relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-primary-glow after:transition-all after:duration-300 hover:after:w-full hover:-translate-y-0.5"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:rotate-12 transition-all duration-300"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 text-xs font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-glow">
                {count}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-2 rounded-md bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary bg-secondary" }}
                className="px-4 py-3 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}