import landingContent from '../../data/landingContent';

const { howWeWork } = landingContent;

function TimelineStep({ step, index }) {
  return (
    <div className={`timeline-step timeline-step--${index % 2 === 0 ? 'left' : 'right'} reveal`}>
      <div className="timeline-step__node" aria-hidden="true">
        <div className="timeline-step__node-dot" />
        <div className="timeline-step__node-ring" />
        <div className="timeline-step__node-pulse" />
      </div>
      <div className="timeline-step__card">
        <div className="timeline-step__number" aria-hidden="true">
          {step.number || String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="timeline-step__title">{step.title}</h3>
        <p className="timeline-step__desc">{step.description}</p>
        <div className="timeline-step__signal" aria-hidden="true">
          <svg viewBox="0 0 120 4" fill="none">
            <line x1="0" y1="2" x2="120" y2="2" stroke="rgba(195,100,43,0.3)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function HowWeWork() {
  return (
    <section className="section section--how-we-work" id="how-we-work">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="section__signal-current" aria-hidden="true">
        <div className="section__signal-wash" />
      </div>
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{howWeWork.badge}</span>
          <h2 className="section-header__title">{howWeWork.headline}</h2>
        </div>
        <div className="timeline">
          <div className="timeline__track" aria-hidden="true">
            <div className="timeline__track-line" />
            <div className="timeline__track-glow" />
          </div>
          {howWeWork.steps.map((step, i) => (
            <TimelineStep key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
