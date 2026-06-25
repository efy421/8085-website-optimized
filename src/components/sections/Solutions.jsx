import { useEffect, useState } from 'react';
import landingContent from '../../data/landingContent';

const { solutions } = landingContent;

function SolutionCard({ item, index, isVisible }) {
  return (
    <div
      className={`solution-card ${isVisible ? 'solution-card--visible' : ''}`}
      style={{
        '--card-delay': `${index * 0.15}s`,
        '--connector-delay': `${index * 0.15 + 0.3}s`,
      }}
    >
      <div className="solution-card__connector" aria-hidden="true">
        <div className="solution-card__connector-line" />
        <div className="solution-card__connector-dot" />
      </div>
      <div className="solution-card__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      </div>
      <h3 className="solution-card__title">{item.solution}</h3>
      <p className="solution-card__desc">{item.outcome}</p>
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
      { threshold: 0.2 }
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
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{solutions.badge}</span>
          <h2 className="section-header__title">{solutions.headline}</h2>
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
