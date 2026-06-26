import { useRef, useCallback } from 'react';
import landingContent from '../../data/landingContent';

const { services } = landingContent;

const serviceIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" /></svg>,
];

function ServiceCard({ item, index }) {
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
      className="agentic-card service-card reveal"
      style={{ '--card-index': index }}
      onMouseMove={handleMouseMove}
    >
      <div className="agentic-card__spotlight" aria-hidden="true" />
      <div className="agentic-card__signal-top" aria-hidden="true" />
      <div className="agentic-card__signal-bottom" aria-hidden="true" />
      <div className="agentic-card__icon-wrap">
        <div className="agentic-card__icon-ring" aria-hidden="true" />
        <div className="agentic-card__icon-pulse" aria-hidden="true" />
        <div className="agentic-card__icon">{serviceIcons[index % serviceIcons.length]}</div>
      </div>
      <h3 className="service-card__title">{item.title}</h3>
      <p className="service-card__desc">{item.description}</p>
      {item.outcome && (
        <div className="service-card__outcome">
          <span className="service-card__outcome-label">Outcome</span>
          <span className="service-card__outcome-text">{item.outcome}</span>
        </div>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <section className="section section--services" id="services">
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
          <span className="badge">{services.badge}</span>
          <h2 className="section-header__title">{services.headline}</h2>
          {services.description && <p className="section-header__subtitle">{services.description}</p>}
        </div>
        <div className="services-grid">
          {services.items.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
