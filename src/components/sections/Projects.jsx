import landingContent from '../../data/landingContent';

const { projects } = landingContent;

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{projects.badge}</span>
          <h2 className="section-header__headline">{projects.headline}</h2>
        </div>
        <div className="projects__list">
          {projects.items.map((project, i) => (
            <article
              className={`projects__item reveal ${i % 2 === 1 ? 'projects__item--reversed' : ''}`}
              key={project.id}
            >
              <div className="projects__item-content">
                <span className="badge badge--industry">{project.industry}</span>
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
                <a className="btn btn--secondary" href={project.cta.href}>
                  {project.cta.label}
                </a>
              </div>
              <div className="projects__item-visual">
                <div className="projects__item-image" style={{ backgroundColor: project.imageColor }} aria-hidden="true">
                  <span className="projects__item-image-label">{project.industry}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
