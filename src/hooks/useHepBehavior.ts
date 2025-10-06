import { useEffect, useMemo, useRef, useState } from 'react';
import HepMetrics from '../utils/HepMetrics';

type HepMood = 'coach' | 'film' | 'neutral';

export interface HepBehaviorState {
  prompt?: string;
  mood: HepMood;
}

/**
 * useHepBehavior
 * Lightweight behavioral intelligence hooks that react to live visitor data.
 *
 * Triggers:
 * - User interacts >= 5 times without viewing a project => prompt a demo
 * - High bounce heuristic (low interactions early in session) => suggest sticky CTA
 * - Long idle session => hydration/stretch prompt
 *
 * Mood:
 * - High engagement => "coach" mode
 * - Low engagement => "film" mode
 */
export default function useHepBehavior(): HepBehaviorState {
  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const [mood, setMood] = useState<HepMood>('neutral');

  // Track last activity change
  const lastActivityRef = useRef<number>(Date.now());
  const idleTimerRef = useRef<number | null>(null);
  const hasShownIdleRef = useRef(false);
  const hasShownBounceRef = useRef(false);
  const hasShownDemoRef = useRef(false);

  // Helper to compute current interactions and view status
  const computeState = () => {
    const interactions = HepMetrics.getSessionInteractionCount([
      'chat_message',
      'toolbox_click',
      'voice_query',
      'play_call',
      'crazyboy_trigger',
    ]);
    const viewedProject = HepMetrics.getSessionHasViewedProject();

    // Derive mood
    const nextMood: HepMood = interactions >= 3 || viewedProject ? 'coach' : 'film';
    setMood(nextMood);

    // Demo nudge (highest priority)
    if (!hasShownDemoRef.current && interactions >= 5 && !viewedProject) {
      setPrompt('You’ve been clicking like Isiah on a fast break — ready for a project demo?');
      hasShownDemoRef.current = true;
      return;
    }

    // Keep whatever prompt is currently shown if still relevant; otherwise clear and let other timers run
    if (prompt && hasShownDemoRef.current) return;

    // Otherwise, clear prompt if conditions no longer apply
    setPrompt(undefined);
  };

  // Update on metrics changes
  useEffect(() => {
    const onChanged = () => {
      lastActivityRef.current = Date.now();
      computeState();
    };
    window.addEventListener('hep:events:changed', onChanged);
    // Initial compute
    computeState();
    return () => {
      window.removeEventListener('hep:events:changed', onChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Long idle detection: 60s without activity
  useEffect(() => {
    if (idleTimerRef.current) window.clearInterval(idleTimerRef.current);
    idleTimerRef.current = window.setInterval(() => {
      const idleMs = Date.now() - lastActivityRef.current;
      if (!hasShownIdleRef.current && idleMs >= 60_000) {
        setPrompt('Timeout! Coach says stretch and hydrate.');
        hasShownIdleRef.current = true;
      }
    }, 5_000);

    return () => {
      if (idleTimerRef.current) window.clearInterval(idleTimerRef.current);
    };
  }, []);

  // High-bounce heuristic: low engagement early in session - suggest sticky CTA once
  useEffect(() => {
    // Evaluate after 30s from session start
    const sessionStartStr = sessionStorage.getItem('hep:sessionStart');
    const sessionStart = sessionStartStr ? Number(sessionStartStr) : Date.now();
    const checkBounce = () => {
      if (hasShownBounceRef.current) return;

      const elapsed = Math.max(0, Math.round((Date.now() - sessionStart) / 1000));
      const interactions = HepMetrics.getSessionInteractionCount([
        'chat_message',
        'toolbox_click',
        'voice_query',
        'play_call',
      ]);
      if (elapsed >= 30 && interactions <= 1) {
        setPrompt('Want me to fetch something cool before you go?');
        hasShownBounceRef.current = true;
      }
    };

    // Re-check a few times during the first 2 minutes
    const intervals = [30_000, 60_000, 90_000];
    const timers: number[] = [];
    for (const ms of intervals) {
      timers.push(window.setTimeout(checkBounce, ms));
    }
    return () => {
      timers.forEach(t => window.clearTimeout(t));
    };
  }, []);

  return useMemo(() => ({ prompt, mood }), [prompt, mood]);
}