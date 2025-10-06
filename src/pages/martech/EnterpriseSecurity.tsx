import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, ArrowLeft, CheckCircle, AlertTriangle, Zap, Clock, TrendingUp, Globe } from 'lucide-react';

export default function EnterpriseSecurity() {
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
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <span className="text-sm text-red-400 font-semibold">Security & Infrastructure</span>
              <h1 className="text-4xl md:text-5xl font-bold">Enterprise-Grade Security Overhaul</h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl">
            Multi-layered &ldquo;defense-in-depth&rdquo; strategy that eliminated 85,000+ malicious attacks monthly
            while maintaining seamless user experience for legitimate traffic.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>12-15 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">85K+ threats blocked monthly</span>
            </div>
            <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400">
              High Impact Project
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
              <h2 className="text-2xl font-bold mb-6 text-red-400 border-b border-white/10 pb-3">
                The &ldquo;Why&rdquo;: The Business Case
              </h2>
              <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed mb-4">
                  The site was under constant siege from brute-force attacks and malicious bots. This activity inflated server load,
                  threatened sensitive user data, and risked damaging the brand's credibility, especially during critical marketing
                  campaigns when uptime and trust are paramount.
                </p>
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Critical business risk requiring immediate action</span>
                </div>
              </div>
            </section>

            {/* The How */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-red-400 border-b border-white/10 pb-3">
                The &ldquo;How&rdquo;: My Strategic Approach
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                I architected a multi-layered &ldquo;defense-in-depth&rdquo; strategy that hardened the platform from the network edge
                to the origin server. The plan involved:
              </p>

              <div className="grid gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Edge Defense</h3>
                  </div>
                  <p className="text-slate-300">
                    Using Cloudflare to absorb and block the vast majority of malicious traffic before it could ever reach our infrastructure.
                  </p>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Origin Hardening</h3>
                  </div>
                  <p className="text-slate-300">
                    Creating a secure, encrypted tunnel to ensure the server would only accept traffic from Cloudflare, preventing direct-to-origin attacks.
                  </p>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">DNS Trust</h3>
                  </div>
                  <p className="text-slate-300">
                    Deploying DNSSEC to add a verifiable chain of trust to our domain, preventing spoofing and hijacking attempts.
                  </p>
                </div>
              </div>
            </section>

            {/* The Toolbox */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-red-400 border-b border-white/10 pb-3">
                The Toolbox: What I Used
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Cloudflare", features: ["WAF", "Rate Limiting", "Super Bot Fight Mode", "Origin CA"] },
                  { name: "GoDaddy Registrar", features: ["DNSSEC DS record submission"] },
                  { name: "Apache", features: ["mod_headers", "Security headers", "HSTS & CSP"] },
                  { name: "SSL/TLS", features: ["End-to-end encryption", "Certificate management"] }
                ].map((tool) => (
                  <div key={tool.name} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-bold text-white mb-2">{tool.name}</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
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
              <h2 className="text-2xl font-bold mb-6 text-red-400 border-b border-white/10 pb-3">
                The Challenge: Navigating Complexity
              </h2>
              <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The primary difficulty was implementing these comprehensive changes on a live, high-traffic site without
                  disrupting legitimate user activity or breaking critical integrations. This required careful rule deployment,
                  coordination of DNS changes with the domain registrar, and testing to ensure that our security posture
                  didn't inadvertently block paying customers or essential services.
                </p>
              </div>
            </section>

            {/* The Outcome */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-red-400 border-b border-white/10 pb-3">
                The Outcome: Tangible Results
              </h2>

              {/* Binary Code Flow Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  Security Data Stream Analysis
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/tech-backgrounds/binary-code-flow.png"
                    alt="Binary code flow visualization showing security data streams and threat detection patterns"
                    className="w-full max-w-3xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Real-time security monitoring showing binary data flows and automated threat detection systems
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">85K+</div>
                  <div className="text-sm text-slate-300">Malicious hits blocked monthly</div>
                </div>
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">Zero</div>
                  <div className="text-sm text-slate-300">Security incidents</div>
                </div>
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
                  <div className="text-sm text-slate-300">Uptime maintained</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mt-6">
                The multi-layered security approach successfully eliminated all security incidents while maintaining
                100% uptime. The system now automatically blocks 85,000+ malicious requests monthly, protecting
                sensitive user data and maintaining business continuity.
              </p>
            </section>

            {/* The Value */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-red-400 border-b border-white/10 pb-3">
                The Value: Long-Term ROI
              </h2>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The project established a resilient, long-term security posture that protects user data, boosts customer trust,
                  and de-risks high-traffic marketing launches by ensuring platform stability and reliability. The automated
                  threat detection and blocking capabilities provide ongoing protection with minimal maintenance overhead.
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
              <h3 className="text-lg font-bold mb-4 text-red-400">Key Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">85K+</div>
                  <div className="text-sm text-slate-400">Monthly threats blocked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-slate-400">Attack vector coverage</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">24/7</div>
                  <div className="text-sm text-slate-400">Automated protection</div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-red-400">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["Cloudflare WAF", "DNSSEC", "Apache", "Rate Limiting", "Bot Fight Mode", "Origin CA"].map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-600/10 border border-red-500/20 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-red-400">Need Security Hardening?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Protect your platform with enterprise-grade security architecture.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-semibold"
              >
                <span>Discuss Security</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
