import * as React from 'react';
import HepMetrics from '../../utils/HepMetrics';
import { useHepMood } from '../../context/HepMoodContext';

type AnyEvent = {
  ts?: number;
  timestamp?: number;
  type?: string;
  source?: string;
  path?: string;
  id?: string;
  idRef?: string;
  sessionId?: string;
  meta?: Record<string, any>;
};

function useStoredEvents() {
  const [events, setEvents] = React.useState<AnyEvent[]>([]);

  const load = React.useCallback(() => {
    try {
      const v1 = localStorage.getItem('hep:metrics:v1:events');
      const legacy = localStorage.getItem('hep:events');
      const parsed = JSON.parse(v1 || legacy || '[]');
      setEvents(Array.isArray(parsed) ? parsed : []);
    } catch {
      setEvents([]);
    }
  }, []);

  React.useEffect(() => {
    load();
    const onChanged = () => load();
    window.addEventListener('hep:events:changed', onChanged as any);
    const t = window.setInterval(load, 3_000);
    return () => {
      window.removeEventListener('hep:events:changed', onChanged as any);
      window.clearInterval(t);
    };
  }, [load]);

  return { events, reload: load };
}

function formatTs(e: AnyEvent) {
  const t = e.ts ?? e.timestamp;
  if (!t) return '';
  try {
    const d = new Date(t);
    return d.toLocaleTimeString();
  } catch {
    return String(t);
  }
}

function EventRow({ e }: { e: AnyEvent }) {
  return (
    <div className="flex items-start gap-2 py-1 border-b border-white/5 text-xs">
      <span className="text-slate-400 w-14">{formatTs(e)}</span>
      <span className="font-semibold text-cyan-300">{e.type}</span>
      {e.source ? <span className="text-slate-400">· {e.source}</span> : null}
      {e.path ? <span className="text-slate-400">· {e.path}</span> : null}
      {e.id || e.idRef ? <span className="text-slate-400 truncate">· {e.id ?? e.idRef}</span> : null}
    </div>
  );
}

export default function HepDebugConsole() {
  const { mood } = useHepMood();
  const [visible, setVisible] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const [status, setStatus] = React.useState<string>('');
  const { events, reload } = useStoredEvents();

  // Gate: dev, query, or persisted flag
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('hepDebug') === 'true' || params.get('hepCoachMode') === 'true';
    const flag = localStorage.getItem('hep:debug') === 'true';
    const dev = (import.meta as any).env?.MODE !== 'production';
    setVisible(Boolean(q || flag || dev));
  }, []);

  // Hotkey: Ctrl+Shift+D to toggle. Ctrl+Shift+K to clear.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        setVisible(v => !v);
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
        try {
          localStorage.removeItem('hep:metrics:v1:events');
          localStorage.removeItem('hep:events');
          setStatus('Cleared events');
          reload();
        } catch {}
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reload]);

  // Keep a short info panel with session info
  const sessionId = React.useMemo(() => sessionStorage.getItem('hep:sessionId') || 'unknown', []);
  const last50 = React.useMemo(() => [...events].slice(-50).reverse(), [events]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] text-white">
      <div className="mb-2 flex items-center gap-2">
        <button
          onClick={() => setExpanded(e => !e)}
          className="px-2 py-1 text-xs bg-white/10 border border-white/10 rounded hover:bg-white/20"
          aria-label="Toggle debug console"
        >
          {expanded ? 'Hide Hep Debug' : 'Show Hep Debug'}
        </button>
        <button
          onClick={() => {
            const next = !pinned;
            setPinned(next);
            localStorage.setItem('hep:debug', next ? 'true' : 'false');
          }}
          className={`px-2 py-1 text-xs rounded border ${pinned ? 'bg-emerald-600/30 border-emerald-600' : 'bg-white/10 border-white/10 hover:bg-white/20'}`}
          aria-label="Pin debug console"
        >
          {pinned ? 'Pinned' : 'Pin'}
        </button>
        <button
          onClick={() => {
            try {
              const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = `hep-debug-events-${Date.now()}.json`;
              a.click();
            } catch {}
          }}
          className="px-2 py-1 text-xs bg-white/10 border border-white/10 rounded hover:bg-white/20"
        >
          Download JSON
        </button>
        <button
          onClick={() => {
            try {
              navigator.clipboard.writeText(JSON.stringify(events.slice(-200), null, 2));
              setStatus('Copied last 200 events');
            } catch {}
          }}
          className="px-2 py-1 text-xs bg-white/10 border border-white/10 rounded hover:bg-white/20"
        >
          Copy last 200
        </button>
      </div>

      {expanded && (
        <div className="w-[360px] max-h-[50vh] overflow-hidden rounded-xl bg-black/70 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="px-3 py-2 flex items-center justify-between border-b border-white/10">
            <div className="text-xs text-slate-300">
              <div className="font-semibold text-white">Hep Debug Console</div>
              <div>Session: <span className="text-slate-200">{sessionId}</span></div>
              <div>Mood: <span className="text-sky-300 font-semibold">{mood}</span></div>
              {status && <div className="text-emerald-300">{status}</div>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { try {
                  HepMetrics.logEvent({ type: 'chat_message', source: 'hep-chat', meta: { text: 'debug-ping' }});
                } catch {} }}
                className="px-2 py-1 text-[11px] rounded bg-sky-600/30 border border-sky-600 hover:bg-sky-600/50"
                title="Emit a debug chat_message"
              >
                Emit ping
              </button>
              <button
                onClick={() => { try {
                  HepMetrics.performDailyRollupIfDue();
                  setStatus('Rollup checked');
                } catch {} }}
                className="px-2 py-1 text-[11px] rounded bg-purple-600/30 border border-purple-600 hover:bg-purple-600/50"
                title="Force rollup check"
              >
                Rollup
              </button>
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('hep:metrics:v1:events');
                    localStorage.removeItem('hep:events');
                    setStatus('Cleared events');
                    reload();
                  } catch {}
                }}
                className="px-2 py-1 text-[11px] rounded bg-rose-600/30 border border-rose-600 hover:bg-rose-600/50"
                title="Clear events"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="max-h-[36vh] overflow-auto px-3 py-2">
            {last50.length === 0 ? (
              <div className="text-xs text-slate-400">No events yet. Interact with the site to see live logs.</div>
            ) : (
              last50.map((e, i) => <EventRow e={e} key={i} />)
            )}
          </div>

          <div className="px-3 py-2 border-t border-white/10 text-[11px] text-slate-400">
            Hotkeys: Ctrl+Shift+D toggle · Ctrl+Shift+K clear · Query: ?hepDebug=true
          </div>
        </div>
      )}
    </div>
  );
}