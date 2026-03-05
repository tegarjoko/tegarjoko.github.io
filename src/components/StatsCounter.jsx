import { useEffect, useRef, useState } from 'react';

const STATS = [
    { value: 3, suffix: '', label: 'PROJECTS\nDEPLOYED' },
    { value: 4.00, suffix: '', label: 'GPA\nSCORE', decimals: 2 },
    { value: 15, suffix: '+', label: 'MODULES\nBUILT' },
    { value: 2, suffix: '', label: 'COMPANIES\nWORKED AT' },
];

function useCountUp(target, duration = 1600, decimals = 0, active = false) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        const start = performance.now();
        const tick = (now) => {
            const prog = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - prog, 3); // ease-out cubic
            setVal(parseFloat((eased * target).toFixed(decimals)));
            if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [active, target, duration, decimals]);
    return val;
}

function Stat({ value, suffix, label, decimals = 0, active }) {
    const count = useCountUp(value, 1600, decimals, active);
    return (
        <div className="stat-item">
            <div className="stat-number">
                {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
            </div>
            <div className="stat-label">{label.split('\n').map((l, i) => <span key={i}>{l}</span>)}</div>
        </div>
    );
}

export default function StatsCounter() {
    const ref = useRef(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
            { threshold: 0.4 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div className="stats-strip" ref={ref}>
            <div className="stats-inner">
                {STATS.map((s, i) => (
                    <Stat key={i} active={active} {...s} />
                ))}
            </div>
        </div>
    );
}
