// HepMetrics.ts - lightweight client-side analytics and insights engine
// Stores anonymous events in localStorage, performs daily rollups, and can generate "Coach Hep" reports.

export type HepEventType =
  | 'view_case_study'
  | 'toolbox_click'
  | 'chat_message'
  | 'voice_query'
  | 'crazyboy_trigger'
  | 'nap_start'
  | 'wake_up'
  | 'return_visit'
  | 'play_call'
  | 'page_view'
  | 'engagement_ping';

export interface HepEvent {
  type: HepEventType;
  ts: number;
  sessionId: string;
  path: string;
  id?: string; // e.g., project id, control id
  source?: string; // e.g., 'hep-chat', 'toolbox', 'route'
  meta?: Record<string, any>;
}

export interface DailyRollup {
  date: string; // YYYY-MM-DD
  sessions: number;
  avgSessionTime: number; // seconds
  topPage: string;
  mostUsedFeature: string; // e.g., "Voice Mode", "Chat", "Toolbox"
}

export interface HepSummary {
  totalSessions: number;
  returnRate: number; // 0..1
  avgDwellTime: number; // seconds
  mostOpenedProjects: Array<{ id: string; count: number }>;
  engagementHotspots: Array<{ path: string; count: number }>;
  conversationKeywords: Array<{ word: string; count: number }>;
  playsCalled: Array<{ topic: string; count: number }>;
}

type SessionsIndex = Record<
  string,
  {
    start: number;
    end?: number;
  }
>;

const KEYS = {
  events: 'hep:events',
  visitorId: 'hep:visitorId',
  sessionId: 'hep:sessionId',
  sessionsIndex: 'hep:sessions',
  rollups: 'hep:rollups',
  lastRollup: 'hep:lastRollup',
  // Session lifecycle
  sessionStart: 'hep:sessionStart',
} as const;

const METRICS_ENDPOINT =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_HEP_METRICS_ENDPOINT) ||
  '/api/hep-metrics';

function now(): number {
  return Date.now();
}

