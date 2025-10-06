import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (target: string | Element | Element[]) => {
  gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const slideInLeft = (target: string | Element | Element[]) => {
  gsap.fromTo(
    target,
    { opacity: 0, x: -60 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const slideInRight = (target: string | Element | Element[]) => {
  gsap.fromTo(
    target,
    { opacity: 0, x: 60 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const heroGradientPulse = (target: string | Element) => {
  gsap.to(target, {
    background: "linear-gradient(135deg, #990000, #ff6f61, #fae1dd)",
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
};

export const scrollReveal = (target: string | Element | Element[]) => {
  gsap.utils.toArray(target).forEach((el) => {
    gsap.from(el as Element, {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el as Element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
};

export const staggerReveal = (target: string | Element | Element[], stagger: number = 0.15) => {
  gsap.utils.toArray(target).forEach((el, index) => {
    gsap.from(el as Element, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: index * stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el as Element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
};

export const parallaxScroll = (target: string | Element, speed: number = 0.5) => {
  gsap.to(target, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const breathingAnimation = (target: string | Element) => {
  gsap.to(target, {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
};

export const bounceOnce = (target: string | Element) => {
  gsap.to(target, {
    y: -10,
    duration: 0.3,
    ease: "power2.out",
    yoyo: true,
    repeat: 1,
  });
};
