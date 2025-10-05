import React, { useEffect, useState } from 'react';

const words = ['Strategy', 'Automation', 'Brand Architecture', 'Analytics', 'Systems'];

const Hero: React.FC = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent dark:from-cyan-400/20" />
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Jacob Darling — Brand Strategist & Marketing Architect
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg opacity-90">
          I connect creative vision with technical precision to build marketing ecosystems that scale.
        </p>
        <div className="mt-6 text-sm uppercase tracking-widest opacity-80">
          <span>Focus:&nbsp;</span>
          <span className="inline-block min-w-[10ch] animate-in fade-in-50">
            {words[i]}
          </span>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <a href="/case-studies" className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-400">View Case Studies</a>
          <a href="/assets/Jacob_Darling_Resume.pdf" className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10">Download Résumé</a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
