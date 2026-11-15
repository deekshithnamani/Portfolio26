import { ROUTE_PATHS } from "./route-paths";

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
};

export const DOCUMENT_TITLES = {
  home: "Home | Dnamani",
  work: "Work | Dnamani",
  workDetail: "Case Study | Dnamani",
  make: "Built | Dnamani",
  curations: "Curations | Dnamani",
  practice: "Practice | Dnamani",
  concepts: "Backlog | Dnamani",
  about: "About | Dnamani",
  writing: "Writing | Dnamani",
  writingDetail: "Article | Dnamani",
  interests: "Interests | Dnamani",
  notFound: "Page Not Found | Dnamani",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", order: 1, visible: true, group: "main", description: "Start here" },
  { label: "Work", path: "/work", order: 2, visible: true, group: "main", description: "Selected product design work" },
  { label: "Product thinking", path: "/product-thinking", order: 3, visible: true, group: "main", description: "PRDs, teardowns, and product decisions" },
  { label: "Beyond work", path: "/beyond-work", order: 4, visible: false, group: "main", description: "Photography and library" },
  { label: "About", path: "/about", order: 5, visible: true, group: "main", description: "How I work" },
  { label: "Side projects", path: "/make", order: 6, visible: false, group: "main", description: "Independent experiments" },
  { label: "Resume", path: "#", order: 1, visible: true, group: "utility", description: "TODO: add resume PDF" },
];

export function getVisibleNavItems(group: NavItem["group"]) {
  return NAV_ITEMS.filter((item) => item.visible && item.group === group).sort(
    (a, b) => a.order - b.order,
  );
}

export const DOCUMENT_TITLE_RULES: DocumentTitleRule[] = [
  {
    match: (pathname) => pathname === ROUTE_PATHS.home,
    title: DOCUMENT_TITLES.home,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.work,
    title: DOCUMENT_TITLES.work,
  },
  {
    match: (pathname) => pathname.startsWith(`${ROUTE_PATHS.work}/`),
    title: DOCUMENT_TITLES.workDetail,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.make,
    title: DOCUMENT_TITLES.make,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.curations,
    title: DOCUMENT_TITLES.curations,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.practice,
    title: DOCUMENT_TITLES.practice,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.concepts,
    title: DOCUMENT_TITLES.concepts,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.about,
    title: DOCUMENT_TITLES.about,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.writing,
    title: DOCUMENT_TITLES.writing,
  },
  {
    match: (pathname) => pathname.startsWith(`${ROUTE_PATHS.writing}/`),
    title: DOCUMENT_TITLES.writingDetail,
  },
  {
    match: (pathname) => pathname === ROUTE_PATHS.interests,
    title: DOCUMENT_TITLES.interests,
  },
];

export function resolveDocumentTitle(pathname: string) {
  for (const { match, title } of DOCUMENT_TITLE_RULES) {
    if (match(pathname)) return title;
  }

  return DOCUMENT_TITLES.notFound;
}