function toDateKey(ms: number): string {
  const d = new Date(ms);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function safeRead<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function uuid(): string {
  // Simple UUID-ish
  return 'xxxxxxxyxxxx4xxxyxxxxx'.replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateVisitorId(): string {
  let vid = localStorage.getItem(KEYS.visitorId);
  if (!vid) {
    vid = uuid();
    localStorage.setItem(KEYS.visitorId, vid);
  }
  return vid;
}

function getOrCreateSessionId(): string {
  let sid = sessionStorage.getItem(KEYS.sessionId);
  if (!sid) {
    sid = uuid();
    sessionStorage.setItem(KEYS.sessionId, sid);
  }
  return sid;
}

function getSessionStart(): number {
  let start = Number(sessionStorage.getItem(KEYS.sessionStart));
  if (!start) {
    start = now();
    sessionStorage.setItem(KEYS.sessionStart, String(start));
  }
  return start;
}

function secondsBetween(aMs: number, bMs: number): number {
  return Math.max(0, Math.round((bMs - aMs) / 1000));
}

function getEvents(): HepEvent[] {
  return safeRead<HepEvent[]>(KEYS.events, []);
}

function setEvents(events: HepEvent[]) {
  safeWrite(KEYS.events, events);
  // Notify listeners (e.g., behavior hook)
  window.dispatchEvent(new CustomEvent('hep:events:changed'));
}

function appendEvent(e: HepEvent) {
  const events = getEvents();
  events.push(e);
  setEvents(events);
}

// Heuristic feature name for rollups
function inferFeatureFromEventType(t: HepEventType): string {
  switch (t) {
    case 'voice_query':
      return 'Voice Mode';
    case 'chat_message':
      return 'Chat';
    case 'toolbox_click':
      return 'Toolbox';
    case 'view_case_study':
      return 'Case Studies';
    case 'crazyboy_trigger':
      return 'CrazyBoy';
    case 'play_call':
      return 'Play Calls';
    default:
      return 'Other';
  }
}

function keywordize(text: string): string[] {
  // Very basic anonymized keyword extraction
  const stop = new Set([
    'the',
    'and',
    'that',
    'with',
    'from',
    'this',
    'have',
    'your',
    'about',
    'what',
    'when',
    'where',
    'who',
    'how',
    'why',
    'are',
    'for',
    'you',
    'they',
    'their',
    'our',
    'into',
    'over',
    'like',
    'just',
    'into',
    'does',
    'can',
    'will',
  ]);
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(
      w => w.length > 3 && !stop.has(w) && !w.includes('@') && !/^\d+$/.test(w),
    )
    .slice(0, 8);
}

const HepMetrics = {
  init() {
    // Ensure visitor/session exist
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const start = getSessionStart();

    // Maintain sessions index (start/end times)
    const sessions = safeRead<SessionsIndex>(KEYS.sessionsIndex, {});
    if (!sessions[sessionId]) {
      sessions[sessionId] = { start };
      safeWrite(KEYS.sessionsIndex, sessions);

      // Determine return visit: if any previous session exists for this visitor in this browser
      const hadPrevSessions = Object.keys(sessions).length > 1;
      if (hadPrevSessions) {
        this.logEvent({ type: 'return_visit', source: 'auto' });
      }
    }

    // Page view
    this.logEvent({ type: 'page_view', source: 'auto' });

    // Daily rollup check
    this.performDailyRollupIfDue();

    // Persist dwell time at page hide/unload
    const finalize = () => {
      const end = now();
      const sessionsMap = safeRead<SessionsIndex>(KEYS.sessionsIndex, {});
      if (sessionsMap[sessionId]) {
        sessionsMap[sessionId].end = end;
        safeWrite(KEYS.sessionsIndex, sessionsMap);
      }
      // Also log an engagement ping (lightweight)
      this.logEvent({ type: 'engagement_ping', source: 'auto', meta: { elapsed: secondsBetween(start, end) } }, false);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') finalize();
    });
    window.addEventListener('beforeunload', finalize);

    // Expose a simple admin flag gate: set localStorage.hepAdmin = 'true' to see dashboards
    void visitorId;
  },

  logEvent(
    partial: Omit<HepEvent, 'ts' | 'sessionId' | 'path'>,
    maybePost: boolean = true,
  ) {
    const sessionId = getOrCreateSessionId();
    const evt: HepEvent = {
      ts: now(),
      sessionId,
      path: (typeof window !== 'undefined' && window.location?.pathname) || '/',
      ...partial,
    };
    appendEvent(evt);

    // Optional POST (fire-and-forget)
    if (maybePost && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      try {
        const blob = new Blob([JSON.stringify(evt)], { type: 'application/json' });
        navigator.sendBeacon(METRICS_ENDPOINT, blob);
      } catch {
        // ignore
      }
    }
  },

  performDailyRollupIfDue() {
    // Rollup for YESTERDAY if not already rolled up
    const lastRollup = safeRead<string | null>(KEYS.lastRollup, null);
    const today = toDateKey(now());

    // If last rollup is today, skip
    if (lastRollup === today) return;

    // Compute rollup for yesterday
    const yesterdayDateKey = toDateKey(now() - 24 * 3600 * 1000);
    // If we already rolled up yesterday, just stamp today's date to avoid repeated compute
    const rollups = safeRead<DailyRollup[]>(KEYS.rollups, []);
    const already = rollups.find(r => r.date === yesterdayDateKey);
    if (!already) {
      const roll = this.buildDailyRollup(yesterdayDateKey);
      if (roll) {
        rollups.push(roll);
        safeWrite(KEYS.rollups, rollups);
      }
    }

    // Mark today's date as "rollup performed" stamp
    safeWrite(KEYS.lastRollup, today);
  },

  buildDailyRollup(dateKey: string): DailyRollup | null {
    const events = getEvents().filter(e => toDateKey(e.ts) === dateKey);
    if (!events.length) return null;

    // Sessions: count unique sessionIds that had any event that day
    const sessionIds = new Set(events.map(e => e.sessionId));

    // Avg session time: infer from sessions index if available; fallback to heuristic from engagement pings
    const sessionsIdx = safeRead<SessionsIndex>(KEYS.sessionsIndex, {});
    let totalSecs = 0;
    let count = 0;
    sessionIds.forEach(sid => {
      const rec = sessionsIdx[sid];
      if (rec?.start) {
        const endMs = rec.end ?? rec.start;
        totalSecs += secondsBetween(rec.start, endMs);
        count++;
      }
    });
    const avgSessionTime = count ? Math.round(totalSecs / count) : 0;

    // Top page: by event count
    const byPath: Record<string, number> = {};
    for (const e of events) {
      byPath[e.path] = (byPath[e.path] || 0) + 1;
    }
    const topPage = Object.entries(byPath).sort((a, b) => b[1] - a[1])[0]?.[0] || '/';

    // Most used feature: classify by event type
    const byFeature: Record<string, number> = {};
    for (const e of events) {
      const feat = inferFeatureFromEventType(e.type);
      byFeature[feat] = (byFeature[feat] || 0) + 1;
    }
    const mostUsedFeature = Object.entries(byFeature).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Other';

    return {
      date: dateKey,
      sessions: sessionIds.size,
      avgSessionTime,
      topPage,
      mostUsedFeature,
    };
  },

  getDailyRollups(): DailyRollup[] {
    return safeRead<DailyRollup[]>(KEYS.rollups, []);
  },

  getSummary(): HepSummary {
    const events = getEvents();

    // Sessions: unique sessionIds across entire history
    const sessionIds = new Set(events.map(e => e.sessionId));
    const totalSessions = sessionIds.size;

    // Return rate: count return_visit events / sessions (bounded 0..1)
    const returns = events.filter(e => e.type === 'return_visit').length;
    const returnRate = totalSessions > 0 ? Math.min(1, returns / totalSessions) : 0;

    // Dwell: estimate via engagement_ping elapsed meta and sessions index
    const sessionsIdx = safeRead<SessionsIndex>(KEYS.sessionsIndex, {});
    let dwellTotal = 0;
    let dwellCount = 0;
    for (const sid of Object.keys(sessionsIdx)) {
      const s = sessionsIdx[sid];
      const endMs = s.end ?? s.start;
      // Only count if end is after start
      if (endMs >= s.start) {
        dwellTotal += secondsBetween(s.start, endMs);
        dwellCount++;
      }
    }
    const avgDwellTime = dwellCount ? Math.round(dwellTotal / dwellCount) : 0;

    // Most opened projects: count view_case_study by id
    const projectCounts: Record<string, number> = {};
    for (const e of events) {
      if (e.type === 'view_case_study' && e.id) {
        projectCounts[e.id] = (projectCounts[e.id] || 0) + 1;
      }
    }
    const mostOpenedProjects = Object.entries(projectCounts)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Engagement hotspots: pages with most Hep interactions (chat, toolbox, voice, play calls)
    const INTERACTION_TYPES: HepEventType[] = [
      'chat_message',
      'toolbox_click',
      'voice_query',
      'play_call',
      'crazyboy_trigger',
    ];
    const hotspotMap: Record<string, number> = {};
    for (const e of events) {
      if (INTERACTION_TYPES.includes(e.type)) {
        hotspotMap[e.path] = (hotspotMap[e.path] || 0) + 1;
      }
    }
    const engagementHotspots = Object.entries(hotspotMap)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Conversation keywords: derive from chat_message meta.text
    const kwMap: Record<string, number> = {};
    for (const e of events) {
      if (e.type === 'chat_message' && typeof e.meta?.text === 'string') {
        for (const w of keywordize(e.meta.text)) {
          kwMap[w] = (kwMap[w] || 0) + 1;
        }
      }
    }
    const conversationKeywords = Object.entries(kwMap)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Plays called: collected via play_call meta.topic
    const playMap: Record<string, number> = {};
    for (const e of events) {
      if (e.type === 'play_call' && typeof e.meta?.topic === 'string') {
        playMap[e.meta.topic] = (playMap[e.meta.topic] || 0) + 1;
      }
    }
    const playsCalled = Object.entries(playMap)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalSessions,
      returnRate,
      avgDwellTime,
      mostOpenedProjects,
      engagementHotspots,
      conversationKeywords,
      playsCalled,
    };
  },

  // Convenience helpers for UI/Behavior hooks
  getSessionInteractionCount(types: HepEventType[] = ['chat_message', 'toolbox_click']): number {
    const sid = getOrCreateSessionId();
    return getEvents().filter(e => e.sessionId === sid && types.includes(e.type)).length;
  },

  getSessionHasViewedProject(): boolean {
    const sid = getOrCreateSessionId();
    return getEvents().some(e => e.sessionId === sid && e.type === 'view_case_study');
  },

  // Generate conversational "post-game" report in Coach Hep voice
  async generateCoachReport(period: 'weekly' | 'monthly' = 'weekly'): Promise<string> {
    const rollups = this.getDailyRollups();
    const horizon = period === 'weekly' ? 7 : 30;
    const recent = rollups.slice(-horizon);
    const sessions = recent.reduce((sum, r) => sum + r.sessions, 0);
    const avgSessionTime =
      recent.length ? Math.round(recent.reduce((s, r) => s + r.avgSessionTime, 0) / recent.length) : 0;

    // Top page among recent rollups
    const pageCounts: Record<string, number> = {};
    for (const r of recent) {
      pageCounts[r.topPage] = (pageCounts[r.topPage] || 0) + 1;
    }
    const topPage = Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '/';

    // Most used feature among recent rollups
    const featCounts: Record<string, number> = {};
    for (const r of recent) {
      featCounts[r.mostUsedFeature] = (featCounts[r.mostUsedFeature] || 0) + 1;
    }
    const mostUsedFeature = Object.entries(featCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Chat';

    const summary = this.getSummary();
    const repeatsApprox = Math.round(summary.returnRate * sessions);

    const lines: string[] = [];
    lines.push(`Hey Jacob — here’s our post-game recap.`);
    lines.push(
      `${sessions} visitors ${period === 'weekly' ? 'this week' : 'this month'}, ${repeatsApprox} repeat sessions, average session time ${avgSessionTime}s.`,
    );

    const mvpLine =
      summary.mostOpenedProjects.length > 0
        ? `MVP remains ${summary.mostOpenedProjects[0].id} — ${summary.mostOpenedProjects[0].count} clicks.`
        : `We’re spreading the ball — no single MVP project yet.`;
    lines.push(mvpLine);

    lines.push(
      `Engagement loved ${mostUsedFeature.toLowerCase()} — and top page heat stays on ${topPage}.`,
    );

    // Simple nudge based on engagementHotspots composition
    const hotspots = summary.engagementHotspots.map(h => h.path);
    if (hotspots.every(p => p !== '/toolbox')) {
      lines.push(`Let’s tweak the CTA on the Toolbox — conversions could be stronger.`);
    } else {
      lines.push(`Toolbox momentum looks solid — consider promoting top tools above the fold.`);
    }

    lines.push(`But hey — belief never dips. On to the next play.`);

    return lines.join('\n');
  },
};

export default HepMetrics;