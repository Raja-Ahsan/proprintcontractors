import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="container mx-auto px-4 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <img src={logo} alt="Pro Print Contractors" className="h-14 w-auto" width={56} height={56} />
          <p className="text-sm text-muted-foreground">
            Premium print on demand, branding & digital services for contractors and businesses.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-foreground">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/products" className="hover:text-primary">Apparel</Link></li>
            <li><Link to="/products" className="hover:text-primary">Drinkware</Link></li>
            <li><Link to="/products" className="hover:text-primary">Marketing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-foreground">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Logo Design</Link></li>
            <li><Link to="/services" className="hover:text-primary">Web Design</Link></li>
            <li><Link to="/services" className="hover:text-primary">Digital Marketing</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-foreground">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@proprintcontractors.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> 123 Print Avenue, Design District</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pro Print Contractors. All rights reserved.
      </div>
    </footer>
  );
}