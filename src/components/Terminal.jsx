import { useState, useEffect, useRef } from 'react';

const BOOT = [
    '> TEGAR.SYS v1.0 — TERMINAL INTERFACE',
    '> TYPE "help" FOR AVAILABLE COMMANDS',
    '─────────────────────────────────────',
];

const COMMANDS = {
    help: () => [
        '  whoami    — About the operator',
        '  skills    — Technology stack',
        '  contact   — Communication channels',
        '  projects  — Deployed operations list',
        '  clear     — Clear terminal output',
        '  exit      — Close terminal',
    ],
    whoami: () => [
        '  NAME       : Tegar Joko Kurniawan',
        '  ROLE       : Software Developer',
        '  LOCATION   : Bekasi, Indonesia',
        '  EDUCATION  : S1 IT — BSI (GPA 4.00)',
        '  STATUS     : OPEN TO WORK',
    ],
    skills: () => [
        '  LANGUAGES  : PHP · JavaScript · Python',
        '  FRONTEND   : React · Next.js · Vue.js · Tailwind · Bootstrap',
        '  BACKEND    : Laravel · Node.js · Express · MySQL · FilamentPHP',
        '  DEVOPS     : Git · GitHub · Google Cloud Platform',
    ],
    contact: () => [
        '  EMAIL      : tegarjoke@gmail.com',
        '  LINKEDIN   : linkedin.com/in/tegar-joko-kurniawan',
        '  GITHUB     : github.com/tegarjoko',
        '  WHATSAPP   : +62 838-7093-6155',
    ],
    projects: () => [
        '  [01] Internship Management System — PT Dankos Farma',
        '       Laravel 11 · FilamentPHP v3 · MySQL',
        '  [02] WeWildExplorer API — Bangkit 23H2 (Google/GoTo/Traveloka)',
        '       Node.js · Express · JWT · Google Cloud',
        '  [03] Personal Portfolio — tegarjoko.github.io',
        '       React · Vite · CSS',
    ],
    clear: () => null, // handled specially
    exit: () => null, // handled specially
};

export default function Terminal() {
    const [open, setOpen] = useState(false);
    const [lines, setLines] = useState(BOOT);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [histIdx, setHistIdx] = useState(-1);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Backtick toggle
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey) {
                // Don't trigger if user is typing in an input/textarea
                if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
                e.preventDefault();
                setOpen((o) => !o);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Auto-scroll + focus
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [lines]);

    const run = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const echo = `> ${cmd}`;
        if (!trimmed) return;

        if (trimmed === 'exit' || trimmed === 'quit') { setOpen(false); return; }
        if (trimmed === 'clear') { setLines(BOOT); return; }

        const fn = COMMANDS[trimmed];
        if (fn) {
            setLines((l) => [...l, echo, ...fn()]);
        } else {
            setLines((l) => [...l, echo, `  UNKNOWN COMMAND: "${trimmed}" — type "help"`]);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setHistory((h) => [input, ...h]);
        setHistIdx(-1);
        run(input);
        setInput('');
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHistIdx((i) => {
                const next = Math.min(i + 1, history.length - 1);
                setInput(history[next] ?? '');
                return next;
            });
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHistIdx((i) => {
                const next = Math.max(i - 1, -1);
                setInput(next === -1 ? '' : history[next] ?? '');
                return next;
            });
        }
    };

    if (!open) return (
        <button className="term-hint" onClick={() => setOpen(true)} title="Open terminal (press `)">
            <span className="term-hint-icon">&gt;_</span>
        </button>
    );

    return (
        <div className="term-overlay">
            <div className="term-box">
                <div className="term-titlebar">
                    <span className="term-title">TEGAR.SYS // TERMINAL</span>
                    <button className="term-x" onClick={() => setOpen(false)}>✕</button>
                </div>
                <div className="term-output">
                    {lines.map((l, i) => (
                        <div key={i} className={`term-line${l.startsWith('>') ? ' term-cmd' : ''}`}>{l}</div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <form className="term-inputrow" onSubmit={onSubmit}>
                    <span className="term-prompt">TEGAR.SYS &gt;</span>
                    <input
                        ref={inputRef}
                        className="term-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="type a command..."
                    />
                </form>
            </div>
        </div>
    );
}
