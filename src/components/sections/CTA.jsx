import landingContent from '../../data/landingContent';

const { cta } = landingContent;

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="cta__evafloat" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}images/contact-avatar-chloe.png`} alt="" className="cta__evafloat-img" />
        <div className="cta__evafloat-ring" />
      </div>
      <div className="container">
        <div className="cta__content reveal">
          <h2 className="cta__headline">{cta.headline}</h2>
          <p className="cta__description">{cta.description}</p>
          <div className="cta__actions">
            <a className="btn btn--primary btn--glow" href={cta.primaryCTA.href}>
              {cta.primaryCTA.label}
            </a>
            <a className="btn btn--ghost" href={cta.secondaryCTA.href}>
              {cta.secondaryCTA.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
