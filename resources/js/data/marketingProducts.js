/**
 * Showcase catalog for the marketing home page (matches legacy TanStack src/data/products).
 * Images use stable URLs so the page matches the SPA without copying binary assets into git.
 * Replace with `/images/marketing/*.jpg` later if you add files under public/.
 */
export const heroImageUrl =
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=85';

/** @typedef {{ id: string, name: string, category: string, price: number, image: string }} MarketingProduct */

/** @type {MarketingProduct[]} */
export const marketingProducts = [
    {
        id: 'tshirt',
        name: 'Custom T-Shirt',
        category: 'Apparel',
        price: 18.99,
        image: 'https://picsum.photos/seed/ppc-tshirt/400/400',
    },
    {
        id: 'hoodie',
        name: 'Premium Hoodie',
        category: 'Apparel',
        price: 39.99,
        image: 'https://picsum.photos/seed/ppc-hoodie/400/400',
    },
    {
        id: 'cap',
        name: 'Snapback Cap',
        category: 'Apparel',
        price: 14.99,
        image: 'https://picsum.photos/seed/ppc-cap/400/400',
    },
    {
        id: 'tote',
        name: 'Canvas Tote Bag',
        category: 'Apparel',
        price: 9.99,
        image: 'https://picsum.photos/seed/ppc-tote/400/400',
    },
    {
        id: 'mug',
        name: 'Ceramic Mug',
        category: 'Drinkware',
        price: 11.99,
        image: 'https://picsum.photos/seed/ppc-mug/400/400',
    },
    {
        id: 'bottle',
        name: 'Insulated Bottle',
        category: 'Drinkware',
        price: 22.99,
        image: 'https://picsum.photos/seed/ppc-bottle/400/400',
    },
    {
        id: 'cards',
        name: 'Business Cards',
        category: 'Stationery',
        price: 24.99,
        image: 'https://picsum.photos/seed/ppc-cards/400/400',
    },
    {
        id: 'letterhead',
        name: 'Letterhead',
        category: 'Stationery',
        price: 49.99,
        image: 'https://picsum.photos/seed/ppc-letterhead/400/400',
    },
    {
        id: 'pen',
        name: 'Branded Pen',
        category: 'Stationery',
        price: 3.99,
        image: 'https://picsum.photos/seed/ppc-pen/400/400',
    },
    {
        id: 'brochure',
        name: 'Tri-Fold Brochure',
        category: 'Marketing',
        price: 89.99,
        image: 'https://picsum.photos/seed/ppc-brochure/400/400',
    },
    {
        id: 'flyer',
        name: 'Promotional Flyer',
        category: 'Marketing',
        price: 39.99,
        image: 'https://picsum.photos/seed/ppc-flyer/400/400',
    },
    {
        id: 'sign',
        name: 'Storefront Sign',
        category: 'Signage',
        price: 199.99,
        image: 'https://picsum.photos/seed/ppc-sign/400/400',
    },
    {
        id: 'banner',
        name: 'Vinyl Banner',
        category: 'Signage',
        price: 59.99,
        image: 'https://picsum.photos/seed/ppc-banner/400/400',
    },
    {
        id: 'decals',
        name: 'Vinyl Decals',
        category: 'Promotional',
        price: 19.99,
        image: 'https://picsum.photos/seed/ppc-decals/400/400',
    },
    {
        id: 'magnets',
        name: 'Custom Magnets',
        category: 'Promotional',
        price: 14.99,
        image: 'https://picsum.photos/seed/ppc-magnets/400/400',
    },
    {
        id: 'stickers',
        name: 'Die-Cut Stickers',
        category: 'Promotional',
        price: 12.99,
        image: 'https://picsum.photos/seed/ppc-stickers/400/400',
    },
];
