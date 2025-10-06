export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyTimelineEntry {
  title: string;
  description: string;
}

export interface CaseStudyDetails {
  challenge?: string;
  solution?: string;
  technologies?: string[];
  toolboxLinks?: string[];
  metrics?: CaseStudyMetric[];
  results?: string[];
  timeline?: CaseStudyTimelineEntry[] | string[];
  highlights?: string[];
  improvements?: string[];
  stats?: CaseStudyMetric[];
  cta?: { label: string; href: string };
  heroImage?: string;
  [key: string]: unknown;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  icon: string;
  description: string;
  impact?: string;
  featured?: boolean;
  details?: CaseStudyDetails;
  summary?: string;
  [key: string]: unknown;
}

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  caseStudy?: string;
  [key: string]: string | undefined;
}

export interface ProjectSummary {
  title: string;
  summary: string;
  tech: string[];
  caseStudyRoute?: string;
  links?: ProjectLinks;
  [key: string]: unknown;
}

export interface FrontMatterMetadata {
  title?: string;
  summary?: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface TimelineItem {
  period: string;
  role: string;
  org: string;
  industry: string;
  bullets: string[];
  tech: string[];
}

export interface PrincipleItem {
  icon: string;
  title: string;
  subtitle: string;
  stat?: string;
}

export interface StackTileItem {
  title: string;
  desc: string;
  href: string;
}

export interface PartnershipItem {
  client: string;
  context: string;
  results: string[];
}

export interface TechnicalProject {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: string;
  technologies: string[];
  timeline: string;
  impact: string;
  why: string;
  value: string;
  color: string;
  borderColor: string;
  caseStudyRoute?: string;
  [key: string]: unknown;
}

export interface TechnicalProjectStats {
  totalProjects: number;
  totalImpact: string;
  avgTimeline: string;
  technologies: number;
}

export interface TechnicalProjectsData {
  projects: TechnicalProject[];
  categories: string[];
  stats: TechnicalProjectStats;
}
