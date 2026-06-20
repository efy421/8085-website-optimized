import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DifferentiationSplitSurface from '../DifferentiationSplitSurface';
import TrustSurface from '../TrustSurface';
import {
  differentiationSurface,
  proofSurface,
  trustStripSurface,
  trustSurface,
  workflowStorySurface,
} from '../landingSystemData';

describe('Sprint 4 differentiation and trust layers', () => {
  it('renders the differentiation section as a structured three-way comparison surface', () => {
    render(<DifferentiationSplitSurface surface={differentiationSurface} />);

    expect(screen.getByLabelText(/chat ai, traditional automation, and 8085 comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/good for answers and drafting\./i)).toBeInTheDocument();
    expect(screen.getByText(/good for fixed steps that rarely change\./i)).toBeInTheDocument();
    expect(screen.getByText(/built for repeatable work inside the business\./i)).toBeInTheDocument();
    expect(screen.getByText(/ai that works inside the workflow\./i)).toBeInTheDocument();
  });

  it('renders the trust layer as an ownership and control surface', () => {
    render(<TrustSurface surface={trustSurface} />);

    expect(screen.getByLabelText(/ownership and control/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /you own what we build\./i })).toBeInTheDocument();
    expect(screen.getByLabelText(/you own what we build\. details/i)).toBeInTheDocument();
    expect(screen.getByText(/built around your process/i)).toBeInTheDocument();
    expect(screen.getByText(/your team stays in control/i)).toBeInTheDocument();
    expect(screen.getByText(/how control stays visible/i)).toBeInTheDocument();
    expect(screen.getByText(/business logic/i)).toBeInTheDocument();
    expect(screen.getByText(/it becomes part of your business\./i)).toBeInTheDocument();
  });

  it('stores the later proof, trust strip, and workflow story as structured data', () => {
    expect(proofSurface.cards).toHaveLength(3);
    expect(proofSurface.cards.map((card) => card.value)).toEqual(['80%', 'Same team', '5x']);
    expect(trustStripSurface.logos).toHaveLength(6);
    expect(workflowStorySurface.cards.map((card) => card.label)).toEqual(['Before', 'With 8085', 'After']);
  });

  it('stores sprint 4 content as structured data', () => {
    expect(differentiationSurface.panels).toHaveLength(3);
    expect(differentiationSurface.summary.title).toMatch(/AI that works inside the workflow\./i);
    expect(trustSurface.lead.bullets).toHaveLength(3);
    expect(trustSurface.rails).toHaveLength(4);
    expect(trustSurface.lead.badges).toHaveLength(4);
    expect(proofSurface.note).toMatch(/results vary by workflow/i);
  });
});
