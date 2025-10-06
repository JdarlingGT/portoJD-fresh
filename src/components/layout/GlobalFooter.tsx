import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section with Hep Cameo */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/JD Logo.png"
                alt="JD Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-heading font-bold text-primary">PortoJD</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Hybrid marketing × systems × creative tech professional.
              Building intelligent solutions that drive results.
            </p>

            {/* Hep AI Cameo */}
            <div className="bg-gradient-to-r from-primary/10 to-accent-end/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-background-dark font-bold text-sm">H</span>
                </div>
                <span className="font-heading font-semibold text-primary">Hep AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Your emotional AI companion for professional growth and creative breakthroughs.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/platform" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Platform
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:jacob@portojd.com" className="hover:text-primary transition-colors duration-300">
                  jacob@portojd.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-primary" />
                <span>Available for projects</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Remote / Atlanta, GA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} PortoJD. Built with modern web technologies.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
