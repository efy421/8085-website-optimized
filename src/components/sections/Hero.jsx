import landingContent from '../../data/landingContent';

const { hero } = landingContent;

function renderHeadline(text, emphasis) {
  if (!emphasis || emphasis.length === 0) return text;
  const words = text.split(' ');
  let key = 0;
  return words.map((word, i) => {
    const isEmphasis = emphasis.some(e => word.includes(e));
    return (
      <span key={key++} className="hero__word" style={{ '--word-delay': `${i * 0.04}s` }}>
        {isEmphasis ? <em className="hero__headline-glitch">{word}</em> : word}
      </span>
    );
  });
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content reveal">
            <span className="badge hero__badge">{hero.badge}</span>
            <h1 className="hero__headline">
              {renderHeadline(hero.headline, hero.headlineEmphasis)}
            </h1>
            <p className="hero__subheadline">{hero.subheadline}</p>
            <div className="hero__signals">
              {hero.signals.map((signal, i) => (
                <div className="hero__signal-point" key={i}>
                  <span className="hero__signal-dot" aria-hidden="true" />
                  <span className="hero__signal-text">{signal}</span>
                </div>
              ))}
            </div>
            <div className="hero__actions">
              <a className="btn btn--primary" href={hero.primaryCTA.href}>
                {hero.primaryCTA.label}
              </a>
              <a className="btn btn--secondary" href={hero.secondaryCTA.href}>
                {hero.secondaryCTA.label}
              </a>
            </div>
            <div className="hero__proof-rail">
              {hero.trustRow.metrics.map((metric, i) => (
                <div className="hero__proof-card" key={i}>
                  <span className="hero__proof-value">{metric.value}</span>
                  <span className="hero__proof-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
