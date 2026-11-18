import { matchPath } from "react-router";
import { ABOUT_CONTENT } from "@/data/about-content";
import { PRACTICE_CONTENT } from "@/data/practice-content";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";
import { buildPracticeSeriesPath, ROUTE_PATHS } from "./route-paths";

export type NavItem = {
  label: string;
  path: string;
  order: number;
  visible: boolean;
  group: "main" | "utility";
  description: string;
};

export type DocumentTitleRule = {
  match: (pathname: string) => boolean;
  title: string;
  description: string;
};

export const DOCUMENT_TITLES = {
  productThinking: "Deekshith Namani · Product thinking",
  beyondWork: "Deekshith Namani · Beyond work",
  propertyChecker: "Deekshith Namani · Property-document checker",
  home: "Deekshith Namani · Home",
  work: "Deekshith Namani · Work",
  workDetail: "Deekshith Namani · Case Study",
  make: "Deekshith Namani · Built",
  curations: "Deekshith Namani · Curations",
  practice: "Deekshith Namani · Practice",
  concepts: "Deekshith Namani · Backlog",
  about: "Deekshith Namani · About",
  writing: "Deekshith Namani · Writing",
  writingDetail: "Deekshith Namani · Article",
  interests: "Deekshith Namani · Interests",
  notFound: "Deekshith Namani · Page Not Found",
} as const;

export const NAV_ITEMS: NavItem[] = [
  {
    label: SITE_LINKS.work.label,
    path: SITE_LINKS.work.href,
    order: 2,
    visible: true,
    group: "main",
    description: "Selected product design work",
  },
  {
    label: SITE_LINKS.practice.label,
    path: SITE_LINKS.practice.href,
    order: 3,
    visible: true,
    group: "main",
    description: "Photographs and studies",
  },
  {
    label: "Beyond work",
    path: "/beyond-work",
    order: 4,
    visible: false,
    group: "main",
    description: "Photography and library",
  },
  {
    label: SITE_LINKS.about.label,
    path: SITE_LINKS.about.href,
    order: 5,
    visible: true,
    group: "main",
    description: "How I work",
  },
  {
    label: "Side projects",
    path: "/make",
    order: 6,
    visible: false,
    group: "main",
    description: "Independent experiments",
  },
  {
    label: SITE_LINKS.resume.label.replace(" ↗", ""),
    path: SITE_LINKS.resume.href,
    order: 1,
    visible: true,
    group: "utility",
    description: "Product design résumé",
  },
];

export function getVisibleNavItems(group: NavItem["group"]) {
  return NAV_ITEMS.filter((item) => item.visible && item.group === group).sort(
    (a, b) => a.order - b.order,
  );
}

export const DOCUMENT_TITLE_RULES: DocumentTitleRule[] = [
  {
    match: (pathname) => pathname === SITE_LINKS.legalProof.href,
    title: DOCUMENT_TITLES.propertyChecker,
    description: WORK_CONTENT.caseStudy.summary,
  },
  ...PRACTICE_CONTENT.series.map(({ slug, title, description }) => ({
    match: (pathname: string) => pathname === buildPracticeSeriesPath(slug),
    title: `${SITE_LINKS.brand.label} · ${title}`,
    description: description ?? PRACTICE_CONTENT.description,
  })),
  {
    match: (pathname) => pathname === ROUTE_PATHS.productThinking,
    title: DOCUMENT_TITLES.productThinking,
    description: "PRDs, teardowns, and product decisions.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.beyondWork,
    title: DOCUMENT_TITLES.beyondWork,
    description: "Photography and a library of useful ideas.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.home,
    title: DOCUMENT_TITLES.home,
    description:
      "Product designer in Hyderabad working on AI and enterprise products.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.work,
    title: DOCUMENT_TITLES.work,
    description: WORK_CONTENT.description,
  },
  {
    match: (pathname) =>
      Boolean(matchPath(ROUTE_PATHS.daosoftProject, pathname)),
    title: DOCUMENT_TITLES.workDetail,
    description: "Product design case study.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.make,
    title: DOCUMENT_TITLES.make,
    description: "Independent projects and experiments.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.curations,
    title: DOCUMENT_TITLES.curations,
    description: "A library of useful ideas.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.practice,
    title: DOCUMENT_TITLES.practice,
    description: PRACTICE_CONTENT.description,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.concepts,
    title: DOCUMENT_TITLES.concepts,
    description: "Product and business ideas.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.about,
    title: DOCUMENT_TITLES.about,
    description: "About Deekshith Namani and how he works.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.writing,
    title: DOCUMENT_TITLES.writing,
    description: "Writing by Deekshith Namani.",
  },
  {
    match: (pathname) => pathname.startsWith(`${ROUTE_PATHS.writing}/`),
    title: DOCUMENT_TITLES.writingDetail,
    description: "An article by Deekshith Namani.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.interests,
    title: DOCUMENT_TITLES.interests,
    description: "Interests and influences.",
  },
];

export function resolveDocumentMetadata(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const rule = DOCUMENT_TITLE_RULES.find(({ match }) => match(normalizedPath));
  return {
    title: rule?.title ?? DOCUMENT_TITLES.notFound,
    description: rule?.description ?? ABOUT_CONTENT.notFound.message,
  };
}

export function resolveDocumentTitle(pathname: string) {
  return resolveDocumentMetadata(pathname).title;
}
