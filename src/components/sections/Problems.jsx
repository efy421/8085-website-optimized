import landingContent from '../../data/landingContent';

const { problems } = landingContent;

function ChallengeCard({ item, index }) {
  return (
    <div className="challenge-card reveal" style={{ '--card-index': index }}>
      <div className="challenge-card__signal-line" aria-hidden="true" />
      <div className="challenge-card__number">{String(index + 1).padStart(2, '0')}</div>
      <div className="challenge-card__icon" aria-hidden="true">
        <div className="challenge-card__icon-ring" />
        <div className="challenge-card__icon-pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <h3 className="challenge-card__title">{item.title}</h3>
      <p className="challenge-card__desc">{item.description}</p>
    </div>
  );
}

export default function Problems() {
  return (
    <section className="section section--challenges" id="challenges">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="section__signal-current" aria-hidden="true">
        <div className="section__signal-wash" />
      </div>
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{problems.badge}</span>
          <h2 className="section-header__title">{problems.headline}</h2>
        </div>
        <div className="challenge-grid">
          {problems.items.map((item, i) => (
            <ChallengeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
