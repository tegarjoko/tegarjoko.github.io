import { useEffect, useRef } from 'react';

export default function LoadingScreen({ onDone }) {
    const barRef = useRef(null);
    const pctRef = useRef(null);
    const lblRef = useRef(null);
    const wrapRef = useRef(null);
    const nameRef = useRef(null);
    const barWrapRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        const pct = pctRef.current;
        const lbl = lblRef.current;
        const wrap = wrapRef.current;
        const name = nameRef.current;
        const barWrap = barWrapRef.current;

        // Phase 1 — progress bar fills
        const t1 = setTimeout(() => {
            lbl.style.opacity = '1';
            bar.style.width = '100%';
            let p = 0;
            const iv = setInterval(() => {
                p = Math.min(p + 2, 100);
                pct.textContent = p + '%';
                if (p >= 100) clearInterval(iv);
            }, 36);
        }, 600);

        // Phase 2 — "SYSTEM READY"
        const t2 = setTimeout(() => {
            lbl.textContent = 'SYSTEM READY';
            lbl.style.color = '#00C8B4';
        }, 2600);

        // Phase 3 — WELCOME glitch out + hide bar
        const t3 = setTimeout(() => {
            name.classList.add('glitch-out');
            barWrap.style.transition = 'opacity 0.35s ease';
            barWrap.style.opacity = '0';
        }, 3000);

        // Phase 4 — portal starts opening
        const t4 = setTimeout(() => {
            wrap.classList.add('circle-open');
        }, 3500);

        // Phase 5 — unmount
        const t5 = setTimeout(() => {
            onDone?.();
        }, 4800);

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
            clearTimeout(t4); clearTimeout(t5);
        };
    }, [onDone]);

    return (
        <div id="loading" ref={wrapRef}>
            <div className="loading-bg" />
            <div className="scanline-sweep" />
            <div className="load-name" data-text="WELCOME" ref={nameRef}>WELCOME</div>
            <div ref={barWrapRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: 'min(400px,80vw)' }}>
                <div className="load-bar-wrap">
                    <div className="load-bar-fill" ref={barRef} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="load-label" ref={lblRef}>INITIALIZING SYSTEM...</div>
                    <div className="load-pct" ref={pctRef}>0%</div>
                </div>
            </div>
        </div>
    );
}
