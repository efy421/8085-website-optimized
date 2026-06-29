import React, { useRef, useEffect, useCallback } from 'react';
import landingContent from '../../data/landingContent';

const { hero } = landingContent;

function renderHeadline() {
  const text = hero.headline;
  const emphasis = hero.headlineEmphasis || [];
  if (!emphasis.length) return text;
  const escaped = emphasis.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(pattern).map((part, i) =>
    emphasis.some(w => w.toLowerCase() === part.toLowerCase())
      ? <span key={i} className="hero__headline-accent">{part}</span>
      : part
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty('--spotlight-x', `${x}%`);
    heroRef.current.style.setProperty('--spotlight-y', `${y}%`);

    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    heroRef.current.style.setProperty('--tilt-x', `${tiltX}deg`);
    heroRef.current.style.setProperty('--tilt-y', `${tiltY}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    heroRef.current?.style.setProperty('--tilt-x', '0deg');
    heroRef.current?.style.setProperty('--tilt-y', '0deg');
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section ref={heroRef} className="hero" id="hero" aria-label="Hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__spotlight" />
        <div className="hero__grid" />
        <div className="hero__gradient-bar" />
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__visual-blob hero__visual-blob--1" />
        <div className="hero__visual-blob hero__visual-blob--2" />
        <div className="hero__visual-blob hero__visual-blob--3" />
      </div>
      <div className="container">
        <div className="hero__layout">
          <div className="hero__inner">
            <div className="hero__badge-row hero__animate">
              <span className="hero__badge">{hero.badge}</span>
            </div>
            <h1 className="hero__headline hero__animate">
              {renderHeadline()}
            </h1>
            <p className="hero__sub hero__animate">
              {hero.description}
            </p>
            <div className="hero__actions hero__animate">
              <a className="btn btn--primary btn--xl" href={hero.primaryCTA.href}>
                {hero.primaryCTA.label}
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a className="btn btn--ghost btn--xl" href={hero.secondaryCTA.href}>
                {hero.secondaryCTA.label}
              </a>
            </div>
            <div className="hero__stats hero__animate" aria-label="Key metrics">
              {hero.trustRow.metrics.map((metric, i) => (
                <div className="hero__stat" key={i}>
                  <span className="hero__stat-value">{metric.value}</span>
                  <span className="hero__stat-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
