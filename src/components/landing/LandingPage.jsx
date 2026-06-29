import Navbar from './Navbar';
import Hero from '../sections/Hero';
import Trust from '../sections/Trust';
import Problems from '../sections/Problems';
import Solutions from '../sections/Solutions';
import HowWeWork from '../sections/HowWeWork';
import Services from '../sections/Services';
import Security from '../sections/Security';
import IntegrationHub from '../sections/IntegrationHub';
import Projects from '../sections/Projects';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';
import Footer from './Footer';
import useScrollReveal from '../../hooks/useScrollReveal';
import { useEffect } from 'react';

export default function LandingPage() {
  useScrollReveal();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const buttons = document.querySelectorAll('.btn');

    const handleMove = (e, btn) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.setProperty('--mx', `${x * 0.12}px`);
      btn.style.setProperty('--my', `${y * 0.12}px`);
    };

    const handleLeave = (btn) => {
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    };

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => handleMove(e, btn));
      btn.addEventListener('mouseleave', () => handleLeave(btn));
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener('mousemove', (e) => handleMove(e, btn));
        btn.removeEventListener('mouseleave', () => handleLeave(btn));
      });
    };
  }, []);

  return (
    <div className="landing-page">
      <div className="page-bg-agentic" aria-hidden="true">
        <div className="agentic-lines" />
        <div className="agentic-glow" />
        <div className="agentic-glow agentic-glow--2" />
        <div className="agentic-pings">
          <span /><span /><span /><span /><span /><span />
        </div>
        <div className="agentic-dust">
          <span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span />
        </div>
      </div>
      <div className="page-grain" aria-hidden="true" />
      <main id="main-content">
        <Navbar />
        <Hero />
        <Trust />
        <Problems />
        <Solutions />
        <HowWeWork />
        <Services />
        <Security />
        <IntegrationHub />
        <Projects />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}