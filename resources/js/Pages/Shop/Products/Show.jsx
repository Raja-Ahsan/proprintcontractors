import InputError from '@/Components/InputError';
import { getCatalogExtraBySlug } from '@/data/catalog';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Check,
    Minus,
    Plus,
    ShoppingCart,
    Sparkles,
    Upload,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

/** DB boolean / 0–1 serialized from Laravel or JSON edge cases */
function productHasCustomizer(product) {
    const v = product?.is_customizable;

    return v === true || v === 1 || v === '1';
}

function initialSelection(defs, variations) {
    const first = variations?.[0];
    const sel = {};
    (defs ?? []).forEach((d) => {
        const k = d.key;
        sel[k] = first?.attributes?.[k] ?? d.values?.[0] ?? '';
    });

    return sel;
}

function matchVariation(variations, selected) {
    if (!variations?.length) {
        return null;
    }

    return variations.find((v) =>
        Object.keys(selected).every((k) => v.attributes?.[k] === selected[k]),
    );
}

function variationForMainProductImage(product) {
    const pv = product.image_url ?? '';
    const list = product.variations ?? [];

    const match = list.find((v) => {
        const vimg = v.image_url ?? '';

        return vimg === '' || vimg === pv;
    });

    return match ?? list[0];
}

export default function Show({ product, related }) {
    const catalogExtra = getCatalogExtraBySlug(product.slug);

    const isDbVariable =
        product.type === 'variable' &&
        Array.isArray(product.variations) &&
        product.variations.length > 0;

    /** @type {(string|null)[]} */
    const simpleImageSet = useMemo(() => {
        if (isDbVariable) {
            return [];
        }

        const out = [];
        const seen = new Set();
        const pushUrl = (u) => {
            if (typeof u === 'string' && u !== '' && !seen.has(u)) {
                seen.add(u);

                out.push(u);
            }
        };

        pushUrl(product.image_url);
        const galleryUrls = product.gallery_urls;
        if (Array.isArray(galleryUrls)) {
            galleryUrls.forEach(pushUrl);
        }
        pushUrl(catalogExtra?.image ?? null);

        return out.filter(Boolean);
    }, [
        catalogExtra?.image,
        product.gallery_urls,
        product.image_url,
        isDbVariable,
    ]);

    const [galleryIndex, setGalleryIndex] = useState(0);

    /** When set, shows this URL for variable products (extra gallery photos). */
    const [variableGalleryPinUrl, setVariableGalleryPinUrl] =
        useState(null);

    useEffect(() => {
        setGalleryIndex(0);
        setVariableGalleryPinUrl(null);
    }, [product.id]);

    useEffect(() => {
        setGalleryIndex((i) =>
            simpleImageSet.length === 0
                ? 0
                : Math.min(i, simpleImageSet.length - 1),
        );
    }, [simpleImageSet.length]);

    const [selectedAttrs, setSelectedAttrs] = useState(() =>
        initialSelection(
            product.variation_attribute_defs,
            product.variations,
        ),
    );

    useEffect(() => {
        setVariableGalleryPinUrl(null);
    }, [selectedAttrs]);

    const matchedVariation = useMemo(
        () => matchVariation(product.variations, selectedAttrs),
        [product.variations, selectedAttrs],
    );

    const variablePrimaryImage = useMemo(() => {
        if (!isDbVariable) {
            return null;
        }

        return (
            matchedVariation?.image_url ??
            product.image_url ??
            catalogExtra?.image ??
            null
        );
    }, [
        catalogExtra?.image,
        isDbVariable,
        matchedVariation?.image_url,
        product.image_url,
    ]);

    const displayImage = useMemo(() => {
        if (isDbVariable) {
            return variableGalleryPinUrl ?? variablePrimaryImage;
        }

        return (
            simpleImageSet[galleryIndex] ??
            simpleImageSet[0] ??
            catalogExtra?.image ??
            null
        );
    }, [
        catalogExtra?.image,
        galleryIndex,
        isDbVariable,
        simpleImageSet,
        variableGalleryPinUrl,
        variablePrimaryImage,
    ]);

    const variableThumbItems = useMemo(() => {
        if (!isDbVariable || !(product.variations ?? []).length) {
            return [];
        }

        const items = [];
        const seenUrls = new Set();

        const pushThumb = (url, variation, isParentThumb) => {
            if (typeof url !== 'string' || url === '') {
                return;
            }

            if (seenUrls.has(url)) {
                return;
            }

            seenUrls.add(url);

            items.push({ url, variation, isParentThumb });
        };

        if (product.image_url) {
            pushThumb(product.image_url, null, true);
        }

        for (const v of product.variations) {
            if (v.image_url) {
                pushThumb(v.image_url, v, false);
            }
        }

        const extras = product.gallery_urls;
        if (Array.isArray(extras)) {
            for (const url of extras) {
                if (typeof url !== 'string' || url === '') {
                    continue;
                }

                pushThumb(url, '__gallery__', false);
            }
        }

        return items;
    }, [
        isDbVariable,
        product.gallery_urls,
        product.image_url,
        product.variations,
    ]);

    const [color, setColor] = useState(catalogExtra?.colors?.[0] ?? '');
    const [size, setSize] = useState(catalogExtra?.sizes?.[0] ?? '');
    const [qty, setQty] = useState(1);
    const [customText, setCustomText] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const fileRef = useRef(null);

    const maxQty = isDbVariable
        ? matchedVariation?.stock_quantity ?? 0
        : product.stock_quantity;

    useEffect(() => {
        const cap =
            typeof maxQty === 'number' && Number.isFinite(maxQty) ? maxQty : 0;

        if (cap <= 0) {
            return;
        }

        setQty((q) => Math.min(Math.max(1, q), cap));
    }, [matchedVariation?.id, maxQty]);

    const showCatalogCustomize = Boolean(catalogExtra) && !isDbVariable;
    const showSimpleQty = !catalogExtra && !isDbVariable;
    const showVariableUi = isDbVariable;

    const form = useForm({
        product_id: product.id,
        product_variation_id: null,
        quantity: 1,
    });

    function addToCart(e) {
        e.preventDefault();
        submitCart();
    }

    function openCustomizer() {
        let url = route('products.customize', product.slug);

        if (isDbVariable && matchedVariation?.id) {
            url += `?variation_id=${matchedVariation.id}`;
        }

        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function submitCart() {
        form.setData({
            product_id: product.id,
            quantity: qty,
            product_variation_id: isDbVariable
                ? matchedVariation?.id ?? null
                : null,
        });

        form.post(route('cart.store'), {
            preserveScroll: true,
        });
    }

    function onUpload(e) {
        const f = e.target.files?.[0];
        if (!f) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setLogoPreview(ev.target?.result ?? null);
        reader.readAsDataURL(f);
    }

    const featureList =
        Array.isArray(catalogExtra?.features) && catalogExtra.features.length > 0
            ? catalogExtra.features
            : [];

    const canPurchaseVariable = !isDbVariable || matchedVariation;
    const stockOk =
        !isDbVariable
            ? Number(product.stock_quantity) > 0
            : Boolean(matchedVariation && Number(maxQty) > 0);

    const purchaseDisabled =
        form.processing ||
        !canPurchaseVariable ||
        !stockOk ||
        qty < 1 ||
        (maxQty > 0 && qty > maxQty);

    const displayPrice = isDbVariable
        ? matchedVariation?.price
        : product.price;
    const displayCompare = isDbVariable
        ? matchedVariation?.compare_at_price
        : product.compare_at_price;

    const rawDescription =
        catalogExtra?.description ?? product.description ?? '';

    const hasDescription = String(rawDescription).trim() !== '';

    return (
        <ShopLayout title={product.name}>
            <Head>
                <meta name="description" content={product.description ?? ''} />
            </Head>

            <div className="container mx-auto px-4 py-8">
                <Link
                    href={route('products.index')}
                    className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Products
                </Link>

                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="animate-fade-up space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
                            {displayImage ? (
                                <img
                                    src={displayImage}
                                    alt={product.name}
                                    width={800}
                                    height={800}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No image uploaded
                                </div>
                            )}
                            {logoPreview && (
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <img
                                        src={logoPreview}
                                        alt="Your logo preview"
                                        className="animate-fade-up max-h-[40%] max-w-[40%] opacity-90 drop-shadow-2xl"
                                    />
                                </div>
                            )}
                            {customText && (
                                <div className="pointer-events-none absolute bottom-8 left-0 right-0 text-center">
                                    <span className="rounded-md bg-background/70 px-4 py-2 text-xl font-bold text-foreground backdrop-blur">
                                        {customText}
                                    </span>
                                </div>
                            )}
                        </div>
                        {!isDbVariable && simpleImageSet.length > 1 ? (
                            <div className="flex flex-wrap justify-center gap-2">
                                {simpleImageSet.map((src, idx) => (
                                    <button
                                        key={`${src}-${idx}`}
                                        type="button"
                                        onClick={() => setGalleryIndex(idx)}
                                        className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 bg-card transition-all ${
                                            galleryIndex === idx
                                                ? 'border-primary ring-2 ring-primary/30'
                                                : 'border-border hover:border-primary/60'
                                        }`}
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            width={64}
                                            height={64}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        ) : null}
                        {isDbVariable && variableThumbItems.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-2">
                                {variableThumbItems.map((item) => {
                                    const isActive =
                                        displayImage &&
                                        displayImage === item.url;

                                    return (
                                        <button
                                            key={item.url}
                                            type="button"
                                            title={
                                                item.isParentThumb
                                                    ? 'Default product photo'
                                                    : 'View this variation'
                                            }
                                            onClick={() => {
                                                if (
                                                    item.variation ===
                                                    '__gallery__'
                                                ) {
                                                    setVariableGalleryPinUrl(
                                                        item.url,
                                                    );

                                                    return;
                                                }

                                                setVariableGalleryPinUrl(null);

                                                if (
                                                    item.variation
                                                        ?.attributes
                                                ) {
                                                    setSelectedAttrs({
                                                        ...item.variation
                                                            .attributes,
                                                    });

                                                    return;
                                                }

                                                const v =
                                                    variationForMainProductImage(
                                                        product,
                                                    );

                                                if (v?.attributes) {
                                                    setSelectedAttrs({
                                                        ...v.attributes,
                                                    });
                                                }
                                            }}
                                            className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 bg-card transition-all ${
                                                isActive
                                                    ? 'border-primary ring-2 ring-primary/30'
                                                    : 'border-border hover:border-primary/60'
                                            }`}
                                        >
                                            <img
                                                src={item.url}
                                                alt=""
                                                width={64}
                                                height={64}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        ) : null}
                        <p className="text-center text-xs text-muted-foreground">
                            Live preview · final print quality will exceed this preview
                        </p>
                    </div>

                    <div className="animate-fade-up space-y-6">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-primary">
                                {product.category?.name}
                            </p>
                            <h1 className="mt-2 text-4xl font-black md:text-5xl">
                                {product.name}
                            </h1>
                            <p className="mt-3 text-3xl font-black gradient-text">
                                {displayPrice != null
                                    ? money(displayPrice)
                                    : '—'}
                            </p>
                            {displayCompare ? (
                                <p className="text-sm text-muted-foreground line-through">
                                    {money(displayCompare)}
                                </p>
                            ) : null}
                        </div>

                        {hasDescription ? (
                            <div className="rounded-2xl border border-border bg-card/50 p-5">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                                    Description
                                </h2>
                                <div className="mt-3 whitespace-pre-wrap text-muted-foreground">
                                    {rawDescription}
                                </div>
                            </div>
                        ) : null}

                        {featureList.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                                {featureList.map((f) => (
                                    <div
                                        key={f}
                                        className="flex items-start gap-2 text-sm"
                                    >
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="text-sm text-muted-foreground">
                            {isDbVariable && matchedVariation ? (
                                <>
                                    SKU: {matchedVariation.sku} · In stock:{' '}
                                    {matchedVariation.stock_quantity}
                                </>
                            ) : (
                                <>
                                    SKU: {product.sku ?? '—'} · In stock:{' '}
                                    {product.stock_quantity}
                                </>
                            )}
                        </p>

                        {!stockOk ? (
                            <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-100">
                                {isDbVariable && !matchedVariation
                                    ? 'Select options to check availability.'
                                    : 'This item is out of stock.'}
                            </p>
                        ) : null}

                        {showVariableUi && (
                            <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
                                <h3 className="flex items-center gap-2 font-bold">
                                    <span className="h-2 w-2 animate-glow rounded-full bg-primary" />
                                    Options
                                </h3>
                                {(product.variation_attribute_defs ?? []).map(
                                    (def) => (
                                        <div key={def.key}>
                                            <label className="mb-2 block text-sm font-semibold">
                                                {def.label}
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {(def.values ?? []).map(
                                                    (val) => (
                                                        <button
                                                            key={val}
                                                            type="button"
                                                            onClick={() =>
                                                                setSelectedAttrs(
                                                                    (
                                                                        prev,
                                                                    ) => ({
                                                                        ...prev,
                                                                        [def.key]:
                                                                            val,
                                                                    }),
                                                                )
                                                            }
                                                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                                                                selectedAttrs[
                                                                    def.key
                                                                ] === val
                                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                                    : 'border-border hover:border-primary'
                                                            }`}
                                                        >
                                                            {val}
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ),
                                )}
                                {!matchedVariation && (
                                    <p className="text-sm text-amber-600 dark:text-amber-400">
                                        Select a valid combination to add this
                                        product to your cart.
                                    </p>
                                )}
                            </div>
                        )}

                        {showSimpleQty && (
                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Quantity
                                </label>
                                <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background p-1">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQty(Math.max(1, qty - 1))
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-10 text-center font-semibold">
                                        {qty}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQty(
                                                Math.min(maxQty, qty + 1),
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {showCatalogCustomize && (
                            <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
                                <h3 className="flex items-center gap-2 font-bold">
                                    <span className="h-2 w-2 animate-glow rounded-full bg-primary" />
                                    Customize
                                </h3>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Color / Style
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {(catalogExtra.colors ?? []).map((c) => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setColor(c)}
                                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                                                    color === c
                                                        ? 'border-primary bg-primary text-primary-foreground'
                                                        : 'border-border hover:border-primary'
                                                }`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {catalogExtra.sizes &&
                                    catalogExtra.sizes.length > 0 && (
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold">
                                                Size
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {(
                                                    catalogExtra.sizes ?? []
                                                ).map((s) => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() =>
                                                            setSize(s)
                                                        }
                                                        className={`flex h-10 w-12 items-center justify-center rounded-md border text-sm font-semibold transition-all ${
                                                            size === s
                                                                ? 'border-primary bg-primary text-primary-foreground'
                                                                : 'border-border hover:border-primary'
                                                        }`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Custom Text (optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={customText}
                                        onChange={(e) =>
                                            setCustomText(e.target.value)
                                        }
                                        placeholder="Your tagline or name"
                                        className="w-full rounded-md border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Upload Logo / Artwork
                                    </label>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={onUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileRef.current?.click()
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 py-3 transition-colors hover:border-primary hover:bg-card"
                                    >
                                        <Upload className="h-4 w-4" />
                                        {logoPreview
                                            ? 'Change file'
                                            : 'Choose file (PNG, JPG, SVG)'}
                                    </button>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Quantity
                                    </label>
                                    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background p-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setQty(Math.max(1, qty - 1))
                                            }
                                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-10 text-center font-semibold">
                                            {qty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setQty(
                                                    Math.min(maxQty, qty + 1),
                                                )
                                            }
                                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showVariableUi && (
                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Quantity
                                </label>
                                <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background p-1">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQty(Math.max(1, qty - 1))
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-10 text-center font-semibold">
                                        {qty}
                                    </span>
                                    <button
                                        type="button"
                                        disabled={!matchedVariation}
                                        onClick={() =>
                                            setQty(
                                                Math.min(maxQty, qty + 1),
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary disabled:opacity-40"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex w-full flex-nowrap gap-3">
                            <button
                                type="button"
                                onClick={addToCart}
                                disabled={purchaseDisabled}
                                className="inline-flex min-h-[3.25rem] min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-4 font-semibold transition-colors hover:border-primary disabled:opacity-50"
                            >
                                <ShoppingCart className="h-4 w-4" /> Add to Cart
                            </button>
                            {productHasCustomizer(product) ? (
                                <button
                                    type="button"
                                    onClick={openCustomizer}
                                    disabled={
                                        (isDbVariable && !matchedVariation) ||
                                        !stockOk
                                    }
                                    className="inline-flex min-h-[3.25rem] min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-4 font-semibold text-primary transition-colors hover:bg-primary/15 disabled:opacity-50"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    Customize product
                                </button>
                            ) : null}
                        </div>
                        <InputError message={form.errors.quantity} />
                        <InputError message={form.errors.product_id} />
                        <InputError message={form.errors.product_variation_id} />
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-semibold text-foreground">
                            Related in this category
                        </h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((p) => (
                                <Link
                                    key={p.id}
                                    href={route('products.show', p.slug)}
                                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-glow"
                                >
                                    <div className="aspect-square bg-secondary">
                                        {p.image_url ? (
                                            <img
                                                src={p.image_url}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <p className="font-medium text-foreground">
                                            {p.name}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {p.price_range &&
                                            Number(p.price_range.min) !==
                                                Number(p.price_range.max)
                                                ? `${money(p.price_range.min)} – ${money(p.price_range.max)}`
                                                : money(p.price)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
