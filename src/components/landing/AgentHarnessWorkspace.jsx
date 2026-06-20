import React from 'react';

function AgentHarnessWorkspace({ surface }) {
  const releaseRail = surface.rails.find((rail) => rail.id === 'approval');
  const stackRails = surface.rails.filter((rail) => rail.id !== 'approval');

  return (
    <figure className="landing-harness-workspace" aria-label={surface.ariaLabel}>
      <div className="landing-harness-workspace__shell">
        <article className="landing-harness-workspace__desk">
          <p className="landing-panel-label">{surface.eyebrow}</p>
          <h4>{surface.title}</h4>

          <ul className="landing-premium-bullet-list" aria-label={`${surface.title} details`}>
            {surface.bodyPoints.map((point) => (
              <li key={point.title} className="landing-premium-bullet-item">
                <span className="landing-premium-bullet-dot" aria-hidden="true" />
                <div className="landing-premium-bullet-copy">
                  <p className="landing-premium-bullet-kicker">{point.title}</p>
                  <p className="landing-premium-bullet-text">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="landing-harness-workspace__badges" aria-label="Harness indicators">
            {surface.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </article>

        <section className="landing-harness-workspace__stack" aria-label={surface.stackTitle}>
          <div className="landing-harness-workspace__stack-heading">
            <p className="landing-panel-label">{surface.stackTitle}</p>
            <p>{surface.stackBody}</p>
          </div>

          <div className="landing-harness-workspace__rails">
            {stackRails.map((rail) => (
              <article
                key={rail.id}
                className={`landing-harness-workspace__rail landing-harness-workspace__rail--${rail.tone}`}
              >
                <span>{rail.label}</span>
                <strong>{rail.body}</strong>
              </article>
            ))}
          </div>
        </section>

        {releaseRail ? (
          <article
            className={`landing-harness-workspace__boundary landing-harness-workspace__boundary--${releaseRail.tone}`}
          >
            <span>{releaseRail.label}</span>
            <strong>{releaseRail.body}</strong>
          </article>
        ) : null}
      </div>
    </figure>
  );
}

export default AgentHarnessWorkspace;
