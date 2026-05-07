import { useMemo } from "react";

export function Kinetic({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const letters = useMemo(() => text.split(""), [text]);
  return (
    <span className={`kinetic ${className}`} aria-label={text}>
      {letters.map((c, i) => (
        <span key={i} style={{ animationDelay: `${delay + i * 0.04}s` }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}