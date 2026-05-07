import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ShopLayout from '@/Layouts/ShopLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function Cart({ lines, subtotal, coupon, discount }) {
    const { errors: pageErrors } = usePage().props;

    const couponForm = useForm({
        code: '',
    });

    function applyCoupon(e) {
        e.preventDefault();
        couponForm.post(route('cart.coupon.store'), {
            preserveScroll: true,
            onSuccess: () => couponForm.reset('code'),
        });
    }

    function removeCoupon() {
        router.delete(route('cart.coupon.destroy'), { preserveScroll: true });
    }

    function updateQty(id, quantity) {
        router.patch(
            route('cart.update', id),
            { quantity },
            { preserveScroll: true },
        );
    }

    function remove(id) {
        router.delete(route('cart.destroy', id), { preserveScroll: true });
    }

    const discountNum = Number(discount ?? 0);

    return (
        <ShopLayout title="Cart">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-foreground">Cart</h1>
                <p className="mt-2 text-muted-foreground">
                    Review items, update quantities, apply a coupon, then proceed to
                    checkout. Payment is completed securely with Stripe.
                </p>

                {lines.length === 0 ? (
                    <div className="mt-10 rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
                        Your cart is empty.{' '}
                        <Link
                            href={route('products.index')}
                            className="font-medium text-primary hover:underline"
                        >
                            Browse products
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                            <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/80">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                            Product
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                            Price
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                            Qty
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                            Line
                                        </th>
                                        <th className="px-4 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {lines.map((line) => (
                                        <tr key={line.id}>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-3">
                                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-secondary">
                                                        {(line.line_image_url ??
                                                            line.customization_preview_url ??
                                                            line.product
                                                                ?.image_url) ? (
                                                            <img
                                                                src={
                                                                    line.line_image_url ??
                                                                    line.customization_preview_url ??
                                                                    line.product
                                                                        ?.image_url
                                                                }
                                                                alt=""
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">
                                                            {line.product?.name}
                                                        </p>
                                                        {line.customization_summary_text ? (
                                                            <p className="text-xs text-muted-foreground">
                                                                Design:{' '}
                                                                {
                                                                    line.customization_summary_text
                                                                }
                                                            </p>
                                                        ) : null}
                                                        {line.variation_summary ? (
                                                            <p className="text-xs text-primary">
                                                                {
                                                                    line.variation_summary
                                                                }
                                                            </p>
                                                        ) : null}
                                                        <p className="text-xs text-muted-foreground">
                                                            SKU:{' '}
                                                            {line.product_variation_id &&
                                                            line.product_variation
                                                                ? line
                                                                      .product_variation
                                                                      .sku
                                                                : line.product
                                                                      ?.sku}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-foreground/90">
                                                {money(line.unit_price)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={line.stock_available}
                                                    defaultValue={line.quantity}
                                                    onBlur={(e) =>
                                                        updateQty(
                                                            line.id,
                                                            Number(e.target.value),
                                                        )
                                                    }
                                                    className="w-24 rounded-md border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm font-medium text-foreground">
                                                {money(line.line_total)}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        remove(line.id)
                                                    }
                                                    className="text-sm text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="border-t border-border px-4 py-4">
                                <form
                                    onSubmit={applyCoupon}
                                    className="flex flex-wrap items-end gap-3"
                                >
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-muted-foreground">
                                            Coupon code
                                        </label>
                                        <TextInput
                                            value={couponForm.data.code}
                                            onChange={(e) =>
                                                couponForm.setData(
                                                    'code',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full max-w-xs"
                                            placeholder="SAVE10"
                                        />
                                        <InputError
                                            message={
                                                couponForm.errors.code ??
                                                pageErrors?.code
                                            }
                                            className="mt-1"
                                        />
                                    </div>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={couponForm.processing}
                                    >
                                        Apply
                                    </PrimaryButton>
                                    {coupon && (
                                        <button
                                            type="button"
                                            onClick={removeCoupon}
                                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                        >
                                            Remove coupon
                                        </button>
                                    )}
                                </form>
                                {coupon && (
                                    <p className="mt-3 text-sm text-emerald-400">
                                        Applied:{' '}
                                        <span className="font-semibold">
                                            {coupon.code}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 border-t border-border bg-secondary/50 px-4 py-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span className="font-semibold text-foreground">
                                        {money(subtotal)}
                                    </span>
                                </div>
                                {discountNum > 0 && (
                                    <div className="flex justify-between text-emerald-400">
                                        <span>Discount</span>
                                        <span className="font-semibold">
                                            −{money(discount)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                            <Link
                                href={route('products.index')}
                                className="text-sm font-medium text-muted-foreground hover:text-primary"
                            >
                                Continue shopping
                            </Link>
                            <Link
                                href={route('checkout.create')}
                                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition duration-150 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                            >
                                Proceed to checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </ShopLayout>
    );
}
