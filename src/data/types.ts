export type WorkBodyBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; caption: string }
  | { type: "video"; src: string; caption?: string };

export interface WorkQuickFacts {
  role: string;
  duration: string;
  teamSize: string;
  tools: string;
}

export interface WorkItem {
  slug: string;
  id: string;
  title: string;
  company: string;
  duration: string;
  category: string;
  year: string;
  quickFacts: WorkQuickFacts;
  tldr: string;
  cover: string;
  tags: string[];
  closingNote?: string;
  body: WorkBodyBlock[];
}

export interface MakeItem {
  slug: string;
  id: string;
  title: string;
  type: "Projects" | "Experiments";
  year: string;
  link: string;
  whatItIs: string;
  whyIBuilt: string;
  whatLearned: string;
}

export interface Post {
  slug: string;
  id: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  body: string;
}

export interface InterestItem {
  id: string;
  tag: string;
  title: string;
  sub: string;
  year: string;
  link: string;
  img?: string;
}

export interface StudyItem {
  id: string;
  medium: string;
  title: string;
  img: string;
  note?: string;
  year: string;
}

export interface CurationItem {
  id: string;
  tag: string;
  title: string;
  note: string;
  link?: string;
  img?: string;
}

export interface DraftItem {
  id: string;
  title: string;
  hook: string;
  note: string;
  domain?: string;
  year?: string;
}
