import { useEffect, useRef, useState } from 'react';
import landingContent from '../../data/landingContent';

const { hero } = landingContent;

function renderHeadline(text, emphasis) {
  if (!emphasis || emphasis.length === 0) return text;

  const parts = [];
  let remaining = text;
  let key = 0;

  for (const word of emphasis) {
    const idx = remaining.indexOf(word);
    if (idx !== -1) {
      if (idx > 0) parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
      parts.push(
        <em key={key++} className="hero__headline-glitch" data-text={word}>
          {word}
        </em>
      );
      remaining = remaining.slice(idx + word.length);
    }
  }
  if (remaining) parts.push(<span key={key++}>{remaining}</span>);

  return parts;
}

function CircuitTraces() {
  return (
    <svg
      className="hero__circuit"
      viewBox="0 0 800 600"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="hero__trace hero__trace--base"
        d="M0 300 Q200 280 300 200 T500 150 T700 100"
      />
      <path
        className="hero__trace hero__trace--base"
        d="M0 400 Q150 380 250 320 T450 280 T650 200"
      />
      <path
        className="hero__trace hero__trace--base"
        d="M100 600 Q200 500 350 450 T550 350 T750 250"
      />
      <path
        className="hero__trace hero__trace--base"
        d="M0 200 Q100 180 200 150 T400 100 T600 50"
      />
      <path
        className="hero__trace hero__trace--glow"
        d="M0 300 Q200 280 300 200 T500 150 T700 100"
      />
      <path
        className="hero__trace hero__trace--glow hero__trace--delayed"
        d="M0 400 Q150 380 250 320 T450 280 T650 200"
      />
      <path
        className="hero__trace hero__trace--glow hero__trace--delayed-2"
        d="M100 600 Q200 500 350 450 T550 350 T750 250"
      />
      <circle className="hero__node" cx="300" cy="200" r="3" />
      <circle className="hero__node hero__node--delayed" cx="500" cy="150" r="2.5" />
      <circle className="hero__node hero__node--delayed-2" cx="250" cy="320" r="2" />
      <circle className="hero__node" cx="450" cy="280" r="3" />
      <circle className="hero__node hero__node--delayed" cx="350" cy="450" r="2.5" />
      <circle className="hero__node hero__node--delayed-2" cx="550" cy="350" r="2" />
      <circle className="hero__node" cx="200" cy="150" r="2" />
      <circle className="hero__node hero__node--delayed" cx="600" cy="50" r="2.5" />
    </svg>
  );
}

function AmbientParticles() {
  const particles = [
    { x: 15, y: 25, size: 3, delay: 0, duration: 18 },
    { x: 72, y: 60, size: 2, delay: 4, duration: 22 },
    { x: 40, y: 75, size: 2.5, delay: 8, duration: 20 },
    { x: 85, y: 20, size: 2, delay: 2, duration: 24 },
    { x: 55, y: 45, size: 1.5, delay: 6, duration: 16 },
  ];

  return (
    <div className="hero__particles" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="hero__particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ onStartConversation }) {
  const heroRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);

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

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const traceOffset = scrollY * 0.08;
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  const traceOpacity = 0.4 + scrollProgress * 0.4;

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__signal-current" aria-hidden="true">
        <div className="hero__signal-wash" />
      </div>
      <div className="hero__signal-line" aria-hidden="true" />
      <div
        className="hero__cursor-dot"
        aria-hidden="true"
        style={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
        }}
      />
      <AmbientParticles />
      <svg
        className="hero__circuit"
        viewBox="0 0 800 600"
        fill="none"
        aria-hidden="true"
        style={{ transform: `translateY(${traceOffset}px)` }}
      >
        <path className="hero__trace hero__trace--base" d="M0 300 Q200 280 300 200 T500 150 T700 100" />
        <path className="hero__trace hero__trace--base" d="M0 400 Q150 380 250 320 T450 280 T650 200" />
        <path className="hero__trace hero__trace--base" d="M100 600 Q200 500 350 450 T550 350 T750 250" />
        <path className="hero__trace hero__trace--base" d="M0 200 Q100 180 200 150 T400 100 T600 50" />
        <g opacity={traceOpacity}>
          <path className="hero__trace hero__trace--glow" d="M0 300 Q200 280 300 200 T500 150 T700 100" />
          <path className="hero__trace hero__trace--glow hero__trace--delayed" d="M0 400 Q150 380 250 320 T450 280 T650 200" />
          <path className="hero__trace hero__trace--glow hero__trace--delayed-2" d="M100 600 Q200 500 350 450 T550 350 T750 250" />
        </g>
        <circle className="hero__node" cx="300" cy="200" r="3" />
        <circle className="hero__node hero__node--delayed" cx="500" cy="150" r="2.5" />
        <circle className="hero__node hero__node--delayed-2" cx="250" cy="320" r="2" />
        <circle className="hero__node" cx="450" cy="280" r="3" />
        <circle className="hero__node hero__node--delayed" cx="350" cy="450" r="2.5" />
        <circle className="hero__node hero__node--delayed-2" cx="550" cy="350" r="2" />
        <circle className="hero__node" cx="200" cy="150" r="2" />
        <circle className="hero__node hero__node--delayed" cx="600" cy="50" r="2.5" />
      </svg>
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content reveal">
            <span className="badge hero__badge">{hero.badge}</span>
            <h1 className="hero__headline">
              {renderHeadline(hero.headline, hero.headlineEmphasis)}
            </h1>
            <p className="hero__subheadline">{hero.subheadline}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={hero.primaryCTA.href}>
                {hero.primaryCTA.label}
              </a>
              <a className="btn btn--secondary" href={hero.secondaryCTA.href}>
                {hero.secondaryCTA.label}
              </a>
            </div>
            <div className="hero__trust">
              {hero.trustRow.metrics.map((metric, i) => (
                <div className="hero__metric" key={i}>
                  <span className="hero__metric-value">{metric.value}</span>
                  <span className="hero__metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
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
                <img
                  src="/images/contact-avatar-chloe.png"
                  alt="Eva AI Assistant"
                  className="eva-dock__avatar-img"
                />
                <div className="eva-dock__avatar-pulse" aria-hidden="true" />
                <div className="eva-dock__avatar-ring" aria-hidden="true" />
              </div>
              <div className="eva-dock__info">
                <span className="eva-dock__greeting">Hi, I&apos;m Eva</span>
                <span className="eva-dock__description">Your AI assistant. Ask me anything about 8085.</span>
              </div>
              <button
                className="eva-dock__cta"
                onClick={onStartConversation}
                type="button"
              >
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
        </div>
      </div>
    </section>
  );
}
