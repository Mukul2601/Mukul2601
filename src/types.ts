export type ThemeMode = 'dark' | 'light';

export interface ThemeTokens {
  mode: ThemeMode;
  canvasBg: string;
  cardBg: string;
  cardBgElevated: string;
  cardBorder: string;
  cardHighlight: string;
  pillBg: string;
  pillBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentBlue: string;
  accentViolet: string;
  accentMagenta: string;
  accentAmber: string;
  accentGreen: string;
  accentCyan: string;
  islandBg: string;
  islandBorder: string;
  islandText: string;
  divider: string;
  trackBg: string;
  orbOpacity: number;
  gridOpacity: number;
}

export interface DockStat {
  eyebrow: string;
  value: string;
  icon: 'spark' | 'nodes' | 'cloud' | 'shield';
}

export interface AgentStage {
  step: string;
  title: string;
  subtitle: string;
  detail: string;
}

export interface ImpactMetric {
  figure: string;
  title: string;
  context: string;
  fillPercent: number;
  tone: 'blue' | 'green';
}

export interface ExperienceItem {
  period: string;
  shortPeriod: string;
  company: string;
  roleLine1: string;
  roleLine2: string;
  fullRole: string;
  location: string;
  badge: string;
  active?: boolean;
  summary: string;
}

export interface ProjectItem {
  slug: string;
  eyebrow: string;
  title: string;
  line1: string;
  line2: string;
  url: string;
  tags: string[];
  accent: 'blue' | 'violet';
}

export interface StackRow {
  category: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  eyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  dynamicIslandText: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    shortLabel: string;
  };
  links: {
    github: string;
    linkedin: string;
    username: string;
  };
  dockStats: [DockStat, DockStat, DockStat, DockStat];
  agentWorkflow: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stages: [AgentStage, AgentStage, AgentStage, AgentStage];
  };
  impactMetrics: [ImpactMetric, ImpactMetric];
  securityPillars: string[];
  stackRows: [StackRow, StackRow, StackRow];
  experiences: [
    ExperienceItem,
    ExperienceItem,
    ExperienceItem,
    ExperienceItem,
    ExperienceItem
  ];
  projects: [ProjectItem, ProjectItem];
}
