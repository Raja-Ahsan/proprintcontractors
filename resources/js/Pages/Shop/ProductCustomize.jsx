import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Canvas,
    FabricImage,
    IText,
    Rect,
    Shadow,
} from 'fabric';
import {
    ArrowLeft,
    Copy,
    ImagePlus,
    Layers,
    Loader2,
    Plus,
    RotateCcw,
    Scan,
    Trash2,
    Type,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const CANVAS_W = 880;
const CANVAS_H = 640;

const FONT_STACKS = [
    'Inter, system-ui, sans-serif',
    'Georgia, serif',
    '"Times New Roman", Times, serif',
    'Menlo, Monaco, monospace',
    'Impact, Haettenschweiler, sans-serif',
];

function printRectPx(area, cw, ch) {
    const left = (area?.left ?? 0.08) * cw;
    const top = (area?.top ?? 0.1) * ch;
    const width = (area?.width ?? 0.84) * cw;
    const height = (area?.height ?? 0.8) * ch;

    return { left, top, width, height };
}

function money(amount) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount));
}

function inertiaErrorText(errors) {
    if (!errors || typeof errors !== 'object') {
        return '';
    }

    return Object.values(errors)
        .flatMap((x) =>
            typeof x === 'string' ? [x] : Array.isArray(x) ? x : [String(x ?? '')],
        )
        .filter(Boolean)
        .join(' ')
        .trim();
}

function inertiaFieldError(errors, key) {
    if (!errors || typeof errors !== 'object') {
        return undefined;
    }

    const v = errors[key];

    if (v == null || v === '') {
        return undefined;
    }

    if (typeof v === 'string') {
        return v;
    }

    if (Array.isArray(v)) {
        const r = v.find((x) => x != null && String(x).trim() !== '');
        return r !== undefined ? String(r) : undefined;
    }

    return String(v);
}

