import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // disable on touch
    const d = dot.current!, r = ring.current!;
    let x = 0, y = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      d.style.transform = `translate(${x}px, ${y}px)`;
    };
    const tick = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(tick);
    };
    document.addEventListener('mousemove', onMove);
    requestAnimationFrame(tick);
    document.documentElement.classList.add('cursor-none');
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('cursor-none');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/70 backdrop-blur-sm h-10 w-10" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 h-1.5 w-1.5" />
    </>
  );
};

export default CustomCursor;
