import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faCloud, faCode, faGears, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { certificatesData } from '../data/certificatesData';

const CATEGORY_ICON = {
    CLOUD: faCloud,
    BACKEND: faCode,
    DEVOPS: faGears,
    CERTIFIED: faAward,
    LANGUAGE: faLanguage,
};

export default function Certificates() {
    const ref = useRef(null);
    useScrollReveal(ref);

    return (
        <div id="certificates" className="section-outer alt-bg" ref={ref}>
            <div className="section-inner">
                <div className="section-label">// 05 — CREDENTIALS</div>
                <h2 className="section-title reveal">
                    <span className="prefix">&gt;&gt;</span> CLEARANCE RECORDS
                </h2>
                <div className="certs-grid">
                    {certificatesData.map((c) => (
                        <div className={`cert-card reveal cert-${c.color}`} key={c.id}>
                            <div className="cert-icon">
                                <FontAwesomeIcon icon={CATEGORY_ICON[c.category]} />
                            </div>
                            <div className="cert-body">
                                <div className="cert-category">[{c.category}]</div>
                                <div className="cert-name">{c.name}</div>
                                <div className="cert-meta">
                                    <span className="cert-issuer">{c.issuer}</span>
                                    <span className="cert-year">{c.year}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
