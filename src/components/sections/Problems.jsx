import landingContent from '../../data/landingContent';

const { problems } = landingContent;

function ChallengeCard({ item, index }) {
  return (
    <div className="card card--accent reveal" style={{ '--card-index': index }}>
      <div className="card__header">
        <span className="card__number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="card__title">{item.title}</h3>
      <p className="card__desc">{item.description}</p>
    </div>
  );
}

export default function Problems() {
  return (
    <section className="section section--alt" id="challenges" aria-label="Common challenges">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{problems.badge}</span>
          <h2 className="section-header__title">{problems.headline}</h2>
          {problems.description && <p className="section-header__subtitle">{problems.description}</p>}
        </div>
        <div className="card-grid card-grid--3">
          {problems.items.map((item, i) => (
            <ChallengeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
