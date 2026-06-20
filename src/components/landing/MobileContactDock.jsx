import React, { useEffect, useId, useRef } from 'react';

function MobileContactDock({
  surface,
  isVisible,
  isOpen,
  onOpen,
  onClose,
  founderHref,
  mailHref,
  onStartConversation,
  launcherLabel,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !isOpen) {
      document.body.style.overflow = 'unset';
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, isOpen, onClose]);

  if (!isVisible) {
    return null;
  }

  const handleFounderClick = () => {
    onClose({ restoreFocus: false });
  };

  const handleWorkflowReviewClick = () => {
    onClose({ restoreFocus: false });
  };

  const handleConversationStart = () => {
    onClose({ restoreFocus: false });
    onStartConversation();
  };

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="landing-mobile-contact-dock__backdrop"
          aria-label="Close workflow review options"
          onClick={() => onClose()}
        />
      ) : null}

      <div className="landing-mobile-contact-dock">
        {isOpen ? (
          <div
            id="landing-mobile-contact-sheet"
            className="landing-mobile-contact-dock__sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
          >
            <div className="landing-mobile-contact-dock__sheet-header">
              <div>
                <p className="landing-panel-label">{surface.eyebrow}</p>
                <h2 id={titleId}>{launcherLabel}</h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="landing-mobile-contact-dock__close"
                aria-label="Close workflow review options"
                onClick={() => onClose()}
              >
                ×
              </button>
            </div>

            <p id={descriptionId} className="landing-mobile-contact-dock__body">
              {surface.body}
            </p>

            <ul className="landing-mobile-contact-dock__signals" aria-label="Workflow review highlights">
              {surface.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>

            <div className="landing-mobile-contact-dock__actions">
              <a
                className="landing-founder-button"
                href={founderHref}
                target="_blank"
                rel="noreferrer"
                onClick={handleFounderClick}
              >
                {surface.primaryActionLabel}
              </a>
              <button type="button" className="landing-primary-button" onClick={handleConversationStart}>
                {surface.secondaryActionLabel}
              </button>
              {surface.tertiaryActionLabel ? (
                <a className="landing-secondary-button" href={mailHref} onClick={handleWorkflowReviewClick}>
                  {surface.tertiaryActionLabel}
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          className="landing-founder-button landing-mobile-contact-dock__trigger"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-controls="landing-mobile-contact-sheet"
          aria-expanded={isOpen}
        >
          {launcherLabel}
        </button>
      </div>
    </>
  );
}

export default MobileContactDock;
