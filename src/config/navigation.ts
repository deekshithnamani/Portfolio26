import { matchPath } from "react-router";
import { ABOUT_CONTENT } from "@/data/about-content";
import { BEYOND_WORK_CONTENT } from "@/data/beyond-work-content";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";
import {
  buildBeyondWorkSeriesPath,
  buildWorkDetailPath,
  LEGACY_REDIRECTS,
  ROUTE_PATHS,
} from "./route-paths";

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
  propertyChecker: "Deekshith Namani · Property-document checker",
  home: "Deekshith Namani · Home",
  work: "Deekshith Namani · Work",
  productThinking: "Deekshith Namani · Product",
  about: "Deekshith Namani · About",
  beyondWork: "Deekshith Namani · Creative",
  notFound: "Deekshith Namani · Page Not Found",
} as const;

export const NAV_ITEMS: NavItem[] = [
  {
    label: SITE_LINKS.work.label,
    path: SITE_LINKS.work.href,
    order: 0,
    visible: true,
    group: "main",
    description: WORK_CONTENT.description,
  },
  {
    label: SITE_LINKS.productThinking.label,
    path: SITE_LINKS.productThinking.href,
    order: 1,
    visible: true,
    group: "main",
    description: "PRDs, teardowns, and product decisions",
  },
  {
    label: SITE_LINKS.beyondWork.label,
    path: SITE_LINKS.beyondWork.href,
    order: 2,
    visible: true,
    group: "main",
    description: BEYOND_WORK_CONTENT.description,
  },
  {
    label: SITE_LINKS.about.label,
    path: SITE_LINKS.about.href,
    order: 3,
    visible: true,
    group: "main",
    description: "Background and contact",
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
  ...WORK_CONTENT.experience.flatMap(({ projects }) =>
    projects.map(({ slug, title }) => ({
      match: (pathname: string) => pathname === buildWorkDetailPath(slug),
      title: `${SITE_LINKS.brand.label} · ${title}`,
      description: WORK_CONTENT.unpublishedStatus,
    })),
  ),
  ...BEYOND_WORK_CONTENT.series.map(({ slug, title, description }) => ({
    match: (pathname: string) => pathname === buildBeyondWorkSeriesPath(slug),
    title: `${SITE_LINKS.brand.label} · ${title}`,
    description: description ?? BEYOND_WORK_CONTENT.description,
  })),
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
    match: (pathname) => pathname === ROUTE_PATHS.beyondWork,
    title: DOCUMENT_TITLES.beyondWork,
    description: BEYOND_WORK_CONTENT.description,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.productThinking,
    title: DOCUMENT_TITLES.productThinking,
    description: "PRDs, teardowns, and product decisions.",
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.about,
    title: DOCUMENT_TITLES.about,
    description: ABOUT_CONTENT.sections[0].body,
  },
];

export function resolveDocumentMetadata(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const redirect = Object.entries(LEGACY_REDIRECTS).find(([pattern]) =>
    matchPath(pattern, normalizedPath),
  );
  const rule = DOCUMENT_TITLE_RULES.find(({ match }) =>
    match(redirect?.[1] ?? normalizedPath),
  );
  return {
    title: rule?.title ?? DOCUMENT_TITLES.notFound,
    description: rule?.description ?? ABOUT_CONTENT.notFound.message,
  };
}

export function resolveDocumentTitle(pathname: string) {
  return resolveDocumentMetadata(pathname).title;
}
