import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LandingPage from '../LandingPage';

vi.mock('../HeroShaderCanvas', () => ({
  default: () => <div data-testid="hero-shader" />,
}));

vi.mock('../CapabilitySceneDeck', () => ({
  default: () => <div data-testid="capability-scene-deck" />,
}));

vi.mock('../ContactCommandSurface', () => ({
  default: ({ headingId, surface }) => (
    <div data-testid="contact-command-surface">
      <h2 id={headingId}>{surface.title}</h2>
    </div>
  ),
}));

function installMatchMedia({ reducedMotion = false, mobile = false } = {}) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches:
        query === '(prefers-reduced-motion: reduce)'
          ? reducedMotion
          : query === '(max-width: 720px)'
            ? mobile
            : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe('Sprint 6 hardening and polish', () => {
  beforeEach(() => {
    installMatchMedia({ reducedMotion: true });
  });

  it('renders the hero, problems section, and trust strip in the new narrative order', () => {
    const onStartConversation = vi.fn();
    const { container } = render(<LandingPage onStartConversation={onStartConversation} />);
    const heroSection = container.querySelector('#hero');
    const problemsSection = container.querySelector('#problems');
    const trustSection = container.querySelector('.landing-trust-strip');

    if (!heroSection || !problemsSection || !trustSection) {
      throw new Error('Expected hero, problems, and trust sections to render.');
    }

    const heroQueries = within(heroSection);

    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#landing-main');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'landing-main');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
    expect(heroQueries.getByText(/^AI for real business workflows$/i)).toBeInTheDocument();
    expect(
      heroQueries.getByRole('heading', { name: /automate your team's repeatable work and grow output without headcount\./i }),
    ).toBeInTheDocument();
    expect(heroQueries.getByText(/start with one workflow/i)).toBeInTheDocument();
    expect(heroQueries.getByText(/built around your process/i)).toBeInTheDocument();
    expect(heroQueries.getByText(/you keep ownership/i)).toBeInTheDocument();
    expect(heroQueries.getByRole('link', { name: /book strategy call/i })).toHaveAttribute(
      'href',
      'https://calendly.com/f-shamim/client-call',
    );
    expect(heroQueries.getByRole('button', { name: /talk to agent ada/i })).toBeInTheDocument();

    expect(container.querySelector('#problems-title')).toHaveTextContent(/your team is stuck in repeatable work\./i);

    expect(within(trustSection).getAllByRole('img')).toHaveLength(6);

    fireEvent.click(heroQueries.getByRole('button', { name: /talk to agent ada/i }));
    expect(onStartConversation).toHaveBeenCalledTimes(1);
  });

  it('collapses mobile contact access into one hero action and a shared contact sheet', () => {
    installMatchMedia({ reducedMotion: true, mobile: true });

    const onStartConversation = vi.fn();
    const { container } = render(<LandingPage onStartConversation={onStartConversation} />);
    const heroSection = container.querySelector('#hero');
    const dockTrigger = container.querySelector('.landing-mobile-contact-dock__trigger');

    if (!heroSection || !(dockTrigger instanceof HTMLButtonElement)) {
      throw new Error('Expected mobile hero and contact dock to render.');
    }

    const heroQueries = within(heroSection);

    expect(container.querySelector('.landing-header-actions')).not.toBeInTheDocument();
    expect(heroQueries.getByRole('link', { name: /book strategy call/i })).toBeInTheDocument();
    expect(heroQueries.queryByRole('button', { name: /talk to agent ada/i })).not.toBeInTheDocument();

    fireEvent.click(dockTrigger);

    const dialog = screen.getByRole('dialog', { name: /book strategy call/i });
    const dialogQueries = within(dialog);

    expect(dialogQueries.getByRole('link', { name: /book strategy call/i })).toHaveAttribute(
      'href',
      'https://calendly.com/f-shamim/client-call',
    );
    expect(dialogQueries.getByRole('button', { name: /talk to agent ada/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /book strategy call/i })).not.toBeInTheDocument();

    fireEvent.click(dockTrigger);
    fireEvent.click(screen.getByRole('button', { name: /talk to agent ada/i }));

    expect(onStartConversation).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps reduced-motion mode while rendering the new 8-section narrative order', () => {
    const { container } = render(<LandingPage onStartConversation={vi.fn()} />);
    const problemsSection = container.querySelector('#problems');
    const solutionSection = container.querySelector('#solution');
    const capabilitiesSection = container.querySelector('#capabilities');
    const projectsSection = container.querySelector('#projects');
    const trustSection = container.querySelector('#trust');
    const faqSection = container.querySelector('#faq');
    const contactSection = container.querySelector('#contact');

    if (
      !problemsSection ||
      !solutionSection ||
      !capabilitiesSection ||
      !projectsSection ||
      !trustSection ||
      !faqSection ||
      !contactSection
    ) {
      throw new Error('Expected all 8 landing sections to render.');
    }

    expect(container.querySelector('.landing-page')).toHaveClass('landing-page--reduced-motion');
    expect(container.querySelector('#hero')).toHaveAttribute('data-signal-state', 'active');
    expect(container.querySelector('#problems')).toHaveAttribute('data-signal-state', 'upcoming');

    expect(container.querySelector('#problems')).toHaveAttribute('aria-labelledby', 'problems-title');
    expect(container.querySelector('#problems-title')).toHaveTextContent(/your team is stuck in repeatable work\./i);

    expect(container.querySelector('#solution')).toHaveAttribute('aria-labelledby', 'solution-title');
    expect(container.querySelector('#solution-title')).toHaveTextContent(/one workflow at a time\./i);
    expect(
      within(solutionSection).getByText(/^pick one workflow$/i, { selector: '.landing-hero-flow__title' }),
    ).toBeInTheDocument();

    expect(container.querySelector('#faq')).toHaveAttribute('aria-labelledby', 'faq-title');
    expect(container.querySelector('#faq-title')).toHaveTextContent(/questions we hear often\./i);

    expect(container.querySelector('#contact')).toHaveAttribute('aria-labelledby', 'contact-title');

    expect(problemsSection.compareDocumentPosition(solutionSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(projectsSection.compareDocumentPosition(trustSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(faqSection.compareDocumentPosition(contactSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
