import landingContent from '../../data/landingContent';

const { projects } = landingContent;

const overlayGradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #1a2e1a 0%, #1a3a1a 50%, #0d2818 100%)',
  'linear-gradient(135deg, #2e1a1a 0%, #3a1a1a 50%, #280d0d 100%)',
];

const patternStyles = [
  { '--pattern-opacity': '0.08', '--pattern-color': 'rgba(255,255,255,0.3)' },
  { '--pattern-opacity': '0.06', '--pattern-color': 'rgba(255,255,255,0.25)' },
  { '--pattern-opacity': '0.07', '--pattern-color': 'rgba(255,255,255,0.2)' },
];

function CaseCard({ study, index }) {
  return (
    <div className="case-card reveal" style={{ '--card-index': index }}>
      <div
        className="case-card__image"
        style={{
          background: overlayGradients[index % overlayGradients.length],
          '--pattern-opacity': patternStyles[index % patternStyles.length]['--pattern-opacity'],
          '--pattern-color': patternStyles[index % patternStyles.length]['--pattern-color'],
        }}
      >
        <div className="case-card__image-pattern" aria-hidden="true" />
        <div className="case-card__image-label">
          <span className="case-card__image-industry">{study.industry}</span>
          <span className="case-card__image-client">{study.client}</span>
        </div>
      </div>
      <div className="case-card__content">
        <h3 className="case-card__title">{study.title}</h3>
        <p className="case-card__challenge">{study.problem}</p>
        <div className="case-card__solution">
          <h4 className="case-card__solution-title">Solution</h4>
          <p className="case-card__solution-text">{study.solution}</p>
        </div>
        <div className="case-card__metrics">
          {study.metrics.map((metric, i) => (
            <div className="case-card__metric" key={i}>
              <span className="case-card__metric-value">{metric.value}</span>
              <span className="case-card__metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
        {study.cta && (
          <a className="case-card__cta btn btn--primary" href={study.cta.href} aria-label={`Read full case study: ${study.title}`}>{study.cta.label}</a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section section--alt" id="projects" aria-label="Case studies and projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{projects.badge}</span>
          <h2 className="section-header__title">{projects.headline}</h2>
          {projects.description && <p className="section-header__subtitle">{projects.description}</p>}
        </div>
        <div className="cases-grid">
          {projects.items.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
