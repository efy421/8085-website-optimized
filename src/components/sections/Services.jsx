import landingContent from '../../data/landingContent';

const { services } = landingContent;

function ServiceCard({ item, index }) {
  return (
    <div
      className="card reveal"
      style={{ '--card-index': index }}
      role="listitem"
      tabIndex={0}
      aria-labelledby={`sv-title-${item.id}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      <h3 className="card__title" id={`sv-title-${item.id}`}>{item.title}</h3>
      <p className="card__desc">{item.description}</p>
      {item.outcome && (
        <div className="card__outcome">
          <span className="card__outcome-label">Outcome</span>
          <span className="card__outcome-text">{item.outcome}</span>
        </div>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{services.badge}</span>
          <h2 className="section-header__title" id="services-heading">{services.headline}</h2>
          {services.description && <p className="section-header__subtitle">{services.description}</p>}
        </div>
        <div className="card-grid card-grid--3" role="list">
          {services.items.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
