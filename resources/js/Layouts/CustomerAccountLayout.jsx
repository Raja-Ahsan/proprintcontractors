import 'sweetalert2/dist/sweetalert2.min.css';

import { Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import {
    ChevronDown,
    Home,
    LayoutDashboard,
    Menu,
    ShoppingBag,
    User,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const mainNav = [
    {
        name: 'Dashboard',
        href: () => route('dashboard'),
        routeName: 'dashboard',
    },
    {
        name: 'My orders',
        href: () => route('dashboard.orders.index'),
        routeName: 'dashboard.orders.*',
    },
    {
        name: 'Shop',
        href: () => route('home'),
        routeName: 'home',
    },
];

export default function CustomerAccountLayout({ header, children }) {
    const { props, url } = usePage();
    const user = props.auth.user;
    const flash = props.flash;
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        setMobileNavOpen(false);
        setUserMenuOpen(false);
    }, [url]);

    useEffect(() => {
        const toastBase = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3200,
            timerProgressBar: true,
        };

        if (flash?.success) {
            Swal.fire({
                ...toastBase,
                icon: 'success',
                title: flash.success,
                background: 'oklch(0.17 0.012 40)',
                color: 'oklch(0.98 0.005 60)',
            });
        }
        if (flash?.error) {
            Swal.fire({
                ...toastBase,
                icon: 'error',
                title: flash.error,
                timer: 5000,
                background: 'oklch(0.17 0.012 40)',
                color: 'oklch(0.98 0.005 60)',
            });
        }
    }, [flash?.success, flash?.error]);

    return (
        <div
            className="min-h-screen bg-background text-foreground"
            data-customer-account-shell
        >
            <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
                <div className="flex h-16 items-center justify-between gap-3 px-4 lg:h-[4.25rem] lg:px-8">
                    <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-8">
                        <Link
                            href={route('dashboard')}
                            className="group flex shrink-0 items-center gap-2"
                            onClick={() => setMobileNavOpen(false)}
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
                                <LayoutDashboard className="h-5 w-5" />
                            </span>
                            <div className="hidden leading-tight sm:block">
                                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                    Pro Print
                                </p>
                                <p className="text-sm font-bold text-foreground">
                                    My account
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-1 md:flex">
                            {mainNav.map((item) => {
                                const active = route().current(item.routeName);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href()}
                                        className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                                            active
                                                ? 'border border-primary/40 bg-primary/15 text-primary shadow-[0_0_20px_-5px_oklch(0.72_0.20_45_/_0.5)]'
                                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            {user?.is_admin && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                                        route().current('admin.*')
                                            ? 'border border-primary/40 bg-primary/15 text-primary shadow-[0_0_20px_-5px_oklch(0.72_0.20_45_/_0.5)]'
                                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }`}
                                >
                                    Admin
                                </Link>
                            )}
                        </nav>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            className="rounded-xl border border-border bg-card p-2.5 text-foreground transition hover:border-primary hover:shadow-glow md:hidden"
                            onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileNavOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-sm font-semibold transition hover:border-primary"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <User className="h-4 w-4" />
                                </span>
                                <span className="hidden max-w-[10rem] truncate sm:inline">
                                    {user?.name}
                                </span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                            {userMenuOpen && (
                                <>
                                    <button
                                        type="button"
                                        className="fixed inset-0 z-40 cursor-default"
                                        aria-label="Close menu"
                                        onClick={() => setUserMenuOpen(false)}
                                    />
                                    <div className="animate-fade-up absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-elegant">
                                        <Link
                                            href={route('profile.edit')}
                                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-2.5 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            Log out
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {mobileNavOpen && (
                    <div className="border-t border-border bg-card/95 px-4 py-4 backdrop-blur-xl md:hidden">
                        <div className="flex flex-col gap-1">
                            {mainNav.map((item) => {
                                const active = route().current(item.routeName);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href()}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                                            active
                                                ? 'border border-primary/40 bg-primary/15 text-primary'
                                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                        }`}
                                        onClick={() => setMobileNavOpen(false)}
                                    >
                                        {item.name === 'Dashboard' && (
                                            <LayoutDashboard className="h-5 w-5 shrink-0" />
                                        )}
                                        {item.name === 'My orders' && (
                                            <ShoppingBag className="h-5 w-5 shrink-0" />
                                        )}
                                        {item.name === 'Shop' && (
                                            <Home className="h-5 w-5 shrink-0" />
                                        )}
                                        {item.name}
                                    </Link>
                                );
                            })}
                            {user?.is_admin && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${
                                        route().current('admin.*')
                                            ? 'border border-primary/40 bg-primary/15 text-primary'
                                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    }`}
                                    onClick={() => setMobileNavOpen(false)}
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className="relative min-h-[calc(100vh-4rem)] p-4 lg:min-h-[calc(100vh-4.25rem)] lg:p-8">
                <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
                    aria-hidden
                >
                    <div className="absolute inset-0 animate-grid bg-grid" />
                </div>

                {header && (
                    <div className="animate-fade-up mb-8 border-b border-border/80 pb-6">
                        {header}
                    </div>
                )}

                <div className="animate-fade-up">{children}</div>
            </main>
        </div>
    );
}
