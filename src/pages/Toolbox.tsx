import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Linkedin } from 'lucide-react';
import toolboxData from '../data/toolbox.json';
import HepMetrics from '../utils/HepMetrics';
import LogoGrid from '../components/LogoGrid';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Toolbox() {
  const [activeTab, setActiveTab] = useState('strengths');
  const [stackCategory, setStackCategory] = useState('all');

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-semibold mb-6"
                variants={slideUp}
              >
                🛠️ Professional Toolbox
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                variants={slideUp}
              >
                Tools I <span className="text-cyan-400">Reach For</span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-300 mb-8 leading-relaxed"
                variants={slideUp}
              >
                A comprehensive overview of my technical expertise and professional capabilities. From strategy and architecture to problem-solving and scalable marketing systems.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-8"
                variants={slideUp}
              >
                <button
                  className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors flex items-center gap-2"
                  onClick={() => HepMetrics.logEvent({ type: 'toolbox_click', id: 'linkedin', source: 'toolbox' })}
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </button>
                <button
                  className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                  onClick={() => HepMetrics.logEvent({ type: 'toolbox_click', id: 'profile', source: 'toolbox' })}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </button>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              variants={slideUp}
            >
              <div className="w-full max-w-md mx-auto">
                <img
                  src="/assets/personal/professional-headshot.jpg"
                  alt="Jacob Darling - Professional Headshot"
                  className="w-full rounded-2xl shadow-2xl border border-white/10"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {[
            { id: 'strengths', label: 'Core Strengths' },
            { id: 'spotlights', label: 'Technical Spotlights' },
            { id: 'playbooks', label: 'My Playbooks' },
            { id: 'stack', label: 'My Stack' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyan-400 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              variants={slideUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Sections */}
        {activeTab === 'strengths' && (
          <motion.section
            key="strengths"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
              Core Strengths
            </h2>
            <p className="text-center text-slate-300 mb-12 max-w-3xl mx-auto">
              What I'm hired to do. These are the foundational capabilities that drive results and solve complex technical challenges.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolboxData.competencies.map((competency: any, index: number) => (
                <motion.div
                  key={index}
                  className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                  variants={slideUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-cyan-400 text-4xl mb-4">
                    {competency.icon || '🔧'}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {competency.title}
                  </h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {competency.description}
                  </p>
                  {competency.highlights && (
                    <ul className="space-y-2">
                      {competency.highlights.map((highlight: string, idx: number) => (
                        <li key={idx} className="text-sm text-slate-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'spotlights' && (
          <motion.section
            key="spotlights"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
              Technical Spotlights
            </h2>
            <p className="text-center text-slate-300 mb-12 max-w-3xl mx-auto">
              From problem to impact. Real examples of technical problem-solving that showcase strategic thinking and execution.
            </p>
            <div className="space-y-8">
              {toolboxData.spotlights.map((spotlight: any, index: number) => (
                <motion.div
                  key={index}
                  className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                  variants={slideUp}
                >
                  <h3 className="text-2xl font-bold mb-6 text-white">
                    {spotlight.title}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                        🔴 Problem
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {spotlight.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                        🔵 Action
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {spotlight.action}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                        🟢 Impact
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {spotlight.impact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'playbooks' && (
          <motion.section
            key="playbooks"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
              My Playbooks
            </h2>
            <p className="text-center text-slate-300 mb-12 max-w-3xl mx-auto">
              Repeatable solutions for complex problems. Strategic frameworks that demonstrate maturity and scalable thinking.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {toolboxData.playbooks && toolboxData.playbooks.map((playbook: any, index: number) => (
                <motion.div
                  key={index}
                  className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                  variants={slideUp}
                >
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {playbook.title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {playbook.description}
                  </p>
                  {playbook.steps && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Key Steps</h4>
                      <ul className="space-y-2">
                        {playbook.steps.map((step: string, idx: number) => (
                          <li key={idx} className="text-sm text-slate-400 flex items-start">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {playbook.link && (
                    <a
                      href={playbook.link}
                      className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-semibold"
                    >
                      View Steps →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'stack' && (
          <motion.section
            key="stack"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
              My Tech Stack
            </h2>
            <p className="text-center text-slate-300 mb-12 max-w-3xl mx-auto">
              The tools and platforms I use to build, deploy, and scale solutions. Hover over each logo to see where I&apos;ve applied it.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {
                [
                  { id: 'all', label: 'All Tools' },
                  { id: 'dev', label: 'Development' },
                  { id: 'cloud', label: 'Cloud & Infra' },
                  { id: 'marketing', label: 'Marketing' },
                  { id: 'creative', label: 'Design' },
                  { id: 'cms', label: 'CMS' },
                  { id: 'automation', label: 'Automation' }
                ].map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => setStackCategory(filter.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      stackCategory === filter.id
                        ? 'bg-cyan-400 text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    variants={slideUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter.label}
                  </motion.button>
                ))
              }
            </div>

            {/* Logo Grid */}
            <LogoGrid
              category={stackCategory}
              columns={4}
              animation={true}
              themeAware={true}
            />
          </motion.section>
        )}
      </div>
    </main>
  );
}
