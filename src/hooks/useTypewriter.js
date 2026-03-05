import { useState, useEffect, useRef } from 'react';

/**
 * Cycles through an array of texts with type/delete animation.
 * @param {string[]} texts - Array of strings to cycle through
 * @param {number} startDelay - Milliseconds to wait before starting (default 4500)
 */
export function useTypewriter(texts, startDelay = 4500) {
    const [display, setDisplay] = useState('');
    const tiRef = useRef(0);
    const ciRef = useRef(0);
    const deletingRef = useRef(false);

    useEffect(() => {
        let timer;

        function type() {
            const current = texts[tiRef.current];
            if (!deletingRef.current) {
                ciRef.current++;
                setDisplay(current.slice(0, ciRef.current));
                if (ciRef.current === current.length) {
                    deletingRef.current = true;
                    timer = setTimeout(type, 2000);
                    return;
                }
            } else {
                ciRef.current--;
                setDisplay(current.slice(0, ciRef.current));
                if (ciRef.current === 0) {
                    deletingRef.current = false;
                    tiRef.current = (tiRef.current + 1) % texts.length;
                }
            }
            timer = setTimeout(type, deletingRef.current ? 40 : 80);
        }

        timer = setTimeout(type, startDelay);
        return () => clearTimeout(timer);
    }, [texts, startDelay]);

    return display;
}
