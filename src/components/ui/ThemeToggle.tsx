import React, { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

const ToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  const label = theme === 'system' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light';

  // The useEffect hook ensures smooth transitions are applied globally for theme changes.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('theme-transition');

    const removeTransition = () => {
      root.classList.remove('theme-transition');
    };

    root.addEventListener('transitionend', removeTransition);

    return () => {
      root.removeEventListener('transitionend', removeTransition);
    };
  }, []);

  return (
    <button
      onClick={cycle}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white shadow-sm backdrop-blur hover:bg-white/10 dark:border-black/10 dark:bg-black/20 dark:hover:bg-black/30 transition"
      aria-label="Toggle color theme"
      title={`Theme: ${label}`}
    >
      <span className="h-2 w-2 rounded-full bg-yellow-300 dark:bg-cyan-300" />
      <span>{label}</span>
    </button>
  );
};

export default ToggleButton;
