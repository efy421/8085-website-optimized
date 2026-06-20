import React from 'react';
import '../../styles/meetthefounders.css';

const MeetTheFounders = () => {
  const founders = [
    {
      name: "Farhan Shamim",
      title: "CTO",
      image: "/images/founder-profileimage-farhan.jpg",
      quote: "The future isn't about clicking through endless interfaces – it's about having conversations with intelligent systems that understand us completely. We're building software that thinks, listens, and responds like a trusted partner.",
      borderColor: "#FFB3D9", // light pink
      linkedin: "https://linkedin.com/in/farhanshamim"
    },
    {
      name: "Sameer Shamim", 
      title: "COO",
      image: "/images/founder-profileimage-sameer.jpg",
      quote: "We're witnessing AI's transformation from unpredictable to reliable. As these systems become truly dependable, they'll handle the complexities that have held businesses back for decades.",
      borderColor: "#E6CCFF", // light purple
      linkedin: "https://linkedin.com/in/sameershamim"
    },
    {
      name: "Essam Shamim",
      title: "CMO", 
      image: "/images/founder-profileimage-essam.jpg",
      quote: "The companies that will dominate tomorrow aren't building bigger databases – they're building faster thinking. Success belongs to whoever can turn insight into action at the speed of thought.",
      borderColor: "#F7D56F", // yellow
      linkedin: "https://linkedin.com/in/essamshamim"
    }
  ];

  return (
    <section id="founders" className="meet-the-founders-section">
      <div className="founders-container">
        <div className="founders-header">
          <h2 className="founders-main-title">Meet the Founders</h2>
          <p className="founders-description">
            What started as three brothers solving problems for local businesses in Lahore, Pakistan, 
            has evolved into a mission to revolutionize how multinational corporations tackle their biggest challenges.
          </p>
        </div>

        <div className="founders-profiles">
          {founders.map((founder, _index) => (
            <div 
              key={founder.name}
              className="founder-profile"
            >
              <div className="founder-content">
                <div className="founder-image-container">
                  <img 
                    src={founder.image}
                    alt={founder.name}
                    className="founder-profile-image"
                    style={{ borderColor: founder.borderColor }}
                    loading="lazy"
                  />
                </div>
                
                <div className="founder-info">
                  <blockquote className="founder-quote">
                    &quot;{founder.quote}&quot;
                  </blockquote>
                  
                  <div className="founder-details">
                    <div className="founder-name-title">
                      <span className="founder-name">— {founder.name}</span>
                      <div className="founder-designation-row">
                        <span className="founder-designation">{founder.title}</span>
                        <a 
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkedin-icon-button"
                          aria-label={`Connect with ${founder.name} on LinkedIn`}
                        >
                          <svg 
                            className="linkedin-icon" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            width="16" 
                            height="16"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheFounders;