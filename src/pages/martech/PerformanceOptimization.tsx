import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, TrendingUp, Clock, BarChart3, Globe, Server, Layers } from 'lucide-react';

export default function PerformanceOptimization() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/martech"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to MarTech Stack</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <span className="text-sm text-yellow-400 font-semibold">Performance & Reliability</span>
              <h1 className="text-4xl md:text-5xl font-bold">Full-Stack Performance Optimization</h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl">
            Comprehensive optimization strategy delivering 70% faster repeat visits through multi-tier caching,
            advanced compression, and CDN architecture that dramatically improved Core Web Vitals.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10-12 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">70% faster repeat visits</span>
            </div>
            <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400">
              Performance Critical
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >

            {/* The Why */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-white/10 pb-3">
                  The &ldquo;Why&rdquo;: The Business Case
              </h2>
              <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Heavy pages and an unoptimized asset pipeline were causing slow load times and poor Core Web Vitals.
                  This negatively impacted SEO rankings, increased bounce rates on landing pages, and created a frustrating
                  user experience that hurt conversions.
                </p>
                <div className="flex items-center gap-2 text-yellow-400">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-semibold">Direct impact on revenue and user satisfaction</span>
                </div>
              </div>
            </section>

            {/* The How */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-white/10 pb-3">
                  The &ldquo;How&rdquo;: My Strategic Approach
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                I implemented a comprehensive multi-tier caching strategy with advanced compression and CDN optimization.
                This included deploying LiteSpeed Cache with custom rules, enabling Brotli compression, optimizing image
                delivery through Cloudflare's Polish feature, and fine-tuning Core Web Vitals through strategic resource
                prioritization and lazy loading.
              </p>

              {/* Edge Optimization Pipeline Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Edge Optimization Pipeline
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/martech/edge-optimization-pipeline.png"
                    alt="Edge Image Optimization Pipeline showing the flow from Image Input through Optimization to Optimized Image"
                    className="w-full max-w-2xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Automated image optimization pipeline reducing file sizes by up to 70% while maintaining visual quality
                </p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Multi-Tier Caching</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Orchestrated three distinct layers of caching (browser, LiteSpeed, and Cloudflare) to work in harmony.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Browser cache optimization with proper headers</li>
                    <li>• LiteSpeed server-side caching with ESI support</li>
                    <li>• Cloudflare edge caching with tiered cache topology</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Advanced Compression</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Implemented cutting-edge compression algorithms to minimize payload sizes.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Brotli compression for modern browsers</li>
                    <li>• Gzip fallback for legacy support</li>
                    <li>• Dynamic compression for HTML/CSS/JS</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Asset Optimization</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Optimized critical rendering path and implemented smart loading strategies.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Critical CSS extraction and inlining</li>
                    <li>• Lazy loading for below-the-fold content</li>
                    <li>• Cookie-free CDN for static assets</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The Toolbox */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-white/10 pb-3">
                The Toolbox: What I Used
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Cloudflare", features: ["Tiered Cache", "CDN", "Compression", "Edge optimization"] },
                  { name: "LiteSpeed Cache", features: ["Server-side caching", "ESI support", "Cache warming"] },
                  { name: "Compression Stack", features: ["Brotli", "Gzip", "Dynamic compression"] },
                  { name: "Asset Tools", features: ["Critical CSS", "Lazy loading", "Minification"] }
                ].map((tool) => (
                  <div key={tool.name} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-bold text-white mb-2">{tool.name}</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* The Challenge */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-white/10 pb-3">
                The Challenge: Navigating Complexity
              </h2>
              <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The main challenge was orchestrating three distinct layers of caching (browser, LiteSpeed, and Cloudflare)
                  to work in harmony without serving stale content. This required fine-tuning cache-invalidation rules and
                  configuring Edge-Side Includes (ESI) to handle dynamic, user-specific content for logged-in users on
                  otherwise fully cached pages.
                </p>
              </div>
            </section>

            {/* The Outcome */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-white/10 pb-3">
                The Outcome: Tangible Results
              </h2>

              {/* Performance Clock Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  Performance Metrics Dashboard
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/tech-backgrounds/performance-clock.png"
                    alt="Performance optimization clock showing speed improvements and timing metrics"
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Real-time performance monitoring showing dramatic speed improvements across all metrics
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">75%</div>
                  <div className="text-sm text-slate-300">Faster load times</div>
                </div>
                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">90+</div>
                  <div className="text-sm text-slate-300">Core Web Vitals score</div>
                </div>
                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">70%</div>
                  <div className="text-sm text-slate-300">Bandwidth reduction</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mt-6">
                Page load times dropped from 8+ seconds to under 2 seconds. Core Web Vitals scores improved to 90+,
                and bandwidth usage decreased by 70% through optimized compression and caching. The site now handles
                traffic spikes without performance degradation.
              </p>
            </section>

            {/* The Value */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-white/10 pb-3">
                The Value: Long-Term ROI
              </h2>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  This project lowered infrastructure costs by reducing origin server requests, improved the effectiveness
                  of ad campaigns by speeding up landing pages, and positioned the site to handle high-traffic product
                  launches without performance degradation. The optimization framework is scalable and continues to
                  deliver value as traffic grows.
                </p>
              </div>
            </section>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Key Metrics */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sticky top-8">
              <h3 className="text-lg font-bold mb-4 text-yellow-400">Performance Gains</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">70%</div>
                  <div className="text-sm text-slate-400">Faster repeat visits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">30%</div>
                  <div className="text-sm text-slate-400">Payload reduction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">3x</div>
                  <div className="text-sm text-slate-400">Cache hit ratio</div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-yellow-400">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["Cloudflare CDN", "LiteSpeed Cache", "Brotli", "Critical CSS", "Lazy Loading", "ESI"].map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-amber-600/10 border border-yellow-500/20 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Need Performance Optimization?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Accelerate your site with enterprise-grade performance architecture.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm font-semibold"
              >
                <span>Boost Performance</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
