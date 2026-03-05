import { useEffect, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXTS = ['Software Developer', 'Back-end Developer', 'Full Stack Developer', 'Web Engineer'];

export default function Hero() {
    const canvasRef = useRef(null);
    const nameRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const displayText = useTypewriter(TYPEWRITER_TEXTS, 4500);

    /* ---- Dot particle canvas ---- */
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let W, H, dots = [], animId;

        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            // Re-spread dots on resize
            dots.forEach(d => {
                if (d.x > W) d.x = Math.random() * W;
                if (d.y > H) d.y = Math.random() * H;
            });
        };
        window.addEventListener('resize', resize);
        resize();

        /* Mouse tracking */
        const onMove = (e) => {
            const r = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
        };
        const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseleave', onLeave);

        /* Create dots */
        const COUNT = 120;
        for (let i = 0; i < COUNT; i++) {
            dots.push({
                x: Math.random() * (W || 800),
                y: Math.random() * (H || 600),
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.8,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }

        const REPEL_R = 120;
        const REPEL_F = 4;
        const DAMPING = 0.9;

        const loop = () => {
            ctx.clearRect(0, 0, W, H);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (const d of dots) {
                /* Mouse repel */
                const dx = d.x - mx;
                const dy = d.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < REPEL_R && dist > 0) {
                    const f = (1 - dist / REPEL_R) * REPEL_F;
                    d.vx += (dx / dist) * f;
                    d.vy += (dy / dist) * f;
                }

                d.vx *= DAMPING;
                d.vy *= DAMPING;
                d.x += d.vx;
                d.y += d.vy;

                /* Wrap edges */
                if (d.x < 0) d.x = W;
                if (d.x > W) d.x = 0;
                if (d.y < 0) d.y = H;
                if (d.y > H) d.y = 0;

                /* Draw dot */
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,107,0,${d.opacity})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', onMove);
            canvas.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(animId);
        };
    }, []);

    /* ---- Periodic glitch on name ---- */
    useEffect(() => {
        const el = nameRef.current;
        let timer;
        const triggerGlitch = () => {
            el.classList.add('glitching');
            setTimeout(() => el.classList.remove('glitching'), 500);
            timer = setTimeout(triggerGlitch, 6000 + Math.random() * 3000);
        };
        timer = setTimeout(triggerGlitch, 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="hero">
            <canvas id="particle-canvas" ref={canvasRef} />

            <div className="hero-frame">
                <div className="corner-bl" />
                <div className="corner-br" />
            </div>

            <div className="hero-content">
                <div className="hero-label">// SYSTEM INITIALIZED — PORTFOLIO ONLINE</div>
                <h1 className="hero-name" data-text="TEGAR JOKO KURNIAWAN" ref={nameRef}>
                    TEGAR JOKO KURNIAWAN
                </h1>
                <div className="hero-subtitle">
                    <span className="hero-name-prefix">&gt;&gt; </span>
                    {displayText}
                    <span className="cursor-blink" />
                </div>
                <p className="hero-desc">
                    Software Developer<br />
                    Bekasi, Indonesia
                </p>
                <div className="hero-btns">
                    <a href="#contact" className="btn btn-primary">// CONTACT ME</a>
                    <a href="#projects" className="btn btn-ghost">// VIEW PROJECTS</a>
                </div>
            </div>

            <div className="scroll-ind">
                <span />
                <p>SCROLL</p>
            </div>
        </section>
    );
}
