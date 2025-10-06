import { motion } from "framer-motion";
import { GitBranch, CircuitBoard, Gauge, Users } from "lucide-react";
import data from "../data/about.json";
import type { PrincipleItem } from "../types/content";

const iconMap = {
  Bridge: GitBranch,
  CircuitBoard,
  Gauge,
  Users
};

const principles = (data.principles ?? []) as PrincipleItem[];

export default function PrinciplesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {principles.map((principle, index) => {
        const IconComponent = iconMap[principle.icon as keyof typeof iconMap];

        return (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.08] hover:ring-1 hover:ring-cyan-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <IconComponent className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{principle.title}</h3>
                {principle.stat && (
                  <span className="text-xs text-cyan-400">{principle.stat}</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-400">{principle.subtitle}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
