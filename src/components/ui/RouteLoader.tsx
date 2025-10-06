import { motion } from 'framer-motion';

const RouteLoader = () => (
  <div className="flex min-h-[40vh] items-center justify-center" aria-live="polite">
    <motion.div
      className="h-12 w-12 rounded-full border-4 border-primary-500/40 border-t-primary-500"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
      aria-hidden="true"
    />
  </div>
);

export default RouteLoader;
