import landingContent from '../../data/landingContent';
import TiltCard from '../landing/TiltCard';
import useSpotlight from '../../hooks/useSpotlight';

const { services } = landingContent;

const serviceIcons = [
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  <svg key="zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="trending" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  <svg key="mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  <svg key="tools" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
];

function ServiceCard({ item, index }) {
  const spotlightRef = useSpotlight();

  return (
    <div ref={spotlightRef} style={{ position: 'relative' }}>
      <TiltCard className="services__card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
        <div className="services__card-icon" aria-hidden="true">
          {serviceIcons[index]}
        </div>
        <h3 className="services__card-title">{item.title}</h3>
        <p className="services__card-description">{item.description}</p>
        <p className="services__card-outcome">{item.outcome}</p>
      </TiltCard>
    </div>
  );
}

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
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
