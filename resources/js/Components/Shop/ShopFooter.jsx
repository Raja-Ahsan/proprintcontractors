import { Link, usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone, Share2 } from 'lucide-react';

const socialConfig = [
    { key: 'facebook', label: 'Facebook' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'twitter', label: 'X / Twitter' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'youtube', label: 'YouTube' },
];

export function ShopFooter() {
    const { site } = usePage().props;
    const socials = site?.socials ?? {};

    const visibleSocials = socialConfig.filter((s) =>
        Boolean(String(socials[s.key] ?? '').trim()),
    );

    return (
        <footer className="mt-24 border-t border-border bg-card">
            <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-4">
                <div className="space-y-4">
                    {site?.footerLogoUrl ? (
                        <img
                            src={site.footerLogoUrl}
                            alt=""
                            className="h-10 w-auto max-w-[200px] object-contain"
                        />
                    ) : (
                        <p className="font-black text-2xl tracking-tight text-foreground">
                            {(site?.siteName ?? 'Pro Print Contractors').slice(0, 3).toUpperCase()}
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        Premium print on demand, branding & digital services for
                        contractors and businesses.
                    </p>
                    {visibleSocials.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {visibleSocials.map(({ key, label }) => (
                                <a
                                    key={key}
                                    href={socials[key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-secondary p-2 transition-colors hover:bg-primary hover:text-primary-foreground"
                                    aria-label={label}
                                >
                                    <Share2 className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="mb-4 font-bold text-foreground">Shop</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                            <Link
                                href={route('products.index')}
                                className="hover:text-primary"
                            >
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('cart.index')}
                                className="hover:text-primary"
                            >
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('checkout.create')}
                                className="hover:text-primary"
                            >
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 font-bold text-foreground">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                            <Link
                                href={route('marketing.services')}
                                className="hover:text-primary"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('marketing.about')}
                                className="hover:text-primary"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('marketing.contact')}
                                className="hover:text-primary"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 font-bold text-foreground">Contact</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        {site?.phone && (
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0 text-primary" />{' '}
                                <a
                                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                                    className="hover:text-primary"
                                >
                                    {site.phone}
                                </a>
                            </li>
                        )}
                        {site?.email && (
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0 text-primary" />{' '}
                                <a
                                    href={`mailto:${site.email}`}
                                    className="hover:text-primary"
                                >
                                    {site.email}
                                </a>
                            </li>
                        )}
                        {site?.address && (
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{' '}
                                <span className="whitespace-pre-line">{site.address}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()}{' '}
                {site?.siteName ?? 'Pro Print Contractors'}. All rights reserved.
            </div>
        </footer>
    );
}
