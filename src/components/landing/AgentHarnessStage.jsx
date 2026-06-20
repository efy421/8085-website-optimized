import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AgentHarnessWorkspace from './AgentHarnessWorkspace';
import { agentHarnessSurface } from './landingSystemData';

gsap.registerPlugin(ScrollTrigger);

function AgentHarnessStage({ reducedMotion = false }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) {
      return undefined;
    }

    const scroller = document.getElementById('root');

    if (!scroller) {
      return undefined;
    }

    const media = gsap.matchMedia();

    media.add('(min-width: 1025px)', () => {
      const context = gsap.context(() => {
        const root = rootRef.current;

        gsap.fromTo(
          root,
          {
            y: 92,
            scale: 0.985,
            clipPath: 'inset(16% 0% 0% 0% round 2rem)',
            transformOrigin: 'center bottom',
            force3D: true,
          },
          {
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 2rem)',
            duration: 1.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: root,
              scroller,
              start: 'top 80%',
              once: true,
            },
          },
        );
      }, rootRef);

      return () => context.revert();
    });

    return () => media.revert();
  }, [reducedMotion]);

  return (
    <div className="landing-system-diagram landing-system-diagram--harness" ref={rootRef}>
      <AgentHarnessWorkspace surface={agentHarnessSurface} />

      <article className="landing-diagram-caption">
        <p className="landing-callout-label">{agentHarnessSurface.captionEyebrow}</p>
        <h3>{agentHarnessSurface.captionTitle}</h3>

        <ul
          className="landing-premium-bullet-list landing-premium-bullet-list--caption"
          aria-label={`${agentHarnessSurface.captionEyebrow} details`}
        >
          {agentHarnessSurface.captionPoints.map((point) => (
            <li key={point.body} className="landing-premium-bullet-item">
              <span className="landing-premium-bullet-dot" aria-hidden="true" />
              <div className="landing-premium-bullet-copy">
                <p className="landing-premium-bullet-text">{point.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default AgentHarnessStage;
