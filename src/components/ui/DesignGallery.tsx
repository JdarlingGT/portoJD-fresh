import React, { useEffect, useRef, useState } from 'react';

const ALBUM_EMBED_URL = 'https://embeds.lightroom.adobe.com/gallery/placeholder'; // replace with your album url

const DesignGallery: React.FC = () => {
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setLoad(true); io.disconnect(); }
    }, { rootMargin: '200px' });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="design-gallery" className="relative mx-auto max-w-5xl px-4 py-16 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/assets/backgrounds/layered-waves-haikei.svg')` }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold">Design Gallery</h2>
        <p className="mt-2 opacity-80">Selected digital design work. Loads on demand to keep the site fast.</p>
        <div ref={ref} className="mt-6 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 dark:bg-black/20">
          {load ? (
            <iframe
              title="Lightroom Gallery"
              className="h-full w-full"
              loading="lazy"
              src={ALBUM_EMBED_URL}
              allow="fullscreen"
            />
          ) : (
            <div className="flex h-full items-center justify-center opacity-70">Scroll to load gallery…</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesignGallery;
