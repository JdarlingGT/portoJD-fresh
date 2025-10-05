import React from 'react';
import Hero from './Hero';
import StatsKPI from '../ui/StatsKPI';
import TestimonialCarousel from '../ui/TestimonialCarousel';
import QuizRecommender from '../ui/QuizRecommender';
import DesignGallery from '../ui/DesignGallery';
import SongReveal from '../ui/SongReveal';

const HomeComposition: React.FC = () => {
  return (
    <>
      <Hero />
      <StatsKPI />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold">Explore My Work</h2>
        <p className="opacity-80">Strategy, systems, and measurable results.</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <a href="/#about" className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 dark:bg-black/20">About</a>
          <a href="/case-studies" className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 dark:bg-black/20">Case Studies</a>
          <a href="/skills" className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 dark:bg-black/20">Toolbox</a>
        </div>
      </section>
      <TestimonialCarousel />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <QuizRecommender />
      </section>
      <DesignGallery />
      <SongReveal />
    </>
  );
};

export default HomeComposition;
