import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Map, TrendingUp, Clock, MapPin, Search, Zap } from "lucide-react";

export default function InteractiveMaps() {
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
            <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl">
              <Map className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <span className="text-sm text-purple-400 font-semibold">Frontend & UX</span>
              <h1 className="text-4xl md:text-5xl font-bold">Dynamic & Interactive Event Maps</h1>
            </div>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl">
            Modern, interactive Google Maps integration replacing static event listings with visual discovery,
            real-time filtering, and intuitive location-based browsing that significantly increased engagement and signups.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>8-10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Increased engagement & signups</span>
            </div>
            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400">
              UX Innovation
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
              <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-white/10 pb-3">
                  The &ldquo;Why&rdquo;: The Business Case
              </h2>
              <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed mb-4">
                  The training event directory was a static, text-heavy list that was frustrating for clinicians to navigate.
                  This outdated user experience led to drop-off during the discovery phase and lost registration opportunities.
                </p>
                <div className="flex items-center gap-2 text-purple-400">
                  <Search className="w-5 h-5" />
                  <span className="font-semibold">Poor UX directly impacting conversion rates</span>
                </div>
              </div>
            </section>

            {/* The How */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-white/10 pb-3">
                  The &ldquo;How&rdquo;: My Strategic Approach
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                I integrated Google Maps JavaScript API with custom geocoding services and built a sophisticated filtering
                system. This included implementing dynamic marker clustering, custom info windows with rich content,
                and real-time search functionality that updates the map view based on user selections and geographic proximity.
              </p>

              {/* Purple Dot Matrix Visualization */}
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  Interactive Map Data Flow
                </h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <img
                    src="/assets/tech-backgrounds/purple-dot-matrix.png"
                    alt="Purple dot matrix pattern representing dynamic data flow and user interaction patterns"
                    className="w-full max-w-2xl mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  Dynamic data flow visualization showing user interaction patterns and geographic data processing
                </p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Geocoding Integration</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Automated geocoding of all event locations from WordPress custom post types.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Batch geocoding of existing events</li>
                    <li>• Real-time geocoding for new events</li>
                    <li>• Address validation and cleanup</li>
                    <li>• Fallback handling for invalid addresses</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Map className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Interactive Map Interface</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Built custom Google Maps integration with advanced filtering capabilities.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Custom map markers with event details</li>
                    <li>• Cluster management for dense areas</li>
                    <li>• Info windows with event information</li>
                    <li>• Responsive map controls</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Search className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Advanced Filtering System</h3>
                  </div>
                  <p className="text-slate-300 mb-3">
                    Implemented real-time filtering for seamless event discovery.
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Filter by event type and category</li>
                    <li>• Date range selection</li>
                    <li>• Location radius filtering</li>
                    <li>• Real-time map updates</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The Toolbox */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-white/10 pb-3">
                The Toolbox: What I Used
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Google Maps JS API", features: ["Interactive maps", "Custom markers", "Info windows", "Clustering"] },
                  { name: "JavaScript", features: ["Custom filtering logic", "Event handling", "DOM manipulation", "AJAX requests"] },
                  { name: "WordPress CPTs", features: ["Event data structure", "Custom fields", "Meta queries", "Post relationships"] },
                  { name: "Geocoding Service", features: ["Address to coordinates", "Batch processing", "Validation", "Error handling"] }
                ].map((tool) => (
                  <div key={tool.name} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-bold text-white mb-2">{tool.name}</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
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
              <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-white/10 pb-3">
                The Challenge: Navigating Complexity
              </h2>
              <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  The primary challenge was geocoding a large and constantly changing dataset of existing events and then
                  building a seamless, performant front-end filtering experience that felt intuitive to the user. This required
                  handling edge cases like invalid addresses, managing API rate limits, and ensuring the map remained responsive
                  even with hundreds of events displayed simultaneously.
                </p>
              </div>
            </section>

            {/* The Outcome */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-white/10 pb-3">
                The Outcome: Tangible Results
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">Higher</div>
                  <div className="text-sm text-slate-300">User engagement</div>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">More</div>
                  <div className="text-sm text-slate-300">Training signups</div>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">Reduced</div>
                  <div className="text-sm text-slate-300">Manual effort</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mt-6">
                The new map significantly increased user engagement and boosted training signups. The dynamic system also
                reduced the manual effort required to update event listings, as the geocoding and display happened automatically.
              </p>
            </section>

            {/* The Value */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-white/10 pb-3">
                The Value: Long-Term ROI
              </h2>
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-300 leading-relaxed">
                  This modern UX enhancement improved the brand's perception as innovative and user-focused. The frictionless
                  discovery process directly translates to higher conversion rates for training events. The automated system
                  reduces ongoing maintenance costs while providing a superior user experience that encourages repeat visits.
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
              <h3 className="text-lg font-bold mb-4 text-purple-400">UX Improvements</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">Visual</div>
                  <div className="text-sm text-slate-400">Event discovery</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Real-time</div>
                  <div className="text-sm text-slate-400">Filtering</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">Auto</div>
                  <div className="text-sm text-slate-400">Geocoding</div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-purple-400">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["Google Maps API", "JavaScript", "WordPress CPTs", "Geocoding", "AJAX", "Responsive Design"].map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-violet-600/10 border border-purple-500/20 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-purple-400">Need Interactive UX Solutions?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Transform static content into engaging, interactive experiences.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-semibold"
              >
                <span>Enhance UX</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
