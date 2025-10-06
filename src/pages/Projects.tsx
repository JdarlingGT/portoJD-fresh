import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Sparkles } from 'lucide-react';
import ProjectCard from '../components/blocks/ProjectCard';
import ProjectFilter from '../components/blocks/ProjectFilter';
import projectsJson from '../data/technical-projects.json';
import type { TechnicalProjectsData } from '../types/content';

const projectsData = projectsJson as TechnicalProjectsData;

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  const filteredProjects = useMemo(() => {
    return projectsData.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Projects' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code2 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Technical <span className="text-cyan-400">Projects</span>
            </h1>
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
            A comprehensive collection of technical solutions I've architected and built—from AI-powered
            automation systems to enterprise-grade security infrastructure. Each project solved real business
            challenges and delivered measurable impact.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{projectsData.stats.totalProjects}</div>
              <div className="text-sm text-slate-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{projectsData.stats.totalImpact}</div>
              <div className="text-sm text-slate-400">Users Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{projectsData.stats.technologies}+</div>
              <div className="text-sm text-slate-400">Technologies Used</div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by title, category, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ProjectFilter
            categories={projectsData.categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-slate-400">
              Try adjusting your search terms or selecting a different category.
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            These projects represent just a fraction of what's possible when technical expertise
            meets strategic thinking. Let's discuss how I can help solve your next challenge.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors font-semibold"
          >
            <span>Start a Conversation</span>
            <Code2 className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
