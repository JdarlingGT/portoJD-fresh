import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  Shield,
  Compass,
  Castle,
  BarChart3,
  Cog,
  CreditCard,
  Zap,
  GitBranch,
  Target,
  MapPin,
  Server,
  Search,
  Filter,
  ArrowRight,
  Clock,
  TrendingUp,
  Link2
} from "lucide-react";
import rawCaseStudies from "../data/caseStudies.json";
import { slideUp, staggerContainer } from "../styles/animations";
import type { CaseStudy } from "../types/content";

const FILTERS = [
  "All",
  "AI & Automation",
  "Analytics & Attribution",
  "Security & Performance",
  "Operations & Tools",
  "Sales & Payments",
  "DevOps & Deployment",
  "Frontend & UX",
  "Infrastructure & Reliability"
] as const;

const iconMap = {
  Rocket,
  Shield,
  Compass,
  Castle,
  BarChart3,
  Cog,
  CreditCard,
  Zap,
  GitBranch,
  Target: Target,
  Map: MapPin,
  Server: Server
};

const caseStudiesData = rawCaseStudies as CaseStudy[];

export default function CaseStudies() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");

  const items = useMemo(() => {
    const normalizedQuery = q.trim().toLowerCase();

    return caseStudiesData.filter((item) => {
      const matchFilter = filter === "All" || item.category === filter;
      const searchableFields = [item.title, item.subtitle, item.tags.join(" ")].join(" ").toLowerCase();
      return matchFilter && searchableFields.includes(normalizedQuery);
    });
  }, [q, filter]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Enhanced Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            📚 Case Studies & Deep Dives
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Project <span className="text-cyan-400">Deep Dives</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            From spark to system—real solutions, measurable impact. Each case study shows the problem,
            the approach, and the results that drive business growth.
          </p>

          {/* Stats Row */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{caseStudiesData.length}</div>
              <div className="text-sm text-slate-400">Case Studies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">6+</div>
              <div className="text-sm text-slate-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">70%</div>
              <div className="text-sm text-slate-400">Avg Impact</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search case studies by title, technology, or impact..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-400 whitespace-nowrap">Filter by:</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {FILTERS.map(filterOption => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-xl border transition-all duration-300 ${
                  filter === filterOption
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterOption}
                {filter === filterOption && (
                  <motion.span
                    className="ml-2 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ({items.length})
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Zap;
            return (
              <motion.article key={item.id} variants={slideUp}>
                <Link
                  to={`/deep/${item.slug}`}
                  className="group block p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 uppercase tracking-wide block">{item.category}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-500">5 min read</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 font-medium">{item.subtitle}</p>
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.slice(0, 4).map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">8-12 min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400 text-sm">Toolbox linked</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-semibold">
                        {item.impact}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        {items.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-300">No case studies found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your search terms or filters to find what you're looking for.</p>
            <button
              onClick={() => {setQ(""); setFilter("All");}}
              className="px-6 py-3 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Featured Case Studies Section */}
        {filter === "All" && q === "" && (
          <motion.section
            className="mt-20 pt-16 border-t border-white/10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Deep Dives</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Explore our most impactful case studies showcasing complex technical solutions and measurable business outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudiesData.slice(0, 2).map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Zap;
                return (
                  <motion.div
                    key={`featured-${item.id}`}
                    className="group relative p-8 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>

                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 mb-4 font-medium">{item.subtitle}</p>
                    <p className="text-slate-400 mb-6 leading-relaxed">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">{item.impact}</span>
                      </div>
                      <Link
                        to={`/deep/${item.slug}`}
                        className="flex items-center gap-2 text-cyan-400 font-semibold hover:gap-3 transition-all"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
