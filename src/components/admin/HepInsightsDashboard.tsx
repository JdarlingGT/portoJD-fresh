import { useEffect, useMemo, useState } from 'react';
import HepMetrics, { DailyRollup, HepSummary } from '../../utils/HepMetrics';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

// Small helpers
const fmtSec = (s: number) => {
  if (!s || s <= 0) return '0s';
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m === 0) return `${sec}s`;
  return `${m}m ${sec}s`;
};

const fmtPct = (n: number) => `${Math.round(n * 100)}%`;

const isDev = typeof import.meta !== 'undefined' && (import.meta as any).env?.MODE !== 'production';

export default function HepInsightsDashboard() {
  const [allowed, setAllowed] = useState(false);
  const [summary, setSummary] = useState<HepSummary | null>(null);
  const [rollups, setRollups] = useState<DailyRollup[]>([]);
  const [coachReport, setCoachReport] = useState<string>('');

  // Filters
  const [dateRange, setDateRange] = useState<'7' | '30' | 'all'>('7');
  const [source, setSource] = useState<'all' | 'hep-chat' | 'ui' | 'voice' | 'system'>('all');

  // Gate: dev mode OR query param hepAdmin/hepCoachMode OR localStorage.hepAdmin === 'true'
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('hepAdmin') === 'true') {
      localStorage.setItem('hepAdmin', 'true');
    }
    const adminFlag = localStorage.getItem('hepAdmin') === 'true';
    const coachParam = params.get('hepCoachMode') === 'true';
    setAllowed(isDev || adminFlag || coachParam);
  }, []);

  // Load data
  useEffect(() => {
    if (!allowed) return;
    // Ensure metrics are initialized (in case app didn't mount path first)
    HepMetrics.init();

    setSummary(HepMetrics.getSummary());
    setRollups(HepMetrics.getDailyRollups());

    HepMetrics.generateCoachReport('weekly').then(setCoachReport).catch(() => setCoachReport(''));
  }, [allowed]);

  // Demo-mode fallback: if no data available, load demo JSON for visualization
  useEffect(() => {
    if (!allowed) return;
    const hasAny =
      (summary && (summary.totalSessions > 0 || summary.conversationKeywords?.length)) ||
      (rollups && rollups.length > 0) ||
      ((() => { try { return JSON.parse(localStorage.getItem('hep:events') || '[]').length > 0 } catch { return false }})());
    if (hasAny) return;
    (async () => {
      try {
        const mod = await import('../../data/insights-demo.json');
        const demo = (mod as any).default || mod;
        if (demo?.summary) setSummary(demo.summary);
        if (demo?.rollups) setRollups(demo.rollups);
        if (demo?.coachReport) setCoachReport(demo.coachReport);
      } catch (e) {
        // ignore
      }
    })();
  }, [allowed, summary, rollups]);

  // Derive chart data
  const sessionsTimeline = useMemo(
    () =>
      (rollups || []).map(r => ({
        date: r.date.slice(5), // MM-DD
        sessions: r.sessions,
        dwell: r.avgSessionTime,
      })),
    [rollups]
  );

  const topProjects = useMemo(
    () => (summary?.mostOpenedProjects || []).map(p => ({ id: p.id, count: p.count })),
    [summary]
  );

  const hotspots = useMemo(
    () => (summary?.engagementHotspots || []).map(h => ({ path: h.path, count: h.count })),
    [summary]
  );

  const keywords = useMemo(() => summary?.conversationKeywords || [], [summary]);

  // Raw events and filtered view for charts
  const allEvents = useMemo(() => {
    try {
      const v1 = localStorage.getItem('hep:metrics:v1:events');
      const legacy = localStorage.getItem('hep:events');
      return JSON.parse(v1 || legacy || '[]') as any[];
    } catch {
      return [];
    }
  }, [allowed]);

  const filteredEvents = useMemo(() => {
    const now = Date.now();
    let fromTs = 0;
    if (dateRange === '7') fromTs = now - 7 * 24 * 3600 * 1000;
    else if (dateRange === '30') fromTs = now - 30 * 24 * 3600 * 1000;
    let arr = allEvents.filter((e: any) => !fromTs || e.ts >= fromTs);
    if (source !== 'all') {
      arr = arr.filter((e: any) => e.source === source);
    }
    return arr;
  }, [allEvents, dateRange, source]);

  const eventTypesData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of filteredEvents) {
      map[e.type] = (map[e.type] || 0) + 1;
    }
    return Object.entries(map).map(([type, count]) => ({ type, count }));
  }, [filteredEvents]);

  if (!allowed) {
    return (
      <main className="min-h-screen bg-[#0F0F0F] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-4">Hep Insights (Restricted)</h1>
          <p className="text-slate-300 mb-2">
            This dashboard is available in development or when the admin flag is enabled.
          </p>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li>Run in dev OR append <code className="bg-white/10 px-1 rounded">?hepAdmin=true</code> to the URL once</li>
            <li>Or set <code className="bg-white/10 px-1 rounded">localStorage.hepAdmin = 'true'</code> in console</li>
          </ul>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Hep Insights Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              className="px-3 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 rounded"
              onClick={() => {
                navigator.clipboard.writeText(coachReport || '');
              }}
              disabled={!coachReport}
              title="Copy the weekly Coach-Hep report to clipboard"
            >
              Copy Coach Report
            </button>
            <button
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded border border-white/10"
              onClick={() => {
                try {
                  const events = JSON.parse(localStorage.getItem('hep:metrics:v1:events') || localStorage.getItem('hep:events') || '[]');
                  const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = `hep-events-${Date.now()}.json`;
                  a.click();
                } catch {}
              }}
            >
              Export JSON
            </button>
            <button
              className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded border border-white/10"
              onClick={() => {
                try {
                  const events = JSON.parse(localStorage.getItem('hep:metrics:v1:events') || localStorage.getItem('hep:events') || '[]');
                  const rows = [
                    ['ts', 'date', 'type', 'path', 'id', 'source', 'meta_json'],
                    ...events.map((e: any) => [
                      e.ts ?? e.timestamp,
                      new Date(e.ts ?? e.timestamp).toISOString(),
                      e.type,
                      e.path || '',
                      e.id || e.idRef || '',
                      e.source || '',
                      JSON.stringify(e.meta || {}),
                    ]),
                  ];
                  const csv = rows.map(r => r.map((v: unknown) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = `hep-events-${Date.now()}.csv`;
                  a.click();
                } catch {}
              }}
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <label className="text-sm text-slate-400">Date Range</label>
          <select
            className="bg-white/10 border border-white/10 rounded px-2 py-1 text-sm"
            value={dateRange}
            onChange={e => setDateRange(e.target.value as any)}
            aria-label="Select date range"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="all">All</option>
          </select>

          <label className="text-sm text-slate-400 ml-4">Source</label>
          <select
            className="bg-white/10 border border-white/10 rounded px-2 py-1 text-sm"
            value={source}
            onChange={e => setSource(e.target.value as any)}
            aria-label="Filter by source"
          >
            <option value="all">All</option>
            <option value="hep-chat">Hep Chat</option>
            <option value="ui">UI</option>
            <option value="voice">Voice</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Event Types */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Event Types</h2>
            <span className="text-xs text-slate-400">{eventTypesData.length} types</span>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventTypesData}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="type" stroke="#94a3b8" fontSize={12} interval={0} angle={-15} height={60} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0b0b0b', border: '1px solid #1f2937' }} />
                <Bar dataKey="count" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-400 text-xs">Total sessions</div>
            <div className="text-2xl font-bold">{summary?.totalSessions ?? 0}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-400 text-xs">Return rate</div>
            <div className="text-2xl font-bold">{fmtPct(summary?.returnRate || 0)}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-400 text-xs">Average dwell time</div>
            <div className="text-2xl font-bold">{fmtSec(summary?.avgDwellTime || 0)}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-400 text-xs">Daily rollups counted</div>
            <div className="text-2xl font-bold">{rollups.length}</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Sessions over time */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Sessions & Dwell (Daily)</h2>
              <span className="text-xs text-slate-400">Last {sessionsTimeline.length} days</span>
            </div>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessionsTimeline}>
                  <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#0b0b0b', border: '1px solid #1f2937' }} />
                  <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#22d3ee" strokeWidth={2} dot={false} name="Sessions" />
                  <Line yAxisId="right" type="monotone" dataKey="dwell" stroke="#a78bfa" strokeWidth={2} dot={false} name="Avg Dwell (s)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top projects */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Most Opened Projects</h2>
              <span className="text-xs text-slate-400">Top 3</span>
            </div>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProjects}>
                  <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="id" stroke="#94a3b8" fontSize={12} interval={0} angle={-15} height={50} textAnchor="end" />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#0b0b0b', border: '1px solid #1f2937' }} />
                  <Bar dataKey="count" fill="#22d3ee" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Engagement & Keywords */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hotspots */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Engagement Hotspots</h2>
              <span className="text-xs text-slate-400">Paths with most interaction</span>
            </div>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hotspots}>
                  <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="path" stroke="#94a3b8" fontSize={12} interval={0} angle={-15} height={60} textAnchor="end" />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#0b0b0b', border: '1px solid #1f2937' }} />
                  <Bar dataKey="count" fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Keywords */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Conversation Keywords</h2>
              <span className="text-xs text-slate-400">Most common words</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.length === 0 && (
                <span className="text-slate-400 text-sm">No chat data yet.</span>
              )}
              {keywords.map((k, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-lg bg-white/10 border border-white/10 text-sm"
                  title={`Count: ${k.count}`}
                >
                  {k.word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Coach Report Preview */}
        <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10">
          <h2 className="font-semibold mb-2">Post-Game Coach Report (Preview)</h2>
          <pre className="text-sm text-slate-200 whitespace-pre-wrap">{coachReport || 'No report yet.'}</pre>
        </div>

        {/* Admin Controls */}
        <div className="mt-6 flex gap-3 text-sm text-slate-400">
          <button
            className="underline underline-offset-4 hover:text-white"
            onClick={() => {
              localStorage.removeItem('hepAdmin');
              window.location.reload();
            }}
          >
            Disable Admin Flag
          </button>
          <button
            className="underline underline-offset-4 hover:text-white"
            onClick={() => {
              HepMetrics.performDailyRollupIfDue();
              setRollups(HepMetrics.getDailyRollups());
              setSummary(HepMetrics.getSummary());
            }}
          >
            Recompute Rollups
          </button>
        </div>
      </div>
    </main>
  );
}