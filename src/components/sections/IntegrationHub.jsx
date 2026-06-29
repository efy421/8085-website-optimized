import landingContent from '../../data/landingContent';

const { integrationHub } = landingContent;

export default function IntegrationHub() {
  return (
    <section className="section" id="integrations" aria-label="Technology integrations">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{integrationHub.badge}</span>
          <h2 className="section-header__title" id="integration-title">{integrationHub.headline}</h2>
          {integrationHub.description && <p className="section-header__subtitle">{integrationHub.description}</p>}
        </div>
        <div className="integration-grid reveal" role="list">
          {integrationHub.items.map((item, i) => (
            <div className="integration-card reveal" key={item.name} role="listitem" tabIndex={0} style={{ '--card-index': i }}>
              <div className="integration-card__icon">
                <img src={item.light} alt={`${item.name} logo`} loading="lazy" />
              </div>
              <span className="integration-card__label">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
