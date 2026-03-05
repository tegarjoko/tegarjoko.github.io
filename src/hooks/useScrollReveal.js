import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to all elements with the given selector
 * inside the containerRef. When an element intersects, adds class 'visible'.
 */
export function useScrollReveal(containerRef, selector = '.reveal') {
    useEffect(() => {
        const container = containerRef?.current ?? document;
        const elements = container.querySelectorAll(selector);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('visible'), i * 80);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [containerRef, selector]);
}
