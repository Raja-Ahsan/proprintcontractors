import tshirt from "@/assets/product-tshirt.jpg";
import cap from "@/assets/product-cap.jpg";
import mug from "@/assets/product-mug.jpg";
import cards from "@/assets/product-cards.jpg";
import letterhead from "@/assets/product-letterhead.jpg";
import sign from "@/assets/product-sign.jpg";
import pen from "@/assets/product-pen.jpg";
import bottle from "@/assets/product-bottle.jpg";
import brochure from "@/assets/product-brochure.jpg";
import decals from "@/assets/product-decals.jpg";
import magnets from "@/assets/product-magnets.jpg";
import stickers from "@/assets/product-stickers.jpg";
import banner from "@/assets/product-banner.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import tote from "@/assets/product-tote.jpg";
import flyer from "@/assets/product-flyer.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
  sizes?: string[];
  features: string[];
};

export const categories = [
  "All",
  "Apparel",
  "Drinkware",
  "Stationery",
  "Signage",
  "Marketing",
  "Promotional",
] as const;

export const products: Product[] = [
  { id: "tshirt", name: "Custom T-Shirt", category: "Apparel", price: 18.99, image: tshirt, description: "Premium 100% cotton t-shirt with vibrant DTG print. Perfect for teams, brands and events.", colors: ["Black", "White", "Orange", "Navy", "Grey"], sizes: ["S", "M", "L", "XL", "XXL"], features: ["100% combed cotton", "DTG full-color print", "Pre-shrunk", "Tag-free comfort"] },
  { id: "hoodie", name: "Premium Hoodie", category: "Apparel", price: 39.99, image: hoodie, description: "Heavyweight fleece hoodie with embroidered or printed branding.", colors: ["Black", "Charcoal", "Orange", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"], features: ["320 GSM fleece", "Embroidery available", "Kangaroo pocket", "Drawstring hood"] },
  { id: "cap", name: "Snapback Cap", category: "Apparel", price: 14.99, image: cap, description: "Structured snapback caps with embroidered logo. Adjustable fit.", colors: ["Black", "Orange", "White", "Navy"], features: ["Structured 6-panel", "Adjustable snap", "Embroidered front", "Curved or flat brim"] },
  { id: "tote", name: "Canvas Tote Bag", category: "Apparel", price: 9.99, image: tote, description: "Eco-friendly canvas tote with bold custom print. Great for retail giveaways.", colors: ["Natural", "Black", "Orange"], features: ["12oz cotton canvas", "Reinforced handles", "15\" x 16\" size", "Eco-friendly"] },
  { id: "mug", name: "Ceramic Mug", category: "Drinkware", price: 11.99, image: mug, description: "11oz ceramic mug with full-wrap sublimation print. Dishwasher safe.", colors: ["White", "Black", "Orange Inside"], features: ["11oz capacity", "Full-wrap print", "Dishwasher safe", "Microwave safe"] },
  { id: "bottle", name: "Insulated Bottle", category: "Drinkware", price: 22.99, image: bottle, description: "Double-wall stainless steel bottle. Keeps drinks cold 24h, hot 12h.", colors: ["Black", "Orange", "Steel"], features: ["500ml capacity", "Double-wall vacuum", "BPA-free", "Laser-engraved logo"] },
  { id: "cards", name: "Business Cards", category: "Stationery", price: 24.99, image: cards, description: "Premium 16pt matte business cards with optional foil edges.", colors: ["Standard", "Foil Edge", "Spot UV"], features: ["16pt premium stock", "Matte / Gloss / Soft Touch", "Optional foil edge", "Pack of 250"] },
  { id: "letterhead", name: "Letterhead", category: "Stationery", price: 49.99, image: letterhead, description: "Professional letterhead on premium 28lb stock. Pack of 500.", colors: ["White", "Cream", "Bright White"], features: ["28lb premium stock", "Full color print", "Pack of 500", "Custom design included"] },
  { id: "pen", name: "Branded Pen", category: "Stationery", price: 3.99, image: pen, description: "Sleek metal pen with laser-engraved logo. Perfect giveaway item.", colors: ["Black/Orange", "Black/Silver", "All Black"], features: ["Aluminum body", "Laser engraving", "Smooth-flow ink", "Min order 50"] },
  { id: "brochure", name: "Tri-Fold Brochure", category: "Marketing", price: 89.99, image: brochure, description: "Full-color tri-fold brochures on glossy stock. Pack of 500.", colors: ["Gloss", "Matte", "Silk"], features: ["100lb gloss text", "Full color both sides", "Pack of 500", "8.5\" x 11\" tri-fold"] },
  { id: "flyer", name: "Promotional Flyer", category: "Marketing", price: 39.99, image: flyer, description: "High-impact flyers for campaigns and promotions. Pack of 500.", colors: ["Gloss", "Matte"], features: ["100lb stock", "Full color", "Pack of 500", "A5 / A4 / Letter"] },
  { id: "sign", name: "Storefront Sign", category: "Signage", price: 199.99, image: sign, description: "Custom outdoor signage built to last. Aluminum or acrylic options.", colors: ["Aluminum", "Acrylic", "PVC"], features: ["Weather-proof", "UV-resistant ink", "Custom dimensions", "Mounting hardware"] },
  { id: "banner", name: "Vinyl Banner", category: "Signage", price: 59.99, image: banner, description: "Heavy-duty 13oz vinyl banners with grommets. Indoor/outdoor.", colors: ["Standard", "Mesh", "Premium"], features: ["13oz vinyl", "Grommets every 2 ft", "UV-resistant", "Custom size"] },
  { id: "decals", name: "Vinyl Decals", category: "Promotional", price: 19.99, image: decals, description: "Die-cut vinyl decals for vehicles, windows, laptops.", colors: ["Orange", "Black", "White", "Custom"], features: ["Premium 7-year vinyl", "Die-cut to shape", "Indoor/outdoor", "Pack of 25"] },
  { id: "magnets", name: "Custom Magnets", category: "Promotional", price: 14.99, image: magnets, description: "Refrigerator and car magnets. Strong hold, full color print.", colors: ["Standard", "Car Magnet"], features: ["30 mil magnet", "Full color print", "Custom shapes", "Pack of 50"] },
  { id: "stickers", name: "Die-Cut Stickers", category: "Promotional", price: 12.99, image: stickers, description: "Premium die-cut stickers. Waterproof and weatherproof.", colors: ["Glossy", "Matte", "Holographic"], features: ["Waterproof vinyl", "Die-cut shape", "Pack of 100", "Custom artwork"] },
];

export const servicePackages = [
  {
    category: "Logo Design",
    tiers: [
      { name: "Starter", price: 99, features: ["2 logo concepts", "2 revisions", "PNG + JPG files", "3-day delivery"] },
      { name: "Professional", price: 249, popular: true, features: ["5 logo concepts", "Unlimited revisions", "Vector + Print files", "Brand color palette", "2-day delivery"] },
      { name: "Brand Identity", price: 599, features: ["10 logo concepts", "Full brand guide", "Business card design", "Letterhead design", "Social media kit", "1-day delivery"] },
    ],
  },
  {
    category: "Web Design",
    tiers: [
      { name: "Landing Page", price: 499, features: ["1-page responsive", "Contact form", "SEO basics", "5-day delivery"] },
      { name: "Business Site", price: 1499, popular: true, features: ["Up to 8 pages", "CMS included", "Mobile optimized", "On-page SEO", "10-day delivery"] },
      { name: "E-Commerce", price: 2999, features: ["Full online store", "Payment integration", "Inventory mgmt", "Product import", "Training included"] },
    ],
  },
  {
    category: "Digital Marketing",
    tiers: [
      { name: "Social Starter", price: 399, features: ["12 posts/month", "2 platforms", "Monthly report", "Content calendar"] },
      { name: "Growth", price: 899, popular: true, features: ["24 posts/month", "4 platforms", "Paid ads setup", "Bi-weekly reports", "Strategy calls"] },
      { name: "Enterprise", price: 1999, features: ["Daily content", "All platforms", "Ad management", "SEO + PPC", "Dedicated manager"] },
    ],
  },
] as const;