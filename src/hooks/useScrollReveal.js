import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];

    if (prefersReduced) {
      document.querySelectorAll(revealClasses.join(',')).forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = document.querySelectorAll(revealClasses.join(','));
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
