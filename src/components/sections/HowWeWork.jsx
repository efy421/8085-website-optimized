import { useState, useEffect, useRef, useCallback } from 'react';
import landingContent from '../../data/landingContent';

const { howWeWork } = landingContent;

function ProcessStep({ step, index, isVisible }) {
  return (
    <div
      className={`process-step ${isVisible ? 'process-step--visible' : ''}`}
      style={{ '--step-index': index, '--step-delay': `${index * 0.2}s` }}
    >
      <div className="process-step__connector" aria-hidden="true">
        <div className="process-step__connector-line" />
        <div className="process-step__connector-dot" />
      </div>
      <div className="process-step__card">
        <div className="process-step__card-glow" aria-hidden="true" />
        <div className="agentic-card__signal-top" aria-hidden="true" />
        <div className="process-step__number-wrap">
          <span className="process-step__number">{step.number || String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="process-step__title">{step.title}</h3>
        <p className="process-step__desc">{step.description}</p>
      </div>
    </div>
  );
}

export default function HowWeWork() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section section--how-we-work" id="how-we-work">
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
          <span className="badge">{howWeWork.badge}</span>
          <h2 className="section-header__title">{howWeWork.headline}</h2>
          {howWeWork.description && <p className="section-header__subtitle">{howWeWork.description}</p>}
        </div>
        <div className="process-flow">
          <div className="process-flow__track" aria-hidden="true">
            <div className={`process-flow__track-fill ${isVisible ? 'process-flow__track-fill--drawn' : ''}`} />
          </div>
          <div className="process-flow__track-glow" aria-hidden="true">
            <div className={`process-flow__track-glow-fill ${isVisible ? 'process-flow__track-glow-fill--drawn' : ''}`} />
          </div>
          {howWeWork.steps.map((step, i) => (
            <ProcessStep key={step.id} step={step} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
