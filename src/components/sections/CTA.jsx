import landingContent from '../../data/landingContent';

const { cta } = landingContent;

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta__content reveal">
          <h2 className="cta__headline">{cta.headline}</h2>
          <p className="cta__description">{cta.description}</p>
          <div className="cta__actions">
            <a className="btn btn--primary" href={cta.primaryCTA.href}>
              {cta.primaryCTA.label}
            </a>
            <a className="btn btn--secondary" href={cta.secondaryCTA.href}>
              {cta.secondaryCTA.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
