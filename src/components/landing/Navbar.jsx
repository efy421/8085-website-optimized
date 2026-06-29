import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#how-we-work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Primary navigation">
      <div className="container navbar__inner">
        <a className="navbar__logo" href="#hero" aria-label="8085.ai homepage">
          8085.ai
        </a>

        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a className="navbar__link" href={link.href} onClick={handleNavClick}>
                <span className="navbar__link-text">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a className="btn btn--primary navbar__cta" href="#contact">
          Book a Call
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        <button
          className="navbar__hamburger"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`navbar__hamburger-line ${menuOpen ? 'navbar__hamburger-line--open' : ''}`} />
          <span className={`navbar__hamburger-line ${menuOpen ? 'navbar__hamburger-line--open' : ''}`} />
          <span className={`navbar__hamburger-line ${menuOpen ? 'navbar__hamburger-line--open' : ''}`} />
        </button>
      </div>

      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`} role="list">
        {navLinks.map((link) => (
          <a key={link.href} className="navbar__mobile-link" href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
        <a className="btn btn--primary navbar__mobile-cta" href="#contact" onClick={handleNavClick}>
          Book a Call
        </a>
      </div>
    </nav>
  );
}
