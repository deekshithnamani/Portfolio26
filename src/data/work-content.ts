import data from "./work.json";
import {
  readLinkedText,
  readSiteLinkId,
  type LinkedText,
  type SiteLinkId,
} from "./site-links";

type WorkEntry = {
  year: string;
  title: string;
  description: string;
  href?: string;
  placeholder: boolean;
};

type CompanyProject = WorkEntry & { company?: string; featured?: boolean };

function projectYears(year: string) {
  const [firstYear, lastYear] = year.split("–").map((part) => part.trim());
  const start = Number(firstYear);
  if (lastYear === undefined) return { start, end: start };
  if (lastYear === "") return { start, end: Infinity };

  const last = Number(lastYear);
  const expanded = Math.floor(start / 100) * 100 + last;
  const end =
    lastYear.length === 2 ? expanded + (expanded < start ? 100 : 0) : last;
  return { start, end };
}

export function sortProjectsByYear<T extends { year: string }>(
  projects: readonly T[],
) {
  return [...projects].sort((a, b) => {
    const first = projectYears(a.year);
    const second = projectYears(b.year);
    return first.end === second.end
      ? second.start - first.start
      : second.end - first.end;
  });
}

type CaseStudySection = {
  id: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
  caption?: string;
  note?: string;
  placeholder: boolean;
};

export type ProjectContent = {
  title: string;
  summary?: string;
  meta?: string;
  sectionNav?: boolean;
  sections: CaseStudySection[];
  placeholder: boolean;
};

type WorkContent = {
  label: string;
  description: string;
  placeholder: boolean;
  home: {
    intro: string;
    photography: LinkedText[];
    selectedLabel: string;
    placeholder: boolean;
  };
  entries: CompanyProject[];
  companies: Partial<Record<string, { role: string; duration: string }>>;
  productThinking: {
    label: string;
    id: string;
    entries: (WorkEntry & { link?: SiteLinkId })[];
    note: string;
    certificateUrl?: string;
    certificateLabel: string;
    placeholder: boolean;
  };
  caseStudy: ProjectContent;
  univPlatform: ProjectContent;
};

export const WORK_CONTENT: WorkContent = {
  ...data,
  entries: sortProjectsByYear<CompanyProject>(data.entries),
  home: {
    ...data.home,
    photography: data.home.photography.map(readLinkedText),
  },
  productThinking: {
    ...data.productThinking,
    entries: sortProjectsByYear(data.productThinking.entries).map((entry) => ({
      ...entry,
      link: entry.link === undefined ? undefined : readSiteLinkId(entry.link),
    })),
  },
};

export const WORK_GROUPS = new Map<string, CompanyProject[]>();
for (const project of WORK_CONTENT.entries) {
  if (!project.company) continue;
  const group = WORK_GROUPS.get(project.company);
  if (group) group.push(project);
  else WORK_GROUPS.set(project.company, [project]);
}

export const PROJECT_PAGES: Readonly<Record<string, ProjectContent>> = {
  "/work/property-document-checker": WORK_CONTENT.caseStudy,
  "/work/univ-ai-platform": WORK_CONTENT.univPlatform,
};
