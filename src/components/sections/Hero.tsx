import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInUp, heroGradientPulse, parallaxScroll } from '../../utils/gsapAnimations';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const words = ['Strategy', 'Automation', 'Brand Architecture', 'Analytics', 'Systems'];

const Hero: React.FC = () => {
  const [i, setI] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('logoAnimated');
    if (!visited) {
      setHasAnimated(false);
      localStorage.setItem('logoAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Hero text animations
    if (titleRef.current) fadeInUp(titleRef.current);
    if (subtitleRef.current) fadeInUp(subtitleRef.current);
    if (focusRef.current) fadeInUp(focusRef.current);

    // Hero gradient pulse animation
    if (gradientRef.current) {
      heroGradientPulse(gradientRef.current);
    }

    // Parallax effect for the entire hero content
    if (heroRef.current) {
      parallaxScroll(heroRef.current, 0.3);
    }

    // Enhanced gradient scroll effect
    if (gradientRef.current) {
      gsap.to(gradientRef.current, {
        background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 0%, transparent 50%, rgba(6, 182, 212, 0.1) 100%)',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <header ref={heroRef} className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex items-center" style={{ backgroundImage: `url('/assets/backgrounds/stacked-peaks-haikei.svg')` }}>
      <div ref={gradientRef} className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent dark:from-cyan-400/20" />
      <div className="mx-auto max-w-5xl px-4 py-24 text-center relative z-10">
        <motion.img
          ref={logoRef}
          src="/assets/JD Logo.png"
          alt="JD Logo"
          className="h-20 w-auto mx-auto mb-6"
          initial={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: hasAnimated ? 0 : 0.5 }}
        />
        <h1 ref={titleRef} className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
          Jacob Darling — Brand Strategist & Marketing Architect
        </h1>
        <p ref={subtitleRef} className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300 opacity-90 mb-6">
          I connect creative vision with technical precision to build marketing ecosystems that scale.
        </p>
        <div ref={focusRef} className="mt-6 text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 opacity-80 mb-10">
          <span>Focus:&nbsp;</span>
          <span className="inline-block min-w-[10ch] animate-in fade-in-50 text-cyan-600 dark:text-cyan-400 font-medium">
            {words[i]}
          </span>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <a href="/case-studies" className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            View Case Studies
          </a>
          <a href="/assets/Jacob_Darling_Resume.pdf" className="rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            Download Résumé
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
