// Hep Assistant component logic
import React, { useState } from 'react';
import HepChat from './HepChat';

const hepIcon = '/assets/hep/hep-icon.png';

const HepAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && <HepChat onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(!open)}
        className="bg-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <img
          src={hepIcon}
          alt="Hep"
          className="w-14 h-14 animate-bounce"
        />
      </button>
    </div>
  );
};

export default HepAssistant;
