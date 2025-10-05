import React, { useEffect, useState } from 'react';

const quotes = [
  { q: 'Jacob transformed our chaotic marketing operations into a streamlined, data-driven system that actually works.', a: 'Marketing Director' },
  { q: 'His ability to bridge technical complexity and business strategy is exactly what growing companies need.', a: 'VP of Operations' },
  { q: 'Creative and reliable; he delivers measurable impact.', a: 'Partner, Law Firm' },
];

const TestimonialCarousel: React.FC = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const it = quotes[i];
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 shadow-xl dark:from-black/30 dark:to-black/10">
        <div className="mb-3 text-yellow-300">★★★★★</div>
        <blockquote className="text-lg">“{it.q}”</blockquote>
        <div className="mt-3 text-sm opacity-70">— {it.a}</div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
