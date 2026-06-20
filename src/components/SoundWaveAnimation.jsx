import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SoundWaveAnimation = ({ isActive, className = '' }) => {
  const waveRef = useRef(null);
  const barsRef = useRef([]);
  const containerRef = useRef(null);
  const [animationIntensity, setAnimationIntensity] = useState(1);

  useEffect(() => {
    if (!waveRef.current) return;

    const bars = barsRef.current;
    let animationTimeline;

    if (isActive) {
      // Enhanced sound wave animation with varying intensities
      animationTimeline = gsap.timeline({ repeat: -1 });
      
      // Animate container glow effect
      gsap.to(containerRef.current, {
        boxShadow: '0 0 30px rgba(255, 228, 225, 0.6)',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Create more dynamic wave patterns
      bars.forEach((bar, index) => {
        const delay = index * 0.05;
        const centerDistance = Math.abs(index - 10) / 10; // Distance from center
        const intensity = animationIntensity * (1 - centerDistance * 0.3);
        
        animationTimeline.to(bar, {
          scaleY: gsap.utils.random(0.3 * intensity, 1.8 * intensity),
          duration: gsap.utils.random(0.2, 0.6),
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            // Add slight color variation during animation
            gsap.to(bar, {
              backgroundColor: gsap.utils.random(['#FFE4E1', '#FF6B6B', '#FFB3B3']),
              duration: 0.1
            });
          }
        }, delay);
      });

      // Vary animation intensity periodically
      gsap.to({}, {
        duration: 2,
        repeat: -1,
        onUpdate: function() {
          setAnimationIntensity(0.7 + Math.sin(this.progress() * Math.PI * 4) * 0.4);
        }
      });

    } else {
      // Smooth exit animation
      gsap.to(containerRef.current, {
        boxShadow: '0 0 0px rgba(255, 228, 225, 0)',
        duration: 0.5,
        ease: 'power2.in'
      });

      gsap.to(bars, {
        scaleY: 0.2,
        backgroundColor: '#FFE4E1',
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.02
      });
    }

    return () => {
      if (animationTimeline) {
        animationTimeline.kill();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(bars);
    };
  }, [isActive, animationIntensity]);

  // Entrance animation on mount
  useEffect(() => {
    if (waveRef.current && barsRef.current.length > 0) {
      gsap.fromTo(barsRef.current, 
        { 
          scaleY: 0,
          opacity: 0 
        },
        { 
          scaleY: 0.2,
          opacity: 0.8,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.03
        }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`sound-wave-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80px',
        gap: '2px',
        padding: '15px',
        borderRadius: '20px',
        background: 'rgba(255, 228, 225, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 228, 225, 0.2)',
        transition: 'all 0.3s ease'
      }}
    >
      <div 
        ref={waveRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50px',
          gap: '2px'
        }}
      >
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            ref={el => barsRef.current[index] = el}
            className="sound-wave-bar"
            style={{
              width: index === 10 ? '4px' : '3px', // Center bar slightly wider
              height: '40px',
              backgroundColor: '#FFE4E1',
              borderRadius: '2px',
              transformOrigin: 'bottom',
              transform: 'scaleY(0.2)',
              opacity: 0.8,
              transition: 'background-color 0.2s ease'
            }}
          />
        ))}
      </div>
      
      {/* Speaking indicator */}
      {isActive && (
        <div 
          style={{
            position: 'absolute',
            bottom: '-25px',
            fontSize: '12px',
            color: '#8B5A2B',
            fontWeight: '500',
            opacity: 0.8
          }}
        >
          🎙️ Speaking...
        </div>
      )}
    </div>
  );
};

export default SoundWaveAnimation;
