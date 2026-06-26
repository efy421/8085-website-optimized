import { useRef, useCallback } from 'react';
import landingContent from '../../data/landingContent';

const { projects } = landingContent;

function CaseCard({ study, index }) {
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
      className="agentic-card case-card reveal"
      style={{ '--card-index': index }}
      onMouseMove={handleMouseMove}
    >
      <div className="agentic-card__spotlight" aria-hidden="true" />
      <div className="agentic-card__signal-top" aria-hidden="true" />
      <div className="case-card__image" style={{ background: study.imageColor || '#1a1a2e' }}>
        <div className="case-card__image-scan" aria-hidden="true" />
        <div className="case-card__image-label">
          <span className="case-card__image-industry">{study.industry}</span>
          <span className="case-card__image-client">{study.client}</span>
        </div>
      </div>
      <div className="case-card__content">
        <h3 className="case-card__title">{study.title}</h3>
        <p className="case-card__challenge">{study.problem}</p>
        <div className="case-card__solution">
          <h4 className="case-card__solution-title">Solution</h4>
          <p className="case-card__solution-text">{study.solution}</p>
        </div>
        <div className="case-card__metrics">
          {study.metrics.map((metric, i) => (
            <div className="case-card__metric" key={i}>
              <span className="case-card__metric-value">{metric.value}</span>
              <span className="case-card__metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
        {study.cta && (
          <a className="case-card__cta btn btn--secondary" href={study.cta.href}>{study.cta.label}</a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section section--projects" id="projects">
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
          <span className="badge">{projects.badge}</span>
          <h2 className="section-header__title">{projects.headline}</h2>
          {projects.description && <p className="section-header__subtitle">{projects.description}</p>}
        </div>
        <div className="cases-grid">
          {projects.items.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
