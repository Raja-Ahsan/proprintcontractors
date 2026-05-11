import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ShopLayout from '@/Layouts/ShopLayout';
import { Link, useForm } from '@inertiajs/react';

const COUNTRY_OPTIONS = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'IE', name: 'Ireland' },
    { code: 'MX', name: 'Mexico' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'AT', name: 'Austria' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'PL', name: 'Poland' },
    { code: 'JP', name: 'Japan' },
    { code: 'SG', name: 'Singapore' },
    { code: 'BR', name: 'Brazil' },
    { code: 'IN', name: 'India' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'AE', name: 'United Arab Emirates' },
].sort((a, b) => a.name.localeCompare(b.name));

const selectClass =
    'mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary';

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
        billing_same_as_shipping: true,
        billing_name: '',
        billing_phone: '',
        billing_address_line1: '',
        billing_address_line2: '',
        billing_city: '',
        billing_state: '',
        billing_postal_code: '',
        billing_country: 'US',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('checkout.store'));
    }

    const sameBilling = form.data.billing_same_as_shipping;

    return (
        <ShopLayout title="Checkout">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
                <p className="mt-2 text-muted-foreground">
                    Enter your contact, shipping, and billing details below. After you
                    submit, you will go to{' '}
                    <strong className="text-foreground">Stripe Checkout</strong> to enter
                    your card — card details are not collected on this page.
                </p>

                {!stripeConfigured && (
                    <div className="mt-6 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                        Card payment is off until a{' '}
                        <strong className="text-amber-50">Stripe secret key</strong>{' '}
                        (<code className="rounded bg-amber-500/20 px-1">sk_test_…</code>{' '}
                        or <code className="rounded bg-amber-500/20 px-1">sk_live_…</code>
                        ) is saved. In the admin go to{' '}
                        <strong className="text-amber-50">Settings → Payments</strong> and
                        paste the secret key (the publishable{' '}
                        <code className="rounded bg-amber-500/20 px-1">pk_…</code> key
                        alone is not enough). Alternatively set{' '}
                        <code className="rounded bg-amber-500/20 px-1">STRIPE_SECRET</code>{' '}
                        in your <code className="rounded bg-amber-500/20 px-1">.env</code>{' '}
                        file.
                    </div>
                )}

                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                    <form onSubmit={submit} className="space-y-8">
                        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground">
                                Contact
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                We will use this email for your order confirmation and
                                updates.
                            </p>
                            <div className="mt-4 space-y-4">
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
                            </div>
                        </section>

                        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground">
                                Shipping address
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Where we should send your order.
                            </p>
                            <div className="mt-4 space-y-4">
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
                                                form.setData(
                                                    'shipping_city',
                                                    e.target.value,
                                                )
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
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <InputLabel
                                            htmlFor="shipping_postal_code"
                                            value="Postal / ZIP code"
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
                                    <div>
                                        <InputLabel
                                            htmlFor="shipping_country"
                                            value="Country"
                                        />
                                        <select
                                            id="shipping_country"
                                            value={form.data.shipping_country}
                                            onChange={(e) =>
                                                form.setData(
                                                    'shipping_country',
                                                    e.target.value,
                                                )
                                            }
                                            className={selectClass}
                                            required
                                        >
                                            {COUNTRY_OPTIONS.map((c) => (
                                                <option key={c.code} value={c.code}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={form.errors.shipping_country}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground">
                                Billing
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Matches your shipping address unless you specify otherwise.
                            </p>
                            <div className="mt-4 flex items-start gap-3 rounded-md bg-secondary/50 px-4 py-3">
                                <input
                                    id="billing_same_as_shipping"
                                    type="checkbox"
                                    className="mt-1 rounded border-border text-primary focus:ring-primary"
                                    checked={sameBilling}
                                    onChange={(e) =>
                                        form.setData(
                                            'billing_same_as_shipping',
                                            e.target.checked,
                                        )
                                    }
                                />
                                <label
                                    htmlFor="billing_same_as_shipping"
                                    className="text-sm text-foreground"
                                >
                                    Billing address is the same as shipping address
                                </label>
                            </div>
                            <InputError
                                message={form.errors.billing_same_as_shipping}
                                className="mt-2"
                            />

                            {!sameBilling ? (
                                <div className="mt-6 space-y-4 border-t border-border pt-6">
                                    <div>
                                        <InputLabel htmlFor="billing_name" value="Full name (billing)" />
                                        <TextInput
                                            id="billing_name"
                                            value={form.data.billing_name}
                                            onChange={(e) =>
                                                form.setData('billing_name', e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError
                                            message={form.errors.billing_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="billing_phone"
                                            value="Phone (billing, optional)"
                                        />
                                        <TextInput
                                            id="billing_phone"
                                            value={form.data.billing_phone}
                                            onChange={(e) =>
                                                form.setData('billing_phone', e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={form.errors.billing_phone}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="billing_address_line1"
                                            value="Address line 1"
                                        />
                                        <TextInput
                                            id="billing_address_line1"
                                            value={form.data.billing_address_line1}
                                            onChange={(e) =>
                                                form.setData(
                                                    'billing_address_line1',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError
                                            message={form.errors.billing_address_line1}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="billing_address_line2"
                                            value="Address line 2 (optional)"
                                        />
                                        <TextInput
                                            id="billing_address_line2"
                                            value={form.data.billing_address_line2}
                                            onChange={(e) =>
                                                form.setData(
                                                    'billing_address_line2',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={form.errors.billing_address_line2}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <InputLabel htmlFor="billing_city" value="City" />
                                            <TextInput
                                                id="billing_city"
                                                value={form.data.billing_city}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'billing_city',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={form.errors.billing_city}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                htmlFor="billing_state"
                                                value="State / province (optional)"
                                            />
                                            <TextInput
                                                id="billing_state"
                                                value={form.data.billing_state}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'billing_state',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                            />
                                            <InputError
                                                message={form.errors.billing_state}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <InputLabel
                                                htmlFor="billing_postal_code"
                                                value="Postal / ZIP code"
                                            />
                                            <TextInput
                                                id="billing_postal_code"
                                                value={form.data.billing_postal_code}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'billing_postal_code',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={form.errors.billing_postal_code}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                htmlFor="billing_country"
                                                value="Country"
                                            />
                                            <select
                                                id="billing_country"
                                                value={form.data.billing_country}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'billing_country',
                                                        e.target.value,
                                                    )
                                                }
                                                className={selectClass}
                                                required
                                            >
                                                {COUNTRY_OPTIONS.map((c) => (
                                                    <option key={c.code} value={c.code}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError
                                                message={form.errors.billing_country}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </section>

                        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground">
                                Order notes
                            </h2>
                            <div className="mt-4">
                                <InputLabel htmlFor="notes" value="Notes (optional)" />
                                <textarea
                                    id="notes"
                                    value={form.data.notes}
                                    onChange={(e) =>
                                        form.setData('notes', e.target.value)
                                    }
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                />
                                <InputError message={form.errors.notes} className="mt-2" />
                            </div>
                        </section>

                        <InputError message={form.errors.cart} className="mt-2" />
                        <InputError message={form.errors.coupon} className="mt-2" />
                        <InputError message={form.errors.stripe} className="mt-2" />

                        <div className="flex flex-wrap gap-4 pt-2">
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

                    <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-sm lg:sticky lg:top-8">
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
