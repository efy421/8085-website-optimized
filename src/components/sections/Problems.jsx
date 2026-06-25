import { useRef, useCallback } from 'react';
import landingContent from '../../data/landingContent';

const { problems } = landingContent;

const icons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>,
];

function ChallengeCard({ item, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      className="agentic-card challenge-card reveal"
      style={{ '--card-index': index }}
      onMouseMove={handleMouseMove}
    >
      <div className="agentic-card__spotlight" aria-hidden="true" />
      <div className="agentic-card__signal-top" aria-hidden="true" />
      <div className="agentic-card__signal-bottom" aria-hidden="true" />
      <div className="challenge-card__header">
        <div className="agentic-card__icon-wrap">
          <div className="agentic-card__icon-ring" aria-hidden="true" />
          <div className="agentic-card__icon-pulse" aria-hidden="true" />
          <div className="agentic-card__icon">{icons[index % icons.length]}</div>
        </div>
        <span className="challenge-card__number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="challenge-card__title">{item.title}</h3>
      <p className="challenge-card__desc">{item.description}</p>
    </div>
  );
}

export default function Problems() {
  return (
    <section className="section section--challenges" id="challenges">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="section__signal-current" aria-hidden="true">
        <div className="section__signal-wash" />
      </div>
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{problems.badge}</span>
          <h2 className="section-header__title">{problems.headline}</h2>
          {problems.description && <p className="section-header__subtitle">{problems.description}</p>}
        </div>
        <div className="challenge-grid">
          {problems.items.map((item, i) => (
            <ChallengeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
