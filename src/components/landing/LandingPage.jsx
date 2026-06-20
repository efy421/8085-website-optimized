import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CapabilitySceneDeck from './CapabilitySceneDeck';
import ContactCommandSurface from './ContactCommandSurface';
import DifferentiationSplitSurface from './DifferentiationSplitSurface';
import HeroShaderCanvas from './HeroShaderCanvas';
import MobileContactDock from './MobileContactDock';
import TrustSurface from './TrustSurface';
import {
  contactSurface,
  differentiationSurface,
  motionSections,
  proofSurface,
  projectsSurface,
  trustStripSurface,
  trustSurface,
  workflowStorySurface,
} from './landingSystemData';
import '../../styles/landing-page.css';

gsap.registerPlugin(ScrollTrigger);

const heroSupportPills = ['Start with one workflow', 'Built around your process', 'You keep ownership'];

const heroHarnessSteps = [
  {
    id: 'workflow',
    index: '01',
    title: 'Pick one workflow',
    copy: 'Start with the internal process that slows the team down and repeats often enough to matter.',
  },
  {
    id: 'setup',
    index: '02',
    title: 'We build the setup',
    copy: 'We connect the tools, logic, context, and approvals around that workflow.',
  },
  {
    id: 'run',
    index: '03',
    title: 'The workflow handles the repeatable work',
    copy: 'The repeated manual steps stop depending on a person doing them every time.',
  },
  {
    id: 'control',
    index: '04',
    title: 'Your team stays in control',
    copy: 'People review what matters and keep ownership of decisions and exceptions.',
  },
];

const processPrinciples = [
  {
    title: 'No full transformation first',
    body: 'Start where the team already feels the manual drag, not with a company-wide change program.',
  },
  {
    title: 'Built around the way the team works',
    body: 'The workflow wraps around the existing process instead of forcing the team onto a fake demo path.',
  },
  {
    title: 'Expand only after value is clear',
    body: 'Once one workflow proves out, it becomes much easier to decide where the next one should be.',
  },
];

const founderHref = 'https://calendly.com/f-shamim/client-call';
const mobileWorkflowReviewLabel = 'Book Strategy Call';

const heroShaderConfig = {
  shaderId: 'phase-transition',
  options: {
    particleDensity: 11.0,
    waveSpeed: 2.0,
    maxPixelRatio: 0.1,
    idleFps: 90,
  },
};

function useMediaQuery(query) {
  const getMatches = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
}

function useReducedMotionPreference() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

