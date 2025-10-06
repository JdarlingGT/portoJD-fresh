import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Server, TrendingUp, Clock, Activity, Settings, Zap } from "lucide-react";

export default function BackendReliability() {
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
            <div className="p-4 bg-slate-500/20 border border-slate-500/30 rounded-xl">
              <Server className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <span className="text-sm text-slate-400 font-semibold">Performance & Reliability</span>
              <h1 className="text-4xl md:text-5xl font-bold">Backend Reliability & Server Tuning</h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl">
            Deep server-level optimization eliminating critical 503/504 errors and PHP memory exhaustion through
            strategic PHP-FPM tuning, Apache configuration, and real-time monitoring infrastructure.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10-12 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Critical errors eliminated</span>
            </div>
            <div className="px-3 py-1 bg-slate-500/20 border border-slate-500/30 rounded-full text-slate-400">
              Infrastructure Critical
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
              <h2 className="text-2xl font-bold mb-6 text-slate-400 border-b border-white/10 pb-3">
                The &ldquo;Why&rdquo;: The Business Case
              </h2>
              <div className="p-6 bg-slate-500/5 border border-slate-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed mb-4">
                  The backend was plagued by frequent 503/504 errors and PHP memory exhaustion. These failures were crashing
                  key plugins during business hours, interrupting internal workflows, and putting marketing campaigns at risk.
                </p>
                <div className="flex items-center gap-2 text-slate-400">
                  <Activity className="w-5 h-5" />
                  <span className="font-semibold">System instability threatening business operations</span>
                </div>
              </div>
            </section>

            {/* The How */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-400 border-b border-white/10 pb-3">
                The &ldquo;How&rdquo;: My Strategic Approach
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                I conducted a deep, server-level optimization to address the root causes of instability. This included
                increasing PHP-FPM memory pools to 1024 MB, tuning Apache's LimitRequestLine to resolve plugin errors,
                upgrading the staging environment to PHP 8.3, and installing a real-time Netdata monitoring dashboard
                with custom alerts.
              </p>

              {/* Molecular Tech Structure Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-slate-400" />
                  Backend Infrastructure Architecture
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/tech-backgrounds/molecular-tech.png"
                    alt="Molecular technology structure showing backend infrastructure connections and network architecture"
                    className="w-full max-w-2xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Complex backend infrastructure showing interconnected systems and optimized network architecture
                </p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">PHP-FPM Optimization</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Strategic memory pool configuration to handle heavy workloads.
                  </p>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm font-mono">
                    <div className="text-green-400">; PHP-FPM Configuration</div>
                    <div className="text-slate-300">pm.max_children = 50</div>
                    <div className="text-slate-300">pm.start_servers = 10</div>
                    <div className="text-slate-300">pm.min_spare_servers = 5</div>
                    <div className="text-slate-300">pm.max_spare_servers = 15</div>
                    <div className="text-slate-300">memory_limit = 1024M</div>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Apache Configuration</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Tuned Apache settings to prevent plugin conflicts and timeouts.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• LimitRequestLine optimization</li>
                    <li>• MaxRequestWorkers tuning</li>
                    <li>• Timeout configuration</li>
                    <li>• Memory limit adjustments</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Real-Time Monitoring</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Implemented comprehensive monitoring with custom alerting.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Netdata dashboard installation</li>
                    <li>• Custom alert thresholds</li>
                    <li>• Process monitoring</li>
                    <li>• Performance metrics tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The Toolbox */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-400 border-b border-white/10 pb-3">
                The Toolbox: What I Used
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "PHP-FPM", features: ["Memory pool tuning", "Process management", "Performance optimization", "Error handling"] },
                  { name: "Apache Configuration", features: ["LimitRequestLine tuning", "Worker optimization", "Timeout settings", "Module configuration"] },
                  { name: "Netdata", features: ["Real-time monitoring", "Custom alerts", "Performance dashboards", "Historical data"] },
                  { name: "System Tools", features: ["htop/top analysis", "Memory profiling", "Process monitoring", "Log analysis"] }
                ].map((tool) => (
                  <div key={tool.name} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-bold text-white mb-2">{tool.name}</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
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
              <h2 className="text-2xl font-bold mb-6 text-slate-400 border-b border-white/10 pb-3">
                The Challenge: Navigating Complexity
              </h2>
              <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The main difficulty was diagnosing intermittent, hard-to-reproduce errors that only occurred under heavy load.
                  This required live monitoring and analysis to pinpoint the exact processes causing memory spikes and timeouts.
                  The challenge was implementing fixes on a production system without causing downtime while ensuring the
                  changes would handle peak traffic scenarios.
                </p>
              </div>
            </section>

            {/* The Outcome */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-400 border-b border-white/10 pb-3">
                The Outcome: Tangible Results
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">Zero</div>
                  <div className="text-sm text-slate-300">Critical errors</div>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-sm text-slate-300">Uptime stability</div>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                  <div className="text-sm text-slate-300">Monitoring</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mt-6">
                Critical backend errors were eliminated, restoring stability for all admin operations. The platform can now
                handle heavy tasks without the risk of random timeouts or crashes. Real-time monitoring provides immediate
                visibility into system health.
              </p>
            </section>

            {/* The Value */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-400 border-b border-white/10 pb-3">
                The Value: Long-Term ROI
              </h2>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The project ensures backend reliability, which leads to higher staff productivity and significantly reduces
                  the risk of downtime during sales pushes or high-traffic training events. The monitoring infrastructure
                  provides early warning of potential issues, enabling proactive maintenance and preventing costly outages.
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
              <h3 className="text-lg font-bold mb-4 text-slate-400">Reliability Gains</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">0</div>
                  <div className="text-sm text-slate-400">Critical errors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">1024MB</div>
                  <div className="text-sm text-slate-400">Memory allocation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Real-time</div>
                  <div className="text-sm text-slate-400">Monitoring</div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-slate-400">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["PHP-FPM", "Apache", "Netdata", "Memory Optimization", "Process Monitoring", "System Tuning"].map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-slate-500/20 border border-slate-500/30 rounded-full text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-br from-slate-500/10 to-gray-600/10 border border-slate-500/20 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-slate-400">Need Backend Optimization?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Eliminate server errors and ensure rock-solid backend reliability.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-500/20 border border-slate-500 text-slate-400 rounded-lg hover:bg-slate-500/30 transition-colors text-sm font-semibold"
              >
                <span>Optimize Backend</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
