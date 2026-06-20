import React, { useEffect, useMemo, useRef, useState } from 'react';

const INITIAL_TYPING_DELAY_MS = 30;
const MAX_TYPING_DURATION_MS = 700;
const TYPING_FRAME_DELAY_MS = 22;
const MIN_CHARACTERS_PER_STEP = 3;
const REENTRY_DURATION_MS = 760;

function getRelayNarration(section) {
  if (Array.isArray(section.narration)) {
    return section.narration.join('\n');
  }

  return section.narration ?? section.relay;
}

function getAccessibleNarration(section) {
  if (Array.isArray(section.narration)) {
    return section.narration.join(' ');
  }

  return section.narration ?? section.relay;
}

function getTypingPlan(text) {
  const characterCount = Math.max(Array.from(text).length, 1);
  const availableDuration = Math.max(MAX_TYPING_DURATION_MS - INITIAL_TYPING_DELAY_MS, TYPING_FRAME_DELAY_MS);
  const stepCount = Math.max(1, Math.floor(availableDuration / TYPING_FRAME_DELAY_MS));

  return {
    stepDelay: TYPING_FRAME_DELAY_MS,
    charactersPerStep: Math.max(MIN_CHARACTERS_PER_STEP, Math.ceil(characterCount / stepCount)),
  };
}

function LandingMotionSpine({ motionRef, sections, activeSectionId, reducedMotion = false, isHidden = false }) {
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];
  const narration = useMemo(() => getRelayNarration(activeSection), [activeSection]);
  const accessibleNarration = useMemo(() => getAccessibleNarration(activeSection), [activeSection]);
  const typedSectionsRef = useRef(new Set());
  const typingTimerRef = useRef(null);
  const reentryTimerRef = useRef(null);
  const previousHiddenRef = useRef(isHidden);
  const [visibleNarration, setVisibleNarration] = useState(reducedMotion ? narration : '');
  const [isTyping, setIsTyping] = useState(false);
  const [isReentering, setIsReentering] = useState(false);

  useEffect(() => {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (!narration) {
      setVisibleNarration('');
      setIsTyping(false);
      return undefined;
    }

    if (reducedMotion || typedSectionsRef.current.has(activeSection.id)) {
      setVisibleNarration(narration);
      setIsTyping(false);
      return undefined;
    }

    typedSectionsRef.current.add(activeSection.id);

    const characters = Array.from(narration);
    const { stepDelay, charactersPerStep } = getTypingPlan(narration);
    let characterIndex = 0;

    setVisibleNarration('');
    setIsTyping(true);

    const typeNextCharacter = () => {
      characterIndex = Math.min(characterIndex + charactersPerStep, characters.length);
      setVisibleNarration(characters.slice(0, characterIndex).join(''));

      if (characterIndex >= characters.length) {
        setIsTyping(false);
        typingTimerRef.current = null;
        return;
      }

      typingTimerRef.current = window.setTimeout(typeNextCharacter, stepDelay);
    };

    typingTimerRef.current = window.setTimeout(typeNextCharacter, INITIAL_TYPING_DELAY_MS);

    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [activeSection.id, narration, reducedMotion]);

  useEffect(() => {
    if (reentryTimerRef.current) {
      window.clearTimeout(reentryTimerRef.current);
      reentryTimerRef.current = null;
    }

    if (reducedMotion) {
      setIsReentering(false);
      previousHiddenRef.current = isHidden;
      return undefined;
    }

    if (previousHiddenRef.current && !isHidden) {
      setIsReentering(true);
      reentryTimerRef.current = window.setTimeout(() => {
        setIsReentering(false);
        reentryTimerRef.current = null;
      }, REENTRY_DURATION_MS);
    } else if (isHidden) {
      setIsReentering(false);
    }

    previousHiddenRef.current = isHidden;

    return () => {
      if (reentryTimerRef.current) {
        window.clearTimeout(reentryTimerRef.current);
        reentryTimerRef.current = null;
      }
    };
  }, [isHidden, reducedMotion]);

  useEffect(() => () => {
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
    }

    if (reentryTimerRef.current) {
      window.clearTimeout(reentryTimerRef.current);
    }
  }, []);

  return (
    <aside
      className={[
        'landing-motion-spine',
        `landing-motion-spine--${activeSection.id}`,
        isHidden ? 'landing-motion-spine--hidden' : '',
        isReentering ? 'landing-motion-spine--reentering' : '',
      ].filter(Boolean).join(' ')}
      ref={motionRef}
      aria-label="Ada relay and section progress"
      aria-hidden={isHidden ? 'true' : undefined}
      style={{
        '--motion-spine-accent': activeSection.accent,
        '--motion-spine-glow': activeSection.glow,
      }}
    >
      <div className="landing-motion-spine__relay">
        <div className="landing-motion-spine__avatar-shell">
          <img src="/images/contact-avatar-chloe.png" alt="Ada relay avatar" loading="lazy" />
        </div>
        <span className="landing-motion-spine__avatar-bridge" aria-hidden="true" />

        <div className="landing-motion-spine__relay-shell">
          <span className="landing-motion-spine__relay-signal" aria-hidden="true" />

          <div className="landing-motion-spine__relay-meta">
            <span className="landing-motion-spine__relay-presence" aria-hidden="true">
              <span className="landing-motion-spine__relay-presence-dot" />
              {isTyping ? 'Typing' : 'Online'}
            </span>
          </div>

          <p className="landing-motion-spine__relay-status">{activeSection.relay}</p>

          <div className="landing-motion-spine__relay-bubble" aria-hidden="true">
            <p>{visibleNarration}</p>
            {isTyping ? <span className="landing-motion-spine__relay-cursor" /> : null}
          </div>

          <p className="landing-motion-spine__relay-announcement" aria-live="polite" aria-atomic="true">
            {accessibleNarration}
          </p>
        </div>
      </div>

      <div className="landing-motion-spine__track">
        <ul className="landing-motion-spine__nodes">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;

            return (
              <li
                key={section.id}
                className={`landing-motion-spine__node${isActive ? ' landing-motion-spine__node--active' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="landing-motion-spine__dot" aria-hidden="true" />
                <span className="landing-motion-spine__sr-label">{section.label}</span>
                {isActive ? (
                  <span className="landing-motion-spine__active-pill" aria-hidden="true">
                    {section.label}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default LandingMotionSpine;
