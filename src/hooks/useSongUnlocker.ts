import { useEffect, useState } from 'react';

export default function useSongUnlocker() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const keyViews = 'jd-views';
    const keyFlag = 'jd-song';
    const views = parseInt(localStorage.getItem(keyViews) || '0', 10) + 1;
    localStorage.setItem(keyViews, String(views));

    const timer = setTimeout(() => {
      if (views >= 3) {
        sessionStorage.setItem(keyFlag, '1');
        setUnlocked(true);
      }
    }, 5 * 60 * 1000);

    if (sessionStorage.getItem(keyFlag) === '1') setUnlocked(true);

    return () => clearTimeout(timer);
  }, []);

  return unlocked;
}
