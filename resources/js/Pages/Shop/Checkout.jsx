import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ShopLayout from '@/Layouts/ShopLayout';
import { Link, useForm } from '@inertiajs/react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

export default function Checkout({
    lines,
    subtotal,
    discount,
    coupon,
    shipping_flat,
    free_shipping_minimum,
    tax_rate,
    tax,
    total,
    stripeConfigured,
    defaults,
}) {
    const form = useForm({
        shipping_name: defaults.shipping_name ?? '',
        shipping_email: defaults.shipping_email ?? '',
        shipping_phone: '',
        shipping_address_line1: '',
        shipping_address_line2: '',
        shipping_city: '',
        shipping_state: defaults.shipping_state ?? '',
        shipping_postal_code: '',
        shipping_country: 'US',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('checkout.store'));
    }

    return (
        <ShopLayout title="Checkout">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
                <p className="mt-2 text-muted-foreground">
                    Enter shipping details. You will complete payment securely with
                    Stripe.
                </p>

                {!stripeConfigured && (
                    <div className="mt-6 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                        Payments are not configured. Add{' '}
                        <code className="rounded bg-amber-500/20 px-1 text-amber-50">
                            STRIPE_SECRET
                        </code>{' '}
                        to your environment file to enable checkout.
                    </div>
                )}

                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="shipping_name" value="Full name" />
                            <TextInput
                                id="shipping_name"
                                value={form.data.shipping_name}
                                onChange={(e) =>
                                    form.setData('shipping_name', e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={form.errors.shipping_name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="shipping_email" value="Email" />
                            <TextInput
                                id="shipping_email"
                                type="email"
                                value={form.data.shipping_email}
                                onChange={(e) =>
                                    form.setData('shipping_email', e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={form.errors.shipping_email}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="shipping_phone"
                                value="Phone (optional)"
                            />
                            <TextInput
                                id="shipping_phone"
                                value={form.data.shipping_phone}
                                onChange={(e) =>
                                    form.setData('shipping_phone', e.target.value)
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={form.errors.shipping_phone}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="shipping_address_line1"
                                value="Address line 1"
                            />
                            <TextInput
                                id="shipping_address_line1"
                                value={form.data.shipping_address_line1}
                                onChange={(e) =>
                                    form.setData(
                                        'shipping_address_line1',
                                        e.target.value,
                                    )
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={form.errors.shipping_address_line1}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="shipping_address_line2"
                                value="Address line 2 (optional)"
                            />
                            <TextInput
                                id="shipping_address_line2"
                                value={form.data.shipping_address_line2}
                                onChange={(e) =>
                                    form.setData(
                                        'shipping_address_line2',
                                        e.target.value,
                                    )
                                }
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={form.errors.shipping_address_line2}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <InputLabel htmlFor="shipping_city" value="City" />
                                <TextInput
                                    id="shipping_city"
                                    value={form.data.shipping_city}
                                    onChange={(e) =>
                                        form.setData('shipping_city', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={form.errors.shipping_city}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="shipping_state"
                                    value="State / province (optional)"
                                />
                                <TextInput
                                    id="shipping_state"
                                    value={form.data.shipping_state}
                                    onChange={(e) =>
                                        form.setData(
                                            'shipping_state',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={form.errors.shipping_state}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="shipping_postal_code"
                                    value="Postal code"
                                />
                                <TextInput
                                    id="shipping_postal_code"
                                    value={form.data.shipping_postal_code}
                                    onChange={(e) =>
                                        form.setData(
                                            'shipping_postal_code',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={form.errors.shipping_postal_code}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <InputLabel htmlFor="shipping_country" value="Country" />
                            <TextInput
                                id="shipping_country"
                                value={form.data.shipping_country}
                                onChange={(e) =>
                                    form.setData('shipping_country', e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={form.errors.shipping_country}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="notes" value="Order notes (optional)" />
                            <textarea
                                id="notes"
                                value={form.data.notes}
                                onChange={(e) =>
                                    form.setData('notes', e.target.value)
                                }
                                rows={3}
                                className="mt-1 block w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            />
                            <InputError message={form.errors.notes} className="mt-2" />
                        </div>

                        <InputError message={form.errors.cart} className="mt-2" />
                        <InputError message={form.errors.coupon} className="mt-2" />
                        <InputError message={form.errors.stripe} className="mt-2" />

                        <div className="flex gap-4 pt-4">
                            <PrimaryButton
                                disabled={form.processing || !stripeConfigured}
                            >
                                Continue to secure payment
                            </PrimaryButton>
                            <Link
                                href={route('cart.index')}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                            >
                                Back to cart
                            </Link>
                        </div>
                    </form>

                    <aside className="rounded-lg border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-foreground">
                            Order summary
                        </h2>
                        {coupon && (
                            <p className="mt-2 text-sm text-primary">
                                Coupon{' '}
                                <span className="font-semibold">{coupon.code}</span>{' '}
                                applied
                            </p>
                        )}
                        <ul className="mt-4 divide-y divide-border text-sm">
                            {lines.map((line) => (
                                <li
                                    key={line.id}
                                    className="flex justify-between gap-4 py-3"
                                >
                                    <span className="flex gap-3 text-muted-foreground">
                                        {(line.line_image_url ??
                                            line.customization_preview_url ??
                                            line.product?.image_url) && (
                                            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
                                                <img
                                                    src={
                                                        line.line_image_url ??
                                                        line.customization_preview_url ??
                                                        line.product?.image_url
                                                    }
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </span>
                                        )}
                                        <span>
                                            <span className="text-foreground">
                                                {line.product?.name}
                                            </span>
                                            {line.customization_summary_text ? (
                                                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                                    {line.customization_summary_text}
                                                </span>
                                            ) : null}
                                            {line.variation_summary ? (
                                                <span className="mt-0.5 block text-xs text-primary">
                                                    {line.variation_summary}
                                                </span>
                                            ) : null}
                                            <span className="block text-xs">
                                                × {line.quantity}
                                            </span>
                                        </span>
                                    </span>
                                    <span className="font-medium text-foreground">
                                        {money(line.line_total)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <dl className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Subtotal</dt>
                                <dd className="font-medium text-foreground">
                                    {money(subtotal)}
                                </dd>
                            </div>
                            {Number(discount) > 0 && (
                                <div className="flex justify-between text-emerald-400">
                                    <dt>Discount</dt>
                                    <dd className="font-medium">−{money(discount)}</dd>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Shipping</dt>
                                <dd className="font-medium text-foreground">
                                    {Number(shipping_flat) === 0 ? (
                                        <span className="text-emerald-400">Free</span>
                                    ) : (
                                        money(shipping_flat)
                                    )}
                                </dd>
                            </div>
                            {free_shipping_minimum &&
                                Number(free_shipping_minimum) > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Free shipping on orders over{' '}
                                        {money(free_shipping_minimum)} (after
                                        discounts).
                                    </p>
                                )}
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Tax ({(Number(tax_rate) * 100).toFixed(0)}%)
                                </dt>
                                <dd className="font-medium text-foreground">
                                    {money(tax)}
                                </dd>
                            </div>
                            <div className="flex justify-between border-t border-border pt-3 text-base">
                                <dt className="font-semibold text-foreground">
                                    Total due
                                </dt>
                                <dd className="font-semibold text-foreground">
                                    {money(total)}
                                </dd>
                            </div>
                        </dl>
                    </aside>
                </div>
            </div>
        </ShopLayout>
    );
}
