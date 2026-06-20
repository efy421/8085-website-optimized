import React from 'react';

function DifferentiationPanel({ panel }) {
  return (
    <article className={`landing-differentiation-panel landing-differentiation-panel--${panel.tone}`}>
      <div className="landing-differentiation-panel__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="landing-callout-label">{panel.eyebrow}</p>
      <h3>{panel.title}</h3>
      <ul>
        {panel.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="landing-differentiation-panel__footer">{panel.footer}</p>
    </article>
  );
}

function DifferentiationSplitSurface({ surface }) {
  return (
    <div className="landing-differentiation-surface">
      <figure className="landing-differentiation-compare landing-differentiation-compare--triple" aria-label={surface.ariaLabel}>
        {surface.panels.map((panel) => (
          <DifferentiationPanel key={panel.id} panel={panel} />
        ))}
      </figure>

      <aside className="landing-differentiation-proof" aria-label={surface.summary.eyebrow}>
        <p className="landing-callout-label">{surface.summary.eyebrow}</p>
        <h3>{surface.summary.title}</h3>
        <p>{surface.summary.body}</p>
      </aside>
    </div>
  );
}

export default DifferentiationSplitSurface;
