// HepLaunch.ts
// First-launch interaction scripts, idle lines, and returning-visitor greetings
// Coach-Hep voice with optimistic, concise phrasing.

import HepMetrics from './HepMetrics';

type CoachMode = 'coach' | 'film' | 'neutral';

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export interface LaunchOptions {
  mode?: CoachMode;           // Influences tone: 'coach' = celebratory, 'film' = analytical
  returningVisitor?: boolean; // If known externally; otherwise inferred heuristically
}

// Detect returning visitor heuristically from metrics summary and recent return_visit events
function inferReturningVisitor(): boolean {
  try {
    const events = JSON.parse(localStorage.getItem('hep:metrics:v1:events') || localStorage.getItem('hep:events') || '[]');
    const recentReturn = events.slice(-50).some((e: any) => e.type === 'return_visit');
    if (recentReturn) return true;

    const summary = HepMetrics.getSummary();
    return (summary.returnRate || 0) > 0.05; // light heuristic
  } catch {
    return false;
  }
}

export function getFirstLaunchIntro(opts: LaunchOptions = {}): string {
  const mode = opts.mode || 'neutral';
  const isReturning = typeof opts.returningVisitor === 'boolean' ? opts.returningVisitor : inferReturningVisitor();

  const coachLines = [
    "It’s a new day — let’s build something awesome.",
    "Belief comes first, then execution. Ready to run a play?",
    "I’m Hep — part mascot, part strategist. I’ll keep the stats while you make the moves.",
    "Hoosier heart, data brain — ask about Jacob’s work or I’ll scout the film for you."
  ];
  const filmLines = [
    "Welcome. I’m Hep — I watch the tape, track the trends, and flag the opportunities.",
    "Let’s keep it crisp: what do you want to learn — projects, results, or systems?",
    "I’ll log your moves and show you the analytics after the buzzer."
  ];
  const neutralLines = [
    "Hey — I’m Hep. Ask about Jacob’s projects, results, or playbooks.",
    "Woof! Need help fetching a case study or a demo?",
    "IU pride meets product strategy — where should we start?"
  ];

  const returningBumps = [
    "Back for more? I saved your seat on the sideline.",
    "Love the persistence — want the quick recap or a fresh play?",
    "Welcome back — I’ve got the clipboard ready."
  ];

  let base: string;
  if (mode === 'coach') base = pick(coachLines);
  else if (mode === 'film') base = pick(filmLines);
  else base = pick(neutralLines);

  if (isReturning) {
    base += " " + pick(returningBumps);
  }

  return base;
}

export function getIdleLine(mode: CoachMode = 'neutral'): string {
  const coach = [
    "Timeout! Coach says stretch and hydrate.",
    "Quick breather — want me to fetch a highlight?",
    "Let’s keep the pace — one more play?"
  ];
  const film = [
    "Pausing the tape — cue me when you’re ready.",
    "Idle detected — want a concise summary of the top pages?",
    "We can review conversions next if you like."
  ];
  const neutral = [
    "Still here — want a project tour?",
    "Need a hand? I can fetch a case study or the Toolbox.",
    "Ping me if you want the quick hits."
  ];
  if (mode === 'coach') return pick(coach);
  if (mode === 'film') return pick(film);
  return pick(neutral);
}

export function getReturningVisitorGreeting(mode: CoachMode = 'neutral'): string {
  const coach = [
    "Welcome back — belief never dips. Want the week’s top play?",
    "Back on the court — I can pull your highlights.",
    "Good to see you — ready for a fast break into the best work?"
  ];
  const film = [
    "Welcome back — I can recap performance since your last visit.",
    "Back in the film room — shall we review conversions?",
    "I’ve logged your last session — want the deltas?"
  ];
  const neutral = [
    "Welcome back — want a quick tour or a project deep dive?",
    "Good to see you again — I can fetch the MVP case study.",
    "Hey again — I can pull the Toolbox or top projects."
  ];
  if (mode === 'coach') return pick(coach);
  if (mode === 'film') return pick(film);
  return pick(neutral);
}

// Optional helper: produce a short post-game teaser line (for chat injection headers)
export function getPostGameTeaser(mode: CoachMode = 'coach'): string {
  const coach = [
    "Post-game recap ready — quick hits and an actionable next play.",
    "Here’s the tape: wins, gaps, and one crisp recommendation.",
    "Stats are up — want the MVPs and a conversion tweak?"
  ];
  const film = [
    "Analytics compiled — would you like the week-over-week deltas?",
    "I’ve got trends and a recommendation — shall I paste?",
    "Numbers first, then action — ready for the highlights?"
  ];
  return mode === 'film' ? pick(film) : pick(coach);
}

// Utility to stamp a lightweight “play_call” when an analogy is triggered
export function trackPlayCall(topic: string, extra?: Record<string, any>) {
  try {
    HepMetrics.logEvent({
      type: 'chat_message', // minimal use to keep spec event list intact; counted as chat with meta tag
      source: 'hep-chat',
      meta: { play_call: true, topic, ...(extra || {}) }
    });
  } catch {
    // ignore
  }
}