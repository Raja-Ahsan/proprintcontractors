import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @param {{
 *   items: { key: string, url: string, title?: string }[],
 *   activeUrl: string | null,
 *   onSelect: (item: { key: string, url: string, title?: string }, index: number) => void,
 * }} props
 */
export default function ProductGallerySlider({ items, activeUrl, onSelect }) {
    const trackRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const el = trackRef.current;

        if (!el) {
            setCanScrollLeft(false);
            setCanScrollRight(false);

            return;
        }

        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(
            el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
        );
    }, []);

    useEffect(() => {
        updateScrollState();

        const el = trackRef.current;

        el?.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);

        return () => {
            el?.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [items, updateScrollState]);

    useEffect(() => {
        const el = trackRef.current;

        if (!el || !activeUrl) {
            return;
        }

        const idx = items.findIndex((item) => item.url === activeUrl);

        if (idx < 0) {
            return;
        }

        const thumb = el.children[idx];

        if (thumb instanceof HTMLElement) {
            thumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, [activeUrl, items]);

    function scrollByDir(dir) {
        const el = trackRef.current;

        if (!el) {
            return;
        }

        el.scrollBy({
            left: dir * Math.max(120, el.clientWidth * 0.65),
            behavior: 'smooth',
        });
    }

    if (!items.length) {
        return null;
    }

    const showArrows = items.length > 4 || canScrollLeft || canScrollRight;

    return (
        <div className="relative rounded-2xl border border-border bg-card/90 p-2 shadow-sm">
            {showArrows && canScrollLeft ? (
                <button
                    type="button"
                    aria-label="Previous images"
                    onClick={() => scrollByDir(-1)}
                    className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm transition hover:border-primary hover:text-primary"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
            ) : null}

            {showArrows && canScrollRight ? (
                <button
                    type="button"
                    aria-label="Next images"
                    onClick={() => scrollByDir(1)}
                    className="absolute right-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm transition hover:border-primary hover:text-primary"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            ) : null}

            <div
                ref={trackRef}
                className={`flex gap-2 overflow-x-auto scroll-smooth px-1 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
                    showArrows ? 'px-9' : 'justify-center'
                }`}
            >
                {items.map((item, idx) => {
                    const isActive = activeUrl === item.url;

                    return (
                        <button
                            key={item.key}
                            type="button"
                            title={item.title ?? 'View image'}
                            onClick={() => onSelect(item, idx)}
                            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-card transition-all sm:h-[4.5rem] sm:w-[4.5rem] ${
                                isActive
                                    ? 'border-primary ring-2 ring-primary/30'
                                    : 'border-border hover:border-primary/60'
                            }`}
                        >
                            <img
                                src={item.url}
                                alt=""
                                width={72}
                                height={72}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
