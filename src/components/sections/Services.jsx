import landingContent from '../../data/landingContent';

const { services } = landingContent;

const serviceIcons = ['⚡', '🔄', '📋', '🔗', '🛡️', '📈'];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{services.badge}</span>
          <h2 className="section-header__headline">{services.headline}</h2>
        </div>
        <div className="services__grid">
          {services.items.map((item, i) => (
            <article className="services__card reveal" key={item.id} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="services__card-icon" aria-hidden="true">
                {serviceIcons[i]}
              </div>
              <h3 className="services__card-title">{item.title}</h3>
              <p className="services__card-description">{item.description}</p>
              <p className="services__card-outcome">{item.outcome}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
