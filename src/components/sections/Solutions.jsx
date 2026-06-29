import landingContent from '../../data/landingContent';

const { solutions } = landingContent;

function WorkflowDiagram() {
  return (
    <div className="workflow-diagram reveal" aria-hidden="true">
      <svg viewBox="0 0 900 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="workflow-diagram__svg" role="img" aria-label="Our four-step workflow process: Assess, Design, Automate, Scale">
        <title>Our four-step workflow process: Assess, Design, Automate, Scale</title>
        <defs>
          <linearGradient id="wf-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="wf-card-hover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="wf-connector" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b85c2a" stopOpacity="0" />
            <stop offset="30%" stopColor="#b85c2a" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#b85c2a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#b85c2a" stopOpacity="0" />
          </linearGradient>
          <filter id="wf-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#111311" floodOpacity="0.04" />
          </filter>
        </defs>
        <g className="workflow-diagram__card">
          <rect className="workflow-diagram__card-bg" x="0" y="30" width="175" height="80" rx="14" fill="url(#wf-card)" stroke="rgba(184,92,42,0.15)" strokeWidth="1" filter="url(#wf-shadow)" />
          <circle className="workflow-diagram__card-number-bg" cx="87" cy="52" r="14" fill="rgba(184,92,42,0.08)" />
          <text className="workflow-diagram__card-number" x="87" y="56" textAnchor="middle" fill="#b85c2a" fontSize="14" fontWeight="700" fontFamily="Poppins, sans-serif">01</text>
          <text className="workflow-diagram__card-title" x="87" y="82" textAnchor="middle" fill="#111311" fontSize="13" fontWeight="600" fontFamily="Poppins, sans-serif">Assess</text>
          <text className="workflow-diagram__card-desc" x="87" y="98" textAnchor="middle" fill="#111311" fontSize="9" opacity="0.4" fontFamily="Poppins, sans-serif">Audit &amp; map workflows</text>
        </g>

        <line x1="175" y1="70" x2="235" y2="70" stroke="url(#wf-connector)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="205" cy="70" r="4" fill="#b85c2a" opacity="0.3" />

        <g className="workflow-diagram__card">
          <rect className="workflow-diagram__card-bg" x="240" y="30" width="175" height="80" rx="14" fill="url(#wf-card)" stroke="rgba(184,92,42,0.15)" strokeWidth="1" filter="url(#wf-shadow)" />
          <circle className="workflow-diagram__card-number-bg" cx="327" cy="52" r="14" fill="rgba(184,92,42,0.08)" />
          <text className="workflow-diagram__card-number" x="327" y="56" textAnchor="middle" fill="#b85c2a" fontSize="14" fontWeight="700" fontFamily="Poppins, sans-serif">02</text>
          <text className="workflow-diagram__card-title" x="327" y="82" textAnchor="middle" fill="#111311" fontSize="13" fontWeight="600" fontFamily="Poppins, sans-serif">Design</text>
          <text className="workflow-diagram__card-desc" x="327" y="98" textAnchor="middle" fill="#111311" fontSize="9" opacity="0.4" fontFamily="Poppins, sans-serif">Solution architecture</text>
        </g>

        <line x1="415" y1="70" x2="475" y2="70" stroke="url(#wf-connector)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="445" cy="70" r="4" fill="#b85c2a" opacity="0.3" />

        <g className="workflow-diagram__card">
          <rect className="workflow-diagram__card-bg" x="480" y="30" width="175" height="80" rx="14" fill="url(#wf-card)" stroke="rgba(184,92,42,0.15)" strokeWidth="1" filter="url(#wf-shadow)" />
          <circle className="workflow-diagram__card-number-bg" cx="567" cy="52" r="14" fill="rgba(184,92,42,0.08)" />
          <text className="workflow-diagram__card-number" x="567" y="56" textAnchor="middle" fill="#b85c2a" fontSize="14" fontWeight="700" fontFamily="Poppins, sans-serif">03</text>
          <text className="workflow-diagram__card-title" x="567" y="82" textAnchor="middle" fill="#111311" fontSize="13" fontWeight="600" fontFamily="Poppins, sans-serif">Automate</text>
          <text className="workflow-diagram__card-desc" x="567" y="98" textAnchor="middle" fill="#111311" fontSize="9" opacity="0.4" fontFamily="Poppins, sans-serif">Build &amp; deploy agents</text>
        </g>

        <line x1="655" y1="70" x2="715" y2="70" stroke="url(#wf-connector)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="685" cy="70" r="4" fill="#b85c2a" opacity="0.3" />

        <g className="workflow-diagram__card">
          <rect className="workflow-diagram__card-bg" x="720" y="30" width="175" height="80" rx="14" fill="url(#wf-card)" stroke="rgba(184,92,42,0.15)" strokeWidth="1" filter="url(#wf-shadow)" />
          <circle className="workflow-diagram__card-number-bg" cx="807" cy="52" r="14" fill="rgba(184,92,42,0.08)" />
          <text className="workflow-diagram__card-number" x="807" y="56" textAnchor="middle" fill="#b85c2a" fontSize="14" fontWeight="700" fontFamily="Poppins, sans-serif">04</text>
          <text className="workflow-diagram__card-title" x="807" y="82" textAnchor="middle" fill="#111311" fontSize="13" fontWeight="600" fontFamily="Poppins, sans-serif">Scale</text>
          <text className="workflow-diagram__card-desc" x="807" y="98" textAnchor="middle" fill="#111311" fontSize="9" opacity="0.4" fontFamily="Poppins, sans-serif">Optimize &amp; grow</text>
        </g>
      </svg>
    </div>
  );
}

function SolutionRow({ item, index }) {
  return (
    <div className="solution-row reveal" style={{ '--card-index': index }}>
      <div className="solution-row__problem">
        <span className="solution-row__label">Problem</span>
        <p className="solution-row__problem-text">{item.problem}</p>
      </div>
      <div className="solution-row__solution">
        <div className="solution-row__answer">
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
    </div>
  );
}

export default function Solutions() {
  const { items } = solutions;

  return (
    <section className="section" id="solutions" aria-label="Our solutions">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{solutions.badge}</span>
          <h2 className="section-header__title">{solutions.headline}</h2>
          {solutions.description && <p className="section-header__subtitle">{solutions.description}</p>}
        </div>
        <WorkflowDiagram />
        <div className="solution-rows">
          {items.map((item, i) => (
            <SolutionRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
