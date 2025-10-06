import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { staggerReveal } from '../../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  logo: string;
  title: string;
  summary: string;
  metrics: Record<string, string>;
  caseStudyRoute?: string;
}

const ProjectCards = () => {
  const projectModules = import.meta.glob('/src/data/projects/*.json', { eager: true });
  const projects: Project[] = Object.values(projectModules).map((mod) => (mod as { default: Project }).default);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Use stagger reveal for project cards
    staggerReveal('.project-card', 0.15);
  }, [projects]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {projects.map((project, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el!)}
          className="project-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {project.caseStudyRoute ? (
            <Link to={project.caseStudyRoute} className="block">
              <CardContent project={project} />
            </Link>
          ) : (
            <CardContent project={project} />
          )}
        </div>
      ))}
    </div>
  );
};

const CardContent = ({ project }: { project: Project }) => (
  <div className="p-6">
    <img
      src={project.logo}
      alt={project.title}
      loading="lazy"
      className="w-16 h-16 mb-4 object-contain"
    />
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.summary}</p>
    <div className="space-y-2">
      {Object.entries(project.metrics).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="font-medium text-gray-700 dark:text-gray-200 capitalize">{key}:</span>
          <span className="text-gray-600 dark:text-gray-400">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectCards;
