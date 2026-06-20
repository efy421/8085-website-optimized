import React, { useState, useEffect, useRef } from 'react';
import '../styles/header.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [preventHover, setPreventHover] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const letsTalkBtnRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    let cleanup = null;
    
    const setupResponsiveAnimation = () => {
      if (!logoRef.current) {
        setTimeout(setupResponsiveAnimation, 100);
        return;
      }
      
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        return;
      }

      // Define responsive size ranges
      const sizeConfig = {
        desktop: { start: 12, end: 5 },    // 1024px+
        tablet: { start: 10, end: 4 },       // 768px-1023px  
        mobile: { start: 4, end: 3 }         // 0-767px
      };

      let currentConfig = sizeConfig.desktop;

      const updateConfig = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
          currentConfig = sizeConfig.desktop;
        } else if (width >= 768) {
          currentConfig = sizeConfig.tablet;
        } else {
          currentConfig = sizeConfig.mobile;
        }
      };

      const handleScroll = () => {
        if (!logoRef.current) return;
        
        const scrollY = rootElement.scrollTop;
        const maxScroll = 300;
        const scrollProgress = Math.min(scrollY / maxScroll, 1);
        
        const currentSize = currentConfig.start - (currentConfig.start - currentConfig.end) * scrollProgress;
        logoRef.current.style.setProperty('font-size', `${currentSize}rem`, 'important');
      };

      const handleResize = () => {
        updateConfig();
        handleScroll();
      };

      // Set initial config
      updateConfig();
      
      // Add event listeners
      rootElement.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      
      cleanup = () => {
        rootElement.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    };
    
    // Initialize button animations
    const initButtonAnimations = () => {
      if (arrowRef.current) {
        // Keep arrow visible initially with white color
        gsap.set(arrowRef.current, { 
          opacity: 1, 
          x: 0, 
          color: "#fff"
        });
      }
    };
    
    setupResponsiveAnimation();
    initButtonAnimations();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const openDropdown = () => {
    if (!preventHover) {
      setIsDropdownOpen(true);
    }
  };

  const closeDropdown = () => {
    if (!preventHover) {
      setIsDropdownOpen(false);
    }
  };

  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent hover from reopening dropdown
    setPreventHover(true);
    setIsDropdownOpen(false);
    
    // Clear the flag after a delay
    setTimeout(() => {
      setPreventHover(false);
    }, 500);
    
    // Perform scroll action
    setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
    }, 100);
  };

  // Button animation handlers
  const handleButtonHover = (e) => {
    if (!letsTalkBtnRef.current || !arrowRef.current) return;
    
    const rect = letsTalkBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple element
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      background: #F7D56F;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: -1;
    `;
    
    letsTalkBtnRef.current.appendChild(ripple);
    
    gsap.to(ripple, {
      width: 300,
      height: 300,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(arrowRef.current, {
      color: "#000",
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(letsTalkBtnRef.current, {
      color: "#000",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonLeave = () => {
    if (!letsTalkBtnRef.current || !arrowRef.current || isButtonPressed) return;
    
    // Remove ripple elements
    const ripples = letsTalkBtnRef.current.querySelectorAll('div');
    ripples.forEach(ripple => ripple.remove());
    
    gsap.to(letsTalkBtnRef.current, {
      backgroundColor: "#000",
      color: "#fff",
      duration: 0.2,
      ease: "power2.out"
    });
    gsap.to(arrowRef.current, {
      color: "#fff",
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleButtonPress = (e) => {
    if (!letsTalkBtnRef.current) return;
    setIsButtonPressed(true);
    
    const rect = letsTalkBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create white ripple for press
    const pressRipple = document.createElement('div');
    pressRipple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      background: #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: -1;
    `;
    
    letsTalkBtnRef.current.appendChild(pressRipple);
    
    gsap.to(pressRipple, {
      width: 280,
      height: 280,
      duration: 0.2,
      ease: "power2.out"
    });
    
    gsap.to(letsTalkBtnRef.current, {
      color: "#000",
      scale: 0.85,
      duration: 0.1,
      ease: "back.out(4)"
    });
    gsap.to(arrowRef.current, {
      color: "#000",
      duration: 0.1,
      ease: "power2.out"
    });
  };

  const handleButtonRelease = () => {
    if (!letsTalkBtnRef.current) return;
    setIsButtonPressed(false);
    
    gsap.to(letsTalkBtnRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "back.out(2)",
      onComplete: () => {
        const target = document.getElementById('contact');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        
        gsap.to(letsTalkBtnRef.current, {
          backgroundColor: "#000",
          color: "#fff",
          duration: 0.3
        });
        gsap.to(arrowRef.current, {
          color: "#fff",
          duration: 0.2
        });
      }
    });
  };

  return (
    <header ref={headerRef} className="sticky-header">
      {/* Dropdown Button and Menu (Left) */}
      <div 
        className="header-btn-container"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        <button className="header-btn">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span>Menu</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {/* Menu Items */}
            <ul className="dropdown-items">
              <li className="dropdown-item">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <a href="#home" onClick={(e) => handleScrollClick(e, 'hero')}>Home</a>
              </li>
              <li className="dropdown-item">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <a href="#who-we-are" onClick={(e) => handleScrollClick(e, 'who-we-are')}>Who We Are</a>
              </li>
              <li className="dropdown-item">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <a href="#founders" onClick={(e) => handleScrollClick(e, 'founders')}>Meet the Founders</a>
              </li>
              <li className="dropdown-item">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <a href="#partners" onClick={(e) => handleScrollClick(e, 'partners')}>References</a>
              </li>
              <li className="dropdown-item">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <a href="#how-we-start" onClick={(e) => handleScrollClick(e, 'how-we-start')}>How We Start</a>
              </li>
              <li className="dropdown-item">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <a href="#contact" onClick={(e) => handleScrollClick(e, 'contact')}>Contact</a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Logo (Center) */}
      <div>
        <div ref={logoRef} className="logo">
          <span>8085</span>
          <span className="dot">.</span>
          <span className="ai">ai</span>
        </div>
      </div>

      {/* Let's Talk Button (Right) */}
      <button 
        ref={letsTalkBtnRef}
        className="header-btn lets-talk-btn"
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
      >
        <span>Let&apos;s Talk</span>
        <svg 
          ref={arrowRef}
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="h-5 w-5"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
