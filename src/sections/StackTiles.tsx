import data from "../data/about.json";
import { motion } from "framer-motion";
import type { StackTileItem } from "../types/content";

const stackTiles = (data.stackTiles ?? []) as StackTileItem[];

export default function StackTiles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stackTiles.map((tile, index) => (
        <motion.a
          key={tile.title}
          href={tile.href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/[0.08] hover:ring-1 hover:ring-cyan-500/20 transition-all duration-300 group"
        >
          <div className="font-semibold text-white mb-1">{tile.title}</div>
          <div className="text-sm text-gray-400 mb-3">{tile.desc}</div>
          <div className="text-cyan-400 text-sm group-hover:underline">
            View Case Study →
          </div>
        </motion.a>
      ))}
    </div>
  );
}
