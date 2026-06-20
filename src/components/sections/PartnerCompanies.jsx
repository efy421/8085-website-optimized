import React from 'react';
import '../../styles/partnercompanies.css';

const PartnerCompanies = () => {
  const partners = [
    { 
      name: 'Cologne Intelligence GmbH', 
      logo: '/images/partners-logo-ci.webp',
      alt: 'Cologne Intelligence Logo'
    },
    { 
      name: 'Audi GmbH', 
      logo: '/images/partners-logo-audi.svg',
      alt: 'Audi Logo'
    },
    { 
      name: 'Pixum AG', 
      logo: '/images/partners-logo-pixum.png',
      alt: 'Pixum Logo'
    },
    { 
      name: 'Deutsche Post AG', 
      logo: '/images/partners-logo-dp.svg',
      alt: 'Deutsche Post Logo'
    },
    { 
      name: 'DHL Global Mail', 
      logo: '/images/partners-logo-dhl.svg',
      alt: 'DHL Global Mail Logo'
    },
    { 
      name: 'Post Bank Germany', 
      logo: '/images/partners-logo-postbank.svg',
      alt: 'Post Bank Germany Logo'
    },
    { 
      name: 'Mubea GmbH', 
      logo: '/images/partners-logo-mubea.svg',
      alt: 'Mubea Logo'
    },
    { 
      name: 'ifb group AG', 
      logo: '/images/partners-logo-ifbag.svg',
      alt: 'ifb Group Logo'
    },
    { 
      name: 'ABB Germany', 
      logo: '/images/partners-logo-abb.svg',
      alt: 'ABB Germany Logo'
    },
    { 
      name: 'Bayer AG', 
      logo: '/images/partners-logo-bayer.svg',
      alt: 'Bayer AG Logo'
    }
  ];
  
  return (
    <section id="partners" className="partners-section">
      {/* Header Section with Equal Height */}
      <div className="partners-header">
        <div className="header-content">
          <h2 className="section-title">Companies we've proudly worked with</h2>
        </div>
      </div>
      
      {/* Rolling Strip Section with Yellow Background */}
      <div className="partners-strip-wrapper">
        <div className="partners-strip-container">
          <div className="partners-strip">
            {/* First copy of partners for infinite scroll effect */}
            {partners.map((partner, index) => (
              <div key={`partner-1-${index}`} className="partner-logo">
                <div className="logo-container">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.alt} 
                      className="company-logo"
                      loading="lazy"
                    />
                  ) : (
                    <div className="logo-fallback">
                      <span className="company-name-text">{partner.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Second copy of partners for infinite scroll effect */}
            {partners.map((partner, index) => (
              <div key={`partner-2-${index}`} className="partner-logo">
                <div className="logo-container">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.alt} 
                      className="company-logo"
                      loading="lazy"
                    />
                  ) : (
                    <div className="logo-fallback">
                      <span className="company-name-text">{partner.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCompanies;
