import React from 'react';
import CapabilitySurfaceCard from './CapabilitySurfaceCard';
import { capabilityScenes } from './landingSystemData';

function CapabilitySceneDeck() {
  return (
    <div className="landing-workflow-stack">
      {capabilityScenes.map((scene, index) => (
        <CapabilitySurfaceCard key={scene.id} scene={scene} reversed={index % 2 === 1} />
      ))}
    </div>
  );
}

export default CapabilitySceneDeck;
