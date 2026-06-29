import landingContent from '../../data/landingContent';

const { security } = landingContent;

const iconMap = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'check-circle': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
};

const complianceBadges = [
  { label: 'SOC 2', desc: 'Ready' },
  { label: 'GDPR', desc: 'Compliant' },
  { label: 'ISO 27001', desc: 'Aligned' },
  { label: 'E2E Encrypted', desc: 'In Transit' },
];

function SecurityCard({ item, index }) {
  return (
    <div className="card reveal" style={{ '--card-index': index }} role="listitem" tabIndex={0}>
      <div className="card__icon">{iconMap[item.icon]}</div>
      <h3 className="card__title">{item.title}</h3>
      <p className="card__desc">{item.description}</p>
    </div>
  );
}

export default function Security() {
  return (
    <section className="section section--alt" id="security" aria-label="Security and compliance">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{security.badge}</span>
          <h2 className="section-header__title">{security.headline}</h2>
          {security.description && <p className="section-header__subtitle">{security.description}</p>}
        </div>
        <div className="security__badges reveal" role="list" aria-label="Compliance certifications">
          {complianceBadges.map((badge) => (
            <div className="security__badge" key={badge.label} role="listitem">
              <span className="security__badge-name">{badge.label}</span>
              <span className="security__badge-desc">{badge.desc}</span>
            </div>
          ))}
        </div>
        <div className="card-grid card-grid--3" role="list">
          {security.items.map((item, i) => (
            <SecurityCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
