import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './TerminalHero.css';

const LINES = [
  { prompt: 'whoami', output: 'matodzi-nenwali — backend-leaning full-stack developer' },
  {
    prompt: 'cat mission.txt',
    output: 'building systems that are correct, readable, and built to last.',
  },
  { prompt: './run --status', output: 'final-year BSc Computer Science, University of Johannesburg' },
];

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const prefersReducedMotion = useRef(
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setVisibleLines(LINES.length);
      return;
    }

    if (visibleLines >= LINES.length) return;

    const currentPrompt = LINES[visibleLines].prompt;
    if (typedChars < currentPrompt.length) {
      const timeout = setTimeout(() => setTypedChars((c) => c + 1), 35);
      return () => clearTimeout(timeout);
    }

    const pause = setTimeout(() => {
      setVisibleLines((n) => n + 1);
      setTypedChars(0);
    }, 450);
    return () => clearTimeout(pause);
  }, [typedChars, visibleLines]);

  const bootComplete = visibleLines >= LINES.length;

  return (
    <section className="terminal-hero">
      <div className="container">
        <div className="terminal-window" role="img" aria-label="Terminal introduction">
          <div className="terminal-titlebar">
            <span className="terminal-dot terminal-dot--rose" />
            <span className="terminal-dot terminal-dot--amber" />
            <span className="terminal-dot terminal-dot--teal" />
            <span className="terminal-filename mono">portfolio.sh</span>
          </div>
          <div className="terminal-body mono">
            {LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="terminal-line">
                <div>
                  <span className="terminal-prompt-char">$</span> {line.prompt}
                </div>
                <div className="terminal-output">{line.output}</div>
              </div>
            ))}
            {!bootComplete && (
              <div className="terminal-line">
                <span className="terminal-prompt-char">$</span>{' '}
                {LINES[visibleLines].prompt.slice(0, typedChars)}
                <span className="terminal-cursor" />
              </div>
            )}
            {bootComplete && (
              <div className="terminal-line">
                <span className="terminal-prompt-char">$</span>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        </div>

        <div className="terminal-hero-actions">
          <Link to="/projects" className="btn btn-primary">
            View projects
          </Link>
          <Link to="/about" className="btn">
            About me
          </Link>
        </div>
      </div>
    </section>
  );
}
