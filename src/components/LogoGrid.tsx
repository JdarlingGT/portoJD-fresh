import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import logosData from '../data/logos.json';

interface LogoGridProps {
  category?: string;
  columns?: number;
  animation?: boolean;
  themeAware?: boolean;
}

const LogoGrid = ({
  category = 'all',
  columns = 4,
  animation = true,
  themeAware = true
}: LogoGridProps) => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  const filteredLogos = useMemo(() => {
    if (category === 'all') return logosData.items;
    return logosData.items.filter(logo => logo.category === category);
  }, [category]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animation ? 0.1 : 0,
        delayChildren: animation ? 0.2 : 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols] || 'grid-cols-4'} gap-6`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="contents"
      >
        {filteredLogos.map((logo) => (
          <motion.div
            key={`${logo.category}-${logo.name}`}
            variants={itemVariants}
            className="relative group"
            onMouseEnter={() => setHoveredLogo(logo.name)}
            onMouseLeave={() => setHoveredLogo(null)}
          >
            <div
              className={`
                relative p-4 rounded-xl border transition-all duration-300 cursor-pointer
                ${themeAware
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-primary-400 hover:shadow-lg hover:shadow-primary-400/20'
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300 hover:shadow-lg'
                }
                transform hover:scale-105
              `}
            >
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`w-full h-full object-contain ${
                    themeAware ? 'filter brightness-0 invert' : ''
                  }`}
                  onError={(e) => {
                    // Fallback to a simple icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = `w-full h-full rounded ${
                      themeAware ? 'bg-primary-400' : 'bg-blue-500'
                    } flex items-center justify-center text-white font-bold text-xs`;
                    fallback.textContent = logo.name.charAt(0);
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
              <div className={`text-center text-sm font-medium ${
                themeAware ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {logo.name}
              </div>
            </div>

            {/* Custom Tooltip */}
            {hoveredLogo === logo.name && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className={`
                  absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg whitespace-nowrap
                  ${themeAware
                    ? 'bg-gray-900 text-white border border-gray-700'
                    : 'bg-white text-gray-900 border border-gray-200'
                  }
                  transform -translate-x-1/2 translate-y-2
                `}
                style={{ left: '50%', top: '100%' }}
              >
                {logo.tooltip}
                <div className={`
                  absolute w-2 h-2 transform rotate-45
                  ${themeAware ? 'bg-gray-900 border-l border-t border-gray-700' : 'bg-white border-l border-t border-gray-200'}
                  -top-1 left-1/2 -translate-x-1/2
                `} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoGrid;
