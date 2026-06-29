import { useState, useEffect, useRef } from 'react';
import landingContent from '../../data/landingContent';

const { howWeWork } = landingContent;

const icons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
];

function ProcessStep({ step, index, isVisible }) {
  return (
    <div
      className={`process-step ${isVisible ? 'process-step--visible' : ''}`}
      style={{ '--step-delay': `${index * 0.25}s` }}
      tabIndex={0}
    >
      <div className="process-step__header">
        <span className="process-step__number">{String(index + 1).padStart(2, '0')}</span>
        <div className="process-step__icon">
          {icons[index]}
        </div>
      </div>
      <h3 className="process-step__title">{step.title}</h3>
      <p className="process-step__desc">{step.description}</p>
    </div>
  );
}

export default function HowWeWork() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section section--alt" id="how-we-work" aria-label="Our process">
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'revealed' : ''}`}>
          <span className="badge">{howWeWork.badge}</span>
          <h2 className="section-header__title">{howWeWork.headline}</h2>
          {howWeWork.description && <p className="section-header__subtitle">{howWeWork.description}</p>}
        </div>
        <div className="process-timeline">
          <div
            ref={trackRef}
            className={`process-timeline__track ${isVisible ? 'process-timeline__track--active' : ''}`}
            aria-hidden="true"
          />
          {howWeWork.steps.map((step, i) => (
            <ProcessStep key={step.id} step={step} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
