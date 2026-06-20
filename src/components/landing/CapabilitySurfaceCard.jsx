import React from 'react';

function CapabilitySurfaceCard({ scene, reversed = false }) {
  return (
    <article
      className={`landing-workflow-stage${reversed ? ' landing-workflow-stage--reverse' : ''}`}
      style={{
        '--scene-accent': scene.accent,
        '--scene-glow': scene.glow,
        '--scene-surface': scene.surface,
        '--scene-surface-strong': scene.surfaceStrong,
        '--scene-surface-alt': scene.surfaceAlt,
      }}
    >
      <div className="landing-workflow-copy">
        <p className="landing-card-index">Scene {scene.index}</p>
        <h3>{scene.title}</h3>
        <p>{scene.description}</p>
        <p className="landing-workflow-proof">{scene.proof}</p>
        <div className="landing-workflow-chips" aria-label={`${scene.title} proof points`}>
          {scene.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
        <p className="landing-workflow-note">
          <strong>{scene.control}.</strong> {scene.modelNote}
        </p>
      </div>

      <figure className="landing-capability-surface" aria-label={`${scene.title} workflow example`}>
        <div className="landing-capability-surface__hero">
          <p className="landing-panel-label">{scene.heroArtifact.eyebrow}</p>
          <h4>{scene.heroArtifact.title}</h4>
          <p>{scene.heroArtifact.body}</p>
          <div className="landing-capability-surface__meta">
            {scene.heroArtifact.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="landing-capability-surface__fragments" aria-hidden="true">
          {scene.supportingFragments.map((fragment) => (
            <div key={fragment.label} className="landing-capability-surface__fragment">
              <span>{fragment.label}</span>
              <strong>{fragment.detail}</strong>
            </div>
          ))}
        </div>
      </figure>
    </article>
  );
}

export default CapabilitySurfaceCard;
