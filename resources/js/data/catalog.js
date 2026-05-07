/**
 * Full catalog metadata aligned with legacy TanStack src/data/products.ts
 * (descriptions, colors, sizes, features). Images reference marketingProducts seeds.
 */
import { marketingProducts } from './marketingProducts';

/** Same filter chips as the SPA (includes "All"). */
export const catalogCategories = [
    'All',
    'Apparel',
    'Drinkware',
    'Stationery',
    'Signage',
    'Marketing',
    'Promotional',
];

const detailById = {
    tshirt: {
        description:
            'Premium 100% cotton t-shirt with vibrant DTG print. Perfect for teams, brands and events.',
        colors: ['Black', 'White', 'Orange', 'Navy', 'Grey'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        features: [
            '100% combed cotton',
            'DTG full-color print',
            'Pre-shrunk',
            'Tag-free comfort',
        ],
    },
    hoodie: {
        description:
            'Heavyweight fleece hoodie with embroidered or printed branding.',
        colors: ['Black', 'Charcoal', 'Orange', 'Navy'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        features: [
            '320 GSM fleece',
            'Embroidery available',
            'Kangaroo pocket',
            'Drawstring hood',
        ],
    },
    cap: {
        description:
            'Structured snapback caps with embroidered logo. Adjustable fit.',
        colors: ['Black', 'Orange', 'White', 'Navy'],
        features: [
            'Structured 6-panel',
            'Adjustable snap',
            'Embroidered front',
            'Curved or flat brim',
        ],
    },
    tote: {
        description:
            'Eco-friendly canvas tote with bold custom print. Great for retail giveaways.',
        colors: ['Natural', 'Black', 'Orange'],
        features: [
            '12oz cotton canvas',
            'Reinforced handles',
            '15" x 16" size',
            'Eco-friendly',
        ],
    },
    mug: {
        description:
            '11oz ceramic mug with full-wrap sublimation print. Dishwasher safe.',
        colors: ['White', 'Black', 'Orange Inside'],
        features: [
            '11oz capacity',
            'Full-wrap print',
            'Dishwasher safe',
            'Microwave safe',
        ],
    },
    bottle: {
        description:
            'Double-wall stainless steel bottle. Keeps drinks cold 24h, hot 12h.',
        colors: ['Black', 'Orange', 'Steel'],
        features: [
            '500ml capacity',
            'Double-wall vacuum',
            'BPA-free',
            'Laser-engraved logo',
        ],
    },
    cards: {
        description:
            'Premium 16pt matte business cards with optional foil edges.',
        colors: ['Standard', 'Foil Edge', 'Spot UV'],
        features: [
            '16pt premium stock',
            'Matte / Gloss / Soft Touch',
            'Optional foil edge',
            'Pack of 250',
        ],
    },
    letterhead: {
        description:
            'Professional letterhead on premium 28lb stock. Pack of 500.',
        colors: ['White', 'Cream', 'Bright White'],
        features: [
            '28lb premium stock',
            'Full color print',
            'Pack of 500',
            'Custom design included',
        ],
    },
    pen: {
        description:
            'Sleek metal pen with laser-engraved logo. Perfect giveaway item.',
        colors: ['Black/Orange', 'Black/Silver', 'All Black'],
        features: [
            'Aluminum body',
            'Laser engraving',
            'Smooth-flow ink',
            'Min order 50',
        ],
    },
    brochure: {
        description:
            'Full-color tri-fold brochures on glossy stock. Pack of 500.',
        colors: ['Gloss', 'Matte', 'Silk'],
        features: [
            '100lb gloss text',
            'Full color both sides',
            'Pack of 500',
            '8.5" x 11" tri-fold',
        ],
    },
    flyer: {
        description:
            'High-impact flyers for campaigns and promotions. Pack of 500.',
        colors: ['Gloss', 'Matte'],
        features: [
            '100lb stock',
            'Full color',
            'Pack of 500',
            'A5 / A4 / Letter',
        ],
    },
    sign: {
        description:
            'Custom outdoor signage built to last. Aluminum or acrylic options.',
        colors: ['Aluminum', 'Acrylic', 'PVC'],
        features: [
            'Weather-proof',
            'UV-resistant ink',
            'Custom dimensions',
            'Mounting hardware',
        ],
    },
    banner: {
        description:
            'Heavy-duty 13oz vinyl banners with grommets. Indoor/outdoor.',
        colors: ['Standard', 'Mesh', 'Premium'],
        features: [
            '13oz vinyl',
            'Grommets every 2 ft',
            'UV-resistant',
            'Custom size',
        ],
    },
    decals: {
        description:
            'Die-cut vinyl decals for vehicles, windows, laptops.',
        colors: ['Orange', 'Black', 'White', 'Custom'],
        features: [
            'Premium 7-year vinyl',
            'Die-cut to shape',
            'Indoor/outdoor',
            'Pack of 25',
        ],
    },
    magnets: {
        description:
            'Refrigerator and car magnets. Strong hold, full color print.',
        colors: ['Standard', 'Car Magnet'],
        features: [
            '30 mil magnet',
            'Full color print',
            'Custom shapes',
            'Pack of 50',
        ],
    },
    stickers: {
        description:
            'Premium die-cut stickers. Waterproof and weatherproof.',
        colors: ['Glossy', 'Matte', 'Holographic'],
        features: [
            'Waterproof vinyl',
            'Die-cut shape',
            'Pack of 100',
            'Custom artwork',
        ],
    },
};

export const catalogProductsFull = marketingProducts.map((p) => ({
    ...p,
    ...(detailById[p.id] ?? {
        description: '',
        colors: [],
        features: [],
    }),
}));

export function getCatalogExtraBySlug(slug) {
    if (!slug) {
        return null;
    }
    return catalogProductsFull.find((p) => p.id === slug) ?? null;
}

/** Service pricing tiers — matches TanStack servicePackages. */
export const servicePackages = [
    {
        category: 'Logo Design',
        tiers: [
            {
                name: 'Starter',
                price: 99,
                features: [
                    '2 logo concepts',
                    '2 revisions',
                    'PNG + JPG files',
                    '3-day delivery',
                ],
            },
            {
                name: 'Professional',
                price: 249,
                popular: true,
                features: [
                    '5 logo concepts',
                    'Unlimited revisions',
                    'Vector + Print files',
                    'Brand color palette',
                    '2-day delivery',
                ],
            },
            {
                name: 'Brand Identity',
                price: 599,
                features: [
                    '10 logo concepts',
                    'Full brand guide',
                    'Business card design',
                    'Letterhead design',
                    'Social media kit',
                    '1-day delivery',
                ],
            },
        ],
    },
    {
        category: 'Web Design',
        tiers: [
            {
                name: 'Landing Page',
                price: 499,
                features: [
                    '1-page responsive',
                    'Contact form',
                    'SEO basics',
                    '5-day delivery',
                ],
            },
            {
                name: 'Business Site',
                price: 1499,
                popular: true,
                features: [
                    'Up to 8 pages',
                    'CMS included',
                    'Mobile optimized',
                    'On-page SEO',
                    '10-day delivery',
                ],
            },
            {
                name: 'E-Commerce',
                price: 2999,
                features: [
                    'Full online store',
                    'Payment integration',
                    'Inventory mgmt',
                    'Product import',
                    'Training included',
                ],
            },
        ],
    },
    {
        category: 'Digital Marketing',
        tiers: [
            {
                name: 'Social Starter',
                price: 399,
                features: [
                    '12 posts/month',
                    '2 platforms',
                    'Monthly report',
                    'Content calendar',
                ],
            },
            {
                name: 'Growth',
                price: 899,
                popular: true,
                features: [
                    '24 posts/month',
                    '4 platforms',
                    'Paid ads setup',
                    'Bi-weekly reports',
                    'Strategy calls',
                ],
            },
            {
                name: 'Enterprise',
                price: 1999,
                features: [
                    'Daily content',
                    'All platforms',
                    'Ad management',
                    'SEO + PPC',
                    'Dedicated manager',
                ],
            },
        ],
    },
];
