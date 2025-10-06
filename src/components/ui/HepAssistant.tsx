// Hep Assistant component logic
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HepChat from './HepChat';
import HepMetrics from '../../utils/HepMetrics';
import useHepBehavior from '../../hooks/useHepBehavior';
import { useHepMood } from '../../context/HepMoodContext';
import { breathingAnimation, bounceOnce } from '../../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

const hepIcon = '/assets/hep/images/hep-icon.png';

const HepAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isNapping, setIsNapping] = useState(false);
  const [isPanting, setIsPanting] = useState(false);
  const [hepState, setHepState] = useState<'normal' | 'panting' | 'napping' | 'excited'>('normal');

  const hepIconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isNapping) {
      HepMetrics.logEvent({ type: 'nap_start' });
      setHepState('napping');
      playSound('/assets/hep/audio/hep-snore.mp3');
    } else if (isPanting) {
      setHepState('panting');
      playSound('/assets/hep/audio/pant.mp3');
    } else {
      HepMetrics.logEvent({ type: 'wake_up' });
      setHepState('normal');
    }
  }, [isNapping, isPanting]);

  // (moved below) Sync behavioral mood into global HepMood context
  const [inactiveTimer, setInactiveTimer] = useState<number | null>(null);
  const behavior = useHepBehavior();
  const { setMood: setCtxMood } = useHepMood();

  // Sync behavioral mood into global HepMood context (after hooks declared)
  useEffect(() => {
    if (behavior?.mood === 'coach') setCtxMood('coach');
    else if (behavior?.mood === 'film') setCtxMood('film');
    else setCtxMood('neutral');
  }, [behavior?.mood, setCtxMood]);

  useEffect(() => {
    if (!open) return;
    if (inactiveTimer) {
      window.clearTimeout(inactiveTimer);
    }
    const t = window.setTimeout(() => {
      setIsNapping(true);
    }, 30000); // 30s inactivity
    setInactiveTimer(t);
    return () => {
      window.clearTimeout(t);
    };
  }, [open]);

  const resetInactivity = () => {
    setIsNapping(false);
    setIsPanting(false);
    if (inactiveTimer) {
      window.clearTimeout(inactiveTimer);
    }
    const t = window.setTimeout(() => setIsNapping(true), 30000);
    setInactiveTimer(t);
  };

  // Trigger panting animation randomly or on certain interactions
  const triggerPanting = () => {
    if (Math.random() < 0.3) { // 30% chance
      setIsPanting(true);
      setTimeout(() => setIsPanting(false), 3000); // Pant for 3 seconds
    }
  };

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  // Auto-trigger panting when user is active
  useEffect(() => {
    const handleActivity = () => {
      if (!isNapping && Math.random() < 0.1) { // 10% chance on activity
        triggerPanting();
      }
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isNapping]);

  // GSAP animations for Hep
  useEffect(() => {
    if (hepIconRef.current) {
      // Breathing animation when idle
      if (!isNapping && !isPanting) {
        breathingAnimation(hepIconRef.current);
      }

      // Scroll trigger for "bark" when reaching stats section
      ScrollTrigger.create({
        trigger: ".stat-card",
        start: "top 80%",
        onEnter: () => {
          if (!isNapping && hepIconRef.current) {
            bounceOnce(hepIconRef.current);
            playSound('/assets/sounds/dribble.mp3');
          }
        },
        once: true,
      });
    }
  }, [isNapping, isPanting]);

  // Hover effect
  const handleHepHover = () => {
    if (hepIconRef.current && !isNapping) {
      bounceOnce(hepIconRef.current);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <HepChat onClose={() => setOpen(false)} />
      )}
      <button
        onClick={() => { setOpen(!open); resetInactivity(); triggerPanting(); }}
        className="p-0 shadow-lg hover:scale-125 transition-transform duration-200 bg-transparent relative"
        aria-label="Toggle Hep chat"
      >
        <img
          ref={hepIconRef}
          src={hepState === 'napping' ? "/assets/hep/animations/snoring.gif" : hepState === 'panting' ? "/assets/hep/animations/hep-panting.gif" : hepIcon}
          alt="Hep"
          className="w-14 h-14 hover:scale-125 transition-transform duration-200 rounded-full border-2 border-primary/20"
          style={{ display: 'block' }}
          onMouseEnter={handleHepHover}
        />
        {/* Status indicator */}
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
          hepState === 'napping' ? 'bg-yellow-400' :
          hepState === 'panting' ? 'bg-red-400 animate-pulse' :
          'bg-green-400'
        }`} />
      </button>
    </div>
  );
};

export default HepAssistant;