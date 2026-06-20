import React, { useEffect, useMemo, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function measureAnchor(section, pageRect) {
  const anchor =
    section.querySelector('[data-signal-anchor]') ??
    section.querySelector('.landing-section-shell') ??
    section;
  const rect = anchor.getBoundingClientRect();
  const isHero = section.id === 'hero';
  const verticalOffset = clamp(rect.height * (isHero ? 0.5 : 0.26), 94, 188);
  const focusRatio = isHero ? 0.56 : 0.62;
  const ingressRatio = isHero ? 0.7 : 0.76;

  return {
    id: section.id,
    y: rect.top - pageRect.top + verticalOffset,
    focusX: rect.left - pageRect.left + rect.width * focusRatio,
    ingressX: rect.left - pageRect.left + rect.width * ingressRatio,
  };
}

function getSignalState(index, activeIndex) {
  if (index === activeIndex) {
    return 'active';
  }

  if (index < activeIndex) {
    return 'past';
  }

  return 'upcoming';
}

function LandingSignalCurrent({ pageRef, sections, activeSectionId, reducedMotion = false }) {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    if (reducedMotion || !pageRef.current) {
      setGeometry(null);
      return undefined;
    }

    let frameId = 0;

    const measure = () => {
      frameId = 0;

      const page = pageRef.current;

      if (!page) {
        return;
      }

      const pageRect = page.getBoundingClientRect();
      const width = Math.round(page.clientWidth || window.innerWidth);
      const height = Math.round(Math.max(page.scrollHeight, page.offsetHeight, window.innerHeight));
      const rawAnchors = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean)
        .map((section) => measureAnchor(section, pageRect));

      if (!rawAnchors.length) {
        setGeometry(null);
        return;
      }

      const trunkX = clamp(Math.round(width * 0.76), 820, width - 220);
      const anchors = rawAnchors.map((anchor) => ({
        ...anchor,
        y: clamp(Math.round(anchor.y), 132, height - 132),
        focusX: clamp(Math.round(anchor.focusX), 190, trunkX - 170),
        ingressX: clamp(Math.round(Math.max(anchor.ingressX, anchor.focusX + 56)), 280, trunkX - 76),
      }));

      setGeometry({ width, height, trunkX, anchors });
    };

    const queueMeasure = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(measure);
    };

    queueMeasure();
    window.addEventListener('resize', queueMeasure);
    ScrollTrigger.addEventListener('refresh', queueMeasure);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('resize', queueMeasure);
      ScrollTrigger.removeEventListener('refresh', queueMeasure);
    };
  }, [pageRef, reducedMotion, sections]);

  const activeIndex = sections.findIndex((section) => section.id === activeSectionId);

  const trunkSegments = useMemo(() => {
    if (!geometry) {
      return [];
    }

    return geometry.anchors.slice(0, -1).map((anchor, index) => {
      let state = 'upcoming';

      if (index === activeIndex - 1) {
        state = 'active';
      } else if (index < activeIndex - 1) {
        state = 'past';
      }

      return {
        id: `${anchor.id}-${geometry.anchors[index + 1].id}`,
        points: `${geometry.trunkX},${anchor.y} ${geometry.trunkX},${geometry.anchors[index + 1].y}`,
        state,
        accent: sections[index + 1]?.accent,
        glow: sections[index + 1]?.glow,
      };
    });
  }, [activeIndex, geometry, sections]);

  const branches = useMemo(() => {
    if (!geometry) {
      return [];
    }

    return geometry.anchors.map((anchor, index) => ({
      ...anchor,
      state: getSignalState(index, activeIndex),
      accent: sections[index]?.accent,
      glow: sections[index]?.glow,
      points: `${geometry.trunkX},${anchor.y} ${Math.round((geometry.trunkX + anchor.ingressX) / 2)},${anchor.y} ${anchor.ingressX},${anchor.y} ${anchor.focusX},${anchor.y}`,
    }));
  }, [activeIndex, geometry, sections]);

  const activeBranch = branches.find((branch) => branch.id === activeSectionId) ?? branches[0];

  if (reducedMotion || !geometry || !branches.length) {
    return null;
  }

  return (
    <div
      className="landing-signal-current"
      aria-hidden="true"
      style={{
        '--signal-focus-x': `${activeBranch.focusX}px`,
        '--signal-focus-y': `${activeBranch.y}px`,
        '--signal-focus-color': activeBranch.glow,
      }}
    >
      <div className="landing-signal-current__wash" />
      <svg
        className="landing-signal-current__svg"
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio="none"
      >
        {trunkSegments.map((segment) => (
          <g
            key={segment.id}
            className={`landing-signal-current__group landing-signal-current__group--${segment.state}`}
            style={{ '--signal-accent': segment.accent, '--signal-glow': segment.glow }}
          >
            <polyline className="landing-signal-current__trace landing-signal-current__trace--base" points={segment.points} />
            <polyline className="landing-signal-current__trace landing-signal-current__trace--glow" points={segment.points} />
          </g>
        ))}

        {branches.map((branch) => (
          <g
            key={branch.id}
            className={`landing-signal-current__group landing-signal-current__group--${branch.state}`}
            style={{ '--signal-accent': branch.accent, '--signal-glow': branch.glow }}
          >
            <polyline className="landing-signal-current__trace landing-signal-current__trace--base" points={branch.points} />
            <polyline className="landing-signal-current__trace landing-signal-current__trace--glow" points={branch.points} />
            <circle className="landing-signal-current__node" cx={geometry.trunkX} cy={branch.y} r="4.2" />
            <circle className="landing-signal-current__endpoint" cx={branch.focusX} cy={branch.y} r="4.8" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default LandingSignalCurrent;
