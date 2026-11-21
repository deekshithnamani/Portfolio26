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
  status: string;
  href?: string;
  isNew?: boolean;
  placeholder: boolean;
};

type CaseStudySection = {
  id: string;
  title: string;
  body: string;
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
  newLabel: string;
  placeholder: boolean;
  home: {
    intro: string;
    photography: LinkedText[];
    selectedLabel: string;
    placeholder: boolean;
  };
  entries: WorkEntry[];
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
  projectContact: LinkedText[];
};

export const WORK_CONTENT: WorkContent = {
  ...data,
  home: {
    ...data.home,
    photography: data.home.photography.map(readLinkedText),
  },
  productThinking: {
    ...data.productThinking,
    entries: data.productThinking.entries.map((entry) => ({
      ...entry,
      link: entry.link === undefined ? undefined : readSiteLinkId(entry.link),
    })),
  },
  projectContact: data.projectContact.map(readLinkedText),
};

export const PROJECT_PAGES: Readonly<Record<string, ProjectContent>> = {
  "/work/property-document-checker": WORK_CONTENT.caseStudy,
  "/work/univ-ai-platform": WORK_CONTENT.univPlatform,
};
