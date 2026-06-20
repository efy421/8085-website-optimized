import React from 'react';

function ProofField({ surface }) {
  return (
    <figure className="landing-proof-field" aria-label={surface.ariaLabel}>
      <div className="landing-proof-field__lead">
        <div className="landing-proof-field__mast">
          <p className="landing-callout-label">{surface.lead.eyebrow}</p>
          <h3>{surface.lead.title}</h3>
          <p>{surface.lead.body}</p>
        </div>

        <ol className="landing-proof-field__rows" aria-label={`${surface.lead.eyebrow} details`}>
          {surface.lead.rows.map((row) => (
            <li key={row.id} className="landing-proof-field__row">
              <div className="landing-proof-field__row-copy">
                <p className="landing-proof-field__row-label">{row.label}</p>
                <p className="landing-proof-field__row-body">{row.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <aside className="landing-proof-field__evidence" aria-label={surface.evidence.eyebrow}>
        <div className="landing-proof-field__evidence-header">
          <p className="landing-panel-label">{surface.evidence.eyebrow}</p>
          <p>{surface.evidence.body}</p>
        </div>

        <div className="landing-proof-field__logos" aria-label="Selected partner logos">
          {surface.logos.map((logo) => (
            <div key={logo.alt} className="landing-proof-field__logo-tile">
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </aside>

      <div className="landing-proof-field__signal-strip">
        <p className="landing-panel-label">{surface.signalLabel}</p>
        <div className="landing-proof-field__signals" aria-label="Enterprise proof signals">
          {surface.signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </div>
    </figure>
  );
}

export default ProofField;
