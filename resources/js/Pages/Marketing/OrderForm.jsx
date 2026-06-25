import InputError from '@/Components/InputError';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Package, Plus, Send, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

function emptyOrderItem() {
    return {
        category: '',
        quantity: '',
        size_specs: '',
        color_material: '',
        notes: '',
    };
}

function Field({ label, error, className = '', ...props }) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {label}
            </span>
            <input
                {...props}
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
            />
            <InputError message={error} className="mt-1" />
        </label>
    );
}

export default function OrderForm({ defaultOrderDate, productCategories = [] }) {
    const { site } = usePage().props;
    const [logoOk, setLogoOk] = useState(true);
    const [artworkFiles, setArtworkFiles] = useState([]);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        order_date: defaultOrderDate ?? '',
        design_notes: '',
        order_items: [emptyOrderItem()],
    });

    function updateOrderItem(index, field, value) {
        const items = [...form.data.order_items];
        items[index] = { ...items[index], [field]: value };
        form.setData('order_items', items);
    }

    function addOrderItem() {
        form.setData('order_items', [...form.data.order_items, emptyOrderItem()]);
    }

    function removeOrderItem(index) {
        if (form.data.order_items.length <= 1) {
            return;
        }
        form.setData(
            'order_items',
            form.data.order_items.filter((_, i) => i !== index),
        );
    }

    function resetForm() {
        form.reset();
        form.setData('order_date', defaultOrderDate ?? '');
        form.setData('order_items', [emptyOrderItem()]);
        setArtworkFiles([]);
    }

    function submit(e) {
        e.preventDefault();

        if (artworkFiles.length > 0) {
            form.transform((data) => {
                const next = { ...data };

                artworkFiles.forEach((file, idx) => {
                    if (file instanceof File) {
                        next[`artwork_files[${idx}]`] = file;
                    }
                });

                return next;
            });
        }

        form.post(route('marketing.order-form.store'), {
            preserveScroll: true,
            forceFormData: artworkFiles.length > 0,
            onSuccess: resetForm,
        });
    }

    const brand = site?.siteName ?? 'Pro Print Contractors';

    const categoryMap = useMemo(
        () =>
            Object.fromEntries(
                productCategories.map((category) => [
                    typeof category === 'string' ? category : category.name,
                    typeof category === 'string'
                        ? { name: category, image_url: null }
                        : category,
                ]),
            ),
        [productCategories],
    );

    return (
        <ShopLayout title="Custom Order Form">
            <Head>
                <meta
                    name="description"
                    content="Submit a custom print order for apparel, signage, stationery, drinkware, and more."
                />
            </Head>

            <section className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                    <div className="border-b border-border bg-secondary/20 px-6 py-8 md:px-10">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                            {site?.headerLogoUrl && logoOk ? (
                                <img
                                    src={site.headerLogoUrl}
                                    alt={brand}
                                    className="h-24 w-auto max-w-[240px] shrink-0 object-contain md:h-28"
                                    onError={() => setLogoOk(false)}
                                />
                            ) : (
                                <p className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                                    {brand}
                                </p>
                            )}

                            <div>
                                <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-foreground md:text-3xl">
                                    Order Form
                                </h1>
                                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                                    Order printing for apparel, signage, stationery, drinkware,
                                    and promotional products.
                                </p>
                                <p
                                    className="mt-1 text-sm italic text-muted-foreground"
                                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                                >
                                    {brand} — custom printing &amp; branding
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 px-6 py-8 md:px-10">
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="space-y-4 rounded-xl border border-border p-5 lg:col-span-2">
                                <h2 className="text-sm font-bold uppercase tracking-wide">
                                    Customer Details
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="Name"
                                        name="name"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        required
                                        error={form.errors.name}
                                        className="sm:col-span-2"
                                    />
                                    <Field
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        value={form.data.email}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        required
                                        error={form.errors.email}
                                    />
                                    <Field
                                        label="Phone"
                                        name="phone"
                                        type="tel"
                                        value={form.data.phone}
                                        onChange={(e) => form.setData('phone', e.target.value)}
                                        required
                                        error={form.errors.phone}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-border p-5">
                                <h2 className="mb-4 text-sm font-bold uppercase tracking-wide">
                                    Order Information
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                            Order Number
                                        </span>
                                        <p className="rounded border border-dashed border-border bg-secondary/30 px-3 py-2 text-sm text-muted-foreground">
                                            Assigned after submission
                                        </p>
                                    </div>
                                    <Field
                                        label="Order Date"
                                        name="order_date"
                                        type="date"
                                        value={form.data.order_date}
                                        onChange={(e) =>
                                            form.setData('order_date', e.target.value)
                                        }
                                        error={form.errors.order_date}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border p-5">
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-sm font-bold uppercase tracking-wide">
                                        Order Items
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Add one or more items. Each item can use a different
                                        product category — click &quot;Add item&quot; for mixed orders.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addOrderItem}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add item
                                </button>
                            </div>

                            <div className="space-y-4">
                                {form.data.order_items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-border bg-secondary/10 p-4"
                                    >
                                        <div className="mb-3 flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center gap-2 text-sm font-bold">
                                                <Package className="h-4 w-4 text-primary" />
                                                Item {index + 1}
                                            </span>
                                            {form.data.order_items.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeOrderItem(index)}
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-red-500"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            <div className="sm:col-span-2 lg:col-span-3">
                                                <label className="block">
                                                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                                        Product Category
                                                    </span>
                                                    <select
                                                        value={item.category}
                                                        onChange={(e) =>
                                                            updateOrderItem(
                                                                index,
                                                                'category',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                        className="w-full rounded border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                                                    >
                                                        <option value="">Select a category</option>
                                                        {productCategories.map((category) => {
                                                            const name =
                                                                typeof category === 'string'
                                                                    ? category
                                                                    : category.name;

                                                            return (
                                                                <option key={name} value={name}>
                                                                    {name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                    <InputError
                                                        message={
                                                            form.errors[
                                                                `order_items.${index}.category`
                                                            ]
                                                        }
                                                        className="mt-1"
                                                    />
                                                </label>

                                                {item.category && categoryMap[item.category] && (
                                                    <div className="mt-4 flex items-start gap-4 rounded-lg border border-border bg-background p-3">
                                                        {categoryMap[item.category].image_url ? (
                                                            <img
                                                                src={
                                                                    categoryMap[item.category]
                                                                        .image_url
                                                                }
                                                                alt={item.category}
                                                                className="h-24 w-24 shrink-0 rounded-lg border border-border object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30">
                                                                <Package className="h-8 w-8 text-muted-foreground/50" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-sm font-bold text-foreground">
                                                                {item.category}
                                                            </p>
                                                            <p className="mt-1 text-xs text-muted-foreground">
                                                                Selected category preview
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <Field
                                                label="Quantity"
                                                type="number"
                                                min="0"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateOrderItem(
                                                        index,
                                                        'quantity',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="0"
                                                error={form.errors[`order_items.${index}.quantity`]}
                                            />
                                            <Field
                                                label="Size / Specs"
                                                value={item.size_specs}
                                                onChange={(e) =>
                                                    updateOrderItem(
                                                        index,
                                                        'size_specs',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Size, dimensions, paper type…"
                                                error={form.errors[`order_items.${index}.size_specs`]}
                                            />
                                            <label className="block">
                                                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                                    Color
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="color"
                                                        value={item.color_material || '#000000'}
                                                        onChange={(e) =>
                                                            updateOrderItem(
                                                                index,
                                                                'color_material',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-10 w-14 cursor-pointer rounded border border-border bg-background p-1"
                                                    />
                                                    <span className="text-sm font-medium uppercase text-foreground">
                                                        {item.color_material || 'Not selected'}
                                                    </span>
                                                    {item.color_material && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateOrderItem(
                                                                    index,
                                                                    'color_material',
                                                                    '',
                                                                )
                                                            }
                                                            className="text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                                                        >
                                                            Clear
                                                        </button>
                                                    )}
                                                </div>
                                                <InputError
                                                    message={
                                                        form.errors[
                                                            `order_items.${index}.color_material`
                                                        ]
                                                    }
                                                    className="mt-1"
                                                />
                                            </label>
                                            <label className="block sm:col-span-2 lg:col-span-3">
                                                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                                    Item Notes
                                                </span>
                                                <textarea
                                                    rows={2}
                                                    value={item.notes}
                                                    onChange={(e) =>
                                                        updateOrderItem(
                                                            index,
                                                            'notes',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Placement, finishing, packaging…"
                                                    className="w-full resize-y rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                                />
                                                <InputError
                                                    message={form.errors[`order_items.${index}.notes`]}
                                                    className="mt-1"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-border p-5">
                            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide">
                                Design &amp; Instructions
                            </h2>
                            <label className="block">
                                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    Artwork &amp; Special Instructions
                                </span>
                                <textarea
                                    rows={5}
                                    name="design_notes"
                                    value={form.data.design_notes}
                                    onChange={(e) =>
                                        form.setData('design_notes', e.target.value)
                                    }
                                    placeholder="Logo placement, file references, proof preferences, deadlines, or any other details for your order…"
                                    className="w-full resize-y rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                />
                                <InputError message={form.errors.design_notes} className="mt-1" />
                            </label>

                            <div className="mt-5">
                                <label
                                    htmlFor="artwork_files"
                                    className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground"
                                >
                                    Upload Artwork Files (optional)
                                </label>
                                <input
                                    id="artwork_files"
                                    type="file"
                                    multiple
                                    accept=".pdf,.ai,.eps,.svg,.psd,.jpg,.jpeg,.png,.webp,.zip,image/*"
                                    onChange={(e) =>
                                        setArtworkFiles(Array.from(e.target.files ?? []))
                                    }
                                    className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
                                />
                                <p className="mt-1.5 text-xs text-muted-foreground">
                                    PDF, AI, EPS, SVG, PSD, JPG, PNG, or ZIP — up to 5 files,
                                    10 MB each.
                                </p>
                                {artworkFiles.length > 0 && (
                                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                                        {artworkFiles.map((file) => (
                                            <li key={`${file.name}-${file.size}`}>
                                                {file.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <InputError
                                    message={
                                        form.errors.artwork_files ??
                                        form.errors['artwork_files.0']
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-6 sm:flex-row">
                            <p
                                className="text-lg italic text-muted-foreground"
                                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                            >
                                thank you
                            </p>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-50"
                            >
                                <Send className="h-4 w-4" />
                                {form.processing ? 'Submitting…' : 'Submit Order Form'}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </ShopLayout>
    );
}
