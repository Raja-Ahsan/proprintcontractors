import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const selectClass =
    'mt-1 block w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

function slugify(label) {
    return label
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function skuSuggestionFromName(name) {
    const trimmed = String(name ?? '').trim();
    if (trimmed === '') {
        return '';
    }

    const compact = slugify(trimmed).replace(/-/g, '');
    const alnum = compact.replace(/[^a-z0-9]/gi, '');
    const base = (alnum.slice(0, 28) || 'ITEM').toUpperCase();

    return base.slice(0, 100);
}

export default function Create({ categories, can_mark_featured, featured_limit }) {
    const form = useForm({
        type: 'simple',
        category_id: categories[0]?.id ?? '',
        name: '',
        sku: '',
        slug: '',
        description: '',
        price: '',
        compare_at_price: '',
        stock_quantity: '',
        is_active: true,
        is_featured: false,
        is_customizable: false,
        custom_print_area_json: JSON.stringify({
            left: 0.08,
            top: 0.1,
            width: 0.84,
            height: 0.8,
        }),
        image: null,
        attribute_defs_json: '[]',
        variations_json: '[]',
    });

    const skuEditedByUser = useRef(false);
    /** Parallel to variation rows: optional replacement image upload per variation */
    const [variationUploadFiles, setVariationUploadFiles] = useState([]);
    /** Extra gallery images for simple products only */
    const [galleryDraftFiles, setGalleryDraftFiles] = useState([]);

    /** @type {[{ label: string, key: string, valuesStr: string }]} */
    const attributeDefs = useMemo(() => {
        try {
            const parsed = JSON.parse(form.data.attribute_defs_json || '[]');
            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed.map((row) => ({
                label: row.label ?? '',
                key: row.key ?? '',
                valuesStr: Array.isArray(row.values)
                    ? row.values.join(', ')
                    : typeof row.values === 'string'
                      ? row.values
                      : '',
            }));
        } catch {
            return [];
        }
    }, [form.data.attribute_defs_json]);

    /** @type {[object]} */
    const variationRows = useMemo(() => {
        try {
            const parsed = JSON.parse(form.data.variations_json || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }, [form.data.variations_json]);

    const isVariable = form.data.type === 'variable';

    useEffect(() => {
        if (skuEditedByUser.current) {
            return;
        }
        const suggestion = skuSuggestionFromName(form.data.name);
        if (form.data.sku === suggestion || suggestion === '') {
            return;
        }
        form.setData('sku', suggestion);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- sync SKU suggestion with name until user edits SKU
    }, [form.data.name]);

    function parentSkuPrefix() {
        const trimmed = String(form.data.sku ?? '').trim();
        if (trimmed) {
            return trimmed.slice(0, 80);
        }

        return skuSuggestionFromName(form.data.name).slice(0, 80) || 'ITEM';
    }

    useEffect(() => {
        const n = variationRows.length;
        setVariationUploadFiles((prev) => {
            if (prev.length === n) {
                return prev;
            }
            if (prev.length < n) {
                return [...prev, ...Array.from({ length: n - prev.length }, () => null)];
            }

            return prev.slice(0, n);
        });
    }, [variationRows.length]);

    function setAttributeDefs(rows) {
        const payload = rows.map((r) => ({
            label: r.label.trim(),
            key: (r.key.trim() || slugify(r.label)).slice(0, 60),
            values: r.valuesStr
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
        }));
        form.setData('attribute_defs_json', JSON.stringify(payload));
    }

    function setVariationRows(rows) {
        form.setData('variations_json', JSON.stringify(rows));
    }

    function addAttributeRow() {
        const next = [
            ...attributeDefs,
            { label: '', key: '', valuesStr: '' },
        ];
        setAttributeDefs(next);
    }

    function removeAttributeRow(idx) {
        const next = attributeDefs.filter((_, i) => i !== idx);
        setAttributeDefs(next);
        syncVariationKeys(next);
    }

    function updateAttributeRow(idx, patch) {
        const next = attributeDefs.map((r, i) =>
            i === idx ? { ...r, ...patch } : r,
        );
        setAttributeDefs(next);
        syncVariationKeys(next);
    }

    function syncVariationKeys(defRows) {
        const keys = defRows.map((r, i) => {
            const label = r.label ?? '';
            const key =
                (r.key && String(r.key).trim()) ||
                slugify(label) ||
                `attr-${i}`;

            return String(key).slice(0, 60);
        });

        let parsed = [];
        try {
            parsed = JSON.parse(form.data.variations_json || '[]');
            if (!Array.isArray(parsed)) {
                parsed = [];
            }
        } catch {
            parsed = [];
        }

        const rows = parsed.map((row) => {
            const attrs = { ...(row.attributes || {}) };
            keys.forEach((k) => {
                if (!(k in attrs)) {
                    attrs[k] = '';
                }
            });
            Object.keys(attrs).forEach((k) => {
                if (!keys.includes(k)) {
                    delete attrs[k];
                }
            });

            return { ...row, attributes: attrs };
        });
        setVariationRows(rows);
    }

    function parseVariations() {
        try {
            const parsed = JSON.parse(form.data.variations_json || '[]');

            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    function addVariationRow() {
        const attrs = {};
        attributeDefs.forEach((r, i) => {
            const label = r.label ?? '';
            const key =
                (r.key && String(r.key).trim()) ||
                slugify(label) ||
                `attr-${i}`;
            attrs[String(key).slice(0, 60)] = '';
        });
        const parsed = parseVariations();
        const nextIndex = parsed.length + 1;
        const prefix = parentSkuPrefix();
        const sku = `${prefix}-${nextIndex}`.slice(0, 100);

        setVariationRows([
            ...parsed,
            {
                sku,
                price: '',
                compare_at_price: '',
                stock_quantity: '',
                attributes: attrs,
            },
        ]);
    }

    function removeVariationRow(idx) {
        setVariationRows(parseVariations().filter((_, i) => i !== idx));
        setVariationUploadFiles((prev) => prev.filter((_, i) => i !== idx));
    }

    function updateVariationRow(idx, patch) {
        const parsed = parseVariations();
        setVariationRows(
            parsed.map((r, i) => (i === idx ? { ...r, ...patch } : r)),
        );
    }

    function updateVariationAttr(idx, key, val) {
        const parsed = parseVariations();
        const row = parsed[idx];
        if (!row) {
            return;
        }

        parsed[idx] = {
            ...row,
            attributes: { ...(row.attributes || {}), [key]: val },
        };
        setVariationRows(parsed);
    }

    function submit(e) {
        e.preventDefault();

        const defsPayload = JSON.parse(form.data.attribute_defs_json || '[]');
        const varsPayload = JSON.parse(form.data.variations_json || '[]');
        form.transform((data) => {
            const next = { ...data };
            next.attribute_defs_json = JSON.stringify(defsPayload);
            next.variations_json = JSON.stringify(varsPayload);

            if (form.data.type === 'variable') {
                variationUploadFiles.forEach((file, idx) => {
                    if (file instanceof File) {
                        next[`variation_images[${idx}]`] = file;
                    }
                });
            } else {
                galleryDraftFiles.forEach((file, idx) => {
                    if (file instanceof File) {
                        next[`gallery_images[${idx}]`] = file;
                    }
                });
            }

            return next;
        });

        form.post(route('admin.products.store'), { forceFormData: true });
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Products
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        New product
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Simple products have one SKU and price. Variable products use
                        attributes (e.g. Color, Size) and one row per combination.
                    </p>
                </div>
            }
        >
            <Head title="New product" />

            <div className="w-full">
                <form
                    onSubmit={submit}
                    className="neon-card space-y-6 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                    encType="multipart/form-data"
                >
                    <div>
                        <InputLabel htmlFor="type" value="Product type" />
                        <select
                            id="type"
                            value={form.data.type}
                            onChange={(e) =>
                                form.setData('type', e.target.value)
                            }
                            className={selectClass}
                        >
                            <option value="simple">Simple product</option>
                            <option value="variable">Variable product</option>
                        </select>
                        <InputError message={form.errors.type} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="category_id" value="Category" />
                        <select
                            id="category_id"
                            value={form.data.category_id}
                            onChange={(e) =>
                                form.setData('category_id', e.target.value)
                            }
                            className={selectClass}
                            required
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={form.errors.category_id}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={form.errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="sku"
                            value={
                                isVariable
                                    ? 'Parent SKU (optional)'
                                    : 'SKU'
                            }
                        />
                        <TextInput
                            id="sku"
                            value={form.data.sku}
                            onChange={(e) => {
                                skuEditedByUser.current = true;
                                form.setData('sku', e.target.value);
                            }}
                            className="mt-1 block w-full"
                            required={!isVariable}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                            Suggested from the product name until you change it
                            manually.
                        </p>
                        <InputError message={form.errors.sku} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="slug" value="Slug (optional)" />
                        <TextInput
                            id="slug"
                            value={form.data.slug}
                            onChange={(e) => form.setData('slug', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={form.errors.slug} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            rows={4}
                            className="mt-1 block w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        />
                        <InputError
                            message={form.errors.description}
                            className="mt-2"
                        />
                    </div>

                    {!isVariable && (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={form.data.price}
                                        onChange={(e) =>
                                            form.setData('price', e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={form.errors.price}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="compare_at_price"
                                        value="Compare at (optional)"
                                    />
                                    <TextInput
                                        id="compare_at_price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={form.data.compare_at_price}
                                        onChange={(e) =>
                                            form.setData(
                                                'compare_at_price',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={form.errors.compare_at_price}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="stock_quantity"
                                    value="Stock"
                                />
                                <TextInput
                                    id="stock_quantity"
                                    type="number"
                                    min="0"
                                    value={form.data.stock_quantity}
                                    onChange={(e) =>
                                        form.setData(
                                            'stock_quantity',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={form.errors.stock_quantity}
                                        className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="gallery_images"
                                    value="Gallery images (optional)"
                                />
                                <input
                                    id="gallery_images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const picked = Array.from(
                                            e.target.files ?? [],
                                        );
                                        setGalleryDraftFiles((prev) => {
                                            const merged = [
                                                ...prev,
                                                ...picked,
                                            ].slice(0, 20);

                                            return merged;
                                        });
                                        e.target.value = '';
                                    }}
                                    className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Up to 20 images; shown beside the featured image
                                    on the product page.
                                </p>
                                {galleryDraftFiles.length > 0 && (
                                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                                        {galleryDraftFiles.map((f, i) => (
                                            <li
                                                key={`${f.name}-${i}`}
                                                className="flex items-center justify-between gap-2 rounded border border-border/60 px-2 py-1"
                                            >
                                                <span className="truncate">
                                                    {f.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="shrink-0 text-destructive hover:underline"
                                                    onClick={() =>
                                                        setGalleryDraftFiles(
                                                            (prev) =>
                                                                prev.filter(
                                                                    (_, j) =>
                                                                        j !== i,
                                                                ),
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <InputError
                                    message={form.errors.gallery_images}
                                    className="mt-2"
                                />
                            </div>
                        </>
                    )}

                    {isVariable && (
                        <>
                            <div className="rounded-xl border border-border bg-secondary/30 p-4">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-bold text-foreground">
                                            Variation attributes
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Define option groups (e.g. Color, Size).
                                            Options are comma-separated. Keys are used
                                            internally; leave blank to auto-generate
                                            from the name.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addAttributeRow}
                                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:border-primary"
                                    >
                                        <Plus className="h-4 w-4" /> Add attribute
                                    </button>
                                </div>

                                <div className="mt-4 space-y-4">
                                    {attributeDefs.length === 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            No attributes yet — click &quot;Add
                                            attribute&quot;.
                                        </p>
                                    )}
                                    {attributeDefs.map((row, idx) => (
                                        <div
                                            key={idx}
                                            className="grid gap-3 rounded-lg border border-border/80 bg-card/60 p-4 sm:grid-cols-12"
                                        >
                                            <div className="sm:col-span-3">
                                                <label className="text-xs font-medium text-muted-foreground">
                                                    Name
                                                </label>
                                                <TextInput
                                                    value={row.label}
                                                    onChange={(e) =>
                                                        updateAttributeRow(idx, {
                                                            label: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Color"
                                                    className="mt-1 block w-full"
                                                />
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label className="text-xs font-medium text-muted-foreground">
                                                    Key (optional)
                                                </label>
                                                <TextInput
                                                    value={row.key}
                                                    onChange={(e) =>
                                                        updateAttributeRow(idx, {
                                                            key: e.target.value,
                                                        })
                                                    }
                                                    placeholder="color"
                                                    className="mt-1 block w-full font-mono text-sm"
                                                />
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label className="text-xs font-medium text-muted-foreground">
                                                    Options (comma-separated)
                                                </label>
                                                <TextInput
                                                    value={row.valuesStr}
                                                    onChange={(e) =>
                                                        updateAttributeRow(idx, {
                                                            valuesStr:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="Red, Blue, Black"
                                                    className="mt-1 block w-full"
                                                />
                                            </div>
                                            <div className="flex items-end justify-end sm:col-span-1">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeAttributeRow(idx)
                                                    }
                                                    className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                                                    aria-label="Remove attribute"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <InputError
                                    message={form.errors.attribute_defs_json}
                                    className="mt-3"
                                />
                            </div>

                            <div className="rounded-xl border border-border bg-secondary/30 p-4">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-bold text-foreground">
                                            Variations
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            One row per sellable combination. SKU must
                                            be unique.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addVariationRow}
                                        disabled={attributeDefs.length === 0}
                                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Plus className="h-4 w-4" /> Add variation
                                    </button>
                                </div>

                                {attributeDefs.length === 0 && (
                                    <p className="mt-3 text-sm text-amber-600 dark:text-amber-400">
                                        Add variation attributes first, then create
                                        variation rows.
                                    </p>
                                )}

                                <div className="mt-4 space-y-4 overflow-x-auto">
                                    {variationRows.map((row, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg border border-border/80 bg-card/60 p-4"
                                        >
                                            <div className="mb-3 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVariationRow(idx)
                                                    }
                                                    className="text-xs font-semibold text-muted-foreground hover:text-destructive"
                                                >
                                                    Remove row
                                                </button>
                                            </div>
                                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground">
                                                        SKU *
                                                    </label>
                                                    <TextInput
                                                        value={row.sku}
                                                        onChange={(e) =>
                                                            updateVariationRow(idx, {
                                                                sku: e.target.value,
                                                            })
                                                        }
                                                        className="mt-1 block w-full font-mono text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground">
                                                        Price *
                                                    </label>
                                                    <TextInput
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={row.price}
                                                        onChange={(e) =>
                                                            updateVariationRow(idx, {
                                                                price: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="mt-1 block w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground">
                                                        Compare at
                                                    </label>
                                                    <TextInput
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={
                                                            row.compare_at_price ??
                                                            ''
                                                        }
                                                        onChange={(e) =>
                                                            updateVariationRow(idx, {
                                                                compare_at_price:
                                                                    e.target.value,
                                                            })
                                                        }
                                                        className="mt-1 block w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground">
                                                        Stock *
                                                    </label>
                                                    <TextInput
                                                        type="number"
                                                        min="0"
                                                        value={
                                                            row.stock_quantity
                                                        }
                                                        onChange={(e) =>
                                                            updateVariationRow(idx, {
                                                                stock_quantity:
                                                                    e.target.value,
                                                            })
                                                        }
                                                        className="mt-1 block w-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-3 max-w-md">
                                                <label className="text-xs font-medium text-muted-foreground">
                                                    Variation image (optional)
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files?.[0] ??
                                                            null;
                                                        setVariationUploadFiles(
                                                            (prev) => {
                                                                const next =
                                                                    [...prev];
                                                                next[idx] =
                                                                    file;

                                                                return next;
                                                            },
                                                        );
                                                    }}
                                                    className="mt-1 block w-full text-xs text-muted-foreground file:mr-2 file:rounded file:border-0 file:bg-secondary file:px-2 file:py-1 file:text-xs file:font-medium"
                                                />
                                                {variationUploadFiles[idx] instanceof
                                                    File && (
                                                    <p className="mt-1 truncate text-[11px] text-muted-foreground">
                                                        Selected:{' '}
                                                        {
                                                            variationUploadFiles[
                                                                idx
                                                            ].name
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                {attributeDefs.map((defRow, di) => {
                                                    const key = (
                                                        defRow.key.trim() ||
                                                        slugify(defRow.label) ||
                                                        `attr-${di}`
                                                    ).slice(0, 60);
                                                    const label =
                                                        defRow.label.trim() ||
                                                        key;
                                                    const options = defRow.valuesStr
                                                        .split(',')
                                                        .map((s) => s.trim())
                                                        .filter(Boolean);

                                                    return (
                                                        <div key={`${idx}-${key}`}>
                                                            <label className="text-xs font-medium text-muted-foreground">
                                                                {label}
                                                            </label>
                                                            <select
                                                                value={
                                                                    row.attributes?.[
                                                                        key
                                                                    ] ?? ''
                                                                }
                                                                onChange={(e) =>
                                                                    updateVariationAttr(
                                                                        idx,
                                                                        key,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className={selectClass}
                                                            >
                                                                <option value="">
                                                                    Select…
                                                                </option>
                                                                {options.map(
                                                                    (opt) => (
                                                                        <option
                                                                            key={
                                                                                opt
                                                                            }
                                                                            value={
                                                                                opt
                                                                            }
                                                                        >
                                                                            {opt}
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <InputError
                                    message={form.errors.variations_json}
                                    className="mt-3"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <InputLabel htmlFor="image" value="Image (optional)" />
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                form.setData('image', e.target.files?.[0] ?? null)
                            }
                            className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
                        />
                        <InputError message={form.errors.image} className="mt-2" />
                    </div>
                    <div className="rounded-lg border border-primary/40 bg-secondary/40 p-4">
                        <p className="text-sm font-bold text-foreground">
                            Product customization
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Enables the full-screen designer with cart & checkout
                            design data.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <input
                                id="is_customizable"
                                type="checkbox"
                                checked={form.data.is_customizable}
                                onChange={(e) =>
                                    form.setData(
                                        'is_customizable',
                                        e.target.checked,
                                    )
                                }
                                className="rounded border-border bg-background text-primary shadow-sm focus:ring-primary"
                            />
                            <label
                                htmlFor="is_customizable"
                                className="text-sm text-foreground"
                            >
                                Customize product online
                            </label>
                        </div>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="custom_print_area_json"
                                value="Print area (JSON, fractions 0–1 of mockup)"
                            />
                            <textarea
                                id="custom_print_area_json"
                                value={form.data.custom_print_area_json}
                                onChange={(e) =>
                                    form.setData(
                                        'custom_print_area_json',
                                        e.target.value,
                                    )
                                }
                                rows={3}
                                className="mt-1 block w-full rounded-md border-border bg-background font-mono text-xs text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            />
                            <InputError
                                message={form.errors.custom_print_area_json}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="is_featured"
                            type="checkbox"
                            checked={form.data.is_featured}
                            disabled={!can_mark_featured && !form.data.is_featured}
                            onChange={(e) =>
                                form.setData('is_featured', e.target.checked)
                            }
                            className="rounded border-border bg-background text-primary shadow-sm focus:ring-primary disabled:opacity-50"
                        />
                        <label
                            htmlFor="is_featured"
                            className="text-sm text-foreground"
                        >
                            Featured on home page
                        </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Up to {featured_limit} products can be featured at once. Only
                        active products are shown on the home page.
                    </p>
                    <InputError message={form.errors.is_featured} className="mt-1" />

                    <div className="flex items-center gap-2">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={form.data.is_active}
                            onChange={(e) =>
                                form.setData('is_active', e.target.checked)
                            }
                            className="rounded border-border bg-background text-primary shadow-sm focus:ring-primary"
                        />
                        <label
                            htmlFor="is_active"
                            className="text-sm text-foreground"
                        >
                            Active
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                        <Link
                            href={route('admin.products.index')}
                            className="inline-flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
