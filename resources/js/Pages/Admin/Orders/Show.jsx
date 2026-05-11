import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

/** Best-effort: ISO codes show as localized country names; free-text values pass through */
function regionLabel(codeOrName) {
    if (!codeOrName) {
        return null;
    }
    const trimmed = String(codeOrName).trim();
    if (trimmed.length === 2 || trimmed.length === 3) {
        try {
            const label = new Intl.DisplayNames(['en'], { type: 'region' }).of(
                trimmed.toUpperCase(),
            );
            if (label && label !== trimmed.toUpperCase()) {
                return label;
            }
        } catch {
            /* ignore */
        }
    }
    return trimmed;
}

const selectClass =
    'mt-1 rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Show({ order, statuses }) {
    const form = useForm({
        status: order.status,
    });

    function saveStatus(e) {
        e.preventDefault();
        form.patch(route('admin.orders.status', order.id));
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Order detail
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        {order.order_number}
                    </h1>
                </div>
            }
        >
            <Head title={`Order ${order.order_number}`} />

            <div className="w-full">
                <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-sm">
                    <div className="border-b border-border px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            {order.user ? (
                                <>
                                    Customer:{' '}
                                    <span className="font-semibold text-foreground">
                                        {order.user.name}
                                    </span>{' '}
                                    ({order.user.email})
                                </>
                            ) : (
                                <>
                                    Guest checkout ·{' '}
                                    <span className="font-semibold text-foreground">
                                        {order.shipping_email}
                                    </span>
                                </>
                            )}
                        </p>
                        <p className="mt-2 text-sm text-foreground/90">
                            Payment:{' '}
                            <span className="font-semibold capitalize">
                                {order.payment_status ?? '—'}
                            </span>
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Placed{' '}
                            {order.placed_at
                                ? new Date(order.placed_at).toLocaleString()
                                : '—'}
                        </p>

                        <form
                            onSubmit={saveStatus}
                            className="mt-6 flex flex-wrap items-end gap-3"
                        >
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground">
                                    Status
                                </label>
                                <select
                                    value={form.data.status}
                                    onChange={(e) =>
                                        form.setData('status', e.target.value)
                                    }
                                    className={`${selectClass} block w-full min-w-[12rem] px-3 py-2`}
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <PrimaryButton disabled={form.processing}>
                                Update status
                            </PrimaryButton>
                        </form>
                    </div>

                    <div className="grid gap-8 border-b border-border px-6 py-4 sm:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-bold text-foreground">
                                Ship to
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {order.shipping_name}
                                <br />
                                {order.shipping_email}
                                <br />
                                {order.shipping_phone ? (
                                    <>
                                        {order.shipping_phone}
                                        <br />
                                    </>
                                ) : null}
                                {order.shipping_address_line1}
                                <br />
                                {order.shipping_address_line2 ? (
                                    <>
                                        {order.shipping_address_line2}
                                        <br />
                                    </>
                                ) : null}
                                {order.shipping_city}
                                {order.shipping_state
                                    ? `, ${order.shipping_state} `
                                    : ' '}
                                {order.shipping_postal_code}
                                <br />
                                {regionLabel(order.shipping_country)}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-foreground">
                                Bill to
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {order.billing_name ? (
                                    <>
                                        {order.billing_name}
                                        <br />
                                        {order.billing_phone ? (
                                            <>
                                                {order.billing_phone}
                                                <br />
                                            </>
                                        ) : null}
                                        {order.billing_address_line1}
                                        <br />
                                        {order.billing_address_line2 ? (
                                            <>
                                                {order.billing_address_line2}
                                                <br />
                                            </>
                                        ) : null}
                                        {order.billing_city}
                                        {order.billing_state
                                            ? `, ${order.billing_state} `
                                            : ' '}
                                        {order.billing_postal_code}
                                        <br />
                                        {regionLabel(order.billing_country)}
                                    </>
                                ) : (
                                    <>
                                        Not stored separately · shown as{' '}
                                        <span className="font-medium text-foreground">
                                            ship to / legacy order
                                        </span>
                                        <br />
                                        <span className="text-xs text-muted-foreground/90">
                                            Orders placed before billing fields were saved
                                            may only have shipping on file.
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {order.notes ? (
                        <div className="border-b border-border px-6 py-4">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">
                                    Notes:
                                </span>{' '}
                                {order.notes}
                            </p>
                        </div>
                    ) : null}

                    <div className="overflow-x-auto border-t border-border">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-secondary/80">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Item
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Qty
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="max-w-xs px-6 py-3 text-sm text-foreground">
                                            <div className="flex gap-3">
                                                {item.customization_preview_url ? (
                                                    <a
                                                        href={
                                                            item.customization_preview_url
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary hover:opacity-90"
                                                        title="Customization preview"
                                                    >
                                                        <img
                                                            src={
                                                                item.customization_preview_url
                                                            }
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </a>
                                                ) : null}
                                                <div>
                                                    {item.product_name}
                                                    <span className="block text-xs text-muted-foreground">
                                                        SKU {item.product_sku}
                                                    </span>
                                                    {item.customization_summary_text ? (
                                                        <p className="mt-2 text-xs text-muted-foreground">
                                                            Customer text/content:{' '}
                                                            <span className="text-foreground">
                                                                {
                                                                    item.customization_summary_text
                                                                }
                                                            </span>
                                                        </p>
                                                    ) : null}
                                                    {(item.customization_asset_paths
                                                        ?.length ?? 0) > 0 ? (
                                                        <details className="mt-2 text-xs text-muted-foreground">
                                                            <summary className="cursor-pointer font-semibold text-primary">
                                                                Uploaded assets paths
                                                                (
                                                                {
                                                                    item
                                                                        .customization_asset_paths
                                                                        .length
                                                                }
                                                                )
                                                            </summary>
                                                            <pre className="mt-2 max-h-32 overflow-auto rounded bg-secondary/70 p-2 text-[11px] text-foreground">
                                                                {JSON.stringify(
                                                                    item.customization_asset_paths,
                                                                    null,
                                                                    2,
                                                                )}
                                                            </pre>
                                                        </details>
                                                    ) : null}
                                                    {item.customization_json ? (
                                                        <details className="mt-2 text-xs text-muted-foreground">
                                                            <summary className="cursor-pointer font-semibold text-primary">
                                                                Full customization JSON
                                                            </summary>
                                                            <pre className="mt-2 max-h-48 overflow-auto rounded bg-secondary/70 p-2 text-[11px] text-foreground">
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
                                                                        {k}:{' '}
                                                                        {String(v)}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-right text-sm text-muted-foreground">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-3 text-right text-sm text-muted-foreground">
                                            {money(item.unit_price)}
                                        </td>
                                        <td className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                                            {money(item.line_total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-border px-6 py-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-semibold text-foreground">
                                {money(order.subtotal)}
                            </span>
                        </div>
                        {Number(order.discount_amount) > 0 && (
                            <div className="mt-2 flex justify-between text-emerald-400">
                                <span>Discount</span>
                                <span className="font-semibold">
                                    −{money(order.discount_amount)}
                                </span>
                            </div>
                        )}
                        <div className="mt-2 flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="font-semibold text-foreground">
                                {money(order.shipping_total)}
                            </span>
                        </div>
                        <div className="mt-2 flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span className="font-semibold text-foreground">
                                {money(order.tax)}
                            </span>
                        </div>
                        <div className="mt-4 flex justify-between border-t border-border pt-4 text-base">
                            <span className="font-bold text-foreground">Total</span>
                            <span className="font-bold text-foreground">
                                {money(order.total)}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-border px-6 py-4">
                        <Link
                            href={route('admin.orders.index')}
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            ← Back to orders
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
