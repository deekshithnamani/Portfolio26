import { ROUTE_PATHS } from "./route-paths";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  title: string;
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
  {
    href: ROUTE_PATHS.home,
    label: "Home",
    description: "Start here",
    title: DOCUMENT_TITLES.home,
  },
  {
    href: ROUTE_PATHS.work,
    label: "Work",
    description: "Case studies from client and professional work",
    title: DOCUMENT_TITLES.work,
  },
  {
    href: ROUTE_PATHS.make,
    label: "Built",
    description: "Things I've built, plus raw experiments",
    title: DOCUMENT_TITLES.make,
  },
  {
    href: ROUTE_PATHS.concepts,
    label: "Backlog",
    description: "Half-built product and business ideas",
    title: DOCUMENT_TITLES.concepts,
  },
  {
    href: ROUTE_PATHS.about,
    label: "About",
    description: "Who I am and what I'm focused on now",
    title: DOCUMENT_TITLES.about,
  },
];

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
