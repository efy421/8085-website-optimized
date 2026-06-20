import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AgentHarnessStage from '../AgentHarnessStage';
import LatticeSystemMap from '../LatticeSystemMap';

describe('Sprint 7 harness and lattice polish', () => {
  it('reframes the harness as a layered control surface without faux window chrome', () => {
    render(<AgentHarnessStage reducedMotion />);

    expect(screen.getByLabelText(/what the system can work with/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^human review$/i)).toHaveLength(2);
    expect(screen.queryByText(/^Session$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Scoped$/)).not.toBeInTheDocument();
  });

  it('groups the lattice into routed workflow stages instead of floating support chips', () => {
    render(<LatticeSystemMap reducedMotion />);

    expect(screen.getByLabelText(/send the work to the right step/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/keep context and review/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/lattice routing cues/i)).not.toBeInTheDocument();
  });
});
