import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

const socialLinks = [
    {
        icon: faLinkedin,
        label: 'LINKEDIN',
        href: 'https://linkedin.com/in/tegar-joko-kurniawan',
        display: 'Connect on LinkedIn',
    },
    {
        icon: faGithub,
        label: 'GITHUB',
        href: 'https://github.com/tegarjoko',
        display: 'Visit My GitHub',
    },
    {
        icon: faWhatsapp,
        label: 'WHATSAPP',
        href: 'https://wa.me/6283870936155',
        display: 'Contact me on WhatsApp',
    },
    {
        icon: faEnvelope,
        label: 'EMAIL',
        href: 'mailto:tegarjoke@gmail.com',
        display: 'Send me an Email',
    },
];

export default function Contact() {
    const ref = useRef(null);
    useScrollReveal(ref);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING...');
        const formData = new FormData(e.target);

        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('TRANSMISSION SENT SUCCESSFULLY');
                e.target.reset();
                setTimeout(() => setStatus(''), 5000);
            } else {
                console.error("Error", data);
                setStatus('ERROR SENDING TRANSMISSION');
            }
        } catch (error) {
            console.error("Error", error);
            setStatus('NETWORK ERROR');
        }
    };

    return (
        <div id="contact" className="section-outer" ref={ref}>
            <div className="section-inner">
                <div className="section-label">// 05 — CONTACT</div>
                <h2 className="section-title reveal">
                    <span className="prefix">&gt;&gt;</span> OPEN CHANNEL
                </h2>
                <div className="contact-grid reveal">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="form-label">CALLSIGN (NAME)</label>
                            <input type="text" name="name" className="form-input" placeholder="Enter your name_" required />
                        </div>
                        <div className="form-field">
                            <label className="form-label">FREQUENCY (EMAIL)</label>
                            <input type="email" name="email" className="form-input" placeholder="your@email.com_" required />
                        </div>
                        <div className="form-field">
                            <label className="form-label">TRANSMISSION (MESSAGE)</label>
                            <textarea name="message" className="form-input" rows="5" placeholder="Your message here_" required></textarea>
                        </div>
                        <button type="submit" className="btn-submit" disabled={status === 'SENDING...'}>
                            {status === 'SENDING...' ? '// TRANSMITTING...' : '// SEND TRANSMISSION'}
                        </button>
                        {status && status !== 'SENDING...' && (
                            <div style={{ marginTop: '1rem', color: status.includes('SUCCESS') ? '#4ade80' : '#f87171', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                                {status}
                            </div>
                        )}
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
