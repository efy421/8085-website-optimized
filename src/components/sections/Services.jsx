import landingContent from '../../data/landingContent';

const { services } = landingContent;

function ServiceCard({ item, index }) {
  return (
    <div className="service-card reveal" style={{ '--card-index': index }}>
      <div className="service-card__signal-line" aria-hidden="true" />
      <div className="service-card__icon" aria-hidden="true">
        <div className="service-card__icon-ring" />
        <div className="service-card__icon-pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          <path d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      </div>
      <h3 className="service-card__title">{item.title}</h3>
      <p className="service-card__desc">{item.description}</p>
      {item.outcome && (
        <div className="service-card__outcome">
          <span className="service-card__outcome-label">Outcome</span>
          <span className="service-card__outcome-text">{item.outcome}</span>
        </div>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <section className="section section--services" id="services">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="section__signal-current" aria-hidden="true">
        <div className="section__signal-wash" />
      </div>
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{services.badge}</span>
          <h2 className="section-header__title">{services.headline}</h2>
        </div>
        <div className="services-grid">
          {services.items.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
