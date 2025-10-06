import MiniSearch from "minisearch";
import type { CaseStudy, FrontMatterMetadata, ProjectSummary } from "../types/content";

// Types for items we’ll index
export type SearchDoc = {
  id: string;
  type: "case" | "project" | "deep";
  title: string;
  summary?: string;
  url: string;
  tags?: string[];
};

export async function buildSearchIndex(): Promise<{ mini: MiniSearch<SearchDoc>; docs: SearchDoc[] }> {
  const docs: SearchDoc[] = [];

  // Case studies JSON
  const cs = (await import("../data/caseStudies.json")).default as CaseStudy[];
  cs.forEach((c) =>
    docs.push({
    id: `case:${c.slug}`,
    type: "case",
    title: c.title,
    summary: c.subtitle,
    url: `/deep/${c.slug}`,
      tags: [c.category].filter(Boolean)
    })
  );

  // Projects JSON
  const projects = (await import("../data/projects.json")).default as ProjectSummary[];
  projects.forEach((p) =>
    docs.push({
    id: `project:${p.title}`,
    type: "project",
    title: p.title,
    summary: p.summary,
    url: "/projects",
      tags: p.tech
    })
  );

  // Deep dive MD front-matter (light parse: title/summary)
  const slugs = ["the-launchpad","the-guardian","the-compass","the-fortress","the-conductor","the-engine-room"];
  for (const slug of slugs) {
    const raw = await fetch(`/content/deep-dives/${slug}.md`).then((r) => r.text()).catch(() => null);
    if (!raw) continue;
    const fm = parseFrontMatter(raw);
    docs.push({
      id: `deep:${slug}`,
      type: "deep",
      title: fm.title || slug,
      summary: fm.summary || "",
      url: `/deep/${slug}`,
      tags: fm.tags || []
    });
  }

  const mini = new MiniSearch<SearchDoc>({
    fields: ["title", "summary", "tags"],
    storeFields: ["title", "summary", "url", "type"]
  });
  mini.addAll(docs);
  return { mini, docs };
}

// same lightweight FM parser used in DeepDive
function parseFrontMatter(src: string): FrontMatterMetadata {
  if (!src.startsWith("---")) return {};
  const end = src.indexOf("\n---", 3);
  if (end === -1) return {};
  const raw = src.slice(3, end).trim();
  const fmResult: FrontMatterMetadata = {};
  raw.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
  fmResult[key.trim()] = rest.join(":").trim().replace(/(^"|"$)/g, "");
  });
  if (typeof fmResult.tags === "string") {
    fmResult.tags = (fmResult.tags as string).split(",").map((tag) => tag.trim());
  }
  return fmResult;
}
