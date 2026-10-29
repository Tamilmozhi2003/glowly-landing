import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

// Internal component to sync Lenis with GSAP's ticker & ScrollTrigger
function LenisTickerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    window.lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis using GSAP's ticker for perfectly synchronized frame updates
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tickerUpdate);
      if (window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, [lenis]);

  return null;
}

/**
 * SmoothScroll wrapper providing buttery Lenis smooth scrolling
 * perfectly synchronized with GSAP animations & ScrollTrigger.
 */
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      <LenisTickerSync />
      {children}
    </ReactLenis>
  );
}