export default function ProductCustomize({ product, initialVariation, printArea }) {
    const wrapRef = useRef(null);
    const fabricScrollParentRef = useRef(null);
    const canvasElRef = useRef(null);
    const fabricCanvasRef = useRef(null);

    const [ready, setReady] = useState(false);
    const [selected, setSelected] = useState(null);
    const [busy, setBusy] = useState(false);
    const [previewModal, setPreviewModal] = useState({
        open: false,
        dataUrl: '',
        zoom: 1,
    });
    const [qty, setQty] = useState(1);
    const [cartSubmitting, setCartSubmitting] = useState(false);

    /** Fabric mutates objects in-place; React must re-mount controls when refs stay the same. */
    const [, forceSelectionRedraw] = useState(0);

    const page = usePage();
    const pageErrors = page.props.errors ?? {};

    const bgUrl =
        initialVariation?.image_url ?? product.image_url ?? null;

    const variationId = initialVariation?.id ?? null;

    const displayPrice =
        initialVariation != null ? initialVariation.price : product.price;

    const sku = initialVariation?.sku ?? product.sku ?? '—';

    const draftKey = useMemo(
        () =>
            `product_customizer_draft_${product.id}_${variationId ?? 'simple'}`,
        [product.id, variationId],
    );

    const syncCanvasSelection = useCallback(() => {
        const canvas = fabricCanvasRef.current;

        if (!canvas) {
            return;
        }

        setSelected(canvas.getActiveObject() ?? null);
        forceSelectionRedraw((n) => n + 1);
    }, []);

    /** Scroll / resize / CSS scale change offset maps for pointer coordinates (critical inside overflow containers). */
    useEffect(() => {
        const canvas = fabricCanvasRef.current;
        const scrollEl = fabricScrollParentRef.current;

        if (!ready || !canvas || !scrollEl) {
            return undefined;
        }

        const bump = () => {
            window.requestAnimationFrame(() => {
                canvas.calcOffset?.();
                try {
                    canvas.calcViewportBoundaries?.();
                } catch {
                    /* noop */
                }
            });
        };

        scrollEl.addEventListener('scroll', bump, { passive: true });
        window.addEventListener('resize', bump);

        const wrapEl = canvas.upperCanvasEl?.parentElement;
        const ro =
            typeof ResizeObserver !== 'undefined' && wrapEl
                ? new ResizeObserver(bump)
                : null;

        ro?.observe(wrapEl);
        bump();
        window.requestAnimationFrame(bump);

        return () => {
            scrollEl.removeEventListener('scroll', bump);
            window.removeEventListener('resize', bump);
            ro?.disconnect();
        };
    }, [ready]);

    useEffect(() => {
        let cancelled = false;

        if (!canvasElRef.current || fabricCanvasRef.current) {
            return;
        }

        const canvas = new Canvas(canvasElRef.current, {
            width: CANVAS_W,
            height: CANVAS_H,
            preserveObjectStacking: true,
            enablePointerEvents: true,
            targetFindTolerance: 8,
            allowTouchScrolling: false,
            stopContextMenu: true,
        });

        fabricCanvasRef.current = canvas;

        const upper = canvas.upperCanvasEl;
        const lower = canvas.lowerCanvasEl;
        const wrap = upper?.parentElement;

        for (const el of [upper, lower, wrap]) {
            if (el && 'style' in el) {
                el.style.touchAction = 'none';
            }
        }

        const onSel = () => syncCanvasSelection();

        let transformRaf = null;
        const onDuringTransform = () => {
            if (transformRaf != null) {
                return;
            }
            transformRaf = window.requestAnimationFrame(() => {
                transformRaf = null;
                syncCanvasSelection();
            });
        };

        canvas.on('selection:created', onSel);
        canvas.on('selection:updated', onSel);
        canvas.on('selection:cleared', onSel);
        const onModified = (e) => {
            const target = e?.target;

            if (
                target?.name === 'user-image' &&
                target.scaleX !== target.scaleY
            ) {
                const sx = target.scaleX ?? 1;

                target.set({ scaleY: sx });
                target.setCoords?.();
                canvas.requestRenderAll();
            }

            onSel();
        };

        canvas.on('object:modified', onModified);
        canvas.on('object:moving', onDuringTransform);
        canvas.on('object:scaling', onDuringTransform);
        canvas.on('object:rotating', onDuringTransform);

        const { left, top, width, height } = printRectPx(
            printArea,
            CANVAS_W,
            CANVAS_H,
        );

        const setup = async () => {
            if (!bgUrl) {
                canvas.backgroundColor = '#f4f4f5';
                const guideEmpty = new Rect({
                    left,
                    top,
                    width,
                    height,
                    originX: 'left',
                    originY: 'top',
                    fill: 'transparent',
                    stroke: 'rgba(249,115,22,0.9)',
                    strokeWidth: 2,
                    strokeDashArray: [8, 6],
                    selectable: false,
                    evented: false,
                    name: 'print-guide',
                });

                canvas.add(guideEmpty);
                canvas.renderAll();
                if (!cancelled) {
                    setReady(true);
                }

                return;
            }

            try {
                const img = await FabricImage.fromURL(bgUrl, {
                    crossOrigin: 'anonymous',
                });

                if (cancelled) {
                    return;
                }

                img.set({
                    selectable: false,
                    evented: false,
                    name: 'product-mockup',
                });

                const scale = Math.max(
                    CANVAS_W / img.width,
                    CANVAS_H / img.height,
                );

                img.scale(scale);
                img.set({
                    originX: 'center',
                    originY: 'center',
                    left: CANVAS_W / 2,
                    top: CANVAS_H / 2,
                });

                canvas.add(img);
                canvas.sendObjectToBack(img);
            } catch {
                canvas.backgroundColor = '#18181b';
            }

            const guide = new Rect({
                left,
                top,
                width,
                height,
                originX: 'left',
                originY: 'top',
                fill: 'transparent',
                stroke: 'rgba(249,115,22,0.9)',
                strokeWidth: 2,
                strokeDashArray: [8, 6],
                selectable: false,
                evented: false,
                name: 'print-guide',
            });

            canvas.add(guide);

            canvas.renderAll();
            setReady(true);
        };

        void setup();

        return () => {
            cancelled = true;
            canvas.dispose();
            fabricCanvasRef.current = null;
        };
    }, [bgUrl, printArea, syncCanvasSelection]);

    function editableObjects(canvas) {
        return canvas.getObjects().filter((o) => {
            const n = o.name ?? '';

            return n !== 'print-guide' && n !== 'product-mockup';
        });
    }

    async function uploadImage(file) {
        const fd = new FormData();

        fd.append('file', file);

        try {
            setBusy(true);
            const { data } = await window.axios.post(
                route('customization.upload'),
                fd,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            return data.url;
        } finally {
            setBusy(false);
        }
    }

    async function handleImageFiles(files) {
        const canvas = fabricCanvasRef.current;

        if (!canvas || files.length === 0) {
            return;
        }

        const { left: pl, top: pt, width: pw, height: ph } = printRectPx(
            printArea,
            CANVAS_W,
            CANVAS_H,
        );

        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                continue;
            }

            const url = await uploadImage(file);

            const img = await FabricImage.fromURL(url, {
                crossOrigin: 'anonymous',
            });

            const maxW = pw * 0.45;
            const sc = Math.min(1, maxW / (img.width || 1));

            img.set({
                left: pl + pw / 2 - (img.width * sc) / 2,
                top: pt + ph / 2 - (img.height * sc) / 2,
                scaleX: sc,
                scaleY: sc,
                originX: 'left',
                originY: 'top',
                centeredScaling: false,
                objectCaching: false,
                cornerSize: 14,
                touchCornerSize: 32,
                transparentCorners: false,
                visible: true,
                evented: true,
                selectable: true,
                hasControls: true,
                hasBorders: true,
                name: 'user-image',
            });

            img.setCoords?.();

            canvas.add(img);
            canvas.setActiveObject(img);
        }

        canvas.renderAll();
        syncCanvasSelection();
        void Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Image placed',
            showConfirmButton: false,
            timer: 2400,
        });
    }

    function addText() {
        const canvas = fabricCanvasRef.current;

        if (!canvas) {
            return;
        }

        const { left: pl, top: pt } = printRectPx(printArea, CANVAS_W, CANVAS_H);
        const t = new IText('Your text', {
            left: pl + 24,
            top: pt + 24,
            originX: 'left',
            originY: 'top',
            fontSize: 32,
            fill: '#0f172a',
            fontFamily: FONT_STACKS[0],
            fontWeight: '600',
            name: 'user-text',
        });

        canvas.add(t);
        canvas.setActiveObject(t);
        canvas.renderAll();
        syncCanvasSelection();
    }

    function deleteSelected() {
        const canvas = fabricCanvasRef.current;

        if (!canvas) {
            return;
        }

        const obj = canvas.getActiveObject();

        if (!obj) {
            return;
        }

        const n = obj.name ?? '';

        if (n === 'print-guide' || n === 'product-mockup') {
            return;
        }

        canvas.remove(obj);
        canvas.discardActiveObject();
        canvas.renderAll();
        setSelected(null);
    }

    async function duplicateSelected() {
        const canvas = fabricCanvasRef.current;

        if (!canvas) {
            return;
        }

        const obj = canvas.getActiveObject();

        if (!obj) {
            return;
        }

        const n = obj.name ?? '';

        if (n === 'print-guide' || n === 'product-mockup') {
            return;
        }

        const cloned = await obj.clone();

        cloned.set({
            left: (obj.left ?? 0) + 18,
            top: (obj.top ?? 0) + 18,
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
        syncCanvasSelection();
    }

    function bringForward() {
        const canvas = fabricCanvasRef.current;
        const obj = canvas?.getActiveObject();

        if (!canvas || !obj) {
            return;
        }

        canvas.bringObjectForward(obj);
        canvas.renderAll();
    }

    function sendBackward() {
        const canvas = fabricCanvasRef.current;
        const obj = canvas?.getActiveObject();

        if (!canvas || !obj) {
            return;
        }

        canvas.sendObjectBackwards(obj);
        canvas.renderAll();
    }

    function exportPreview() {
        const canvas = fabricCanvasRef.current;

        if (!canvas) {
            return '';
        }

        try {
            return canvas.toDataURL({
                format: 'png',
                multiplier: 1.5,
            });
        } catch {
            return '';
        }
    }

    function openPreviewModal() {
        const dataUrl = exportPreview();

        setPreviewModal({ open: true, dataUrl, zoom: 1 });
    }

    function saveDraftLocal() {
        const canvas = fabricCanvasRef.current;

        if (!canvas) {
            return;
        }

        try {
            localStorage.setItem(
                draftKey,
                JSON.stringify({
                    fabric: canvas.toJSON(),
                    savedAt: new Date().toISOString(),
                }),
            );
            void Swal.fire({
                icon: 'success',
                title: 'Draft saved',
                text: 'Stored in this browser only.',
                timer: 2200,
                showConfirmButton: false,
            });
        } catch {
            void Swal.fire({
                icon: 'error',
                title: 'Could not save draft',
            });
        }
    }

    function loadDraftLocal() {
        const canvas = fabricCanvasRef.current;

        if (!canvas) {
            return;
        }

        const raw = localStorage.getItem(draftKey);

        if (!raw) {
            void Swal.fire({
                icon: 'info',
                title: 'No draft found',
            });

            return;
        }

        try {
            const parsed = JSON.parse(raw);

            void canvas.loadFromJSON(parsed.fabric).then(() => {
                canvas.renderAll();
                syncCanvasSelection();
            });
            void Swal.fire({
                icon: 'success',
                title: 'Draft loaded',
                timer: 1800,
                showConfirmButton: false,
            });
        } catch {
            void Swal.fire({
                icon: 'error',
                title: 'Invalid draft',
            });
        }
    }

    function addToCart() {
        const canvas = fabricCanvasRef.current;

        if (!canvas || !ready) {
            return;
        }

        const objs = editableObjects(canvas);

        if (objs.length === 0) {
            void Swal.fire({
                icon: 'warning',
                title: 'Add artwork or text first',
            });

            return;
        }

        const preview_png = exportPreview();

        if (!preview_png || preview_png.length < 64) {
            void Swal.fire({
                icon: 'error',
                title: 'Could not export preview',
                text: 'If you used images from another site, try re-uploading the file. Otherwise refresh and try again.',
            });

            return;
        }

        const payload = {
            product_id: product.id,
            product_variation_id: variationId,
            quantity: qty,
            customization: {
                design: {
                    fabric: canvas.toJSON(),
                    canvas_width: CANVAS_W,
                    canvas_height: CANVAS_H,
                    variation_id: variationId,
                },
                preview_png,
            },
        };

        setCartSubmitting(true);

        router.post(route('cart.store'), payload, {
            preserveScroll: true,
            onFinish: () => setCartSubmitting(false),
            onSuccess: () =>
                void Swal.fire({
                    icon: 'success',
                    title: 'Added to cart',
                    text: 'You can checkout from the cart page.',
                }),
            onError: (errors) =>
                void Swal.fire({
                    icon: 'error',
                    title: 'Could not add to cart',
                    text: inertiaErrorText(errors) || 'Please try again.',
                }),
        });
    }

    const canEditSelection =
        selected &&
        selected.name !== 'print-guide' &&
        selected.name !== 'product-mockup';

    return (
        <ShopLayout title={`Customize · ${product.name}`}>
            <Head title={`Customize · ${product.name}`} />

            <div
                ref={wrapRef}
                className="min-h-[100dvh] bg-background pb-28 lg:pb-12"
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    void handleImageFiles(Array.from(e.dataTransfer.files ?? []));
                }}
            >
                <div className="border-b border-border bg-card/70 px-4 py-4 shadow-sm lg:py-6">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <Link
                                href={route('products.show', product.slug)}
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back to product
                            </Link>
                            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">
                                Customize
                            </p>
                            <h1 className="mt-2 text-2xl font-black text-foreground md:text-4xl">
                                {product.name}
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {displayPrice != null ? money(displayPrice) : '—'}{' '}
                                · SKU {sku}
                                {initialVariation && product.variations ? (
                                    <span className="ml-2 text-primary">
                                        {Object.entries(
                                            initialVariation.attributes ?? {},
                                        ).map(([k, v]) => (
                                            <span key={k} className="mr-2">
                                                {k}: {String(v)}
                                            </span>
                                        ))}
                                    </span>
                                ) : null}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={openPreviewModal}
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:border-primary"
                            >
                                <Scan className="h-4 w-4" /> Preview design
                            </button>
                            <button
                                type="button"
                                onClick={saveDraftLocal}
                                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-foreground"
                            >
                                Save draft
                            </button>
                            <button
                                type="button"
                                onClick={loadDraftLocal}
                                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-foreground"
                            >
                                Load draft
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_minmax(18rem,22rem)]">
                    <div className="rounded-3xl border border-border bg-card p-4 shadow-elegant lg:p-6">
                        <div
                            ref={fabricScrollParentRef}
                            className="relative overflow-x-auto overflow-y-visible overscroll-x-contain rounded-2xl border border-border bg-zinc-100 select-none dark:bg-zinc-900"
                        >
                            <div className="mx-auto inline-block rounded-lg bg-muted/30 p-2">
                                {!ready && (
                                    <div className="flex min-h-[240px] w-[min(100%,880px)] items-center justify-center gap-2 text-muted-foreground">
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        Loading editor…
                                    </div>
                                )}
                                <canvas
                                    ref={canvasElRef}
                                    className={
                                        ready
                                            ? 'block h-auto w-full max-w-full touch-none select-none'
                                            : 'hidden'
                                    }
                                />
                            </div>
                            <p className="mx-auto mt-3 max-w-2xl px-2 text-center text-xs text-muted-foreground">
                                Drag & drop images anywhere on this panel. Orange
                                border = printable zone.
                            </p>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                            <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                                <Layers className="h-4 w-4 text-primary" />
                                Objects
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        document.getElementById('cust-img')?.click();
                                    }}
                                    disabled={busy}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-semibold hover:border-primary disabled:opacity-50"
                                >
                                    {busy ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <ImagePlus className="h-4 w-4" />
                                    )}
                                    Add image
                                </button>
                                <input
                                    id="cust-img"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/gif"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        void handleImageFiles(
                                            Array.from(e.target.files ?? []),
                                        );
                                        e.target.value = '';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={addText}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-semibold hover:border-primary"
                                >
                                    <Type className="h-4 w-4" /> Add text
                                </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={duplicateSelected}
                                    className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs font-semibold hover:border-primary"
                                >
                                    <Copy className="h-3.5 w-3.5" /> Duplicate
                                </button>
                                <button
                                    type="button"
                                    onClick={deleteSelected}
                                    className="inline-flex items-center gap-1 rounded-lg border border-destructive/40 px-2 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={bringForward}
                                    className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs font-semibold hover:border-primary"
                                >
                                    <Plus className="h-3.5 w-3.5" /> Up layer
                                </button>
                                <button
                                    type="button"
                                    onClick={sendBackward}
                                    className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs font-semibold hover:border-primary"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" /> Down layer
                                </button>
                            </div>
                        </div>

                        {canEditSelection ? (
                            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                                <p className="text-sm font-bold text-foreground">
                                    Selection
                                </p>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-muted-foreground">
                                            Opacity
                                        </label>
                                        <input
                                            type="range"
                                            min="0.08"
                                            max="1"
                                            step="0.02"
                                            value={selected.opacity ?? 1}
                                            onChange={(e) => {
                                                selected.set({
                                                    opacity: Number(e.target.value),
                                                });

                                                fabricCanvasRef.current?.requestRenderAll();
                                                syncCanvasSelection();
                                            }}
                                            className="mt-1 w-full accent-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-muted-foreground">
                                            Rotation ({Math.round(selected.angle ?? 0)}°)
                                        </label>
                                        <input
                                            type="range"
                                            min="-180"
                                            max="180"
                                            step="1"
                                            value={selected.angle ?? 0}
                                            onChange={(e) => {
                                                selected.set({
                                                    angle: Number(e.target.value),
                                                });

                                                selected.setCoords?.();
                                                fabricCanvasRef.current?.requestRenderAll();
                                                syncCanvasSelection();
                                            }}
                                            className="mt-1 w-full accent-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-muted-foreground">
                                            Scale ({(selected.scaleX ?? 1).toFixed(2)}×)
                                        </label>
                                        <input
                                            type="range"
                                            min="0.12"
                                            max="3.5"
                                            step="0.02"
                                            value={
                                                Math.min(
                                                    3.5,
                                                    Math.max(
                                                        0.12,
                                                        selected.scaleX ?? 1,
                                                    ),
                                                )
                                            }
                                            onChange={(e) => {
                                                const sc = Number(e.target.value);

                                                selected.set({ scaleX: sc, scaleY: sc });

                                                selected.setCoords?.();

                                                fabricCanvasRef.current?.requestRenderAll();

                                                syncCanvasSelection();
                                            }}
                                            className="mt-1 w-full accent-primary"
                                        />
                                    </div>
                                    {selected instanceof IText ? (
                                        <>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground">
                                                    Font size
                                                </label>
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="120"
                                                    step="1"
                                                    value={selected.fontSize ?? 28}
                                                    onChange={(e) => {
                                                        selected.set({
                                                            fontSize: Number(e.target.value),
                                                        });

                                                        fabricCanvasRef.current?.requestRenderAll();
                                                        syncCanvasSelection();
                                                    }}
                                                    className="mt-1 w-full accent-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground">
                                                    Font
                                                </label>
                                                <select
                                                    value={
                                                        FONT_STACKS.includes(
                                                            selected.fontFamily,
                                                        )
                                                            ? selected.fontFamily
                                                            : FONT_STACKS[0]
                                                    }
                                                    onChange={(e) => {
                                                        selected.set({
                                                            fontFamily: e.target.value,
                                                        });

                                                        fabricCanvasRef.current?.requestRenderAll();
                                                        syncCanvasSelection();
                                                    }}
                                                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
                                                >
                                                    {FONT_STACKS.map((f) => (
                                                        <option key={f} value={f}>
                                                            {f.split(',')[0]}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground">
                                                    Color
                                                </label>
                                                <input
                                                    type="color"
                                                    value={
                                                        typeof selected.fill ===
                                                        'string'
                                                            ? selected.fill
                                                            : '#0f172a'
                                                    }
                                                    onChange={(e) => {
                                                        selected.set({ fill: e.target.value });

                                                        fabricCanvasRef.current?.requestRenderAll();
                                                        syncCanvasSelection();
                                                    }}
                                                    className="mt-1 h-9 w-full cursor-pointer rounded border border-border bg-background px-1"
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.fontWeight === 'bold'}
                                                        onChange={(e) => {
                                                            selected.set({
                                                                fontWeight: e.target.checked
                                                                    ? 'bold'
                                                                    : 'normal',
                                                            });

                                                            fabricCanvasRef.current?.requestRenderAll();
                                                            syncCanvasSelection();
                                                        }}
                                                    />
                                                    Bold
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            selected.fontStyle === 'italic'
                                                        }
                                                        onChange={(e) => {
                                                            selected.set({
                                                                fontStyle: e.target.checked
                                                                    ? 'italic'
                                                                    : 'normal',
                                                            });

                                                            fabricCanvasRef.current?.requestRenderAll();
                                                            syncCanvasSelection();
                                                        }}
                                                    />
                                                    Italic
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground">
                                                    <input
                                                        type="checkbox"
                                                        checked={Boolean(selected.underline)}
                                                        onChange={(e) => {
                                                            selected.set({
                                                                underline: e.target.checked,
                                                            });

                                                            fabricCanvasRef.current?.requestRenderAll();
                                                            syncCanvasSelection();
                                                        }}
                                                    />
                                                    Underline
                                                </label>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="text-xs font-semibold text-muted-foreground">
                                                        Tracking
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="1"
                                                        value={selected.charSpacing ?? 0}
                                                        onChange={(e) => {
                                                            selected.set({
                                                                charSpacing: Number(
                                                                    e.target.value,
                                                                ),
                                                            });

                                                            fabricCanvasRef.current?.requestRenderAll();
                                                            syncCanvasSelection();
                                                        }}
                                                        className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-muted-foreground">
                                                        Lead
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.05"
                                                        value={selected.lineHeight ?? 1.2}
                                                        onChange={(e) => {
                                                            selected.set({
                                                                lineHeight: Number(
                                                                    e.target.value,
                                                                ),
                                                            });

                                                            fabricCanvasRef.current?.requestRenderAll();
                                                            syncCanvasSelection();
                                                        }}
                                                        className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground">
                                                    Align
                                                </label>
                                                <select
                                                    value={selected.textAlign ?? 'left'}
                                                    onChange={(e) => {
                                                        selected.set({
                                                            textAlign: e.target.value,
                                                        });

                                                        fabricCanvasRef.current?.requestRenderAll();
                                                        syncCanvasSelection();
                                                    }}
                                                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-2 text-sm"
                                                >
                                                    <option value="left">Left</option>
                                                    <option value="center">Center</option>
                                                    <option value="right">Right</option>
                                                    <option value="justify">Justify</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground">
                                                    <input
                                                        type="checkbox"
                                                        checked={Boolean(selected.shadow)}
                                                        onChange={(e) => {
                                                            selected.set({
                                                                shadow: e.target.checked
                                                                    ? new Shadow({
                                                                          blur: 6,
                                                                          offsetX: 2,
                                                                          offsetY: 3,
                                                                          color: 'rgba(0,0,0,.35)',
                                                                      })
                                                                    : null,
                                                            });

                                                            fabricCanvasRef.current?.requestRenderAll();
                                                            syncCanvasSelection();
                                                        }}
                                                    />
                                                    Text shadow
                                                </label>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}

                        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                            <p className="text-sm font-bold text-foreground">Cart</p>
                            <label className="mt-4 block text-xs font-semibold text-muted-foreground">
                                Quantity
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={999}
                                value={qty}
                                onChange={(e) =>
                                    setQty(
                                        Math.max(1, Math.min(999, Number(e.target.value) || 1)),
                                    )
                                }
                                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold"
                            />
                            <PrimaryButton
                                type="button"
                                className="mt-4 w-full"
                                disabled={cartSubmitting || !ready}
                                onClick={addToCart}
                            >
                                {cartSubmitting ? (
                                    <span className="inline-flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving…
                                    </span>
                                ) : (
                                    'Add customized product to cart'
                                )}
                            </PrimaryButton>
                            <InputError
                                message={inertiaFieldError(pageErrors, 'customization')}
                            />
                        </div>
                    </aside>
                </div>
            </div>

            {previewModal.open && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col bg-black/80 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Design preview"
                >
                    <div className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between gap-4 text-white">
                        <p className="text-sm font-semibold">
                            Preview — pinch or use zoom
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setPreviewModal((s) => ({
                                        ...s,
                                        zoom: Math.max(0.5, s.zoom - 0.25),
                                    }))
                                }
                                className="rounded-full border border-white/40 p-2 hover:bg-white/10"
                                aria-label="Zoom out"
                            >
                                <ZoomOut className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setPreviewModal((s) => ({
                                        ...s,
                                        zoom: Math.min(3.5, s.zoom + 0.25),
                                    }))
                                }
                                className="rounded-full border border-white/40 p-2 hover:bg-white/10"
                                aria-label="Zoom in"
                            >
                                <ZoomIn className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setPreviewModal({
                                        open: false,
                                        dataUrl: '',
                                        zoom: 1,
                                    })
                                }
                                className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 flex min-h-0 flex-1 overflow-auto">
                        <div className="m-auto max-h-full p-2">
                            {previewModal.dataUrl ? (
                                <img
                                    src={previewModal.dataUrl}
                                    alt="Your design preview"
                                    className="mx-auto max-h-[min(85dvh,900px)] w-auto max-w-full rounded-lg border border-white/20 shadow-2xl"
                                    style={{
                                        transform: `scale(${previewModal.zoom})`,
                                        transformOrigin: 'center center',
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </ShopLayout>
    );
}
