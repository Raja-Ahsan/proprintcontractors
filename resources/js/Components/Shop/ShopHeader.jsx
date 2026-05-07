import { MiniCart } from '@/Components/Shop/MiniCart';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const nav = [
    { routeName: 'home', label: 'Home', href: () => route('home') },
    {
        routeName: 'products.index',
        label: 'Products',
        href: () => route('products.index'),
    },
    {
        routeName: 'marketing.services',
        label: 'Services',
        href: () => route('marketing.services'),
    },
    { routeName: 'marketing.about', label: 'About', href: () => route('marketing.about') },
    {
        routeName: 'marketing.contact',
        label: 'Contact',
        href: () => route('marketing.contact'),
    },
];

export function ShopHeader() {
    const { auth, site } = usePage().props;
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoOk, setLogoOk] = useState(true);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setLogoOk(true);
    }, [site?.headerLogoUrl]);

    function navClass(routeName) {
        const active = route().current(routeName);
        return active
            ? 'text-primary'
            : 'text-foreground/80 hover:text-primary';
    }

    const brand = site?.siteName ?? 'Pro Print Contractors';
    const shortBrand = site?.siteName?.slice(0, 3)?.toUpperCase() ?? 'PPC';

    return (
        <header
            className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
                scrolled
                    ? 'h-16 border-primary/40 bg-background/85 shadow-[0_8px_40px_-10px_oklch(0.72_0.20_45_/_0.5)]'
                    : 'h-20 border-primary/15 bg-background/60'
            }`}
        >
            <div
                className={`container mx-auto flex h-full items-center justify-between px-4 transition-all duration-500`}
            >
                <Link href={route('home')} className="group flex items-center gap-3">
                    <div className="relative flex items-center gap-2">
                        <div className="absolute inset-0 rounded-full bg-primary/40 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                        {site?.headerLogoUrl && logoOk ? (
                            <img
                                src={site.headerLogoUrl}
                                alt=""
                                className={`relative h-9 w-auto max-w-[160px] object-contain transition-all duration-500 ${
                                    scrolled ? 'max-h-8' : 'max-h-10'
                                }`}
                                onError={() => setLogoOk(false)}
                            />
                        ) : (
                            <span
                                className={`relative font-black tracking-tight text-foreground transition-all duration-500 group-hover:rotate-3 group-hover:scale-105 group-hover:text-primary ${
                                    scrolled ? 'text-xl' : 'text-2xl'
                                }`}
                            >
                                {shortBrand}
                            </span>
                        )}
                    </div>
                    <span className="hidden max-w-[14rem] truncate font-semibold text-foreground/90 sm:inline">
                        {brand}
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {nav.map((n) => (
                        <Link
                            key={n.routeName}
                            href={n.href()}
                            className={`relative text-sm font-semibold tracking-wide transition-all after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-primary-glow after:transition-all after:duration-300 hover:-translate-y-0.5 hover:after:w-full ${navClass(n.routeName)}`}
                        >
                            {n.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <MiniCart />

                    <button
                        type="button"
                        className="inline-flex rounded-lg border border-border p-2 lg:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        {open ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                    <div className="hidden items-center gap-3 lg:flex">
                        {auth.user ? (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('dashboard.orders.index')}
                                    className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                                >
                                    My orders
                                </Link>
                                {auth.user?.is_admin && (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Log out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {open && (
                <div className="border-t border-border bg-background/95 px-4 py-4 lg:hidden">
                    <nav className="flex flex-col gap-3">
                        {nav.map((n) => (
                            <Link
                                key={n.routeName}
                                href={n.href()}
                                className={`text-sm font-semibold ${navClass(n.routeName)}`}
                                onClick={() => setOpen(false)}
                            >
                                {n.label}
                            </Link>
                        ))}
                        <div className="my-2 border-t border-border pt-3">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="block py-2 text-sm font-semibold text-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('dashboard.orders.index')}
                                        className="block py-2 text-sm font-semibold text-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        My orders
                                    </Link>
                                    {auth.user?.is_admin && (
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="block py-2 text-sm font-semibold text-foreground"
                                            onClick={() => setOpen(false)}
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="block py-2 text-left text-sm text-muted-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        Log out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="block py-2 text-sm font-semibold"
                                        onClick={() => setOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="block py-2 text-sm font-semibold text-primary"
                                        onClick={() => setOpen(false)}
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
