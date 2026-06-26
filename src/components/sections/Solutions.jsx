import landingContent from '../../data/landingContent';

const { solutions } = landingContent;

function SolutionVisual({ index }) {
  return (
    <div className="solution-visual">
      {index === 0 && (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="solution-visual__svg">
          <rect x="10" y="20" width="80" height="50" rx="6" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
          <text x="28" y="50" fontSize="9" fill="currentColor" opacity="0.4">Manual</text>
          <path d="M90 35 L120 35 L120 55 L140 55" stroke="currentColor" strokeWidth="1" opacity="0.2" markerEnd="url(#arrow-s1)" />
          <rect x="142" y="30" width="70" height="50" rx="6" stroke="#c3642b" strokeWidth="1.2" opacity="0.6" />
          <text x="148" y="60" fontSize="9" fill="#c3642b" opacity="0.7">Automated</text>
          <path d="M50 70 L50 100" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3" />
          <rect x="20" y="105" width="60" height="30" rx="4" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
          <text x="35" y="124" fontSize="8" fill="currentColor" opacity="0.3">Hours</text>
          <rect x="142" y="105" width="60" height="30" rx="4" stroke="#c3642b" strokeWidth="0.8" opacity="0.4" />
          <text x="157" y="124" fontSize="8" fill="#c3642b" opacity="0.5">Minutes</text>
          <path d="M20 155 Q70 130 120 155 Q170 180 220 155" stroke="#c3642b" strokeWidth="1.5" opacity="0.3" fill="none" />
          <circle cx="220" cy="155" r="3" fill="#c3642b" opacity="0.4" />
          <path d="M10 180 L260 180" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 4" />
        </svg>
      )}
      {index === 1 && (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="solution-visual__svg">
          <rect x="10" y="10" width="50" height="30" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          <text x="17" y="30" fontSize="8" fill="currentColor" opacity="0.35">CRM</text>
          <rect x="10" y="48" width="50" height="30" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          <text x="12" y="68" fontSize="8" fill="currentColor" opacity="0.35">Email</text>
          <rect x="10" y="86" width="50" height="30" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          <text x="8" y="106" fontSize="8" fill="currentColor" opacity="0.35">Sheets</text>
          <rect x="10" y="124" width="50" height="30" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          <text x="14" y="144" fontSize="8" fill="currentColor" opacity="0.35">ERP</text>
          <path d="M60 25 L90 25 L90 100 L120 100" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M60 63 L90 63 L90 100" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M60 101 L90 101 L90 100" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M60 139 L90 139 L90 100" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <rect x="122" y="75" width="70" height="50" rx="8" stroke="#c3642b" strokeWidth="1.2" opacity="0.5" fill="rgba(195,100,43,0.03)" />
          <text x="130" y="102" fontSize="9" fill="#c3642b" opacity="0.7">Dashboard</text>
          <circle cx="142" cy="130" r="2" fill="#c3642b" opacity="0.3" />
          <circle cx="160" cy="130" r="2" fill="#c3642b" opacity="0.3" />
          <circle cx="178" cy="130" r="2" fill="#c3642b" opacity="0.3" />
          <path d="M10 170 L270 170" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 4" />
        </svg>
      )}
      {index === 2 && (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="solution-visual__svg">
          <rect x="30" y="120" width="30" height="40" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="rgba(195,100,43,0.02)" />
          <rect x="70" y="100" width="30" height="60" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.25" fill="rgba(195,100,43,0.03)" />
          <rect x="110" y="75" width="30" height="85" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="rgba(195,100,43,0.04)" />
          <rect x="150" y="55" width="30" height="105" rx="3" stroke="#c3642b" strokeWidth="1.2" opacity="0.5" fill="rgba(195,100,43,0.06)" />
          <rect x="190" y="30" width="30" height="130" rx="3" stroke="#c3642b" strokeWidth="1.5" opacity="0.7" fill="rgba(195,100,43,0.08)" />
          <path d="M35 118 Q55 90 85 98 Q110 60 125 73 Q145 40 165 53 Q180 20 205 28" stroke="#c3642b" strokeWidth="2" opacity="0.4" fill="none" />
          <circle cx="205" cy="28" r="3" fill="#c3642b" opacity="0.6" />
          <text x="31" y="150" fontSize="7" fill="currentColor" opacity="0.3">Q1</text>
          <text x="71" y="150" fontSize="7" fill="currentColor" opacity="0.3">Q2</text>
          <text x="109" y="150" fontSize="7" fill="currentColor" opacity="0.3">Q3</text>
          <text x="149" y="150" fontSize="7" fill="currentColor" opacity="0.3">Q4</text>
          <text x="189" y="150" fontSize="7" fill="currentColor" opacity="0.3">Q5</text>
          <path d="M10 175 L270 175" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 4" />
        </svg>
      )}
      {index === 3 && (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="solution-visual__svg">
          <circle cx="80" cy="50" r="16" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <text x="68" y="54" fontSize="9" fill="currentColor" opacity="0.3">Doc</text>
          <line x1="92" y1="60" x2="130" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3" />
          <circle cx="150" cy="90" r="16" stroke="#c3642b" strokeWidth="1.2" opacity="0.5" />
          <text x="136" y="94" fontSize="9" fill="#c3642b" opacity="0.5">Wiki</text>
          <line x1="134" y1="96" x2="100" y2="130" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3" />
          <circle cx="80" cy="146" r="16" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <text x="68" y="150" fontSize="9" fill="currentColor" opacity="0.3">SOP</text>
          <line x1="96" y1="146" x2="150" y2="130" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3" />
          <circle cx="168" cy="140" r="10" stroke="#c3642b" strokeWidth="1" opacity="0.35" />
          <text x="161" y="144" fontSize="7" fill="#c3642b" opacity="0.4">KB</text>
          <circle cx="195" cy="60" r="10" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <text x="186" y="64" fontSize="7" fill="currentColor" opacity="0.3">Run</text>
          <line x1="166" y1="80" x2="188" y2="64" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3" />
          <line x1="160" y1="95" x2="190" y2="65" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3" />
          <line x1="96" y1="50" x2="140" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3" />
          <path d="M10 185 L270 185" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 4" />
        </svg>
      )}
    </div>
  );
}

