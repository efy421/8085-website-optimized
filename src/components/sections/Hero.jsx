import { useEffect, useRef, useState } from 'react';
import landingContent from '../../data/landingContent';

const { hero } = landingContent;

function renderHeadline(text, emphasis) {
  if (!emphasis || emphasis.length === 0) return text;
  const words = text.split(' ');
  let key = 0;
  return words.map((word, i) => {
    const isEmphasis = emphasis.some(e => word.includes(e));
    return (
      <span key={key++} className={isEmphasis ? 'hero__word hero__word--emphasis' : 'hero__word'} style={{ '--word-delay': `${i * 0.06}s` }}>
        {isEmphasis ? <em className="hero__headline-glitch" data-text={word}>{word}</em> : word}
      </span>
    );
  });
}

function AgenticBackground({ cursorX, cursorY }) {
  const nodes = [
    { x: 10, y: 15 }, { x: 25, y: 8 }, { x: 42, y: 20 }, { x: 60, y: 12 },
    { x: 78, y: 18 }, { x: 90, y: 10 }, { x: 15, y: 45 }, { x: 35, y: 55 },
    { x: 55, y: 40 }, { x: 72, y: 50 }, { x: 88, y: 42 }, { x: 8, y: 75 },
    { x: 30, y: 80 }, { x: 50, y: 70 }, { x: 68, y: 85 }, { x: 85, y: 72 },
    { x: 20, y: 30 }, { x: 45, y: 35 }, { x: 65, y: 25 }, { x: 80, y: 60 },
  ];

  const connections = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8],[8,9],[9,10],
    [11,12],[12,13],[13,14],[14,15],[0,6],[1,7],[2,8],[3,9],[4,10],
    [6,11],[7,12],[8,13],[9,14],[10,15],[16,0],[16,6],[17,2],[17,8],
    [18,3],[18,9],[19,4],[19,10],
  ];

  return (
    <div className="hero__agentic-bg" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="hero-spotlight" cx={`${cursorX}%`} cy={`${cursorY}%`} r="30%">
            <stop offset="0%" stopColor="rgba(195,100,43,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#hero-spotlight)" />
        {connections.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(195,100,43,0.06)"
            strokeWidth="0.15"
          />
        ))}
        {nodes.map((node, i) => {
          const dx = cursorX - node.x;
          const dy = cursorY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 30);
          return (
            <circle
              key={i}
              cx={node.x} cy={node.y}
              r={0.3 + proximity * 0.5}
              fill={`rgba(195,100,43,${0.1 + proximity * 0.4})`}
              style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function SignalCurrentFlow() {
  return (
    <div className="hero__signal-flow" aria-hidden="true">
      <div className="hero__signal-flow-line hero__signal-flow-line--1" />
      <div className="hero__signal-flow-line hero__signal-flow-line--2" />
      <div className="hero__signal-flow-line hero__signal-flow-line--3" />
      <div className="hero__signal-flow-dot hero__signal-flow-dot--1" />
      <div className="hero__signal-flow-dot hero__signal-flow-dot--2" />
    </div>
  );
}

function AmbientParticles() {
  const particles = [
    { x: 12, y: 22, size: 3, delay: 0, duration: 18 },
    { x: 75, y: 58, size: 2, delay: 4, duration: 22 },
    { x: 38, y: 72, size: 2.5, delay: 8, duration: 20 },
    { x: 88, y: 18, size: 2, delay: 2, duration: 24 },
    { x: 52, y: 42, size: 1.5, delay: 6, duration: 16 },
    { x: 25, y: 65, size: 2, delay: 10, duration: 19 },
    { x: 68, y: 35, size: 1.8, delay: 3, duration: 21 },
    { x: 5, y: 50, size: 2.2, delay: 12, duration: 17 },
    { x: 95, y: 30, size: 1.6, delay: 7, duration: 23 },
  ];
  return (
    <div className="hero__particles" aria-hidden="true">
      {particles.map((p, i) => (
        <div key={i} className="hero__particle" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />
      ))}
    </div>
  );
}

export default function Hero({ onStartConversation }) {
  const heroRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--signal-focus-x', `${x}%`);
      hero.style.setProperty('--signal-focus-y', `${y}%`);
      setCursorPos({ x, y });
    };
    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <AgenticBackground cursorX={cursorPos.x} cursorY={cursorPos.y} />
      <SignalCurrentFlow />
      <div className="hero__cursor-dot" aria-hidden="true" style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }} />
      <AmbientParticles />
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content reveal">
            <span className="badge hero__badge">{hero.badge}</span>
            <h1 className="hero__headline">
              {renderHeadline(hero.headline, hero.headlineEmphasis)}
            </h1>
            <p className="hero__subheadline">{hero.subheadline}</p>
            <div className="hero__signals">
              {hero.signals.map((signal, i) => (
                <div className="hero__signal-point" key={i} style={{ '--signal-delay': `${0.6 + i * 0.12}s` }}>
                  <span className="hero__signal-dot" aria-hidden="true" />
                  <span className="hero__signal-text">{signal}</span>
                </div>
              ))}
            </div>
            <div className="hero__actions" style={{ '--action-delay': '1s' }}>
              <a className="btn btn--primary" href={hero.primaryCTA.href}>
                <span className="btn__signal" aria-hidden="true" />
                {hero.primaryCTA.label}
              </a>
              <a className="btn btn--secondary" href={hero.secondaryCTA.href}>
                {hero.secondaryCTA.label}
              </a>
            </div>
          </div>
          <div className="hero__right">
            <div className="hero__eva-dock" aria-label="Talk to Eva, our AI assistant">
              <div className="eva-dock__bezel" aria-hidden="true" />
              <div className="eva-dock__glow" aria-hidden="true" />
              <div className="eva-dock__inner-glow" aria-hidden="true" />
              <div className="eva-dock__content">
                <div className="eva-dock__status">
                  <span className="eva-dock__status-dot" aria-hidden="true" />
                  <span className="eva-dock__status-text">Available</span>
                </div>
                <div className="eva-dock__avatar">
                  <img src={`${import.meta.env.BASE_URL}images/contact-avatar-chloe.png`} alt="Eva AI Assistant" className="eva-dock__avatar-img" />
                  <div className="eva-dock__avatar-pulse" aria-hidden="true" />
                  <div className="eva-dock__avatar-ring" aria-hidden="true" />
                </div>
                <div className="eva-dock__info">
                  <span className="eva-dock__greeting">Hi, I&apos;m Eva</span>
                  <span className="eva-dock__description">Your AI assistant. Ask me anything about 8085.</span>
                </div>
                <ul className="eva-dock__points">
                  <li>Start with one workflow</li>
                  <li>Built around your process</li>
                  <li>You own what we build</li>
                </ul>
                <button className="eva-dock__cta" onClick={onStartConversation} type="button">
                  <svg className="eva-dock__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                  <span>Talk to Eva</span>
                </button>
                <span className="eva-dock__secondary">or browse our services &rarr;</span>
              </div>
            </div>
            <div className="hero__proof-rail">
              {hero.trustRow.metrics.map((metric, i) => (
                <div className="hero__proof-card" key={i} style={{ '--proof-delay': `${1.2 + i * 0.1}s` }}>
                  <span className="hero__proof-value">{metric.value}</span>
                  <span className="hero__proof-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
