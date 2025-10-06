import { useState, useRef, useEffect } from 'react';
import knowledgeBase from '../../data/knowledgeBase.json';
import personaData from '../../data/hep-persona.json';
import HepMetrics from '../../utils/HepMetrics';
import { getFirstLaunchIntro } from '../../utils/HepLaunch';

interface HepChatProps {
  onClose: () => void;
}

type Msg = { role: 'user' | 'assistant'; content: string; id?: string };

const HepChat: React.FC<HepChatProps> = ({ onClose }: HepChatProps) => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: getFirstLaunchIntro(), id: 'initial' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hepState, setHepState] = useState<'idle' | 'listening' | 'responding' | 'napping'>('idle');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // scroll to bottom on new messages
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // State management
  useEffect(() => {
    if (hepState === 'idle') {
      // Set inactivity timer
      inactivityTimerRef.current = setTimeout(() => {
        setHepState('napping');
      }, 30000); // 30 seconds
    } else if (hepState === 'napping') {
      // Clear any existing timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [hepState]);

  // Voice synthesis
  const speak = (text: string) => {
    if (!voiceEnabled || !personaData.voiceSettings?.enabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().find(voice =>
      voice.lang.startsWith(personaData.voiceSettings.voice || 'en')
    ) || null;
    utterance.pitch = personaData.voiceSettings.pitch || 1.1;
    utterance.rate = personaData.voiceSettings.rate || 0.9;
    utterance.volume = personaData.voiceSettings.volume || 0.8;

    speechSynthesis.speak(utterance);
  };

  // Reset inactivity timer
  const resetInactivity = () => {
    setHepState('idle');
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  };

  // Initialize HepMetrics and optionally inject coach recap
  useEffect(() => {
    HepMetrics.init();

    const params = new URLSearchParams(window.location.search);
    const coachMode = params.get('hepCoachMode') === 'true';
    const adminFlag = localStorage.getItem('hepAdmin') === 'true';
    const shouldInject = coachMode || adminFlag;

    if (!shouldInject) return;

    (async () => {
      try {
        const recap = await HepMetrics.generateCoachReport('weekly');
        if (recap) {
          setMessages(prev => [...prev, { role: 'assistant', content: recap, id: 'coach-recap' }]);
        }
      } catch (e) {
        console.warn('Failed to generate coach report', e);
      }
    })();
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Msg = { role: 'user', content: trimmed, id: `user-${Date.now()}` };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setHepState('responding');

    // Log chat interaction
    HepMetrics.logEvent({
      type: 'chat_message',
      source: 'hep-chat',
      meta: { length: trimmed.length, text: trimmed }
    });

    try {
      const apiUrl = (import.meta.env?.VITE_HEP_API_URL as string) || '/api/ai';
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed })
      });

      const data = await resp.json();
      let reply = data?.answer || data?.choices?.[0]?.message?.content || "Woof! I couldn't get an answer.";
      const receivedState = data?.state || 'idle';

      // Update Hep state based on server response
      setHepState(receivedState);

      // Add personality-based enhancements
      if (trimmed.includes('strategy') && Math.random() < 0.4) {
        const analogy = knowledgeBase.iuPlaybook.basketball[Math.floor(Math.random() * knowledgeBase.iuPlaybook.basketball.length)];
        reply += `\n\n${analogy}`;
        // Track "Play Call" when Hep drops an analogy
        HepMetrics.logEvent({
          type: 'play_call',
          source: 'hep-chat',
          meta: { topic: 'analogy', text: analogy }
        });
      }

      if (trimmed.includes('excited') || trimmed.includes('enthusiastic')) {
        reply += "\n\nGo Hoosiers!";
      }

      const assistantMsg: Msg = { role: 'assistant', content: reply, id: `assistant-${Date.now()}` };
      setMessages(prev => [...prev, assistantMsg]);

      // Speak the response if voice is enabled
      speak(reply);

      resetInactivity();
    } catch (err) {
      console.error('Hep request error', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Woof — something went wrong. Try again later.",
        id: `error-${Date.now()}`
      }]);
      setHepState('idle');
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

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const getStateIndicator = () => {
    switch (hepState) {
      case 'listening': return '👂';
      case 'responding': return '💭';
      case 'napping': return '😴';
      default: return '🐕';
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl p-4 z-50 border border-gray-200 dark:border-zinc-700">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg flex items-center gap-2">
          {getStateIndicator()} Hep says:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoice}
            className={`text-sm px-2 py-1 rounded ${voiceEnabled ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
          >
            🔊
          </button>
          <button onClick={onClose} className="text-sm hover:text-red-500">×</button>
        </div>
      </div>

      <div ref={containerRef} className="space-y-2 max-h-60 overflow-y-auto mb-2">
        {messages.map((m) => (
          <div key={m.id || Math.random()} className={m.role === 'user' ? 'text-right' : 'text-left'}>
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
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value && hepState === 'idle') {
              setHepState('listening');
            }
          }}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 rounded-l-xl border dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Ask Hep anything..."
          aria-label="Ask Hep a question"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-500 text-white px-4 rounded-r-xl hover:bg-indigo-600 disabled:opacity-60 transition-colors"
        >
          Send
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">
        State: {hepState} | {voiceEnabled ? 'Voice ON' : 'Voice OFF'}
      </div>
    </div>
  );
};

export default HepChat;