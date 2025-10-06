import { useEffect, useState } from 'react';
import { Popover, Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import menuData from '../../data/menu.json';

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
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      {menuData.columns.slice(0, 2).map((col: { label: string; links: MenuLink[] }) => {
        const filtered = q
          ? col.links.filter((l: MenuLink) => l.label.toLowerCase().includes(q) || l.href.toLowerCase().includes(q))
          : col.links;
        if (filtered.length === 0) return null;
        return (
          <div key={col.label}>
            <div className="mb-3 text-sm font-body uppercase tracking-wide text-secondary/70">{col.label}</div>
            <div className="flex flex-col gap-2">
              {filtered.map((l: MenuLink) => (
                isExternal(l.href) ? (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-sm font-body text-secondary hover:bg-secondary/20 focus:outline-none transition-transform transform hover:scale-105 duration-300 flex items-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-icons">link</span>{l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="rounded-lg px-3 py-2 text-sm font-body text-secondary hover:bg-secondary/10 focus:outline-none transition-all duration-300"
                  >
                    {l.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        );
      })}

      {/* Add Graphic Design Gallery Section */}
      <div>
        <div className="mb-3 text-sm font-body uppercase tracking-wide text-secondary/70">Graphic Design</div>
        <div className="flex flex-col gap-2">
          <Link
            to="/graphic-design-gallery"
            className="rounded-lg px-3 py-2 text-sm font-body text-secondary hover:bg-secondary/10 focus:outline-none transition-all duration-300"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

const MegaMenu: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for header fallback hamburger
  useEffect(() => {
    const onOpen = () => setMobileOpen(true);
    window.addEventListener('open-mobile-menu', onOpen as EventListener);
    return () => window.removeEventListener('open-mobile-menu', onOpen as EventListener);
  }, []);

  return (
    <nav aria-label="Primary navigation" className="relative text-white">
      {/* Desktop Popover */}
      <div className="hidden md:flex items-center gap-4">
        <Popover className="relative">
          {() => (
            <>
              <Popover.Button
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 focus:outline-none"
              >
                Explore
              </Popover.Button>

              <AnimatePresence>
                {open && (
                  <Popover.Panel static as={motion.div}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute left-0 z-50 mt-3 w-screen max-w-2xl transform px-4"
                  >
                    <div className="overflow-hidden rounded-lg bg-gradient-to-b from-slate-800 to-slate-700 p-6 shadow-xl">
                      <MenuColumns query="" />
                    </div>
                  </Popover.Panel>
                )}
              </AnimatePresence>
            </>
          )}
        </Popover>
      </div>

      {/* Mobile: button + dialog */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 focus:outline-none"
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
                className="w-full max-w-xl rounded-lg bg-slate-800 p-6 shadow-lg"
              >
                <MenuColumns query="" />
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MegaMenu;
