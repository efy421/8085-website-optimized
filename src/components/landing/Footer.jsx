import landingContent from '../../data/landingContent';

const { footer } = landingContent;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a className="site-footer__logo" href="#hero" aria-label="8085.ai homepage">
              8085.ai
            </a>
            <p className="site-footer__description">{footer.brandDescription}</p>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Services</h3>
            <ul className="site-footer__list" role="list">
              {footer.servicesLinks.map((link) => (
                <li key={link.label}>
                  <a className="site-footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Company</h3>
            <ul className="site-footer__list" role="list">
              {footer.companyLinks.map((link) => (
                <li key={link.label}>
                  <a className="site-footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Connect</h3>
            <ul className="site-footer__list" role="list">
              {footer.connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="site-footer__link"
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            &copy; {new Date().getFullYear()} 8085.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
