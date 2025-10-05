import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import SearchModal from '../ui/SearchModal';
import ThemeToggle from '../ThemeToggle';
import { Search } from 'lucide-react';

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                JD
              </Link>
            </div>

            <div className="hidden md:block">
              <MegaMenu />
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setSearchOpen(true)} className="hidden md:flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Search className="w-4 h-4" />
                <span>Search /</span>
              </button>
              <ThemeToggle />
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/platform"
                  className="rounded-xl px-3 py-2 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Platform
                </Link>
                <Link
                  to="/resume"
                  className="rounded-xl px-4 py-2 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Download Résumé
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
