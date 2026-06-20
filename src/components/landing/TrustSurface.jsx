import React from 'react';

function TrustSurface({ surface }) {
  return (
    <div className="landing-trust-surface">
      <figure className="landing-trust-surface__lead" aria-label={surface.ariaLabel}>
        <p className="landing-callout-label">{surface.lead.eyebrow}</p>
        <h3>{surface.lead.title}</h3>

        <ul className="landing-premium-bullet-list" aria-label={`${surface.lead.title} details`}>
          {surface.lead.bullets.map((bullet) => (
            <li key={bullet.title} className="landing-premium-bullet-item">
              <span className="landing-premium-bullet-dot" aria-hidden="true" />
              <div className="landing-premium-bullet-copy">
                <p className="landing-premium-bullet-kicker">{bullet.title}</p>
                <p className="landing-premium-bullet-text">{bullet.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="landing-trust-surface__badges" aria-label="Trust indicators">
          {surface.lead.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </figure>

      <section className="landing-trust-surface__stack" aria-label={surface.stackTitle}>
        <div className="landing-trust-surface__stack-heading">
          <p className="landing-panel-label">{surface.stackTitle}</p>
          <p>{surface.stackBody}</p>
        </div>

        <div className="landing-trust-surface__rails">
          {surface.rails.map((rail) => (
            <article
              key={rail.id}
              className={`landing-trust-surface__rail landing-trust-surface__rail--${rail.tone}`}
            >
              <span>{rail.label}</span>
              <strong>{rail.body}</strong>
            </article>
          ))}
        </div>
      </section>

      <article className="landing-trust-surface__ownership">
        <div>
          <p className="landing-callout-label">{surface.ownership.label}</p>
          <strong>{surface.ownership.title}</strong>
        </div>
        <p>{surface.ownership.body}</p>
      </article>
    </div>
  );
}

export default TrustSurface;
