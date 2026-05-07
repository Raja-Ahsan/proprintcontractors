import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, FolderTree, Package, ShoppingBag, Ticket, Users } from 'lucide-react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

const statCards = [
    {
        key: 'products',
        label: 'Products',
        href: 'admin.products.index',
        icon: Package,
    },
    {
        key: 'categories',
        label: 'Categories',
        href: 'admin.categories.index',
        icon: FolderTree,
    },
    {
        key: 'orders',
        label: 'Orders',
        href: 'admin.orders.index',
        icon: ShoppingBag,
    },
    {
        key: 'customers',
        label: 'Customers',
        href: null,
        icon: Users,
    },
];

export default function Dashboard({ counts, recentOrders }) {
    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Dashboard
                    </p>
                    <h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                        Admin{' '}
                        <span className="gradient-text-animated">overview</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage catalog, orders, and promotions — same bold look as
                        your storefront.
                    </p>
                </div>
            }
        >
            <Head title="Admin" />

            <div className="w-full">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map(({ key, label, href, icon: Icon }) => {
                        const count = counts[key];
                        const inner = (
                            <>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="rounded-xl bg-primary/15 p-2.5 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    {href && (
                                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                                    )}
                                </div>
                                <p className="mt-4 text-sm font-medium text-muted-foreground">
                                    {label}
                                </p>
                                <p className="mt-1 text-3xl font-black tabular-nums text-foreground">
                                    {count}
                                </p>
                            </>
                        );
                        const className =
                            'neon-card card-3d group rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-glow';

                        if (href) {
                            return (
                                <Link
                                    key={key}
                                    href={route(href)}
                                    className={className}
                                >
                                    {inner}
                                </Link>
                            );
                        }
                        return (
                            <div key={key} className={className}>
                                {inner}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-sm">
                    <div className="border-b border-border px-6 py-4">
                        <h3 className="text-lg font-bold text-foreground">
                            Recent orders
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-secondary/80">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Order
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Customer
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {recentOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="transition-colors hover:bg-secondary/40"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            <Link
                                                href={route(
                                                    'admin.orders.show',
                                                    order.id,
                                                )}
                                                className="font-semibold text-primary hover:underline"
                                            >
                                                {order.order_number}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-foreground/90">
                                            {order.user?.name}
                                            <span className="block text-xs text-muted-foreground">
                                                {order.user?.email}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm capitalize text-muted-foreground">
                                            {order.status}
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                                            {money(order.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href={route('admin.categories.create')}
                        className="btn-shimmer inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-semibold transition hover:border-primary"
                    >
                        <FolderTree className="h-4 w-4" /> New category
                    </Link>
                    <Link
                        href={route('admin.products.create')}
                        className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
                    >
                        <Package className="h-4 w-4" /> New product
                    </Link>
                    <Link
                        href={route('admin.coupons.create')}
                        className="btn-shimmer inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-semibold transition hover:border-primary"
                    >
                        <Ticket className="h-4 w-4" /> New coupon
                    </Link>
                    <Link
                        href={route('admin.coupons.index')}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary hover:underline"
                    >
                        Manage coupons →
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
