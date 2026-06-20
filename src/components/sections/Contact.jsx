import React from 'react';
import '../../styles/contact.css';

const Contact = ({ onStartConversation }) => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-content">
        <div className="contact-main">
          <h1 className="contact-h1">Ready to Connect the Dots?</h1>
          
          <h2 className="contact-h2">Meet Ada, Our AI Assistant</h2>
          
          <p className="chloe-description">
            Start conversation now and book a free consultation.
          </p>
          
          <button 
            className="start-conversation-btn"
            onClick={onStartConversation}
            aria-label="Start conversation with Ada"
          >
            <svg className="mic-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            Start Conversation
          </button>
          
          <div className="chloe-avatar">
            <img 
              src="/images/contact-avatar-chloe.png" 
              alt="Ada AI Assistant Avatar" 
              className="avatar-image"
              loading="lazy"
            />
          </div>
          
          <p className="email-text">Or contact via email</p>
          
          <a href="mailto:ada@8085.ai" className="email-button">
            <svg className="email-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Send email
          </a>
          
          <div className="brand-text">8085.ai</div>
          
          <p className="tagline">Transforming lives and work through intelligent problem solving</p>
        </div>
      </div>
      
      <div className="social-strip">
        <div className="social-content">
          <div className="social-icons">
            <a href="https://linkedin.com/company/8085ai" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <div className="powered-by">Powered by 8085 web agent</div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
