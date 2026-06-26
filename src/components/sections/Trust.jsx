import { useRef, useCallback } from 'react';
import landingContent from '../../data/landingContent';
import useCountUp from '../../hooks/useCountUp';

const { trust } = landingContent;

function MetricCard({ metric, index }) {
  const cardRef = useRef(null);
  const numericMatch = metric.value.match(/^(\d+)/);
  const numericTarget = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? metric.value.slice(numericMatch[1].length) : '';
  const { ref, count } = useCountUp(numericTarget, 1200);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={(el) => { cardRef.current = el; if (ref) ref.current = el; }}
      className="agentic-card trust__metric-card reveal"
      style={{ '--metric-index': index }}
      onMouseMove={handleMouseMove}
    >
      <div className="agentic-card__spotlight" aria-hidden="true" />
      <div className="agentic-card__signal-top" aria-hidden="true" />
      <span className="trust__metric-value">
        {numericTarget > 0 ? `${count}${suffix}` : metric.value}
      </span>
      <span className="trust__metric-label">{metric.label}</span>
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <article
      ref={cardRef}
      className="agentic-card trust__testimonial reveal"
      onMouseMove={handleMouseMove}
    >
      <div className="agentic-card__spotlight" aria-hidden="true" />
      <div className="agentic-card__signal-top" aria-hidden="true" />
      <blockquote className="trust__testimonial-quote">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="trust__testimonial-author">
        <span className="trust__testimonial-name">{testimonial.author}</span>
        <span className="trust__testimonial-company">{testimonial.company}</span>
      </div>
    </article>
  );
}

export default function Trust() {
  return (
    <section className="section section--trust" id="trust">
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
          <span className="badge">{trust.badge}</span>
          <h2 className="section-header__headline">{trust.headline}</h2>
          {trust.description && <p className="section-header__subtitle">{trust.description}</p>}
        </div>

        {trust.logos.length > 0 && (
          <div className="trust__logos reveal" aria-label="Trusted company logos">
            {trust.logos.map((logo) => (
              <div className="trust__logo" key={logo.name}>
                <img src={logo.src} alt={`${logo.name} logo`} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="trust__testimonials">
          {trust.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="trust__metrics">
          {trust.metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
