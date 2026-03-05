import { useEffect, useRef } from 'react';

export default function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let animId;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        };

        // Track hover state on interactive elements
        const onEnter = () => ring.classList.add('ring-hover');
        const onLeave = () => ring.classList.remove('ring-hover');
        const interactives = 'a, button, [role="button"], input, textarea, .proj-card, .skill-card';

        document.addEventListener('mousemove', onMove);
        document.querySelectorAll(interactives).forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        // Lazy trailing ring
        const loop = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            animId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            document.removeEventListener('mousemove', onMove);
            document.querySelectorAll(interactives).forEach(el => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </>
    );
}
