import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import SearchModal from '../ui/SearchModal';
import ThemeToggle from '../ThemeToggle';
import { Search } from 'lucide-react';
import { Bars3Icon } from '@heroicons/react/24/outline';

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-lg border-b border-white/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <span className="sr-only">Home</span>
                <div className="rounded-md bg-white/5 px-3 py-2 text-lg font-bold text-white">JD</div>
              </Link>
              {/* Desktop Mega Menu rendered inline; component handles responsive behavior */}
              <div className="hidden md:block">
                <MegaMenu />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition"
                aria-label="Open search (press /)"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search</span>
                <span className="ml-2 text-xs text-slate-400">/</span>
              </button>

              <ThemeToggle />

              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/platform"
                  className="rounded-full px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold text-white shadow-md hover:opacity-95 transition"
                >
                  Platform
                </Link>

                <Link
                  to="/resume"
                  className="rounded-full px-4 py-2 border border-white/10 text-sm font-medium text-white hover:bg-white/6 transition"
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
                className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-white/5"
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
