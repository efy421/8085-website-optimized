import { useEffect, useRef, useState } from 'react';
import landingContent from '../../data/landingContent';

const { solutions } = landingContent;

function SolutionBlock({ item }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      className={`solutions__block reveal ${isVisible ? 'solutions__block--visible' : ''}`}
      ref={ref}
    >
      <div className="solutions__block-problem">
        <span className="solutions__block-label solutions__block-label--problem">Problem</span>
        <p>{item.problem}</p>
      </div>
      <div className="solutions__block-solution">
        <span className="solutions__block-label solutions__block-label--solution">Solution</span>
        <p>{item.solution}</p>
      </div>
      <div className="solutions__block-outcome">
        <span className="solutions__block-label solutions__block-label--outcome">Outcome</span>
        <p>{item.outcome}</p>
      </div>
    </article>
  );
}

export default function Solutions() {
  return (
    <section className="solutions" id="solutions">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{solutions.badge}</span>
          <h2 className="section-header__headline">{solutions.headline}</h2>
        </div>
        <div className="solutions__list">
          {solutions.items.map((item) => (
            <SolutionBlock key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
