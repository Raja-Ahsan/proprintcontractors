import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / 1100) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${progress >= 100 ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute inset-0 bg-grid animate-grid opacity-40" />
      <div className="aurora opacity-70" />
      <div className="absolute inset-0 bg-glow" />
      <div className="orb animate-orb h-80 w-80 top-1/4 left-1/4" style={{ background: "var(--gradient-primary)" }} />
      <div className="orb animate-orb h-72 w-72 bottom-1/4 right-1/4" style={{ background: "radial-gradient(circle, oklch(0.78 0.22 50 / 0.6), transparent)", animationDelay: "-3s" }} />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-glow" />
          <div className="absolute inset-[-30%] rounded-full border-2 border-primary/30 border-dashed animate-spin-slow" />
          <div className="absolute inset-[-50%] rounded-full border border-primary/20" style={{ borderStyle: "dotted", animation: "spin-slow 6s linear infinite reverse" }} />
          <div className="absolute inset-[-15%] rounded-full" style={{ background: "conic-gradient(from 0deg, transparent, oklch(0.72 0.20 45 / 0.6), transparent)", animation: "spin-slow 2s linear infinite", filter: "blur(8px)" }} />
          <img src={logo} alt="Loading" className="relative h-24 w-24 animate-float" width={96} height={96} />
        </div>
        <div className="w-72 h-1.5 bg-secondary rounded-full overflow-hidden relative">
          <div className="h-full transition-all duration-100" style={{ width: `${progress}%`, background: "var(--gradient-primary)", boxShadow: "0 0 20px oklch(0.72 0.20 45 / 0.8)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: "marquee 1.5s linear infinite", width: "50%" }} />
        </div>
        <p className="text-xs font-bold text-muted-foreground tracking-[0.4em] uppercase">
          <span className="text-primary">●</span> Initializing {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}