import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      // Animate the hero section on load
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power2.out',
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-10">
        <Spline
          scene="https://prod.spline.design/4kbw-QRfQjMrn0ra/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
