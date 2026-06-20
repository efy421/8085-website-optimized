import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LandingPage from '../LandingPage';

vi.mock('../HeroShaderCanvas', () => ({
  default: () => <div data-testid="hero-shader" />,
}));

vi.mock('../CapabilitySceneDeck', () => ({
  default: () => <div data-testid="capability-scene-deck" />,
}));

vi.mock('../DifferentiationSplitSurface', () => ({
  default: () => <div data-testid="differentiation-surface" />,
}));

vi.mock('../TrustSurface', () => ({
  default: () => <div data-testid="trust-surface" />,
}));

vi.mock('../LandingMotionSpine', () => ({
  default: () => <aside data-testid="motion-spine" />,
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

  it('renders the founder-first hero, trust strip, and grounded workflow story', () => {
    const onStartConversation = vi.fn();
    const { container } = render(<LandingPage onStartConversation={onStartConversation} />);
    const heroSection = container.querySelector('#hero');
    const trustStrip = container.querySelector('.landing-trust-strip');
    const workflowStorySection = container.querySelector('#workflow-story');

    if (!heroSection || !trustStrip || !workflowStorySection) {
      throw new Error('Expected hero, trust strip, and workflow story to render.');
    }

    const heroQueries = within(heroSection);

    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#landing-main');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'landing-main');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
    expect(heroQueries.getByText(/^AI for real business workflows$/i)).toBeInTheDocument();
    expect(
      heroQueries.getByRole('heading', { name: /ai for the workflows your business already runs\./i }),
    ).toBeInTheDocument();
    expect(
      heroQueries.getByText(
        /8085 turns repeatable multi-step work into intelligent workflows, so your team can grow output without adding headcount\./i,
      ),
    ).toBeInTheDocument();
    expect(heroQueries.getByText(/start with one workflow/i)).toBeInTheDocument();
    expect(heroQueries.getByText(/built around your process/i)).toBeInTheDocument();
    expect(heroQueries.getByText(/you own what we build/i)).toBeInTheDocument();
    expect(heroQueries.getByRole('link', { name: /book founder call/i })).toHaveAttribute(
      'href',
      'https://calendly.com/f-shamim/client-call',
    );
    expect(heroQueries.getByRole('link', { name: /book founder call/i })).toHaveAttribute('target', '_blank');
    expect(heroQueries.getByRole('button', { name: /talk to agent ada/i })).toBeInTheDocument();
    expect(heroQueries.getByRole('link', { name: /request workflow review/i })).toHaveAttribute(
      'href',
      'mailto:ada@8085.ai?subject=8085%20Workflow%20Review',
    );

    expect(within(trustStrip).getByText(/trusted by teams from/i)).toBeInTheDocument();
    expect(within(trustStrip).getAllByRole('img')).toHaveLength(6);

    expect(container.querySelector('#workflow-story-title')).toHaveTextContent(
      /turn repeatable business work into an intelligent workflow\./i,
    );
    expect(within(workflowStorySection).getByText(/^before$/i)).toBeInTheDocument();
    expect(within(workflowStorySection).getByText(/^with 8085$/i)).toBeInTheDocument();
    expect(within(workflowStorySection).getByText(/^after$/i)).toBeInTheDocument();

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
    expect(heroQueries.getByRole('button', { name: /start a workflow review/i })).toBeInTheDocument();
    expect(heroQueries.queryByRole('link', { name: /book founder call/i })).not.toBeInTheDocument();
    expect(heroQueries.queryByRole('button', { name: /talk to agent ada/i })).not.toBeInTheDocument();
    expect(heroQueries.queryByRole('link', { name: /request workflow review/i })).not.toBeInTheDocument();

    fireEvent.click(heroQueries.getByRole('button', { name: /start a workflow review/i }));

    const dialog = screen.getByRole('dialog', { name: /start a workflow review/i });
    const dialogQueries = within(dialog);

    expect(dialogQueries.getByRole('link', { name: /book founder call/i })).toHaveAttribute(
      'href',
      'https://calendly.com/f-shamim/client-call',
    );
    expect(dialogQueries.getByRole('button', { name: /talk to agent ada/i })).toBeInTheDocument();
    expect(dialogQueries.getByRole('link', { name: /request workflow review/i })).toHaveAttribute(
      'href',
      'mailto:ada@8085.ai?subject=8085%20Workflow%20Review',
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /start a workflow review/i })).not.toBeInTheDocument();

    fireEvent.click(dockTrigger);
    fireEvent.click(screen.getByRole('button', { name: /talk to agent ada/i }));

    expect(onStartConversation).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps reduced-motion mode while rendering the new section order and later proof', () => {
    const { container } = render(<LandingPage onStartConversation={vi.fn()} />);
    const workflowStorySection = container.querySelector('#workflow-story');
    const howItWorksSection = container.querySelector('#agent-harness');
    const ownershipSection = container.querySelector('#security');
    const differenceSection = container.querySelector('#differentiation');
    const proofSection = container.querySelector('#proof');
    const contactSection = container.querySelector('#contact');

    if (
      !workflowStorySection ||
      !howItWorksSection ||
      !ownershipSection ||
      !differenceSection ||
      !proofSection ||
      !contactSection
    ) {
      throw new Error('Expected landing sections to render.');
    }

    expect(container.querySelector('.landing-page')).toHaveClass('landing-page--reduced-motion');
    expect(screen.queryByTestId('motion-spine')).not.toBeInTheDocument();
    expect(container.querySelector('#hero')).toHaveAttribute('data-signal-state', 'active');
    expect(container.querySelector('#workflow-story')).toHaveAttribute('data-signal-state', 'upcoming');

    expect(container.querySelector('#workflow-story')).toHaveAttribute('aria-labelledby', 'workflow-story-title');
    expect(container.querySelector('#agent-harness')).toHaveAttribute('aria-labelledby', 'agent-harness-title');
    expect(container.querySelector('#agent-harness-title')).toHaveTextContent(/start with one workflow\./i);
    expect(within(howItWorksSection).getByText(/^how it works$/i)).toBeInTheDocument();
    expect(
      within(howItWorksSection).getByText(/^pick one workflow$/i, { selector: '.landing-hero-flow__title' }),
    ).toBeInTheDocument();
    expect(
      within(howItWorksSection).getByText(/^your team stays in control$/i, {
        selector: '.landing-hero-flow__title',
      }),
    ).toBeInTheDocument();

    expect(container.querySelector('#security')).toHaveAttribute('aria-labelledby', 'security-title');
    expect(container.querySelector('#security-title')).toHaveTextContent(/you own what we build\./i);
    expect(container.querySelector('#differentiation')).toHaveAttribute('aria-labelledby', 'differentiation-title');
    expect(container.querySelector('#differentiation-title')).toHaveTextContent(
      /not a chatbot\. not a brittle script\./i,
    );
    expect(container.querySelector('#proof')).toHaveAttribute('aria-labelledby', 'proof-title');
    expect(container.querySelector('#proof-title')).toHaveTextContent(
      /the gains grow as the workflow gets more specialized\./i,
    );
    expect(within(proofSection).getByText(/^80%$/i)).toBeInTheDocument();
    expect(within(proofSection).getByText(/^same team$/i)).toBeInTheDocument();
    expect(within(proofSection).getByText(/^5x$/i)).toBeInTheDocument();
    expect(container.querySelector('#contact')).toHaveAttribute('aria-labelledby', 'contact-title');
    expect(container.querySelector('#contact-title')).toHaveTextContent(/show us one workflow\./i);

    expect(workflowStorySection.compareDocumentPosition(howItWorksSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(ownershipSection.compareDocumentPosition(differenceSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(proofSection.compareDocumentPosition(contactSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
