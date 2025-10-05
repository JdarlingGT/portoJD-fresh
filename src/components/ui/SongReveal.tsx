import React, { useState } from 'react';
import useSongUnlocker from '../../hooks/useSongUnlocker';

const SongReveal: React.FC = () => {
  const unlocked = useSongUnlocker();
  const [playing, setPlaying] = useState(false);

  if (!unlocked) return null;

  const onPlay = () => {
    const audio = new Audio('/assets/hep/heps-duet.mp3');
    audio.volume = 0.25;
    audio.play();
    setPlaying(true);
    audio.addEventListener('ended', () => setPlaying(false));
  };

  return (
    <button onClick={onPlay} className="fixed bottom-28 right-6 z-50 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 px-4 py-2 font-semibold text-black shadow-lg hover:opacity-90">
      {playing ? 'Playing…' : '🎵 Play Hep’s Song'}
    </button>
  );
};

export default SongReveal;
