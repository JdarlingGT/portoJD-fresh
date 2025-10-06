import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HepMetrics from '../utils/HepMetrics';
import { 
  ArrowLeft, Clock, Target, Code2, Zap, CheckCircle,
  Bot, Calendar, CreditCard, BarChart3, Workflow, 
  Shield, Image, GitBranch
} from 'lucide-react';

const iconMap = {
  Bot, Calendar, CreditCard, BarChart3, Target, Workflow,
  Shield, Image, GitBranch
};

type ProjectData = typeof import('../data/technical-projects.json');

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ProjectData | null>(null);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    import('../data/technical-projects.json').then(m => {
      const projectData = m as any;
      setData(projectData);
      const foundProject = projectData.projects.find((p: any) => p.id === id);
      setProject(foundProject);
    });
  }, [id]);

  useEffect(() => {
    if (project?.id) {
      HepMetrics.logEvent({
        type: 'view_case_study',
        id: project.id,
        source: 'route'
      });
    }
  }, [project]);

  if (!data || !project) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Bot;

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start gap-6 mb-6">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color} border ${project.borderColor}`}>
              <IconComponent className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">
                  {project.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4" />
                  {project.timeline}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed">{project.tagline}</p>
            </div>
          </div>

          {/* Impact Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 font-semibold">
            <Target className="w-4 h-4" />
            <span>{project.impact}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Why Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-red-400 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                The Challenge
              </h2>
              <p className="text-slate-300 leading-relaxed">{project.why}</p>
            </motion.section>

            {/* Value Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                The Solution & Impact
              </h2>
              <p className="text-slate-300 leading-relaxed">{project.value}</p>
            </motion.section>

            {/* Technologies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center gap-2">
                <Code2 className="w-6 h-6" />
                Technologies & Tools
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Project Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl"
            >
              <h3 className="text-lg font-bold mb-4 text-cyan-400">Project Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Category</div>
                  <div className="font-semibold">{project.category}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Timeline</div>
                  <div className="font-semibold">{project.timeline}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Key Impact</div>
                  <div className="font-semibold text-green-400">{project.impact}</div>
                </div>
              </div>
            </motion.div>

            {/* Related Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl"
            >
              <h3 className="text-lg font-bold mb-4">Related Projects</h3>
              <div className="space-y-3">
                {data.projects
                  .filter((p: any) => p.id !== project.id && p.category === project.category)
                  .slice(0, 3)
                  .map((relatedProject: any) => {
                    const RelatedIcon = iconMap[relatedProject.icon as keyof typeof iconMap] || Bot;
                    return (
                      <Link
                        key={relatedProject.id}
                        to={`/projects/${relatedProject.id}`}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <RelatedIcon className="w-5 h-5 text-cyan-400" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm group-hover:text-cyan-400 transition-colors truncate">
                            {relatedProject.title}
                          </div>
                          <div className="text-xs text-slate-400">{relatedProject.category}</div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-2xl text-center"
            >
              <h3 className="text-lg font-bold mb-2">Interested in Similar Work?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Let's discuss how I can help solve your technical challenges.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-semibold text-sm"
              >
                <span>Get In Touch</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