function SolutionRow({ item, index }) {
  return (
    <div className="solution-row">
      <div className="solution-row__text">
        <div className="solution-row__problem">
          <span className="solution-row__label">Problem</span>
          <p className="solution-row__problem-text">{item.problem}</p>
        </div>
        <div className="solution-row__answer">
          <div className="agentic-card__icon-wrap solution-row__icon">
            <div className="agentic-card__icon-ring" aria-hidden="true" />
            <div className="agentic-card__icon-pulse" aria-hidden="true" />
            <div className="agentic-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
          </div>
          <div className="solution-row__answer-text">
            <h3 className="solution-row__title">{item.title}</h3>
            <p className="solution-row__desc">{item.description}</p>
          </div>
        </div>
        <div className="solution-row__outcome">
          <span className="solution-row__outcome-label">Outcome</span>
          <p className="solution-row__outcome-text">{item.outcome}</p>
        </div>
      </div>
      <div className="solution-row__visual-wrap">
        <SolutionVisual index={index} />
      </div>
    </div>
  );
}

export default function Solutions() {
  const { items } = solutions;

  return (
    <section className="section section--solutions" id="solutions">
      <div className="section__grid-bg" aria-hidden="true" />
      <div className="section__signal-current" aria-hidden="true">
        <div className="section__signal-wash" />
      </div>
      <div className="section__data-flow" aria-hidden="true">
        <div className="section__data-flow-line" />
        <div className="section__data-flow-line" />
        <div className="section__data-flow-line" />
      </div>
      <div className="section__signal-dots" aria-hidden="true">
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
        <div className="section__signal-dot" />
      </div>
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{solutions.badge}</span>
          <h2 className="section-header__title">{solutions.headline}</h2>
          {solutions.description && <p className="section-header__subtitle">{solutions.description}</p>}
        </div>
        <div className="solution-rows">
          {items.map((item, i) => (
            <SolutionRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
