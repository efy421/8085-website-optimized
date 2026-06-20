import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ContactCommandSurface from '../ContactCommandSurface';
import LandingMotionSpine from '../LandingMotionSpine';
import { contactSurface, motionSections } from '../landingSystemData';

describe('Sprint 5 motion integration and Ada experience', () => {
  it('suppresses the Ada relay spine while hero is active', () => {
    const { container } = render(
      <LandingMotionSpine sections={motionSections} activeSectionId="hero" reducedMotion isHidden />,
    );

    const spine = container.querySelector('.landing-motion-spine');

    expect(spine).toHaveClass('landing-motion-spine--hidden');
    expect(spine).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the relay spine after hero with the active section story', () => {
    const { container } = render(
      <LandingMotionSpine sections={motionSections} activeSectionId="capabilities" reducedMotion />,
    );

    expect(screen.getByLabelText(/ada relay and section progress/i)).toBeInTheDocument();
    expect(screen.getByText(/what can be automated/i)).toBeInTheDocument();
    expect(screen.queryByText(/^ada relay$/i)).not.toBeInTheDocument();
    expect(screen.getByText(/^online$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/these are the kinds of repeatable work that fit well\./i, {
        selector: '.landing-motion-spine__relay-bubble p',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^examples$/i, { selector: '.landing-motion-spine__active-pill' })).toBeInTheDocument();
    expect(container.querySelectorAll('.landing-motion-spine__active-pill')).toHaveLength(1);
    expect(container.querySelectorAll('.landing-motion-spine__sr-label')).toHaveLength(motionSections.length);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(motionSections.length);
  });

  it('adds a stronger re-entry state when the spine returns after hero', () => {
    const { container, rerender } = render(
      <LandingMotionSpine sections={motionSections} activeSectionId="hero" isHidden />,
    );

    rerender(
      <LandingMotionSpine sections={motionSections} activeSectionId="solution" isHidden={false} />,
    );

    expect(container.querySelector('.landing-motion-spine')).toHaveClass('landing-motion-spine--reentering');
    expect(screen.getByText(/^solution$/i, { selector: '.landing-motion-spine__active-pill' })).toBeInTheDocument();
  });

  it('finishes narration typing within one second', () => {
    vi.useFakeTimers();

    try {
      render(<LandingMotionSpine sections={motionSections} activeSectionId="problems" />);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(
        screen.getByText(/your team is stuck in repeatable work\./i, {
          selector: '.landing-motion-spine__relay-bubble p',
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(/^online$/i)).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('renders the final CTA as a founder-first workflow review surface', () => {
    const onStartConversation = vi.fn();

    render(
      <ContactCommandSurface
        surface={contactSurface}
        founderHref="https://calendly.com/f-shamim/client-call"
        onStartConversation={onStartConversation}
        mailHref="mailto:test@example.com"
      />,
    );

    expect(screen.getByLabelText(/start with one workflow/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /show us one workflow/i })).toBeInTheDocument();
    expect(screen.getByText(/get to a clear first step\./i)).toBeInTheDocument();
    expect(screen.getByText(/one workflow first/i)).toBeInTheDocument();
    expect(screen.getByText(/describe the workflow/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /book strategy call/i })).toHaveAttribute(
      'href',
      'https://calendly.com/f-shamim/client-call',
    );
    expect(screen.getByRole('button', { name: /talk to agent ada/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open ada conversation/i })).toBeInTheDocument();
    expect(screen.getByText(/^ready$/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /open ada conversation/i }));
    expect(onStartConversation).toHaveBeenCalledTimes(1);
  });

  it('stores sprint 5 motion and contact surfaces as structured data', () => {
    expect(motionSections).toHaveLength(9);
    expect(motionSections.slice(0, 4).map((section) => section.id)).toEqual([
      'hero',
      'problems',
      'solution',
      'capabilities',
    ]);
    motionSections.forEach((section) => {
      expect(section.narration).toHaveLength(2);
    });
    expect(contactSurface.signals).toHaveLength(3);
    expect(contactSurface.steps).toHaveLength(3);
    expect(contactSurface.notes).toHaveLength(2);
  });
});
