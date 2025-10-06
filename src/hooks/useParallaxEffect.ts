import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useParallaxEffect(targetRef: React.RefObject<HTMLElement>, speed = 0.3) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: true,
      },
    });
  }, [targetRef, speed]);
}
