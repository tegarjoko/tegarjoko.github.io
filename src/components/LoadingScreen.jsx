import { useEffect, useRef } from 'react';

export default function LoadingScreen({ onDone }) {
    const barRef = useRef(null);
    const pctRef = useRef(null);
    const lblRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        const pct = pctRef.current;
        const lbl = lblRef.current;
        const wrap = wrapRef.current;

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

        const t2 = setTimeout(() => {
            lbl.textContent = 'SYSTEM READY';
            lbl.style.color = '#00C8B4';
        }, 2600);

        const t3 = setTimeout(() => {
            wrap.classList.add('fade-out');
            setTimeout(() => onDone?.(), 800);
        }, 3000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onDone]);

    return (
        <div id="loading" ref={wrapRef}>
            <div className="scanline-sweep"></div>
            <div className="load-name" data-text="WELCOME">WELCOME</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: 'min(400px,80vw)' }}>
                <div className="load-bar-wrap">
                    <div className="load-bar-fill" ref={barRef}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="load-label" ref={lblRef}>INITIALIZING SYSTEM...</div>
                    <div className="load-pct" ref={pctRef}>0%</div>
                </div>
            </div>
        </div>
    );
}
