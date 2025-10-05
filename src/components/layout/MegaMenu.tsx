import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

const link = (href: string, label: string, sub?: string) => (
  <a href={href} className="group block rounded-lg p-3 hover:bg-white/5 focus:bg-white/10 focus:outline-none">
    <div className="text-sm font-medium">{label}</div>
    {sub && <div className="text-xs opacity-70 group-hover:opacity-90">{sub}</div>}
  </a>
);

const MegaMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);
  return (
    <nav className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-black/30 text-white dark:bg-black/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="font-semibold tracking-wide">JD</a>
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(v=>!v)} className="rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/10">Menu</button>
          <ThemeToggle />
        </div>
      </div>
      <div ref={ref} className={`transition-[max-height] duration-300 overflow-hidden ${open ? 'max-h-[520px]' : 'max-h-0'}`}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-6 pt-2 sm:grid-cols-3">
          <div>
            <div className="mb-2 text-xs uppercase opacity-70">About & Expertise</div>
            <div className="grid gap-1">
              {link('/#about', 'Who I Am', 'Hybrid strategist + systems architect')}
              {link('/#journey', 'Career Timeline', 'Progression & highlights')}
              {link('/skills', 'Areas of Expertise', 'Automation, Analytics, Infra')}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase opacity-70">Case Studies</div>
            <div className="grid gap-1">
              {link('/case-studies', 'All Case Studies', 'Filter by category')}
              {link('/case-studies#graston', 'Graston Technique®', 'Full-stack marketing & systems')}
              {link('/case-studies#black-letter-legal', 'Black Letter Legal', 'B2B lead generation engine')}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase opacity-70">Resources</div>
            <div className="grid gap-1">
              {link('/tools/roi-calculator', 'ROI Calculator', 'Estimate automation impact')}
              {link('/#design-gallery', 'Design Gallery', 'Lightweight external album')}
              {link('/#contact', 'Contact', 'Let’s work together')}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MegaMenu;
