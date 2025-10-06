import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Database, TrendingUp, Users } from 'lucide-react';
import { fadeInUp, staggerReveal } from '../../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: MessageSquare,
    value: 70,
    suffix: '%',
    label: 'Support Ticket Reduction',
  },
  {
    icon: Database,
    value: 400,
    suffix: '+',
    label: 'CRM Workflows',
  },
  {
    icon: TrendingUp,
    value: 40,
    suffix: '%',
    label: 'Conversion Increase',
  },
  {
    icon: Users,
    value: 35,
    suffix: '%',
    label: 'Lead Growth',
  },
];

const AnimatedNumber = ({ value, suffix, id }: { value: number; suffix: string; id: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { textContent: 0 },
      {
        textContent: value,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          once: true,
        },
      }
    );
  }, [value, suffix]);

  return <span ref={ref} id={id}>0{suffix}</span>;
};

const StatsSection = () => {
  useEffect(() => {
    // Fade in the section title
    fadeInUp('.stats-title');
    fadeInUp('.stats-subtitle');

    // Stagger reveal for stat cards
    staggerReveal('.stat-card', 0.1);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="stats-title text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Proven Results
          </h2>
          <p className="stats-subtitle text-lg text-gray-600 dark:text-gray-300">
            Delivering measurable impact across key business metrics
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl p-6 shadow-lg text-center border border-white/20 dark:border-gray-700/50"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-12 h-12 text-primary dark:text-primary/80" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} id={`stat-${index}`} />
              </div>
              <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
