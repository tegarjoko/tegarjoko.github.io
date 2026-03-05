import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { timelineData } from '../data/timelineData';

export default function Timeline() {
    const ref = useRef(null);
    useScrollReveal(ref);

    return (
        <div id="timeline" className="section-outer alt-bg" ref={ref}>
            <div className="section-inner">
                <div className="section-label">// 02 — EXPERIENCE</div>
                <h2 className="section-title reveal">
                    <span className="prefix">&gt;&gt;</span> MISSION LOG
                </h2>
                <div className="timeline-wrap">
                    {timelineData.map((item, idx) => (
                        <div className="tl-item reveal" key={idx}>
                            {item.side === 'left' ? (
                                <>
                                    <div className="tl-card">
                                        <div className="tl-year">{item.year}</div>
                                        <div className="tl-title">{item.title}</div>
                                        <div className="tl-org">{item.org}</div>
                                        <div className="tl-desc">{item.desc}</div>
                                    </div>
                                    <div className="tl-dot-wrap"><div className="tl-dot"></div></div>
                                    <div className="tl-empty"></div>
                                </>
                            ) : (
                                <>
                                    <div className="tl-empty"></div>
                                    <div className="tl-dot-wrap"><div className="tl-dot"></div></div>
                                    <div className="tl-card">
                                        <div className="tl-year">{item.year}</div>
                                        <div className="tl-title">{item.title}</div>
                                        <div className="tl-org">{item.org}</div>
                                        <div className="tl-desc">{item.desc}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
