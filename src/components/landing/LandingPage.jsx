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

  return (
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
  );
}
