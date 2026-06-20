import { render } from '@testing-library/react';
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
  default: () => null,
}));

vi.mock('../ContactCommandSurface', () => ({
  default: ({ headingId, surface }) => (
    <div data-testid="contact-command-surface">
      <h2 id={headingId}>{surface.title}</h2>
    </div>
  ),
}));

function installMatchMedia(matchesReducedMotion) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? matchesReducedMotion : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe('Sprint 8 landing motion simplification', () => {
  beforeEach(() => {
    installMatchMedia(false);
  });

  it('keeps motion mode active without rendering the page-spanning signal current overlay or motion spine', () => {
    const { container, queryByTestId } = render(<LandingPage onStartConversation={vi.fn()} />);

    expect(container.querySelector('.landing-page')).toHaveClass('landing-page--motion-enhanced');
    expect(queryByTestId('signal-current')).not.toBeInTheDocument();
    expect(queryByTestId('motion-spine')).not.toBeInTheDocument();
    expect(container.querySelector('#hero')).toHaveAttribute('data-signal-state', 'active');
    expect(container.querySelector('#problems')).toHaveAttribute('data-signal-state', 'upcoming');
  });
});
