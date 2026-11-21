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

type ExperienceGroup = {
  company: string;
  role: string;
  years: string;
  projects: { title: string; slug: string }[];
  placeholder: boolean;
};

type WorkContent = {
  label: string;
  description: string;
  newLabel: string;
  placeholder: boolean;
  home: { intro: string; selectedLabel: string; placeholder: boolean };
  experience: ExperienceGroup[];
  entries: WorkEntry[];
  productThinking: {
    label: string;
    entries: {
      year?: string;
      link: SiteLinkId;
      status: string;
      placeholder: boolean;
    }[];
    note: string;
    placeholder: boolean;
  };
  unpublishedStatus: string;
  caseStudy: {
    title: string;
    summary: string;
    metadata: { label: string; value: string; placeholder: boolean }[];
    sections: CaseStudySection[];
    contact: LinkedText[];
    placeholder: boolean;
  };
};

export const WORK_CONTENT: WorkContent = {
  ...data,
  productThinking: {
    ...data.productThinking,
    entries: data.productThinking.entries.map((entry) => ({
      ...entry,
      link: readSiteLinkId(entry.link),
    })),
  },
  caseStudy: {
    ...data.caseStudy,
    contact: data.caseStudy.contact.map(readLinkedText),
  },
};
