import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInUp } from '../../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

interface Logo {
  name: string;
  src: string;
}

const BrandLogosCarousel = () => {
  const logosData = [
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Vite', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
    { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
    { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Adobe Photoshop', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  ];
  const logos: Logo[] = logosData;
  const duplicatedLogos = [...logos, ...logos];
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      fadeInUp(containerRef.current);
    }

    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1,
      });
    }
  }, [duplicatedLogos]);

  return (
    <div ref={containerRef} className="overflow-hidden bg-gray-50 dark:bg-gray-900 py-8">
      <div ref={wrapperRef} className="flex">
        {duplicatedLogos.map((logo, index) => (
          <img
            key={`${logo.name}-${index}`}
            src={logo.src}
            alt={logo.name}
            className="w-20 h-20 object-contain flex-shrink-0 mx-4"
          />
        ))}
      </div>
    </div>
  );
};

export default BrandLogosCarousel;
