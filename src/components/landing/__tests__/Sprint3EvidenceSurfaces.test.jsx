import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AgentHarnessStage from '../AgentHarnessStage';
import CapabilitySceneDeck from '../CapabilitySceneDeck';
import LatticeSystemMap from '../LatticeSystemMap';
import * as landingData from '../landingSystemData';

describe('Sprint 3 evidence surfaces', () => {
  it('renders the Harness as a workspace shell instead of a diagram image', () => {
    render(<AgentHarnessStage reducedMotion />);

    expect(screen.getByLabelText(/agent harness work session/i)).toBeInTheDocument();
    expect(screen.getByText(/client-owned setup/i)).toBeInTheDocument();
    expect(screen.getByText(/a controlled work session/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/a controlled work session details/i)).toBeInTheDocument();
    expect(screen.getByText(/what the setup gives/i)).toBeInTheDocument();
    expect(screen.getByText(/it gives the system the tools, task context, memory, and review steps it needs\./i)).toBeInTheDocument();
    expect(screen.getByText(/why it stays controlled/i)).toBeInTheDocument();
    expect(screen.getByText(/each run stays inside a clear task, a clear limit, and a clear review path\./i)).toBeInTheDocument();
    expect(screen.getByText(/why it helps the team/i)).toBeInTheDocument();
    expect(screen.getByText(/work keeps moving without losing the human checks that matter\./i)).toBeInTheDocument();
    expect(screen.getByText(/what the system can work with/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^human review$/i)).toHaveLength(2);
    expect(screen.getByText(/why the setup matters/i)).toBeInTheDocument();
    expect(screen.getByText(/the setup is what makes ai useful in real work\./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/why the setup matters details/i)).toBeInTheDocument();
    expect(screen.getByText(/the setup gives ai the right tools and the right task context\./i)).toBeInTheDocument();
    expect(screen.getByText(/memory and review steps make the work usable inside the business\./i)).toBeInTheDocument();
    expect(screen.getByText(/that makes it feel more like a teammate and less like a script\./i)).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: /diagram showing the agent harness core/i }),
    ).not.toBeInTheDocument();
  });

  it('renders the Lattice as a network canvas instead of a diagram image', () => {
    render(<LatticeSystemMap reducedMotion />);

    expect(screen.getByLabelText(/the 8085 lattice workflow map/i)).toBeInTheDocument();
    expect(screen.getByText(/send the work to the right step/i)).toBeInTheDocument();
    expect(screen.getByText(/send back one clear result/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('img', {
        name: /diagram showing orchestration acting through the 8085 lattice/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('renders capability scenes as mini product surfaces instead of workflow diagrams', () => {
    render(<CapabilitySceneDeck reducedMotion />);

    expect(screen.getAllByLabelText(/workflow example/i)).toHaveLength(5);
    expect(screen.getByText(/consolidated findings pack/i)).toBeInTheDocument();
    expect(screen.getByText(/repeatable specialist runbook/i)).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /workflow diagram/i })).not.toBeInTheDocument();
  });

  it('stores Sprint 3 surfaces as structured data instead of diagram asset paths', () => {
    expect(landingData).not.toHaveProperty('agentHarnessGraphic');
    expect(landingData).not.toHaveProperty('latticeGraphic');
    expect(landingData).not.toHaveProperty('harnessLayers');
    expect(landingData).not.toHaveProperty('harnessSupportCards');
    expect(landingData).not.toHaveProperty('orchestrationBehaviors');
    expect(landingData.agentHarnessSurface.bodyPoints).toHaveLength(3);
    expect(landingData.agentHarnessSurface.captionPoints).toHaveLength(3);

    landingData.capabilityScenes.forEach((scene) => {
      expect(scene).not.toHaveProperty('diagram');
      expect(scene).not.toHaveProperty('diagramAlt');
      expect(scene).not.toHaveProperty('artifacts');
      expect(scene.heroArtifact.meta).toHaveLength(3);
      expect(scene.supportingFragments).toHaveLength(3);
    });
  });
});
