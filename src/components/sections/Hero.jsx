import landingContent from '../../data/landingContent';

const { hero } = landingContent;

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content reveal">
            <span className="badge">{hero.badge}</span>
            <h1 className="hero__headline">{hero.headline}</h1>
            <p className="hero__subheadline">{hero.subheadline}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={hero.primaryCTA.href}>
                {hero.primaryCTA.label}
              </a>
              <a className="btn btn--secondary" href={hero.secondaryCTA.href}>
                {hero.secondaryCTA.label}
              </a>
            </div>
            <div className="hero__trust">
              {hero.trustRow.metrics.map((metric, i) => (
                <div className="hero__metric" key={i}>
                  <span className="hero__metric-value">{metric.value}</span>
                  <span className="hero__metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__orb" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
