import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/hero.css';
import CircuitCanvas from '../CircuitCanvas';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentVertical, setCurrentVertical] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const verticalTextRef = useRef(null);
  const animationsInitialized = useRef(false);

  const verticals = [
    {
      type: "Software Agencies",
      pain: "Retain clients through smarter AI powered solutions",
      market: "$650B",
      color: "#00ff88"
    },
    {
      type: "Fortune 500",
      pain: "Break free from $2M+ digital transformation failures",
      market: "$369B", 
      color: "#ff6b6b"
    },
    {
      type: "Amazon Agencies",
      pain: "Manual work won't wind your next client",
      market: "$30B",
      color: "#4ecdc4"
    },
    {
      type: "Business Process",
      pain: "Your process isn't complex-just unautomated", 
      market: "$21.7B",
      color: "#45b7d1"
    },
    {
      type: "Enterprise Software",
      pain: "Transform your legacy system nightmare",
      market: "$500B",
      color: "#f9ca24"
    }
  ];

  useEffect(() => {
    if (animationsInitialized.current) return;

    const initAnimations = () => {
      document.fonts.ready.then(() => {

        // Initial fade in animation
        gsap.fromTo(contentRef.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Manual scroll listener approach (same as header)
        const rootElement = document.getElementById('root');
        if (!rootElement) {
          return;
        }

        const handleScroll = () => {
          if (!headingRef.current || !subheadingRef.current) return;
          
          const scrollY = rootElement.scrollTop;
          
          // Simple progress: animate over first 600px of scroll
          const progress = Math.max(0, Math.min(scrollY / 600, 1));
          
          // Smooth slide up/down for heading visibility
          const easedProgress = gsap.parseEase("power2.out")(progress);
          const translateY = easedProgress * -100; // Slide up 100px
          headingRef.current.style.setProperty('transform', `translateY(${translateY}px)`, 'important');
          
          // Dramatic growth - exponential curve with larger range
          const growthProgress = Math.pow(progress, 0.5);
          const newFontSize = 1.8 + (growthProgress * 1.2);
          const newFontWeight = 400 + (growthProgress * 300);
          
          subheadingRef.current.style.setProperty('font-size', `${newFontSize}rem`, 'important');
          subheadingRef.current.style.setProperty('font-weight', newFontWeight, 'important');
        };

        rootElement.addEventListener('scroll', handleScroll, { passive: true });
        
        // Store cleanup function
        window.heroScrollCleanup = () => {
          rootElement.removeEventListener('scroll', handleScroll);
        };

        animationsInitialized.current = true;
      });
    };

    initAnimations();
    
    return () => {
      if (window.heroScrollCleanup) {
        window.heroScrollCleanup();
        delete window.heroScrollCleanup;
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Auto-cycle verticals with morphing animation
  useEffect(() => {
    const morphToNext = () => {
      if (!verticalTextRef.current) return;
      
      const tl = gsap.timeline();
      const nextIndex = (currentVertical + 1) % verticals.length;
      
      tl.to(verticalTextRef.current, {
        scale: 0.8,
        opacity: 0.3,
        duration: 0.3,
        ease: "power2.in"
      })
      .call(() => {
        setCurrentVertical(nextIndex);
      })
      .to(verticalTextRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    };

    const interval = setInterval(morphToNext, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVertical]);

  return (
    <section className="hero-section" ref={heroRef}>
      {/* Circuit canvas as background */}
      <div className="hero-canvas">
        <CircuitCanvas />
      </div>
      
      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-heading" ref={headingRef}>
          Break Free From Legacy Limitations
        </h1>
        
        <h2 className="hero-subheading" ref={subheadingRef}>
          Whether you&apos;re a <span 
            ref={verticalTextRef}
            className="highlight vertical-text" 
            style={{color: verticals[currentVertical].color}}
          >
            {verticals[currentVertical].type}
          </span>
        </h2>

        <div className="hero-pain-point">
          <p className="pain-text" style={{color: verticals[currentVertical].color}}
>{verticals[currentVertical].pain}</p>
          <span className="market-size">({verticals[currentVertical].market} market)</span>
        </div>
        
        <div className="hero-stats">
          <p>The <span className="highlight">80-85 Principle</span> powered by <span className="highlight-yellow">AI</span> changes everything</p>
        </div>
        
        <p className="hero-tagline">
          We connect the <span className="dots-text">dots</span> others can&apos;t see, turn your biggest operational 
          bottlenecks into competitive advantages through <span className="highlight-yellow">intelligent agentic systems</span>.
        </p>

        <p className="hero-guide-text">
          Tap down and see what when you connect <span className="dots-text">dots</span> 
        </p>
      </div>
    </section>
  );
};
export default Hero;
