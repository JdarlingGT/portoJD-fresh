import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const storageKey = 'jd-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(storageKey) as Theme | null;
    return saved || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

    root.classList.remove('light', 'dark');
    root.classList.add(resolved);

    localStorage.setItem(storageKey, theme);
  }, [theme]);

  return { theme, setTheme } as const;
}
