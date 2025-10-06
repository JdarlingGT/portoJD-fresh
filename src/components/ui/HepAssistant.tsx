// Hep Assistant component logic
import React, { useState, useEffect } from 'react';
import knowledgeBase from '../../data/knowledgeBase.json';
import HepChat from './HepChat';

const hepIcon = '/assets/hep/images/hep-icon.png';

const HepAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isNapping, setIsNapping] = useState(false);
  const [inactiveTimer, setInactiveTimer] = useState<number | null>(null);

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
    if (inactiveTimer) {
      window.clearTimeout(inactiveTimer);
    }
    const t = window.setTimeout(() => setIsNapping(true), 30000);
    setInactiveTimer(t);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    try {
      const resp = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await resp.json();
      setAnswer(data.answer || 'No answer returned from AI.');
    } catch (err) {
      setAnswer('AI request failed.');
      console.error('AI request error', err);
    } finally {
      setLoading(false);
      setQuestion('');
      resetInactivity();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-80">
          <HepChat onClose={() => setOpen(false)} />
          <form className="mt-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => { setQuestion(e.target.value); resetInactivity(); }}
              className="p-2 border rounded w-full"
            />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit
              </button>
              <button type="button" className="bg-gray-200 p-2 rounded" onClick={() => { setQuestion(''); setAnswer(''); resetInactivity(); }}>
                Clear
              </button>
            </div>
            {answer && <p className="mt-2 text-sm">{answer}</p>}
            {isNapping && <p className="mt-2 text-xs text-gray-500 italic">Hep is taking a nap — move or ask to wake him.</p>}
          </form>
        </div>
      )}
      <button
        onClick={() => { setOpen(!open); resetInactivity(); }}
        className="p-0 shadow-lg hover:scale-125 transition-transform duration-200 bg-transparent"
        aria-label="Toggle Hep chat"
      >
        <img
          src={hepIcon}
          alt="Hep"
          className="w-14 h-14 hover:scale-125 transition-transform duration-200"
          style={{ display: 'block' }}
        />
      </button>
    </div>
  );
};

export default HepAssistant;