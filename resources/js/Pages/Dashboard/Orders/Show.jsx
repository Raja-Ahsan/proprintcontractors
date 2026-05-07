import CustomerAccountLayout from '@/Layouts/CustomerAccountLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function Show({ order }) {
    return (
        <CustomerAccountLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Order detail
                    </p>
                    <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">
                        Order {order.order_number}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Summary, shipping address, and line items for this order.
                    </p>
                </div>
            }
        >
            <Head title={`Order ${order.order_number}`} />

            <div className="mx-auto w-full max-w-4xl">
                <div className="neon-card overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-sm">
                    <div className="border-b border-border px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            Placed{' '}
                            {order.placed_at
                                ? new Date(order.placed_at).toLocaleString()
                                : '—'}
                        </p>
                        <p className="mt-2 text-sm capitalize text-foreground">
                            Fulfillment:{' '}
                            <span className="font-semibold text-primary">
                                {order.status}
                            </span>
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                            Payment:{' '}
                            <span className="font-semibold capitalize">
                                {order.payment_status ?? '—'}
                            </span>
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                            Ship to
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">
                            {order.shipping_name}
                            <br />
                            {order.shipping_email}
                            <br />
                            {order.shipping_phone && (
                                <>
                                    {order.shipping_phone}
                                    <br />
                                </>
                            )}
                            {order.shipping_address_line1}
                            <br />
                            {order.shipping_address_line2 && (
                                <>
                                    {order.shipping_address_line2}
                                    <br />
                                </>
                            )}
                            {order.shipping_city}, {order.shipping_postal_code}
                            <br />
                            {order.shipping_country}
                        </p>
                        {order.notes && (
                            <p className="mt-4 text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">
                                    Notes:
                                </span>{' '}
                                {order.notes}
                            </p>
                        )}
                    </div>
                    <div className="overflow-x-auto border-t border-border">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-secondary/60">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Item
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Qty
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="max-w-md px-6 py-3 text-sm text-foreground">
                                            <div className="flex gap-3">
                                                {item.customization_preview_url ? (
                                                    <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                                                        <img
                                                            src={
                                                                item.customization_preview_url
                                                            }
                                                            alt="Your design"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </span>
                                                ) : null}
                                                <div>
                                                    {item.product_name}
                                                    <span className="block text-xs text-muted-foreground">
                                                        SKU {item.product_sku}
                                                    </span>
                                                    {item.customization_summary_text ? (
                                                        <p className="mt-2 text-xs text-muted-foreground">
                                                            Your design summary:{' '}
                                                            <span className="text-foreground">
                                                                {
                                                                    item.customization_summary_text
                                                                }
                                                            </span>
                                                        </p>
                                                    ) : null}
                                                    {item.customization_json ? (
                                                        <details className="mt-2 text-xs text-muted-foreground">
                                                            <summary className="cursor-pointer font-semibold text-primary">
                                                                Customization details
                                                            </summary>
                                                            <pre className="mt-2 max-h-40 overflow-auto rounded bg-muted/70 p-2 text-[11px] text-foreground">
                                                                {JSON.stringify(
                                                                    item.customization_json,
                                                                    null,
                                                                    2,
                                                                )}
                                                            </pre>
                                                        </details>
                                                    ) : null}
                                                    {item.variation_attributes &&
                                                        Object.keys(
                                                            item.variation_attributes,
                                                        ).length > 0 && (
                                                            <span className="mt-1 block text-xs text-primary">
                                                                {Object.entries(
                                                                    item.variation_attributes,
                                                                ).map(([k, v]) => (
                                                                    <span
                                                                        key={k}
                                                                        className="mr-2 inline-block"
                                                                    >
                                                                        {k}: {v}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-right text-sm tabular-nums text-muted-foreground">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-3 text-right text-sm tabular-nums text-muted-foreground">
                                            {money(item.unit_price)}
                                        </td>
                                        <td className="px-6 py-3 text-right text-sm font-semibold tabular-nums text-foreground">
                                            {money(item.line_total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-border px-6 py-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Subtotal
                            </span>
                            <span className="font-medium tabular-nums text-foreground">
                                {money(order.subtotal)}
                            </span>
                        </div>
                        {Number(order.discount_amount) > 0 && (
                            <div className="mt-2 flex justify-between text-emerald-600 dark:text-emerald-400">
                                <span>Discount</span>
                                <span className="font-medium tabular-nums">
                                    −{money(order.discount_amount)}
                                </span>
                            </div>
                        )}
                        <div className="mt-2 flex justify-between">
                            <span className="text-muted-foreground">
                                Shipping
                            </span>
                            <span className="font-medium tabular-nums text-foreground">
                                {money(order.shipping_total)}
                            </span>
                        </div>
                        <div className="mt-2 flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span className="font-medium tabular-nums text-foreground">
                                {money(order.tax)}
                            </span>
                        </div>
                        <div className="mt-4 flex justify-between border-t border-border pt-4 text-base">
                            <span className="font-bold text-foreground">
                                Total
                            </span>
                            <span className="font-bold tabular-nums text-foreground">
                                {money(order.total)}
                            </span>
                        </div>
                    </div>
                    <div className="border-t border-border px-6 py-4">
                        <Link
                            href={route('dashboard.orders.index')}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/90"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to orders
                        </Link>
                    </div>
                </div>
            </div>
        </CustomerAccountLayout>
    );
}
