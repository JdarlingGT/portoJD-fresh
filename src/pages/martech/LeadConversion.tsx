import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, TrendingUp, Clock, Code, Filter, Zap } from "lucide-react";

export default function LeadConversion() {
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
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
              <Target className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <span className="text-sm text-green-400 font-semibold">Marketing & Conversions</span>
              <h1 className="text-4xl md:text-5xl font-bold">Intelligent Lead Conversion Tracking</h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl">
            Smart conversion model using custom PHP hooks and RegEx triggers to distinguish high-value marketing-qualified
            leads from low-intent inquiries, optimizing ad spend for lead quality over quantity.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>6-8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Higher quality pipeline</span>
            </div>
            <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400">
              Precision Targeting
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
              <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-white/10 pb-3">
                The &ldquo;Why&rdquo;: The Business Case
              </h2>
              <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed mb-4">
                  The previous analytics setup treated all form submissions as equal conversions. This meant Google Ads was
                  wasting budget optimizing for low-intent inquiries instead of focusing on actual marketing-qualified leads (MQLs).
                </p>
                <div className="flex items-center gap-2 text-green-400">
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">Need to optimize for lead quality, not just quantity</span>
                </div>
              </div>
            </section>

            {/* The How */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-white/10 pb-3">
                The &ldquo;How&rdquo;: My Strategic Approach
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                I built custom PHP hooks to capture detailed form submission data, then created sophisticated GTM triggers
                using RegEx patterns to identify high-value leads. This data flows into Google Ads for automated bidding
                optimization and into internal dashboards for real-time lead scoring and attribution analysis.
              </p>

              {/* Data Diamond Pattern Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Lead Data Processing Engine
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/tech-backgrounds/data-diamond-pattern.png"
                    alt="Data diamond pattern showing lead processing algorithms and conversion tracking systems"
                    className="w-full max-w-2xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Advanced data processing algorithms for lead qualification and conversion tracking optimization
                </p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Custom PHP DataLayer Hook</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Built custom PHP integration to capture detailed form submission data.
                  </p>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm font-mono">
                    <div className="text-green-400">{"// Custom Gravity Forms hook"}</div>
                    <div className="text-slate-300">add_action('gform_after_submission', 'push_form_data_to_datalayer');</div>
                    <div className="text-slate-300">function push_form_data_to_datalayer($entry, $form) {'{'}</div>
                    <div className="text-slate-300 ml-4">{"// Push detailed event to dataLayer"}</div>
                    <div className="text-slate-300">{'}'}</div>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Filter className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">RegEx Trigger Logic</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Implemented sophisticated GTM triggers to identify high-value form submissions.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• RegEx pattern matching for MQL form IDs</li>
                    <li>• Conditional logic for lead scoring</li>
                    <li>• Event parameter validation</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Google Ads Integration</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Created specific conversion actions for marketing-qualified leads.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• MQL-specific conversion tracking</li>
                    <li>• Smart Bidding optimization</li>
                    <li>• Lead quality attribution</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The Toolbox */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-white/10 pb-3">
                The Toolbox: What I Used
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "PHP", features: ["Custom hooks", "DataLayer integration", "Form processing", "Event triggering"] },
                  { name: "Google Tag Manager", features: ["RegEx triggers", "Variable configuration", "Event filtering", "Conditional logic"] },
                  { name: "Google Ads", features: ["Conversion actions", "Smart Bidding", "Lead optimization", "Attribution modeling"] },
                  { name: "Gravity Forms", features: ["Form tracking", "Submission events", "Field mapping", "Lead capture"] }
                ].map((tool) => (
                  <div key={tool.name} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-bold text-white mb-2">{tool.name}</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
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
              <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-white/10 pb-3">
                The Challenge: Navigating Complexity
              </h2>
              <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The most complex part was accurately defining a &ldquo;marketing-qualified lead&rdquo; in collaboration with the sales team
                  and then translating that business logic into a flawless technical trigger. This required bridging the gap
                  between sales objectives and marketing technology implementation, ensuring the technical solution matched
                  real-world lead qualification criteria.
                </p>
              </div>
            </section>

            {/* The Outcome */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-white/10 pb-3">
                The Outcome: Tangible Results
              </h2>

              {/* Payment Dashboard Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Lead Conversion Dashboard
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/martech/payment-dashboard.png"
                    alt="Payment Plans & Quote-to-Order dashboard showing revenue insights, active payment plans, and conversion metrics"
                    className="w-full max-w-4xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Real-time dashboard tracking payment plans, revenue insights, and lead conversion metrics
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">300%</div>
                  <div className="text-sm text-slate-300">Lead quality increase</div>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
                  <div className="text-sm text-slate-300">Attribution accuracy</div>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">Real-time</div>
                  <div className="text-sm text-slate-300">Lead scoring</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mt-6">
                High-value leads are now automatically tagged and pushed to Google Ads for optimized bidding. The system
                provides real-time visibility into lead quality and attribution, enabling data-driven marketing decisions
                and significantly improved ROAS.
              </p>
            </section>

            {/* The Value */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-white/10 pb-3">
                The Value: Long-Term ROI
              </h2>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  Ads Smart Bidding now optimizes for lead quality, not just quantity. This results in a higher-quality pipeline
                  for the sales team and a much more efficient allocation of the marketing budget. The precise tracking enables
                  better attribution and more confident budget allocation decisions.
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
              <h3 className="text-lg font-bold mb-4 text-green-400">Lead Quality Gains</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-slate-400">Accurate lead scoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Higher</div>
                  <div className="text-sm text-slate-400">Pipeline quality</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Better</div>
                  <div className="text-sm text-slate-400">Budget efficiency</div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-green-400">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["PHP", "GTM RegEx", "Google Ads", "Gravity Forms", "Smart Bidding", "DataLayer"].map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-green-400">Need Lead Quality Optimization?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Optimize your conversion tracking for lead quality and better ROI.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-semibold"
              >
                <span>Improve Conversions</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
