import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import SearchModal from '../ui/SearchModal';
import ThemeToggle from '../ThemeToggle';
import { Search } from 'lucide-react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent){
      const isForm = (e.target as HTMLElement)?.closest("input,textarea");
      if (!isForm && e.key === "/") { e.preventDefault(); setSearchOpen(true); }
    }
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background-dark/80 to-background-dark/60 backdrop-blur-lg border-b border-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <span className="sr-only">Home</span>
                <motion.img
                  src="/assets/JD Logo.png"
                  alt="JD Logo"
                  className="h-10 w-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </Link>
              {/* Desktop Mega Menu rendered inline; component handles responsive behavior */}
              <div className="hidden md:block">
                <MegaMenu />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-body text-secondary/70 hover:bg-secondary/5 transition-all duration-300 hover:shadow-brand"
                aria-label="Open search (press /)"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search</span>
                <span className="ml-2 text-xs text-secondary/50">/</span>
              </button>

              <ThemeToggle />

              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/resume"
                  className="rounded-xl px-4 py-2 border border-secondary/10 text-sm font-body font-medium text-secondary hover:bg-secondary/5 transition-all duration-300 hover:shadow-brand"
                >
                  Download Résumé
                </Link>
              </div>

              {/* Mobile menu trigger */}
              <div className="md:hidden">
                <MegaMenu />
              </div>

              {/* Fallback hamburger (for small screens where MegaMenu provides the dialog) */}
              <button
                className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-secondary/70 hover:bg-secondary/5 transition-all duration-300"
                aria-label="Open navigation"
                onClick={() => {
                  // MegaMenu handles its own mobile trigger; keep this for accessibility fallback
                  const ev = new CustomEvent('open-mobile-menu');
                  window.dispatchEvent(ev);
                }}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
