import { motion } from "framer-motion";
import data from "../data/about.json";
import type { PartnershipItem } from "../types/content";

const partnerships = (data.partnerships ?? []) as PartnershipItem[];

export default function Partnerships() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {partnerships.map((partnership, index) => (
        <motion.div
          key={partnership.client}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.08] transition-all duration-300"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-1">{partnership.client}</h3>
            <span className="text-sm text-cyan-400">{partnership.context}</span>
          </div>

          <div className="space-y-2">
            {partnership.results.map((result) => (
              <div key={`${partnership.client}-${result}`} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1 text-sm">✓</span>
                <span className="text-sm text-gray-300">{result}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
