import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from '../sections/Hero';
import Problems from '../sections/Problems';
import Solutions from '../sections/Solutions';
import HowWeWork from '../sections/HowWeWork';
import Services from '../sections/Services';
import Projects from '../sections/Projects';
import Trust from '../sections/Trust';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';
import Footer from './Footer';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function LandingPage() {
  useScrollReveal();

  useEffect(() => {
    const page = document.querySelector('.landing-page');
    if (!page) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      page.style.setProperty('--landing-motion-progress', progress);
      page.style.setProperty('--landing-motion-progress-percent', `${progress * 100}%`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-signal-current" aria-hidden="true">
        <div className="landing-signal-current__wash" />
      </div>
      <main id="main-content">
        <Navbar />
        <Hero />
        <Problems />
        <Solutions />
        <HowWeWork />
        <Services />
        <Projects />
        <Trust />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
