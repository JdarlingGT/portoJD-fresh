import React from 'react';

// Chat interface with toggle for text/speech

interface HepChatProps {
  onClose: () => void;
}

const HepChat: React.FC<HepChatProps> = ({ onClose }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-2 w-80">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Hep Chat</h3>
        <button onClick={onClose} className="text-gray-500">×</button>
      </div>
      <p>Welcome to Hep Assistant! How can I help?</p>
    </div>
  );
};

export default HepChat;
