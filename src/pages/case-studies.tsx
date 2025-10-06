import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, Database, ArrowRight } from 'lucide-react';
import data from '../data/case-studies.json';

type Item = typeof data.items[number];

const Pill: React.FC<{active?:boolean, onClick:()=>void, label:string}> = ({active,onClick,label}) => (
  <button onClick={onClick} className={`rounded-full border px-3 py-1 text-sm transition-all duration-200 ${active?'bg-primary text-white border-primary shadow-lg scale-105':'border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/50'}`}>{label}</button>
);

const getImpactIcon = (impact: string) => {
  if (impact.includes('reduction') || impact.includes('decrease')) return MessageSquare;
  if (impact.includes('increase') || impact.includes('growth') || impact.includes('lift')) return TrendingUp;
  if (impact.includes('lead') || impact.includes('conversion')) return Users;
  return Database;
};

const CaseStudyCard: React.FC<{item: Item}> = ({ item }) => {
  const Icon = getImpactIcon(item.impact[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-secondary/10 bg-gradient-to-br from-background-light to-background-light/80 dark:from-background-dark dark:to-background-dark/80 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-end/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs uppercase tracking-wider text-primary font-medium">{item.category[0]}</span>
          <div className="h-1 w-1 rounded-full bg-secondary/40" />
          <span className="text-xs text-secondary/60">{item.subtitle}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-secondary/80 dark:text-secondary/70 mb-4 leading-relaxed">
          {item.summary}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tech.slice(0, 4).map(tech => (
            <span key={tech} className="px-2 py-1 text-xs bg-secondary/10 dark:bg-secondary/20 rounded-md text-secondary/70 dark:text-secondary/60">
              {tech}
            </span>
          ))}
          {item.tech.length > 4 && (
            <span className="px-2 py-1 text-xs bg-secondary/10 dark:bg-secondary/20 rounded-md text-secondary/70 dark:text-secondary/60">
              +{item.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Impact metrics */}
        <div className="space-y-2 mb-4">
          {item.impact.slice(0, 2).map((impact, index) => {
            const MetricIcon = index === 0 ? Icon : getImpactIcon(impact);
            return (
              <div key={impact} className="flex items-center gap-2">
                <MetricIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{impact}</span>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm group/btn transition-all duration-200">
          View Case Study
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </motion.div>
  );
};

export default function CaseStudiesPage() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const items = data.items as Item[];

  const view = useMemo(() => {
    return items.filter(it =>
      (filter==='all' || it.category.includes(filter as string)) &&
      (q==='' || (it.title+it.summary+it.subtitle).toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, filter, items]);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent-end bg-clip-text text-transparent mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-secondary/70 dark:text-secondary/60 max-w-2xl mx-auto">
            Real results from real projects. Filter by focus area and search by keyword to find relevant examples of our work.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <Pill label="All" onClick={()=>setFilter('all')} active={filter==='all'} />
            <Pill label="Automation" onClick={()=>setFilter('automation')} active={filter==='automation'} />
            <Pill label="Analytics" onClick={()=>setFilter('analytics')} active={filter==='analytics'} />
            <Pill label="E‑commerce" onClick={()=>setFilter('ecommerce')} active={filter==='ecommerce'} />
            <Pill label="Branding" onClick={()=>setFilter('branding')} active={filter==='branding'} />
          </div>

          <div className="max-w-md mx-auto">
            <input
              value={q}
              onChange={e=>setQ(e.target.value)}
              placeholder="Search case studies..."
              className="w-full rounded-xl border border-secondary/20 bg-white/50 dark:bg-black/20 backdrop-blur-sm px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-secondary/50"
            />
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-secondary/60 dark:text-secondary/50">
            Showing {view.length} of {items.length} case studies
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {view.map(it => (
            <CaseStudyCard key={it.id} item={it} />
          ))}
        </motion.div>

        {/* Empty state */}
        {view.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No case studies found</h3>
            <p className="text-secondary/60 dark:text-secondary/50">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
