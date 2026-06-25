import useTilt from '../../hooks/useTilt';

export default function TiltCard({ children, className = '', ...props }) {
  const tiltRef = useTilt(2.5);

  return (
    <article
      className={`tilt-card ${className}`}
      ref={tiltRef}
      {...props}
    >
      {children}
    </article>
  );
}
