import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

const socialLinks = [
    {
        icon: faLinkedin,
        label: 'LINKEDIN',
        href: 'https://linkedin.com/in/tegar-joko-kurniawan',
        display: 'tegar-joko-kurniawan',
    },
    {
        icon: faGithub,
        label: 'GITHUB',
        href: 'https://github.com/tegarjoko',
        display: 'github.com/tegarjoko',
    },
    {
        icon: faWhatsapp,
        label: 'WHATSAPP',
        href: 'https://wa.me/6283870936155',
        display: '+62 838-7093-6155',
    },
    {
        icon: faEnvelope,
        label: 'EMAIL',
        href: 'mailto:tegarjoke@gmail.com',
        display: 'tegarjoke@gmail.com',
    },
];

export default function Contact() {
    const ref = useRef(null);
    useScrollReveal(ref);

    return (
        <div id="contact" className="section-outer" ref={ref}>
            <div className="section-inner">
                <div className="section-label">// 05 — CONTACT</div>
                <h2 className="section-title reveal">
                    <span className="prefix">&gt;&gt;</span> OPEN CHANNEL
                </h2>
                <div className="contact-grid reveal">
                    <form className="contact-form">
                        <div className="form-field">
                            <label className="form-label">CALLSIGN (NAME)</label>
                            <input type="text" className="form-input" placeholder="Enter your name_" />
                        </div>
                        <div className="form-field">
                            <label className="form-label">FREQUENCY (EMAIL)</label>
                            <input type="email" className="form-input" placeholder="your@email.com_" />
                        </div>
                        <div className="form-field">
                            <label className="form-label">TRANSMISSION (MESSAGE)</label>
                            <textarea className="form-input" rows="5" placeholder="Your message here_"></textarea>
                        </div>
                        <button type="submit" className="btn-submit">// SEND TRANSMISSION</button>
                    </form>
                    <div className="contact-info">
                        <ul className="terminal-links">
                            {socialLinks.map(({ icon, label, href, display }) => (
                                <li key={label}>
                                    <a href={href} target="_blank" rel="noopener noreferrer">
                                        <span className="t-label">
                                            <FontAwesomeIcon icon={icon} style={{ marginRight: '0.6rem' }} />
                                            {display}
                                        </span>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: '0.6rem' }} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="coord-text">
                            LAT: -6.2088° S | LNG: 107.0000° E<br />
                            TZ: UTC+7 | BEKASI, INDONESIA<br />
                            RESPONSE_TIME: &lt; 24H
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
