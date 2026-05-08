import CustomerAccountLayout from '@/Layouts/CustomerAccountLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Package, ShoppingBag, UserRound } from 'lucide-react';

export default function Dashboard() {
    return (
        <CustomerAccountLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Account
                    </p>
                    <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Manage your profile, orders, and shopping — same look as
                        our admin tools, tailored for you.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="w-full">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="neon-card group rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm transition hover:border-primary/30">
                        <div className="flex items-start justify-between gap-3">
                            <div className="rounded-xl bg-primary/15 p-2.5 text-primary">
                                <UserRound className="h-5 w-5" />
                            </div>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-foreground">
                            Account
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Update your details and keep your contact information
                            current.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                            <Link
                                href={route('profile.edit')}
                                className="text-primary transition hover:text-primary/90"
                            >
                                Profile settings
                            </Link>
                            <Link
                                href={route('dashboard.orders.index')}
                                className="inline-flex items-center gap-1 text-primary transition hover:text-primary/90"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                My orders
                            </Link>
                        </div>
                    </div>

                    <div className="neon-card group rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm transition hover:border-primary/30">
                        <div className="flex items-start justify-between gap-3">
                            <div className="rounded-xl bg-primary/15 p-2.5 text-primary">
                                <Package className="h-5 w-5" />
                            </div>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-foreground">
                            Shop
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Browse products, review your cart, and continue where
                            you left off.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                            <Link
                                href={route('home')}
                                className="text-primary transition hover:text-primary/90"
                            >
                                Home
                            </Link>
                            <Link
                                href={route('products.index')}
                                className="text-primary transition hover:text-primary/90"
                            >
                                Products
                            </Link>
                            <Link
                                href={route('cart.index')}
                                className="text-primary transition hover:text-primary/90"
                            >
                                Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerAccountLayout>
    );
}
