import landingContent from '../../data/landingContent';
import usePopIn from '../../hooks/usePopIn';

const { trust } = landingContent;

function PopInMetric({ value, label, delay = 0 }) {
  const { ref, isVisible } = usePopIn();

  return (
    <div
      className={`trust__metric ${isVisible ? 'trust__metric--visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="trust__metric-glow" aria-hidden="true" />
      <span className="trust__metric-value">{value}</span>
      <span className="trust__metric-label">{label}</span>
    </div>
  );
}

export default function Trust() {
  return (
    <section className="trust" id="trust">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{trust.badge}</span>
          <h2 className="section-header__headline">{trust.headline}</h2>
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
            <article className="trust__testimonial reveal" key={testimonial.id}>
              <blockquote className="trust__testimonial-quote">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="trust__testimonial-author">
                <span className="trust__testimonial-name">{testimonial.author}</span>
                <span className="trust__testimonial-company">{testimonial.company}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="trust__metrics">
          {trust.metrics.map((metric, i) => (
            <PopInMetric
              key={i}
              value={metric.value}
              label={metric.label}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
