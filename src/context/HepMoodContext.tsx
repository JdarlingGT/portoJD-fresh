import * as React from 'react';

export type HepMood = 'neutral' | 'coach' | 'film';

interface HepMoodState {
  mood: HepMood;
  setMood: (m: HepMood) => void;
  lastChange: number;
}

const HepMoodContext = React.createContext<HepMoodState | undefined>(undefined);

export function HepMoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMoodState] = React.useState<HepMood>('neutral');
  const [lastChange, setLastChange] = React.useState(() => Date.now());

  const setMood = React.useCallback((m: HepMood) => {
    setMoodState(prev => {
      if (prev !== m) {
        setLastChange(Date.now());
      }
      return m;
    });
  }, []);

  const value = React.useMemo(() => ({ mood, setMood, lastChange }), [mood, setMood, lastChange]);

  return <HepMoodContext.Provider value={value}>{children}</HepMoodContext.Provider>;
}

export function useHepMood(): HepMoodState {
  const ctx = React.useContext(HepMoodContext);
  if (!ctx) {
    throw new Error('useHepMood must be used within a HepMoodProvider');
  }
  return ctx;
}