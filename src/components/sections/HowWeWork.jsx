import { useEffect, useRef, useState } from 'react';
import landingContent from '../../data/landingContent';

const { howWeWork } = landingContent;

export default function HowWeWork() {
  const timelineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{howWeWork.badge}</span>
          <h2 className="section-header__headline">{howWeWork.headline}</h2>
        </div>
        <div className={`process__timeline ${isVisible ? 'process--visible' : ''}`} ref={timelineRef}>
          <div className="process__line" aria-hidden="true" />
          {howWeWork.steps.map((step, i) => (
            <article
              className="process__step reveal"
              key={step.id}
              style={{ transitionDelay: `${i * 0.15}s`, '--step-index': i }}
            >
              <div className="process__step-number" aria-hidden="true">
                {step.number}
              </div>
              <div className="process__step-content">
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-description">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
