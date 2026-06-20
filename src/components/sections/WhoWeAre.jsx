import React, { useEffect, useRef } from 'react';
import '../../styles/whoweare.css';

const WhoWeAre = () => {
  const sectionRef = useRef(null);
  const expertiseRef = useRef(null);
  const solutionsRef = useRef(null);
  const principleRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeIn');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (expertiseRef.current) observer.observe(expertiseRef.current);
    if (solutionsRef.current) observer.observe(solutionsRef.current);
    if (principleRef.current) observer.observe(principleRef.current);

    return () => {
      if (expertiseRef.current) observer.unobserve(expertiseRef.current);
      if (solutionsRef.current) observer.unobserve(solutionsRef.current);
      if (principleRef.current) observer.unobserve(principleRef.current);
    };
  }, []);

  return (
    <section id="who-we-are" className="who-we-are-section">
      <div className="section-title-wrapper">
        <h2 className="section-title">Who We Are</h2>
      </div>
      
      {/* Expertise Section */}
      <div ref={expertiseRef} className="section-card expertise-card opacity-0">
        <div className="card-content">
          <div className="card-text-content">
            <h3 className="card-title">Expertise That Delivers For You</h3>
            <p className="card-text">
              We are problem solvers at heart. With 17 years of experience, our team pinpoints the 
              critical friction points that slow you down. We connect the dots – 
              giving you back what matters most: time and results.
            </p>
          </div>
          <div className="card-image-wrapper">
            <img 
              src="/images/whoweare-illustrations-expertise.png" 
              alt="Expertise Illustration" 
              className="card-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      {/* Solutions Section */}
      <div ref={solutionsRef} className="section-card solutions-card opacity-0">
        <div className="card-content">
          <div className="card-text-content">
            <h3 className="card-title">Solutions Without Technology Limitations</h3>
            <p className="card-text">
              Your challenges aren't confined to a single technology, so neither are our solutions. 
              From mobile to AI, from web to spreadsheets to complex agent systems – we follow your 
              problem wherever it leads. Your solution matters, not our preferred tools.
            </p>
          </div>
          <div className="card-image-wrapper">
            <img 
              src="/images/whoweare-illustrations-solutions.png" 
              alt="Solutions Illustration" 
              className="card-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      {/* 80-85 Principle Section */}
      <div ref={principleRef} className="section-card principle-card opacity-0">
        <div className="card-content">
          <div className="card-text-content">
            <h3 className="card-title">With 80-85 Principle now possible with AI</h3>
            <div className="principle-stats">
              <div className="principle-stat-item">
                <span className="stat-number">80%</span>
                <span className="stat-text">Increase in performance</span>
              </div>
              <div className="principle-stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-text">Reduction in operational expenses</span>
              </div>
              <div className="principle-stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-text">Improvement in process efficiency</span>
              </div>
              <div className="principle-stat-item">
                <span className="stat-number">80%</span>
                <span className="stat-text">Of your time reclaimed for what matters most</span>
              </div>
            </div>
          </div>
          <div className="card-image-wrapper">
            <img 
              src="/images/whoweare-illustration-with8085.png" 
              alt="80-85 Principle Illustration" 
              className="card-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;