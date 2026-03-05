import { useState, useEffect } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        function onScroll() {
            const sections = document.querySelectorAll('section[id], div[id]');
            let current = '';
            sections.forEach((s) => {
                if (window.scrollY >= s.offsetTop - 80) current = s.id;
            });
            setActiveSection(current);
        }
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = ['about', 'timeline', 'skills', 'projects', 'contact'];

    return (
        <>
            <nav>
                <div className="nav-inner">
                    <a href="#hero" className="nav-logo">
                        <div className="nav-logo-group">
                            <span>TEGAR<span className="logo-dot">.</span>SYS</span>
                            <span className="nav-sub">PORTFOLIO // V.1.0</span>
                        </div>
                    </a>
                    <ul className="nav-links">
                        {links.map((l) => (
                            <li key={l}>
                                <a href={`#${l}`} className={activeSection === l ? 'active' : ''}>
                                    {l}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <span className="nav-status">SYS.ONLINE</span>
                    <div className="nav-burger" id="burger" onClick={() => setMenuOpen((o) => !o)}>
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div className="nav-separator"></div>
            </nav>

            <div id="mobile-menu" className={menuOpen ? 'open' : ''}>
                {links.map((l) => (
                    <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)}>
                        {l.toUpperCase()}
                    </a>
                ))}
            </div>
        </>
    );
}
