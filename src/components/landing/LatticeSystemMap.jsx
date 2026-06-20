import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LatticeNetworkCanvas from './LatticeNetworkCanvas';
import { latticeSurface } from './landingSystemData';

gsap.registerPlugin(ScrollTrigger);

function LatticeSystemMap({ reducedMotion = false }) {
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
            x: 96,
            y: 28,
            scale: 0.986,
            clipPath: 'inset(0% 0% 14% 0% round 2rem)',
            transformOrigin: 'right center',
            force3D: true,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 2rem)',
            duration: 1.06,
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
    <div className="landing-system-diagram landing-system-diagram--lattice" ref={rootRef}>
      <LatticeNetworkCanvas surface={latticeSurface} />

      <article className="landing-diagram-caption">
        <p className="landing-callout-label">Operating logic</p>
        <h3>The 8085 Lattice coordinates the work around the model.</h3>
        <p>
          It routes each step to the right model, delegates specialist work, holds context and
          review where needed, and returns one controlled result.
        </p>
      </article>
    </div>
  );
}

export default LatticeSystemMap;
