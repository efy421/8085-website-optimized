import landingContent from '../../data/landingContent';

const { projects } = landingContent;

export default function Projects() {
  const hasItems = projects.items.length > 0;

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{projects.badge}</span>
          <h2 className="section-header__headline">{projects.headline}</h2>
        </div>

        {hasItems ? (
          <div className="projects__list">
            {projects.items.map((project, i) => (
              <article
                className={`projects__item reveal ${i % 2 === 1 ? 'projects__item--reversed' : ''}`}
                key={project.id}
              >
                <div className="projects__item-content">
                  <div className="projects__item-header">
                    <span className="badge badge--industry">{project.industry}</span>
                    <span className="projects__item-client">{project.client}</span>
                  </div>
                  <h3 className="projects__item-title">{project.title}</h3>
                  <div className="projects__item-details">
                    <div className="projects__item-detail">
                      <span className="projects__item-label">Problem</span>
                      <p>{project.problem}</p>
                    </div>
                    <div className="projects__item-detail">
                      <span className="projects__item-label">Solution</span>
                      <p>{project.solution}</p>
                    </div>
                    <div className="projects__item-detail">
                      <span className="projects__item-label">Outcome</span>
                      <p>{project.outcome}</p>
                    </div>
                  </div>
                  <div className="projects__item-metrics">
                    {project.metrics.map((metric, j) => (
                      <div className="projects__item-metric" key={j}>
                        <span className="projects__item-metric-value">{metric.value}</span>
                        <span className="projects__item-metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  <a className="btn btn--secondary btn--small" href={project.cta.href}>
                    {project.cta.label}
                  </a>
                </div>
                <div className="projects__item-visual">
                  <div
                    className="projects__item-image"
                    style={{ backgroundColor: project.imageColor }}
                    aria-hidden="true"
                  >
                    <span className="projects__item-image-label">{project.client}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="projects__placeholder reveal">
            <div className="projects__placeholder-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="projects__placeholder-title">Case studies coming soon</h3>
            <p className="projects__placeholder-text">We&apos;re building our portfolio of client success stories.</p>
          </div>
        )}
      </div>
    </section>
  );
}
