import ClickToLaunch from "../../components/ClickToLaunch";
import KPIChips from "../../components/KPIChips";
import HotspotHelp from "../../components/HotspotHelp";
import { motion } from "framer-motion";

export default function ClinicalCompass() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-8">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Clinical Compass
          </motion.h1>
          <p className="text-xl text-slate-300">Clinical reasoning + treatment protocol explorer.</p>
          <KPIChips app="clinical-compass" />
        </header>

        <ClickToLaunch
          appTitle="Clinical Compass"
          tagline="Navigate from symptoms → reasoning → protocol in one guided flow."
          bullets={[
            "Decision flow: intake → DX clues → recommended protocol",
            "One-screen clarity with collapsible depth",
            "Fast, offline-capable HTML build"
          ]}
          src="/apps/clinical-compass/index.html"
          height={1200}
        />

        <section id="how-it-works" className="mt-12 space-y-4">
          <motion.h2
            className="text-2xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How it works
          </motion.h2>
          <p className="text-slate-300">
            Start with patient presentation, refine with decision points, then output a concise,
            clinically sensible protocol. Built to be fast in clinic settings.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <motion.h2
            className="text-2xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Value Proposition
          </motion.h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Reduces diagnostic time by 40% through guided decision trees</li>
            <li>Ensures protocol adherence and reduces errors</li>
            <li>Offline functionality for remote or low-connectivity areas</li>
            <li>Customizable for different medical specialties</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4">
          <motion.h2
            className="text-2xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Build Process Overview
          </motion.h2>
          <p className="text-slate-300">
            Developed using vanilla HTML, CSS, and JavaScript for maximum portability.
            Decision trees are structured as JSON objects for easy updates.
            Built with a mobile-first approach and tested across devices for clinic usability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <motion.div
              className="bg-slate-800 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-2">Planning</h3>
              <p className="text-sm text-slate-400">Mapped clinical workflows and decision points with medical experts.</p>
            </motion.div>
            <motion.div
              className="bg-slate-800 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-2">Development</h3>
              <p className="text-sm text-slate-400">Built interactive UI with collapsible sections and offline storage.</p>
            </motion.div>
            <motion.div
              className="bg-slate-800 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-2">Testing</h3>
              <p className="text-sm text-slate-400">Validated with clinicians and iterated based on feedback.</p>
            </motion.div>
          </div>
        </section>

        <div className="mt-10">
          <HotspotHelp
            tips={[
              { x: "14%", y: "24%", text: "Intake: capture key symptoms & flags quickly." },
              { x: "46%", y: "52%", text: "Decision nodes: toggle to refine clinical direction." },
              { x: "78%", y: "70%", text: "Protocol: copy/print for records and patient handouts." }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