function HeroHarnessFlow({ className = '' }) {
  return (
    <ol className={`landing-hero-flow ${className}`.trim()} aria-label="How 8085 works in four steps">
      {heroHarnessSteps.map((step) => (
        <li key={step.id} className="landing-hero-flow__step">
          <span className="landing-hero-flow__marker" aria-hidden="true">
            {step.index}
          </span>
          <div className="landing-hero-flow__content">
            <p className="landing-hero-flow__title">{step.title}</p>
            <p className="landing-hero-flow__copy">{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function WorkflowStorySurface({ surface }) {
  return (
    <div className="landing-workflow-story" aria-label={surface.ariaLabel}>
      <div className="landing-workflow-story__cards">
        {surface.cards.map((card) => (
          <article
            key={card.id}
            className={`landing-workflow-story__card landing-workflow-story__card--${card.tone}`}
          >
            <p className="landing-callout-label">{card.label}</p>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ResultsSurface({ surface }) {
  return (
    <div className="landing-results-surface" aria-label={surface.ariaLabel}>
      <div className="landing-results-grid">
        {surface.cards.map((card) => (
          <article key={card.id} className="landing-results-card">
            <p className="landing-results-card__label">{card.label}</p>
            <div className="landing-results-card__value">{card.value}</div>
            <p className="landing-results-card__body">{card.body}</p>
          </article>
        ))}
      </div>
      <p className="landing-results-note">{surface.note}</p>
    </div>
  );
}

function ProjectsSurface({ surface }) {
  return (
    <div className="landing-projects-surface" aria-label={surface.ariaLabel}>
      <div className="landing-projects-grid">
        {surface.projects.map((project) => (
          <article key={project.id} className="landing-project-card">
            <div className="landing-project-card__header">
              <span className="landing-project-card__client">{project.client}</span>
              <span className="landing-project-card__industry">{project.industry}</span>
            </div>
            <div className="landing-project-card__body">
              <p className="landing-project-card__challenge">
                <strong>Challenge:</strong> {project.challenge}
              </p>
              <p className="landing-project-card__solution">
                <strong>Solution:</strong> {project.solution}
              </p>
              <p className="landing-project-card__result">
                <strong>Result:</strong> {project.result}
              </p>
            </div>
            <div className="landing-project-card__metric">{project.metric}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

function getSectionSignalState(sectionId, activeSectionId) {
  const activeIndex = motionSections.findIndex((section) => section.id === activeSectionId);
  const sectionIndex = motionSections.findIndex((section) => section.id === sectionId);

  if (activeIndex === -1 || sectionIndex === -1) {
    return 'upcoming';
  }

  if (sectionIndex === activeIndex) {
    return 'active';
  }

  if (sectionIndex < activeIndex) {
    return 'past';
  }

  return 'upcoming';
}

function LandingSection({ id, eyebrow, title, intro, tone = 'default', signalState = 'upcoming', children }) {
  const headingId = `${id}-title`;
  const introId = intro ? `${id}-intro` : undefined;

  return (
    <section
      id={id}
      className={`landing-section landing-section--${tone}`}
      data-motion-section={id}
      data-signal-state={signalState}
      aria-labelledby={headingId}
      aria-describedby={introId}
    >
      <div className="landing-shell landing-section-shell" data-signal-anchor>
        <div className="landing-section-heading">
          <p className="landing-eyebrow">{eyebrow}</p>
          <h2 id={headingId}>{title}</h2>
          {intro ? (
            <p className="landing-intro" id={introId}>
              {intro}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function LandingPage({ onStartConversation }) {
  const prefersReducedMotion = useReducedMotionPreference();
  const isMobileViewport = useMediaQuery('(max-width: 720px)');
  const [activeSectionId, setActiveSectionId] = useState(motionSections[0].id);
  const [isMobileContactDockOpen, setIsMobileContactDockOpen] = useState(false);
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const supportRef = useRef(null);
  const actionsRef = useRef(null);
  const lastMobileContactTriggerRef = useRef(null);

  const openMobileContactDock = (event) => {
    lastMobileContactTriggerRef.current = event?.currentTarget ?? null;
    setIsMobileContactDockOpen(true);
  };

  const closeMobileContactDock = ({ restoreFocus = true } = {}) => {
    setIsMobileContactDockOpen(false);

    if (!restoreFocus || !(lastMobileContactTriggerRef.current instanceof HTMLElement)) {
      return;
    }

    window.requestAnimationFrame(() => {
      lastMobileContactTriggerRef.current?.focus();
    });
  };

  useEffect(() => {
    if (isMobileViewport || !isMobileContactDockOpen) {
      return;
    }

    setIsMobileContactDockOpen(false);
  }, [isMobileContactDockOpen, isMobileViewport]);

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from([eyebrowRef.current, titleRef.current, introRef.current], {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
        })
        .from(
          supportRef.current?.children || [],
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
          },
          '-=0.28',
        )
        .from(
          actionsRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.2',
        );
    }, heroRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) {
      return undefined;
    }

    const heroElement = heroRef.current;

    const resetPointerState = () => {
      heroElement.style.setProperty('--hero-pointer-x', '50%');
      heroElement.style.setProperty('--hero-pointer-y', '50%');
      heroElement.style.setProperty('--hero-tilt-x', '0deg');
      heroElement.style.setProperty('--hero-tilt-y', '0deg');
    };

    const handlePointerMove = (event) => {
      const bounds = heroElement.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;
      const tiltX = (0.5 - relativeY) * 5;
      const tiltY = (relativeX - 0.5) * 5;
      const pointerX = `${relativeX * 100}%`;
      const pointerY = `${relativeY * 100}%`;

      heroElement.style.setProperty('--hero-pointer-x', pointerX);
      heroElement.style.setProperty('--hero-pointer-y', pointerY);
      heroElement.style.setProperty('--hero-tilt-x', `${tiltX.toFixed(2)}deg`);
      heroElement.style.setProperty('--hero-tilt-y', `${tiltY.toFixed(2)}deg`);
    };

    resetPointerState();
    heroElement.addEventListener('pointermove', handlePointerMove);
    heroElement.addEventListener('pointerleave', resetPointerState);

    return () => {
      heroElement.removeEventListener('pointermove', handlePointerMove);
      heroElement.removeEventListener('pointerleave', resetPointerState);
      resetPointerState();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !pageRef.current) {
      return undefined;
    }

    const scroller = document.getElementById('root');
    if (!scroller) {
      return undefined;
    }

    const media = gsap.matchMedia();

    media.add('(min-width: 1100px)', () => {
      const context = gsap.context(() => {
        const page = pageRef.current;
        const sections = gsap.utils.toArray('[data-motion-section]', page);

        if (!sections.length) {
          return undefined;
        }

        sections.forEach((section, index) => {
          const sectionId = section.id;
          const previousSectionId = sections[index - 1]?.id ?? motionSections[0].id;

          ScrollTrigger.create({
            trigger: section,
            scroller,
            start: sectionId === 'hero' ? 'top top' : 'top 24%',
            onEnter: () => setActiveSectionId(sectionId),
            onEnterBack: () => setActiveSectionId(sectionId),
            onLeaveBack: () => setActiveSectionId(previousSectionId),
          });
        });

        return undefined;
      }, pageRef);

      return () => context.revert();
    });

    return () => media.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      className={`landing-page${prefersReducedMotion ? ' landing-page--reduced-motion' : ' landing-page--motion-enhanced'}`}
      data-active-section={activeSectionId}
      ref={pageRef}
    >
      <a className="landing-skip-link" href="#landing-main">
        Skip to content
      </a>

      <header className="landing-header">
        <div className="landing-shell landing-header-inner">
          <a className="landing-brand" href="#hero" aria-label="8085 homepage">
            <span className="landing-brand-mark">8085</span>
            <span className="landing-brand-copy">AI for real business workflows</span>
          </a>

          <nav className="landing-nav" aria-label="Primary navigation">
            <a href="#agent-harness" aria-current={activeSectionId === 'agent-harness' ? 'location' : undefined}>
              How it works
            </a>
            <a href="#security" aria-current={activeSectionId === 'security' ? 'location' : undefined}>
              Ownership
            </a>
            <a
              href="#differentiation"
              aria-current={activeSectionId === 'differentiation' ? 'location' : undefined}
            >
              Difference
            </a>
            <a href="#capabilities" aria-current={activeSectionId === 'capabilities' ? 'location' : undefined}>
              Examples
            </a>
            <a href="#projects" aria-current={activeSectionId === 'projects' ? 'location' : undefined}>
              Projects
            </a>
            <a href="#contact" aria-current={activeSectionId === 'contact' ? 'location' : undefined}>
              Contact
            </a>
          </nav>

          {!isMobileViewport ? (
            <div className="landing-header-actions">
              <a className="landing-founder-button" href={founderHref} target="_blank" rel="noreferrer">
                Book Strategy Call
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <main id="landing-main" tabIndex={-1}>
        <section
          id="hero"
          className="landing-hero"
          data-motion-section="hero"
          data-signal-state={getSectionSignalState('hero', activeSectionId)}
          aria-labelledby="hero-title"
          ref={heroRef}
        >
          <div className="landing-hero-backdrop" aria-hidden="true">
            <HeroShaderCanvas
              hostRef={heroRef}
              shaderId={heroShaderConfig.shaderId}
              options={heroShaderConfig.options}
              reducedMotion={prefersReducedMotion}
            />
          </div>

          <div className="landing-shell landing-hero-grid landing-hero-grid--single" data-signal-anchor>
            <div className="landing-hero-copy">
              <div className="landing-hero-prelude" ref={eyebrowRef}>
                <span className="landing-hero-tile">AI for real business workflows</span>
              </div>

              <h1 id="hero-title" ref={titleRef}>
                Automate your team's repeatable work and grow output without headcount.
              </h1>

              <p className="landing-hero-intro" ref={introRef}>
                8085 automates the repeatable work your team already does. Same people. More output. Less manual drag.
              </p>

              <ul className="landing-signal-list landing-signal-list--hero" ref={supportRef}>
                {heroSupportPills.map((pill) => (
                  <li key={pill}>{pill}</li>
                ))}
              </ul>

              <div className="landing-hero-actions landing-hero-actions--desktop" ref={actionsRef}>
                <a className="landing-founder-button" href={founderHref} target="_blank" rel="noreferrer">
                  Book Strategy Call
                </a>
                {!isMobileViewport ? (
                  <button type="button" className="landing-secondary-button" onClick={onStartConversation}>
                    Talk to Agent Ada
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="landing-trust-strip" aria-label={trustStripSurface.ariaLabel}>
          <div className="landing-shell landing-trust-strip__inner">
            <p className="landing-panel-label">{trustStripSurface.label}</p>
            <div className="landing-trust-strip__logos" aria-label="Trusted company logos">
              {trustStripSurface.logos.map((logo) => (
                <div key={logo.alt} className="landing-trust-strip__logo">
                  <img src={logo.src} alt={logo.alt} loading="lazy" />
                  {logo.context ? <span className="landing-trust-strip__context">{logo.context}</span> : null}
                  {logo.outcome ? <span className="landing-trust-strip__outcome">{logo.outcome}</span> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <LandingSection
          id="workflow-story"
          eyebrow="What this looks like"
          title={workflowStorySurface.title}
          intro={workflowStorySurface.intro}
          tone="muted"
          signalState={getSectionSignalState('workflow-story', activeSectionId)}
        >
          <WorkflowStorySurface surface={workflowStorySurface} />
        </LandingSection>

        <LandingSection
          id="agent-harness"
          eyebrow="How it works"
          title="Start with one workflow."
          intro="Pick the process that repeats most. Prove value. Then expand."
          signalState={getSectionSignalState('agent-harness', activeSectionId)}
        >
          <div className="landing-process-grid">
            <article className="landing-process-lead">
              <p className="landing-panel-label">Why this works</p>
              <h3>Pick the obvious one first.</h3>
              <p>
                The best workflow to automate is already slowing your team down. It is repeatable,
                multi-step, and important enough that removing manual work changes the day.
              </p>

              <ul className="landing-premium-bullet-list" aria-label="How to choose the first workflow">
                {processPrinciples.map((principle) => (
                  <li key={principle.title} className="landing-premium-bullet-item">
                    <span className="landing-premium-bullet-dot" aria-hidden="true" />
                    <div className="landing-premium-bullet-copy">
                      <p className="landing-premium-bullet-kicker">{principle.title}</p>
                      <p className="landing-premium-bullet-text">{principle.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <div className="landing-process-flow-shell">
              <HeroHarnessFlow className="landing-hero-flow--process" />
            </div>
          </div>
        </LandingSection>

        <LandingSection
          id="security"
          eyebrow="Ownership and control"
          title="You own what we build."
          intro="It becomes part of your business, and your team gets more done with AI built into the workflow."
          signalState={getSectionSignalState('security', activeSectionId)}
        >
          <TrustSurface surface={trustSurface} />
        </LandingSection>

        <LandingSection
          id="differentiation"
          eyebrow="Why this is different"
          title="Not a chatbot. Not a brittle script."
          intro="Chat helps with answers. Traditional automation follows fixed steps. 8085 builds intelligent workflows that can use tools, follow business rules, and hand work to people when judgment is needed."
          tone="contrast"
          signalState={getSectionSignalState('differentiation', activeSectionId)}
        >
          <DifferentiationSplitSurface surface={differentiationSurface} />
        </LandingSection>

        <LandingSection
          id="capabilities"
          eyebrow="Workflow examples"
          title="Best for repeatable work your team already knows how to do."
          intro="If a capable team member can do it repeatedly inside a digital workflow, 8085 can often automate part or all of it."
          signalState={getSectionSignalState('capabilities', activeSectionId)}
        >
          <CapabilitySceneDeck reducedMotion={prefersReducedMotion} />
        </LandingSection>

        <LandingSection
          id="proof"
          eyebrow={proofSurface.eyebrow}
          title={proofSurface.title}
          intro={proofSurface.body}
          tone="muted"
          signalState={getSectionSignalState('proof', activeSectionId)}
        >
          <ResultsSurface surface={proofSurface} />
        </LandingSection>

        <LandingSection
          id="projects"
          eyebrow={projectsSurface.eyebrow}
          title={projectsSurface.title}
          intro={projectsSurface.intro}
          signalState={getSectionSignalState('projects', activeSectionId)}
        >
          <ProjectsSurface surface={projectsSurface} />
        </LandingSection>

        <section
          id="contact"
          className="landing-cta-section"
          data-motion-section="contact"
          data-signal-state={getSectionSignalState('contact', activeSectionId)}
          aria-labelledby="contact-title"
        >
          <ContactCommandSurface
            surface={contactSurface}
            headingId="contact-title"
            founderHref={founderHref}
            onStartConversation={onStartConversation}
          />
        </section>
      </main>

      <MobileContactDock
        surface={contactSurface}
        isVisible={isMobileViewport}
        isOpen={isMobileContactDockOpen}
        onOpen={openMobileContactDock}
        onClose={closeMobileContactDock}
        founderHref={founderHref}
        onStartConversation={onStartConversation}
        launcherLabel={mobileWorkflowReviewLabel}
      />
    </div>
  );
}

export default LandingPage;
