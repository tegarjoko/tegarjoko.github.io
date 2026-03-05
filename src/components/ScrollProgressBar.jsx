import { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
    const fillRef = useRef(null);

    useEffect(() => {
        const fill = fillRef.current;
        let rafId = null;

        const update = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (scrolled / total) * 100 : 0;
            fill.style.width = `${pct}%`;
            rafId = null;
        };

        const onScroll = () => {
            if (!rafId) rafId = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        update(); // set initial value
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="scroll-progress-track">
            <div className="scroll-progress-fill" ref={fillRef} />
        </div>
    );
}
