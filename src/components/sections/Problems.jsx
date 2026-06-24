import landingContent from '../../data/landingContent';

const { problems } = landingContent;

const problemIcons = ['🔁', '👥', '🔧', '⏳', '📊', '🔒'];

export default function Problems() {
  return (
    <section className="problems" id="problems">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{problems.badge}</span>
          <h2 className="section-header__headline">{problems.headline}</h2>
          <p className="section-header__description">{problems.description}</p>
        </div>
        <div className="problems__grid">
          {problems.items.map((problem, i) => (
            <article className="problems__card reveal" key={problem.id} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="problems__card-icon" aria-hidden="true">
                {problemIcons[i]}
              </div>
              <h3 className="problems__card-title">{problem.title}</h3>
              <p className="problems__card-description">{problem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
