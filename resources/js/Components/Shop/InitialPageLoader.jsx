import { useEffect, useState } from 'react';

/**
 * Full-screen intro loader (matches the legacy TanStack Loader UX).
 * Optional brand image from Admin → Settings → General (loader logo).
 */
export default function InitialPageLoader({
    onDone,
    loaderLogoUrl,
    siteName,
}) {
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logoOk, setLogoOk] = useState(true);

    const shortBrand =
        siteName?.trim()?.slice(0, 3)?.toUpperCase() ?? 'PPC';

    useEffect(() => {
        setLogoOk(true);
    }, [loaderLogoUrl]);

    useEffect(() => {
        let raf;
        const start = performance.now();
        const tick = (t) => {
            const p = Math.min(100, ((t - start) / 1100) * 100);
            setProgress(p);
            if (p < 100) {
                raf = requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    setDone(true);
                    onDone?.();
                }, 250);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    if (done) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
                progress >= 100 ? 'opacity-0' : 'opacity-100'
            }`}
            aria-live="polite"
            aria-busy="true"
        >
            <div className="absolute inset-0 animate-grid bg-grid opacity-40" />
            <div className="aurora opacity-70" />
            <div className="absolute inset-0 bg-glow" />
            <div
                className="orb animate-orb left-1/4 top-1/4 h-80 w-80"
                style={{ background: 'var(--gradient-primary)' }}
            />
            <div
                className="orb animate-orb bottom-1/4 right-1/4 h-72 w-72"
                style={{
                    background:
                        'radial-gradient(circle, oklch(0.78 0.22 50 / 0.6), transparent)',
                    animationDelay: '-3s',
                }}
            />
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="animate-glow absolute inset-0 rounded-full bg-primary/40 blur-2xl" />
                    <div className="absolute inset-[-30%] animate-spin-slow rounded-full border-2 border-dashed border-primary/30" />
                    <div
                        className="absolute inset-[-50%] rounded-full border border-primary/20"
                        style={{
                            borderStyle: 'dotted',
                            animation: 'spin-slow 6s linear infinite reverse',
                        }}
                    />
                    <div
                        className="absolute inset-[-15%] rounded-full"
                        style={{
                            background:
                                'conic-gradient(from 0deg, transparent, oklch(0.72 0.20 45 / 0.6), transparent)',
                            animation: 'spin-slow 2s linear infinite',
                            filter: 'blur(8px)',
                        }}
                    />
                    <div className="relative flex h-24 w-24 animate-float items-center justify-center overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-glow">
                        {loaderLogoUrl && logoOk ? (
                            <img
                                src={loaderLogoUrl}
                                alt=""
                                className="max-h-full max-w-full object-contain p-2"
                                onError={() => setLogoOk(false)}
                            />
                        ) : (
                            <span className="font-black text-3xl tracking-tighter text-primary">
                                {shortBrand}
                            </span>
                        )}
                    </div>
                </div>
                <div className="relative h-1.5 w-72 overflow-hidden rounded-full bg-secondary">
                    <div
                        className="h-full transition-all duration-100"
                        style={{
                            width: `${progress}%`,
                            background: 'var(--gradient-primary)',
                            boxShadow:
                                '0 0 20px oklch(0.72 0.20 45 / 0.8)',
                        }}
                    />
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
                    <span className="text-primary">●</span> Initializing{' '}
                    {Math.round(progress)}%
                </p>
            </div>
        </div>
    );
}
