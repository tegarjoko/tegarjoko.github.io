import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function ProjectModal({ project, onClose }) {
    const [currentImg, setCurrentImg] = useState(0);

    // Close on Escape key
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const prev = useCallback(() => {
        setCurrentImg((i) => (i - 1 + project.images.length) % project.images.length);
    }, [project.images.length]);

    const next = useCallback(() => {
        setCurrentImg((i) => (i + 1) % project.images.length);
    }, [project.images.length]);

    if (!project) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                {/* L-bracket corners */}
                <div className="c-tl"></div>
                <div className="c-tr"></div>
                <div className="c-bl"></div>
                <div className="c-br"></div>

                {/* Header */}
                <div className="modal-header">
                    <div>
                        <div className="modal-label">// OPERATION DETAIL</div>
                        <div className="modal-title">{project.title}</div>
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                {/* Image carousel */}
                <div className="modal-carousel">
                    <img
                        className="carousel-img"
                        src={project.images[currentImg]}
                        alt={`Screenshot ${currentImg + 1}`}
                    />
                    <button className="carousel-btn prev" onClick={prev} aria-label="Previous">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="carousel-btn next" onClick={next} aria-label="Next">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <div className="carousel-counter">
                        {currentImg + 1} / {project.images.length}
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="carousel-dots">
                    {project.images.map((_, i) => (
                        <button
                            key={i}
                            className={`carousel-dot${i === currentImg ? ' active' : ''}`}
                            onClick={() => setCurrentImg(i)}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Body */}
                <div className="modal-body">
                    <div className="modal-tags">
                        {project.tags.map((t) => (
                            <span className="proj-tag" key={t}>{t}</span>
                        ))}
                    </div>
                    <p className="modal-desc">{project.fullDesc}</p>

                    {/* Feature list */}
                    {project.features && (
                        <ul className="modal-features">
                            {project.features.map((f, i) => (
                                <li key={i}><span className="feat-bullet">▸</span> {f}</li>
                            ))}
                        </ul>
                    )}

                </div>

            </div>
        </div>
    );
}
