import { useRef, useCallback, useEffect, useState } from 'react';
import landingContent from '../../data/landingContent';

const { solutions } = landingContent;

function SolutionCard({ item, index, isVisible }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`agentic-card solution-card ${isVisible ? 'solution-card--visible' : ''}`}
      style={{ '--card-delay': `${index * 0.15}s` }}
      onMouseMove={handleMouseMove}
    >
      <div className="agentic-card__spotlight" aria-hidden="true" />
      <div className="agentic-card__signal-top" aria-hidden="true" />
      <div className="solution-card__bg-dots" aria-hidden="true" />
      <div className="solution-card__problem">
        <span className="solution-card__label">Challenge</span>
        <p className="solution-card__problem-text">{item.problem}</p>
      </div>
      <div className="solution-card__divider" aria-hidden="true">
        <div className="solution-card__divider-line" />
        <div className="solution-card__divider-arrow">
          <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="solution-card__solution">
        <div className="agentic-card__icon-wrap solution-card__icon">
          <div className="agentic-card__icon-ring" aria-hidden="true" />
          <div className="agentic-card__icon-pulse" aria-hidden="true" />
          <div className="agentic-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
          </div>
        </div>
        <h3 className="solution-card__title">{item.solution}</h3>
        <div className="solution-card__outcome">
          <span className="solution-card__outcome-label">Result</span>
          <p className="solution-card__outcome-text">{item.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export default function Solutions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById('solutions');
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section--solutions" id="solutions">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="section__signal-current" aria-hidden="true">
        <div className="section__signal-wash" />
      </div>
      <div className="section__data-flow" aria-hidden="true">
        <div className="section__data-flow-line" />
        <div className="section__data-flow-line" />
        <div className="section__data-flow-line" />
      </div>
      <div className="section__signal-dots" aria-hidden="true">
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
      </div>
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{solutions.badge}</span>
          <h2 className="section-header__title">{solutions.headline}</h2>
          {solutions.description && <p className="section-header__subtitle">{solutions.description}</p>}
        </div>
        <div className="solution-grid">
          {solutions.items.map((item, i) => (
            <SolutionCard key={item.id} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
