import 'sweetalert2/dist/sweetalert2.min.css';

import { Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import {
    ChevronDown,
    ExternalLink,
    FolderTree,
    Home,
    LayoutDashboard,
    Mail,
    Menu,
    Package,
    Search,
    Settings,
    ShoppingBag,
    SlidersHorizontal,
    Ticket,
    Truck,
    User,
    Wallet,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const nav = [
    {
        name: 'Overview',
        href: () => route('admin.dashboard'),
        routeName: 'admin.dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'Products',
        href: () => route('admin.products.index'),
        routeName: 'admin.products.*',
        icon: Package,
    },
    {
        name: 'Categories',
        href: () => route('admin.categories.index'),
        routeName: 'admin.categories.*',
        icon: FolderTree,
    },
    {
        name: 'Orders',
        href: () => route('admin.orders.index'),
        routeName: 'admin.orders.*',
        icon: ShoppingBag,
    },
    {
        name: 'Coupons',
        href: () => route('admin.coupons.index'),
        routeName: 'admin.coupons.*',
        icon: Ticket,
    },
];

const settingsNav = [
    {
        name: 'General',
        href: () => route('admin.settings.general'),
        routeName: 'admin.settings.general',
        icon: SlidersHorizontal,
    },
    {
        name: 'SEO',
        href: () => route('admin.settings.seo'),
        routeName: 'admin.settings.seo',
        icon: Search,
    },
    {
        name: 'Emails',
        href: () => route('admin.settings.emails'),
        routeName: 'admin.settings.emails*',
        icon: Mail,
    },
    {
        name: 'Payments',
        href: () => route('admin.settings.payments'),
        routeName: 'admin.settings.payments',
        icon: Wallet,
    },
    {
        name: 'Shipping',
        href: () => route('admin.settings.shipping'),
        routeName: 'admin.settings.shipping',
        icon: Truck,
    },
];

function navActive(routeName) {
    return route().current(routeName);
}

export default function AdminLayout({ header, children }) {
    const { props, url } = usePage();
    const user = props.auth.user;
    const flash = props.flash;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        setSidebarOpen(false);
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
        <div className="min-h-screen bg-background text-foreground" data-admin-shell>
            {sidebarOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden"
                    aria-label="Close menu"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card/90 shadow-elegant backdrop-blur-xl transition-transform duration-300 ease-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:h-[4.25rem]">
                    <Link
                        href={route('admin.dashboard')}
                        className="group flex items-center gap-2"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
                            A
                        </span>
                        <div className="leading-tight">
                            <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                Pro Print
                            </p>
                            <p className="text-sm font-bold text-foreground">
                                Admin
                            </p>
                        </div>
                    </Link>
                    <button
                        type="button"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                    {nav.map((item) => {
                        const active = navActive(item.routeName);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href()}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                    active
                                        ? 'border border-primary/40 bg-primary/15 text-primary shadow-[0_0_20px_-5px_oklch(0.72_0.20_45_/_0.5)]'
                                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }`}
                            >
                                <Icon
                                    className={`h-5 w-5 shrink-0 ${active ? 'text-primary' : ''}`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}

                    <p className="mb-1 mt-5 flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <Settings className="h-3.5 w-3.5" />
                        Settings
                    </p>
                    {settingsNav.map((item) => {
                        const active = route().current(item.routeName);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href()}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                    active
                                        ? 'border border-primary/40 bg-primary/15 text-primary shadow-[0_0_20px_-5px_oklch(0.72_0.20_45_/_0.5)]'
                                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }`}
                            >
                                <Icon
                                    className={`h-5 w-5 shrink-0 ${active ? 'text-primary' : ''}`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}

                    <div className="my-4 border-t border-border pt-4">
                        <Link
                            href={route('home')}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                        >
                            <ExternalLink className="h-5 w-5 shrink-0" />
                            View storefront
                        </Link>
                        <Link
                            href={route('dashboard')}
                            onClick={() => setSidebarOpen(false)}
                            className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                        >
                            <Home className="h-5 w-5 shrink-0" />
                            My account
                        </Link>
                    </div>
                </nav>

                <div className="border-t border-border p-3">
                    <div className="neon-card rounded-xl bg-secondary/50 p-3">
                        <p className="truncate text-xs font-medium text-muted-foreground">
                            Signed in
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                            {user?.name}
                        </p>
                    </div>
                </div>
            </aside>

            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-xl lg:h-[4.25rem] lg:px-8">
                    <button
                        type="button"
                        className="rounded-xl border border-border bg-card p-2.5 text-foreground transition hover:border-primary hover:shadow-glow lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="hidden flex-1 lg:block" />
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
        </div>
    );
}
