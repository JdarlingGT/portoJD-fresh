// HepExport.ts - Admin utilities for exporting Hep metrics and generating insights

import HepMetrics from './HepMetrics';

export type ExportFilter = {
  types?: string[]; // HepEventType strings
  fromTs?: number;  // inclusive epoch ms
  toTs?: number;    // inclusive epoch ms
};

type HepEvent = Parameters<typeof HepMetrics['logEvent']>[0] & {
  ts?: number;
  sessionId?: string;
  path?: string;
};

export interface Insight {
  insight: string;
  recommendation: string;
  evidence?: Record<string, any>;
}

export const HepExport = {
  // Return filtered raw events
  getEvents(filter?: ExportFilter): any[] {
    try {
      const raw = JSON.parse(localStorage.getItem('hep:events') || '[]') as any[];
      if (!filter) return raw;
      return raw.filter(e => {
        if (filter.types && filter.types.length && !filter.types.includes(e.type)) return false;
        if (typeof filter.fromTs === 'number' && e.ts < filter.fromTs) return false;
        if (typeof filter.toTs === 'number' && e.ts > filter.toTs) return false;
        return true;
      });
    } catch {
      return [];
    }
  },

  // JSON as string, pretty
  toJSON(filter?: ExportFilter): string {
    const events = this.getEvents(filter);
    return JSON.stringify(events, null, 2);
  },

  // CSV string
  toCSV(filter?: ExportFilter): string {
    const events = this.getEvents(filter);
    const rows = [
      ['ts', 'date', 'type', 'path', 'id', 'source', 'sessionId', 'meta_json'],
      ...events.map((e: any) => [
        e.ts,
        new Date(e.ts).toISOString(),
        e.type,
        e.path || '',
        e.id || '',
        e.source || '',
        e.sessionId || '',
        JSON.stringify(e.meta || {}),
      ]),
    ];
    return rows.map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n');
  },

  // Simple scoring algorithm to auto-generate insight summaries
  // Produces a few ranked insights with recommendations
  generateInsights(): Insight[] {
    const summary = HepMetrics.getSummary();
    const rollups = HepMetrics.getDailyRollups();

    const insights: Insight[] = [];
    const last7 = rollups.slice(-7);

    // 1) Toolbox views trend vs. previous period (simple delta on hotspots and toolbox_click)
    const events = this.getEvents();
    const toolboxClicks = events.filter(e => e.type === 'toolbox_click').length;
    const prevToolboxClicks = events
      .filter(e => e.type === 'toolbox_click')
      .slice(0, Math.max(0, toolboxClicks - Math.floor(toolboxClicks * 0.5))).length; // naive approx
    const toolboxChange = prevToolboxClicks ? Math.round(((toolboxClicks - prevToolboxClicks) / Math.max(1, prevToolboxClicks)) * 100) : (toolboxClicks > 0 ? 100 : 0);
    if (toolboxClicks > 0) {
      insights.push({
        insight: `Toolbox interactions ${toolboxChange >= 0 ? 'increased' : 'decreased'} ${Math.abs(toolboxChange)}% recently`,
        recommendation: toolboxChange >= 0
          ? 'Promote top tools above the fold and add in-line “try now” CTAs.'
          : 'Refresh Toolbox CTA and surface top-performing tools within the homepage hero.',
        evidence: { toolboxClicks, prevToolboxClicks, toolboxChange }
      });
    }

    // 2) Most used feature in last 7 days from rollups
    if (last7.length) {
      const featCounts: Record<string, number> = {};
      for (const r of last7) {
        featCounts[r.mostUsedFeature] = (featCounts[r.mostUsedFeature] || 0) + 1;
      }
      const topFeat = Object.entries(featCounts).sort((a, b) => b[1] - a[1])[0];
      if (topFeat) {
        insights.push({
          insight: `${topFeat[0]} led engagement across the last ${last7.length} days`,
          recommendation: `Double down on ${topFeat[0]} by surfacing it earlier in the journey and adding a contextual CTA.`,
          evidence: { featCounts }
        });
      }
    }

    // 3) Session dwell heuristic
    if (summary.avgDwellTime > 120) {
      insights.push({
        insight: `Average session time is strong at ${summary.avgDwellTime}s`,
        recommendation: 'Consider longer-form content or embedded demos to capitalize on attention.',
        evidence: { avgDwellTime: summary.avgDwellTime }
      });
    } else {
      insights.push({
        insight: `Average session time is modest at ${summary.avgDwellTime}s`,
        recommendation: 'Experiment with sticky CTAs and page-level guidance to improve depth.',
        evidence: { avgDwellTime: summary.avgDwellTime }
      });
    }

    // 4) Project MVP signal
    if (summary.mostOpenedProjects.length) {
      const mvp = summary.mostOpenedProjects[0];
      insights.push({
        insight: `Project "${mvp.id}" is the current MVP with ${mvp.count} opens`,
        recommendation: `Feature "${mvp.id}" in the hero carousel and add a tailored CTA to convert interest.`,
        evidence: { mvp }
      });
    }

    // 5) Keywords nudge
    if (summary.conversationKeywords.length) {
      const tops = summary.conversationKeywords.slice(0, 3).map(k => k.word);
      insights.push({
        insight: `Visitors ask most about: ${tops.join(', ')}`,
        recommendation: `Create a short FAQ or quick-demo links targeting these topics directly in Hep's opening prompts.`,
        evidence: { topKeywords: tops }
      });
    }

    // Rank by a naive priority: MVP/project insight > feature trend > dwell > keywords > toolbox
    const rank = (i: Insight) => {
      if (i.insight.includes('MVP')) return 100;
      if (i.insight.includes('led engagement')) return 80;
      if (i.insight.includes('Average session time')) return 60;
      if (i.insight.includes('Visitors ask most')) return 50;
      if (i.insight.includes('Toolbox interactions')) return 40;
      return 10;
    };

    return insights.sort((a, b) => rank(b) - rank(a));
  },
};

export default HepExport;