import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Project {
  logo: string;
  title: string;
  summary: string;
  metrics?: Record<string, string>;
  caseStudyRoute?: string;
}

interface VisualFetchCardProps {
  projects: Project[];
  onClose: () => void;
}

const VisualFetchCard: React.FC<VisualFetchCardProps> = ({ projects, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={cardRef}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Project Previews</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
            >
              <img
                src={project.logo}
                alt={project.title}
                className="w-16 h-16 mb-4 object-contain mx-auto"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-white mb-2 text-center">{project.title}</h3>
              <p className="text-gray-300 text-sm text-center">{project.summary}</p>
              {project.caseStudyRoute && (
                <a
                  href={project.caseStudyRoute}
                  className="block mt-4 text-center text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  View Case Study →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualFetchCard;
