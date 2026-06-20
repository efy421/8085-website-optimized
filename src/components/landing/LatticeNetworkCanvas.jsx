import React from 'react';

function LatticeNetworkCanvas({ surface }) {
  const routeLane = surface.lanes.find((lane) => lane.id === 'routing');
  const delegateLane = surface.lanes.find((lane) => lane.id === 'delegate');
  const memoryLane = surface.lanes.find((lane) => lane.id === 'memory');
  const approvalLane = surface.lanes.find((lane) => lane.id === 'approval');

  return (
    <figure className="landing-lattice-network" aria-label={surface.ariaLabel}>
      <div className="landing-lattice-network__field">
        <article className="landing-lattice-network__intake">
          <span>{surface.intake}</span>
          <strong>{surface.intakeTitle}</strong>
          <small>{surface.intakeNote}</small>
        </article>

        <section className="landing-lattice-network__group" aria-label={surface.workflowTitle}>
          <p className="landing-panel-label">{surface.workflowTitle}</p>
          <div className="landing-lattice-network__lane-stack">
            {[routeLane, delegateLane].filter(Boolean).map((lane) => (
              <article
                key={lane.id}
                className={`landing-lattice-network__lane landing-lattice-network__lane--${lane.id} landing-lattice-network__lane--${lane.tone}`}
              >
                <span>{lane.label}</span>
                <strong>{lane.title}</strong>
                <small>{lane.note}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-lattice-network__group" aria-label={surface.reviewTitle}>
          <p className="landing-panel-label">{surface.reviewTitle}</p>
          <div className="landing-lattice-network__lane-stack">
            {[memoryLane, approvalLane].filter(Boolean).map((lane) => (
              <article
                key={lane.id}
                className={`landing-lattice-network__lane landing-lattice-network__lane--${lane.id} landing-lattice-network__lane--${lane.tone}`}
              >
                <span>{lane.label}</span>
                <strong>{lane.title}</strong>
                <small>{lane.note}</small>
              </article>
            ))}
          </div>
        </section>

        <article className="landing-lattice-network__result">
          <span>{surface.result.label}</span>
          <strong>{surface.result.title}</strong>
          <small>{surface.result.note}</small>
        </article>
      </div>
    </figure>
  );
}

export default LatticeNetworkCanvas;
