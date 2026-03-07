import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
    const ref = useRef(null);
    useScrollReveal(ref);

    return (
        <div id="about" className="section-outer" ref={ref}>
            <div className="section-inner">
                <div className="section-label">// 01 — ABOUT</div>
                <h2 className="section-title reveal">
                    <span className="prefix">&gt;&gt;</span> ABOUT ME
                </h2>
                <div className="arc-container reveal">
                    <div className="c-bl"></div><div className="c-br"></div>
                    <div className="about-grid">
                        <div className="about-text">
                            <p>
                                I'm a <strong>Software Developer</strong> focused on building end-to-end
                                web systems. With hands-on experience in the pharmaceutical industry and
                                an MSIB program by Google, GoTo, and Traveloka, I build solutions that
                                don't just work — they <strong>make an impact</strong>.
                            </p>
                            <p>
                                My core stack spans <strong>PHP / Laravel</strong>, <strong>Node.js</strong>,
                                and <strong>React</strong> — from relational database design to REST APIs
                                and responsive user interfaces.
                            </p>
                            <p>
                                I thrive on complex technical challenges, clean implementation details, and
                                solid teamwork. I have completed a Bachelor's degree in Information
                                Technology at BSI University with a <strong>GPA of 4.00</strong>.
                            </p>
                        </div>
                        <div className="hud-panel">
                            {[
                                { key: 'LOCATION', val: 'Bekasi, Indonesia' },
                                { key: 'STATUS', val: null },
                                { key: 'EDUCATION', val: 'S1 IT — BSI University' },
                                { key: 'GPA', val: '4.00 / 4.00' },
                                { key: 'LANGUAGES', val: 'PHP · JS · Python' },
                            ].map(({ key, val }) => (
                                <div className="hud-row" key={key}>
                                    <span className="hud-key">{key}</span>
                                    {key === 'STATUS' ? (
                                        <span className="hud-val"><span className="status-dot"></span>OPEN TO WORK</span>
                                    ) : (
                                        <span className="hud-val">{val}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
