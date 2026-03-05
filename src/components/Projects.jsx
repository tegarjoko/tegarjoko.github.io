import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projectsData } from '../data/projectsData';

function handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(6px)`;
}
function resetTilt(card) {
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
}

export default function Projects() {
    const ref = useRef(null);
    useScrollReveal(ref);

    return (
        <div id="projects" className="section-outer alt-bg" ref={ref}>
            <div className="section-inner">
                <div className="section-label">// 04 — WORKS</div>
                <h2 className="section-title reveal">
                    <span className="prefix">&gt;&gt;</span> FIELD OPERATIONS
                </h2>
                <div className="projects-grid">
                    {projectsData.map((p) => (
                        <div
                            className="proj-card reveal"
                            key={p.id}
                            id={p.id}
                            onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                            onMouseLeave={(e) => resetTilt(e.currentTarget)}
                        >
                            <div className="proj-img">
                                <span className={`proj-badge ${p.badge}`}>{p.status}</span>
                                <div className="proj-img-inner">[ {p.label} ]</div>
                            </div>
                            <div className="proj-body">
                                <div className="proj-title">{p.title}</div>
                                <div className="proj-tags">
                                    {p.tags.map((t) => <span className="proj-tag" key={t}>{t}</span>)}
                                </div>
                                <div className="proj-desc">{p.desc}</div>
                                <div className="proj-links">
                                    <a href={p.demoUrl} className="proj-link">// DEMO ↗</a>
                                    <a href={p.codeUrl} className="proj-link">// CODE ↗</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
