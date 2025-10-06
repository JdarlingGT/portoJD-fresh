import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const apps = [
  {
    title: 'Clinical Compass',
    description: 'Navigate clinical reasoning and treatment protocols.',
    href: '/apps/clinical-compass',
    icon: '🧭'
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate return on investment for marketing campaigns.',
    href: '/apps/roi',
    icon: '📊'
  },
  {
    title: 'License Requirements',
    description: 'Check licensing requirements for various professions.',
    href: '/apps/license',
    icon: '📋'
  },
  {
    title: 'Smart Pricing Tool',
    description: 'Optimize pricing strategies with data-driven insights.',
    href: '/apps/smart-pricing',
    icon: '💰'
  }
];

const FeaturedApps = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background-dark to-background-dark/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">Featured Live Apps</h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Interactive tools built to solve real problems. Try them out and see the difference.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.title}
              className="bg-secondary/5 border border-secondary/10 rounded-xl p-6 hover:bg-secondary/10 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{app.icon}</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">{app.title}</h3>
              <p className="text-secondary/70 mb-4">{app.description}</p>
              <Link
                to={app.href}
                className="text-accent-start hover:text-accent-end transition-colors duration-300"
              >
                Try it out →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedApps;
