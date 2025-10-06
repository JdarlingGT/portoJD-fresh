import { useEffect, useMemo, useState } from 'react';
import { Popover, Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import menuData from '../../data/menu.json';
import ThemeToggle from '../ui/ThemeToggle';

/**
 * A modern, accessible mega menu that combines:
 * - Desktop: Popover-based mega menu (hover/focus + keyboard)
 * - Mobile: Full-screen slide-over dialog with search/filter
 *
 * Uses Tailwind for styling and Framer Motion for smooth transitions.
 */

type MenuLink = { label: string; href: string };

const isExternal = (href: string) => /^https?:\/\//.test(href) || href.startsWith('mailto:');

const MenuColumns: React.FC<{ query?: string }> = ({ query = '' }) => {
  const q = query.trim().toLowerCase();
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {menuData.columns.map((col: any) => {
        const filtered = q
          ? col.links.filter((l: MenuLink) => l.label.toLowerCase().includes(q) || l.href.toLowerCase().includes(q))
          : col.links;
        if (filtered.length === 0) return null;
        return (
          <div key={col.label}>
            <div className="mb-3 text-xs uppercase tracking-wide text-slate-400">{col.label}</div>
            <div className="flex flex-col gap-2">
              {filtered.map((l: MenuLink) => (
                isExternal(l.href) ? (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/5 focus:outline-none"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/5 focus:outline-none"
                  >
                    {l.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MegaMenu: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [desktopOpen, setDesktopOpen] = useState(false);

  // Listen for header fallback hamburger
  useEffect(() => {
    const onOpen = () => setMobileOpen(true);
    window.addEventListener('open-mobile-menu', onOpen as EventListener);
    return () => window.removeEventListener('open-mobile-menu', onOpen as EventListener);
  }, []);

  const totalLinks = useMemo(() => {
    return menuData.columns.reduce((acc: number, c: any) => acc + (c.links?.length || 0), 0);
  }, []);

  return (
    <nav aria-label="Primary navigation" className="relative text-white">
      {/* Desktop Popover */}
      <div className="hidden md:flex items-center gap-4">
        <Popover className="relative">
          {({ open }) => {
            // keep local desktop state in sync for hover/focus
            if (open && !desktopOpen) setDesktopOpen(true);
            if (!open && desktopOpen) setDesktopOpen(false);
            return (
              <>
                <Popover.Button
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-white/5 hover:bg-white/7 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  onMouseEnter={() => setDesktopOpen(true)}
                  onMouseLeave={() => setDesktopOpen(false)}
                >
                  Explore
                  <span className="text-xs text-slate-400">{totalLinks}</span>
                </Popover.Button>

                <AnimatePresence>
                  {open && (
                    <Popover.Panel static as={motion.div}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute left-0 z-50 mt-3 w-screen max-w-4xl transform px-4"
                      onMouseEnter={() => setDesktopOpen(true)}
                      onMouseLeave={() => setDesktopOpen(false)}
                    >
                      <div className="overflow-hidden rounded-lg bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 shadow-xl ring-1 ring-white/6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="relative flex-1">
                            <input
                              aria-label="Filter navigation"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search menu..."
                              className="w-full rounded-md bg-white/3 py-2 px-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                            />
                          </div>
                          <ThemeToggle />
                        </div>

                        <MenuColumns query={query} />
                      </div>
                    </Popover.Panel>
                  )}
                </AnimatePresence>
              </>
            );
          }}
        </Popover>
      </div>

      {/* Mobile: button + dialog */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-white/5 hover:bg-white/7 focus:outline-none"
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <Dialog as="div" className="relative z-50" open={mobileOpen} onClose={() => setMobileOpen(false)}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="w-full max-w-3xl rounded-lg bg-slate-900 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold">Navigation</div>
                    <div className="text-sm text-slate-400">{totalLinks} links</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                      onClick={() => setMobileOpen(false)}
                      aria-label="Close menu"
                      className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-white/5"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search menu..."
                      className="w-full rounded-md bg-white/3 py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>

                  <div className="mt-5">
                    <MenuColumns query={query} />
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-white/6 pt-4">
                    <Link to="/platform" onClick={() => setMobileOpen(false)} className="rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white">
                      Platform
                    </Link>
                    <Link to="/resume" onClick={() => setMobileOpen(false)} className="rounded-md border border-white/8 px-4 py-2 text-center text-sm text-white">
                      Download Résumé
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MegaMenu;
