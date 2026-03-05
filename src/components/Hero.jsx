import { useEffect, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXTS = ['Software Developer', 'Back-end Developer', 'Full Stack Developer', 'Web Engineer'];

export default function Hero() {
    const canvasRef = useRef(null);
    const nameRef = useRef(null);
    const displayText = useTypewriter(TYPEWRITER_TEXTS, 4500);

    /* ---- Particle canvas ---- */
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let W, H, particles = [], animId;

        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = -Math.random() * 0.5 - 0.1;
                this.r = Math.random() * 1.2 + 0.3;
                this.op = Math.random() * 0.35 + 0.05;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.y < -5 || this.x < -5 || this.x > W + 5) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,107,0,${this.op})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 60; i++) particles.push(new Particle());

        function connect() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255,107,0,${0.12 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        let scrollY = 0;
        const onScroll = () => { scrollY = window.scrollY; };
        window.addEventListener('scroll', onScroll);

        function loop() {
            ctx.clearRect(0, 0, W, H);
            ctx.save();
            ctx.translate(0, -scrollY * 0.3 % H);
            particles.forEach((p) => { p.update(); p.draw(); });
            connect();
            ctx.restore();
            animId = requestAnimationFrame(loop);
        }
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(animId);
        };
    }, []);

    /* ---- Periodic glitch ---- */
    useEffect(() => {
        const el = nameRef.current;
        let timer;
        function triggerGlitch() {
            el.classList.add('glitching');
            setTimeout(() => el.classList.remove('glitching'), 500);
            timer = setTimeout(triggerGlitch, 6000 + Math.random() * 3000);
        }
        timer = setTimeout(triggerGlitch, 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="hero">
            <canvas id="particle-canvas" ref={canvasRef}></canvas>

            {/* L-bracket frame */}
            <div className="hero-frame">
                <div className="corner-bl"></div>
                <div className="corner-br"></div>
            </div>

            <div className="hero-content">
                <div className="hero-label">// SYSTEM INITIALIZED — PORTFOLIO ONLINE</div>
                <h1 className="hero-name" data-text="TEGAR JOKO" ref={nameRef}>
                    <span className="hero-name-prefix">&gt;&gt;</span> TEGAR JOKO KURNIAWAN
                </h1>
                <div className="hero-subtitle">
                    {displayText}
                    <span className="cursor-blink"></span>
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
                <span></span>
                <p>SCROLL</p>
            </div>
        </section>
    );
}
