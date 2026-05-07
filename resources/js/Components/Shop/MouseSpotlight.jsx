import { useEffect, useRef } from 'react';

export function MouseSpotlight({ children, className = '' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return undefined;
        }
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--mx', `${x}%`);
            el.style.setProperty('--my', `${y}%`);
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div ref={ref} className={`spotlight ${className}`}>
            {children}
        </div>
    );
}

export function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal-on-scroll');
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in-view');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12 },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}
