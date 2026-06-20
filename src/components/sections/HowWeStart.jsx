import React from 'react';
import '../../styles/howwestart.css';

const HowWeStart = () => {
  const steps = [
    {
      id: "discovery",
      number: 1,
      title: "Discovery",
      text: "Let's connect to discover what's truly holding you back. We analyze where your time and resources are disappearing.",
      image: "/images/howwestart-illustrations-discovery.png",
      position: "top-left",
      color: "pink"
    },
    {
      id: "connect",
      number: 2,
      title: "Connect Critical Dots",
      text: "We find the key connections others miss – identifying where small changes create up to 80% improvements and up to 85% cost reductions.",
      image: "/images/howwestart-illustrations-connectcritical.png",
      position: "top-right",
      color: "yellow"
    },
    {
      id: "quickwin",
      number: 3,
      title: "Quick Win Delivery",
      text: "For a small initial fee, we deliver a focused solution with immediate impact. Feel the difference in weeks, not months.",
      image: "/images/howwestart-illustrations-quickwin.png",
      position: "bottom-left",
      color: "purple"
    },
    {
      id: "expand",
      number: 4,
      title: "Expand & Evolve",
      text: "With proven success, we build on your wins, continuously improving systems while eliminating inefficiencies across your life or work.",
      image: "/images/howwestart-illustration-expandandevolve.png",
      position: "bottom-right",
      color: "green"
    }
  ];
  
  return (
    <section id="how-we-start" className="how-we-start-section">
      <div className="section-header">
        <h2 className="section-title">How We Start</h2>
      </div>
      
      <div className="workflow-grid">
        {steps.map((step, index) => (
          <div key={step.id} className={`workflow-card workflow-card-${step.color} workflow-${step.position}`}>
            <div className="workflow-number">{step.number}</div>
            <div className="workflow-content">
              <h4 className="workflow-title">{step.title}</h4>
              <p className="workflow-text">{step.text}</p>
              <div className="workflow-image">
                <img 
                  src={step.image} 
                  alt={`${step.title} illustration`} 
                  loading="lazy"
                  className="workflow-illustration"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeStart;