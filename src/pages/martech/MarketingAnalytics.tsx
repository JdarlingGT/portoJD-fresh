import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, TrendingUp, Clock, CheckCircle, Target, Database, Zap } from "lucide-react";

export default function MarketingAnalytics() {
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
            <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <span className="text-sm text-blue-400 font-semibold">Marketing & Conversions</span>
              <h1 className="text-4xl md:text-5xl font-bold">Unified Marketing Analytics Stack</h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl">
            Complete analytics rebuild creating a single source of truth for conversion data, eliminating attribution drift,
            and enabling Smart Bidding optimization with accurate, high-quality signals.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>8-10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Significant ROAS improvement</span>
            </div>
            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400">
              Data-Driven Solution
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
              <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-3">
                  The &ldquo;Why&rdquo;: The Business Case
              </h2>
              <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed mb-4">
                  The company's analytics were fragmented and unreliable, leading to attribution drift and wasted ad spend.
                  Without a single source of truth for conversion data, it was impossible to make confident, data-driven
                  decisions about marketing budgets.
                </p>
                <div className="flex items-center gap-2 text-blue-400">
                  <Database className="w-5 h-5" />
                  <span className="font-semibold">Critical need for unified, reliable measurement</span>
                </div>
              </div>
            </section>

            {/* The How */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-3">
             The &ldquo;How&rdquo;: My Strategic Approach
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                I conducted a comprehensive audit of all tracking implementations, then systematically cleaned up GTM
                containers, consolidated GA4 properties, and rebuilt attribution models from the ground up. This included
                implementing server-side tracking, cross-domain measurement, and custom event architectures for accurate
                multi-channel attribution.
              </p>

              {/* HUD Interface Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Analytics Command Center
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/tech-backgrounds/hud-interface.png"
                    alt="Futuristic HUD interface showing analytics monitoring and data visualization elements"
                    className="w-full max-w-2xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Unified analytics command center providing real-time monitoring and cross-platform attribution
                </p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Legacy Tag Audit & Cleanup</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Comprehensive audit and removal of years of accumulated legacy tracking code.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Identified and catalogued all existing tags</li>
                    <li>• Removed duplicate and conflicting trackers</li>
                    <li>• Documented data flow and dependencies</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">GA4 Consolidation</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Unified all tracking into a single, clean GA4 property with standardized events.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Single GA4 stream for all data</li>
                    <li>• Standardized event naming conventions</li>
                    <li>• Enhanced e-commerce tracking setup</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Cross-Platform Integration</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Integrated all conversion touchpoints for complete attribution coverage.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• WooCommerce purchase tracking</li>
                    <li>• Gravity Forms lead capture</li>
                    <li>• Cross-domain tracking setup</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The Toolbox */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-3">
                The Toolbox: What I Used
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Google Tag Manager", features: ["Container management", "Tag deployment", "Trigger configuration", "Variable setup"] },
                  { name: "Google Analytics 4", features: ["Event tracking", "Conversion setup", "Attribution modeling", "Audience building"] },
                  { name: "WooCommerce", features: ["E-commerce tracking", "Purchase events", "Product analytics", "Revenue attribution"] },
                  { name: "Gravity Forms", features: ["Form tracking", "Lead capture", "Conversion events", "User journey mapping"] }
                ].map((tool) => (
                  <div key={tool.name} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-bold text-white mb-2">{tool.name}</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
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
              <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-3">
                The Challenge: Navigating Complexity
              </h2>
              <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The difficulty lay in untangling years of legacy tags and triggers from multiple stakeholders without
                  losing valuable data during the transition. It required a meticulous migration plan to ensure that the
                  new, cleaner GTM container could be deployed seamlessly while maintaining data integrity and historical
                  continuity for reporting.
                </p>
              </div>
            </section>

            {/* The Outcome */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-3">
                The Outcome: Tangible Results
              </h2>

              {/* Analytics Dashboard Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Unified Analytics Dashboard
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/martech/provider-analytics-dashboard.png"
                    alt="Provider Directory & Analytics Dashboard showing profile views, engagement rates, and top referrers"
                    className="w-full max-w-4xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Comprehensive analytics dashboard providing unified view of marketing performance and attribution data
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
                  <div className="text-sm text-slate-300">Attribution accuracy</div>
                </div>
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">60%</div>
                  <div className="text-sm text-slate-300">Faster reporting</div>
                </div>
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">Single</div>
                  <div className="text-sm text-slate-300">Source of truth</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mt-6">
                Marketing teams now have clean, accurate data flowing into consolidated dashboards. Attribution is reliable
                across all channels, and reporting time has been cut by more than half. The unified analytics stack provides
                a single source of truth for all marketing performance metrics.
              </p>
            </section>

            {/* The Value */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-3">
                The Value: Long-Term ROI
              </h2>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The long-term value is a significant improvement in marketing efficiency. More accurate attribution leads
                  to a lower Cost Per Acquisition (CPA), a higher return on ad spend (ROAS), and the ability to report on
                  marketing performance with confidence. The unified data foundation enables advanced analytics and machine
                  learning optimization.
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
              <h3 className="text-lg font-bold mb-4 text-blue-400">Key Improvements</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-slate-400">Attribution accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Lower</div>
                  <div className="text-sm text-slate-400">Cost per acquisition</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Higher</div>
                  <div className="text-sm text-slate-400">Return on ad spend</div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-blue-400">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["Google Tag Manager", "GA4", "WooCommerce", "Gravity Forms", "Smart Bidding", "Attribution"].map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-blue-400">Need Analytics Optimization?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Build a unified measurement stack for accurate attribution and better ROAS.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-semibold"
              >
                <span>Optimize Analytics</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
