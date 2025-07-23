import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/Home.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface HeroTextProps {
  className?: string;
}

const HeroText: React.FC<HeroTextProps> = ({ className = '' }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const lines = [
    "Turn Your Business",
    "Into the Predator", 
    "Not the Prey"
  ];

  useEffect(() => {
    if (!textRef.current) return;

    const allChars = textRef.current.querySelectorAll('.char');
    
    // Set initial state for all characters
    gsap.set(allChars, {
      opacity: 0,
      scale: 0.3,
      rotateZ: -45,
      rotateY: 90,
      transformOrigin: 'center center',
      fontVariationSettings: '"wght" 100', // Start with thin font
    });

    // Create scroll-triggered animations for each line
    lines.forEach((line, lineIndex) => {
      const lineElement = textRef.current!.querySelector(`.line-${lineIndex}`);
      const lineChars = textRef.current!.querySelectorAll(`.line-${lineIndex} .char`);
      
      if (lineElement && lineChars.length > 0) {
        ScrollTrigger.create({
          trigger: lineElement,
          start: "top 80%", // Animation starts when line is 80% down the viewport
          end: "bottom 20%", // Animation completes when line is 20% from top
          onEnter: () => {
            // Animate characters when scrolling into view
            gsap.to(lineChars, {
              opacity: 1,
              scale: 1,
              rotateZ: 0,
              rotateY: 0,
              fontVariationSettings: '"wght" 900',
              duration: 0.8,
              stagger: {
                amount: 0.6,
                from: "start"
              },
              ease: "back.out(1.2)",
            });
          },
          onLeave: () => {
            // Optional: Reset animation when scrolling past
            gsap.to(lineChars, {
              opacity: 0,
              scale: 0.3,
              rotateZ: -45,
              rotateY: 90,
              fontVariationSettings: '"wght" 100',
              duration: 0.5,
              stagger: {
                amount: 0.3,
                from: "end"
              },
              ease: "power2.in",
            });
          },
          onEnterBack: () => {
            // Re-animate when scrolling back up
            gsap.to(lineChars, {
              opacity: 1,
              scale: 1,
              rotateZ: 0,
              rotateY: 0,
              fontVariationSettings: '"wght" 900',
              duration: 0.8,
              stagger: {
                amount: 0.6,
                from: "start"
              },
              ease: "back.out(1.2)",
            });
          },
          onLeaveBack: () => {
            // Reset when scrolling back past the top
            gsap.to(lineChars, {
              opacity: 0,
              scale: 0.3,
              rotateZ: -45,
              rotateY: 90,
              fontVariationSettings: '"wght" 100',
              duration: 0.5,
              stagger: {
                amount: 0.3,
                from: "end"
              },
              ease: "power2.in",
            });
          }
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Split text into individual characters while preserving spaces
  const renderAnimatedText = (text: string, lineIndex: number) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="char"
        style={{
          position: 'relative',
          display: 'inline-block',
          transformStyle: 'preserve-3d',
          transition: 'font-variation-settings 0.8s ease',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div
      ref={textRef}
      className={`hero-text-container ${className}`}
      style={{
        position: 'relative',
        width: '100vw',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
        overflow: 'visible',
      }}
    >
      {/* Line 1: Top left */}
      <div 
        className="text-line line-0"
        style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          transform: 'translateX(0)',
          maxWidth: '90vw',
        }}
      >
        <h1
          style={{
            fontFamily: 'Fractul, system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: 0,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            textAlign: 'left',
          }}
        >
          {renderAnimatedText(lines[0], 0)}
        </h1>
      </div>

      {/* Line 2: Center */}
      <div 
        className="text-line line-1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '95vw',
        }}
      >
        <h1
          style={{
            fontFamily: 'Fractul, system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: 0,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {renderAnimatedText(lines[1], 1)}
        </h1>
      </div>

      {/* Line 3: Bottom right */}
      <div 
        className="text-line line-2"
        style={{
          position: 'absolute',
          top: '60%',
          right: '5%',
          transform: 'translateX(0)',
          maxWidth: '90vw',
        }}
      >
        <h1
          style={{
            fontFamily: 'Fractul, system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: 0,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            textAlign: 'right',
          }}
        >
          {renderAnimatedText(lines[2], 2)}
        </h1>
      </div>
    </div>
  );
};

export default HeroText;