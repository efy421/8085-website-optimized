import landingContent from '../../data/landingContent';

const { cta } = landingContent;

export default function CTA() {
  return (
    <section className="cta" id="contact" aria-label="Call to action">
      <div className="cta__bg" aria-hidden="true">
        <div className="cta__orb cta__orb--1" />
        <div className="cta__orb cta__orb--2" />
        <div className="cta__orb cta__orb--3" />
      </div>
      <div className="container">
        <div className="cta__content reveal">
          <h2 className="cta__headline">{cta.headline}</h2>
          <p className="cta__description">{cta.description}</p>
          <div className="cta__actions">
            <a className="btn btn--primary" href={cta.primaryCTA.href}>
              {cta.primaryCTA.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
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
