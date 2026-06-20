import React from 'react';

function ContactCommandSurface({
  surface,
  headingId,
  founderHref,
  onStartConversation,
}) {
  return (
    <div
      className="landing-shell landing-cta-card landing-cta-card--integrated landing-section-shell"
      aria-label={surface.ariaLabel}
    >
      <div className="landing-cta-copy">
        <p className="landing-eyebrow">{surface.eyebrow}</p>
        <h2 id={headingId}>{surface.title}</h2>
        <p>{surface.body}</p>

        <div className="landing-cta-signal-list" aria-label="Workflow review highlights">
          {surface.signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>

        <div className="landing-cta-actions">
          <a className="landing-founder-button" href={founderHref} target="_blank" rel="noreferrer">
            {surface.primaryActionLabel}
          </a>
          <button type="button" className="landing-secondary-button" onClick={onStartConversation}>
            {surface.secondaryActionLabel}
          </button>
          {surface.tertiaryActionLabel ? (
            <a className="landing-link-button" href={`mailto:ada@8085.ai?subject=8085%20Workflow%20Review`}>
              {surface.tertiaryActionLabel}
            </a>
          ) : null}
        </div>

        <ul className="landing-cta-notes">
          {surface.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      <aside className="landing-cta-ada-console">
        <div className="landing-ada-header">
          <div>
            <p className="landing-panel-label">{surface.panelEyebrow}</p>
            <h3>{surface.panelTitle}</h3>
          </div>
          <button
            type="button"
            className="landing-ada-status landing-ada-status--action"
            onClick={onStartConversation}
            aria-label={surface.statusActionLabel}
            title={surface.panelEyebrow}
          >
            <span className="landing-ada-status-dot" />
            <span aria-hidden="true">{surface.status}</span>
          </button>
        </div>

        <div className="landing-cta-ada-body">
          <div className="landing-ada-avatar-shell">
            <img src={`${import.meta.env.BASE_URL}images/contact-avatar-chloe.png`} alt="Ada AI assistant avatar" loading="lazy" />
          </div>
          <p>{surface.panelBody}</p>
        </div>

        <ol className="landing-cta-step-list">
          {surface.steps.map((step) => (
            <li key={step.id} className="landing-cta-step">
              <span className="landing-cta-step__index">{step.label}</span>
              <div className="landing-cta-step__copy">
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

export default ContactCommandSurface;
