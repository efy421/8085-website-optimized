import landingContent from '../../data/landingContent';
import useCountUp from '../../hooks/useCountUp';

const { trust } = landingContent;

function MetricCard({ metric, index }) {
  const numericMatch = metric.value.match(/^(\d+)/);
  const numericTarget = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? metric.value.slice(numericMatch[1].length) : '';
  const { ref, count } = useCountUp(numericTarget, 1200);

  return (
    <div
      ref={ref}
      className="trust__metric-card reveal"
    >
      <span className="trust__metric-value">
        {numericTarget > 0 ? `${count}${suffix}` : metric.value}
      </span>
      <span className="trust__metric-label">{metric.label}</span>
    </div>
  );
}

export default function Trust() {
  return (
    <section className="section" id="trust" aria-label="Trust indicators">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{trust.badge}</span>
          <h2 className="section-header__title">{trust.headline}</h2>
          {trust.description && <p className="section-header__subtitle">{trust.description}</p>}
        </div>

        {trust.logos.length > 0 && (
          <div className="trust__logos-wrapper reveal">
            <div className="trust__logos" aria-label="Trusted company logos">
              {trust.logos.map((logo) => (
                <div className="trust__logo" key={logo.name}>
                  <img src={logo.src} alt={`${logo.name} logo`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="trust__metrics reveal" role="group" aria-label="Key performance metrics">
          {trust.metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} />
          ))}
        </div>

        {trust.testimonials.length > 0 && (
          <div className="trust__testimonials" aria-label="Client testimonials">
            {trust.testimonials.slice(0, 3).map((testimonial) => (
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
        )}
      </div>
    </section>
  );
}
