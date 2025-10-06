import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import SearchModal from '../ui/SearchModal';
import ThemeToggle from '../ThemeToggle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Platform', href: '/platform' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const GlobalHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isForm = (e.target as HTMLElement)?.closest("input,textarea");
      if (!isForm && e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-lg border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <motion.img
                  src="/assets/JD Logo.png"
                  alt="JD Logo"
                  className="h-8 w-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <span className="text-xl font-heading font-bold text-primary">PortoJD</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-3 py-2 text-sm font-body text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-body text-gray-300 hover:bg-gray-800 transition-all duration-300"
                aria-label="Open search (press /)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search</span>
                <span className="ml-2 text-xs text-gray-500">/</span>
              </button>

              <ThemeToggle />

              {/* Floating CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-accent-end text-background-dark font-body font-medium rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </motion.div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-300 hover:bg-gray-800 transition-all duration-300"
                aria-label="Open navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background-dark/95 backdrop-blur-lg md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <span className="text-lg font-heading font-bold text-primary">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-300 hover:bg-gray-800 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-body text-gray-300 hover:text-primary hover:bg-gray-800 rounded-xl transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-800">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 bg-gradient-to-r from-primary to-accent-end text-background-dark font-body font-medium rounded-xl text-center shadow-brand hover:shadow-brand-lg transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </nav>
        </motion.div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default GlobalHeader;
