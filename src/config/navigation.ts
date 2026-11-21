import { matchPath } from "react-router";
import { BEYOND_WORK_CONTENT } from "@/data/beyond-work-content";
import {
  NOT_FOUND_CONTENT,
  SITE_LINKS,
  SITE_METADATA,
} from "@/data/site-links";
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
    label: SITE_LINKS.beyondWork.label,
    path: SITE_LINKS.beyondWork.href,
    order: 1,
    visible: true,
    group: "main",
    description: BEYOND_WORK_CONTENT.description,
  },
  {
    label: SITE_LINKS.about.label,
    path: SITE_LINKS.about.href,
    order: 2,
    visible: true,
    group: "main",
    description: SITE_METADATA.about.description,
  },
];

export function getVisibleNavItems(group: NavItem["group"]) {
  return NAV_ITEMS.filter((item) => item.visible && item.group === group).sort(
    (a, b) => a.order - b.order,
  );
}

export const DOCUMENT_TITLE_RULES: DocumentTitleRule[] = [
  ...(
    [
      [SITE_LINKS.legalProof.href, SITE_METADATA.propertyChecker],
      [buildWorkDetailPath("univ-ai-platform"), SITE_METADATA.univPlatform],
      [ROUTE_PATHS.home, SITE_METADATA.home],
      [ROUTE_PATHS.work, SITE_METADATA.work],
      [ROUTE_PATHS.beyondWork, SITE_METADATA.beyondWork],
      [ROUTE_PATHS.about, SITE_METADATA.about],
    ] as const
  ).map(([path, metadata]) => ({
    match: (pathname: string) => pathname === path,
    ...metadata,
  })),
  ...BEYOND_WORK_CONTENT.series.map(({ slug, title, description }) => ({
    match: (pathname: string) => pathname === buildBeyondWorkSeriesPath(slug),
    title: `${SITE_LINKS.brand.label} · ${title}`,
    description,
  })),
];

export function resolveDocumentMetadata(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const redirect = Object.entries(LEGACY_REDIRECTS).find(([pattern]) =>
    matchPath(pattern, normalizedPath),
  );
  const rule = DOCUMENT_TITLE_RULES.find(({ match }) =>
    match(redirect?.[1].split("#")[0] ?? normalizedPath),
  );
  return {
    title: rule?.title ?? SITE_METADATA.notFound.title,
    description: rule?.description ?? NOT_FOUND_CONTENT.message,
  };
}

export function resolveDocumentTitle(pathname: string) {
  return resolveDocumentMetadata(pathname).title;
}
