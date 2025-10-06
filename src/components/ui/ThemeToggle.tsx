import React from 'react';

const ThemeToggle: React.FC = () => {
  return (
    <button
      className="rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/10"
      aria-label="Toggle theme"
    >
      🌙
    </button>
  );
};

export default ThemeToggle;
