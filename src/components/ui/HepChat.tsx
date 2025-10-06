import React, { useState, useRef, useEffect } from 'react';

interface HepChatProps {
  onClose: () => void;
}

type Msg = { role: 'user' | 'assistant'; content: string };

const HepChat: React.FC<HepChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: "Hi — I'm Hep. Ask me about Jacob's work, design, or marketing." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to bottom on new messages
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Msg = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const apiUrl = (import.meta.env.VITE_HEP_API_URL as string) || '/api/ask-hep';
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed })
      });

      const data = await resp.json();
      const reply = data?.answer || data?.choices?.[0]?.message?.content || "Woof! I couldn't get an answer.";
      const assistantMsg: Msg = { role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Hep request error', err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Woof — something went wrong. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">Hep says:</span>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="text-sm hover:text-red-500">×</button>
        </div>
      </div>

      <div ref={containerRef} className="space-y-2 max-h-60 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <p className={m.role === 'user' ? 'inline-block bg-indigo-50 dark:bg-zinc-700 px-3 py-1 rounded-lg' : 'inline-block bg-gray-100 dark:bg-zinc-600 px-3 py-1 rounded-lg'}>
              {m.role === 'user' ? '🐾 ' : '💬 '}
              {m.content}
            </p>
          </div>
        ))}

        {loading && <p className="italic text-sm">Hep is thinking...</p>}
      </div>

      <div className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 rounded-l-xl border dark:border-zinc-700 focus:outline-none"
          placeholder="Ask Hep anything..."
          aria-label="Ask Hep a question"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-500 text-white px-4 rounded-r-xl hover:bg-indigo-600 disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default HepChat;