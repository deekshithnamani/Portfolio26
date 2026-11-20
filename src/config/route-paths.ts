export const ROUTE_SEGMENTS = {
  home: "",
  work: "work",
  productThinking: "product-thinking",
  beyondWork: "beyond-work",
  make: "make",
  curations: "curations",
  beyondWorkSeries: "beyond-work/:slug",
  concepts: "concepts",
  about: "about",
  writing: "writing",
  interests: "interests",
  workDetail: "work/:slug",
  daosoftProject: "work/daosoft-ai-decision-intelligence/:projectSlug",
  writingDetail: "writing/:slug",
  notFound: "*",
} as const;

export const ROUTE_PATHS = {
  home: "/",
  work: "/work",
  productThinking: "/product-thinking",
  beyondWork: "/beyond-work",
  make: "/make",
  curations: "/curations",
  beyondWorkSeries: "/beyond-work/:slug",
  concepts: "/concepts",
  about: "/about",
  writing: "/writing",
  interests: "/interests",
  workDetail: "/work/:slug",
  daosoftProject: "/work/daosoft-ai-decision-intelligence/:projectSlug",
  writingDetail: "/writing/:slug",
  notFound: "*",
} as const;

export type RouteSegment = (typeof ROUTE_SEGMENTS)[keyof typeof ROUTE_SEGMENTS];
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export const ROUTE_IDS = {
  home: "home",
  work: "work",
  productThinking: "product-thinking",
  beyondWork: "beyond-work",
  workDetail: "work-detail",
  daosoftProject: "daosoft-project",
  make: "make",
  curations: "curations",
  beyondWorkSeries: "beyond-work-series",
  concepts: "concepts",
  about: "about",
  writing: "writing",
  writingDetail: "writing-detail",
  interests: "interests",
  notFound: "not-found",
} as const;

export type RouteId = (typeof ROUTE_IDS)[keyof typeof ROUTE_IDS];

export const LEGACY_REDIRECTS = {
  "/practice/*": ROUTE_PATHS.beyondWork,
  [ROUTE_PATHS.make]: ROUTE_PATHS.work,
  [ROUTE_PATHS.writing]: ROUTE_PATHS.work,
  [ROUTE_PATHS.writingDetail]: ROUTE_PATHS.work,
  [ROUTE_PATHS.interests]: ROUTE_PATHS.work,
  [ROUTE_PATHS.daosoftProject]: ROUTE_PATHS.work,
  [ROUTE_PATHS.curations]: ROUTE_PATHS.work,
  [ROUTE_PATHS.concepts]: ROUTE_PATHS.work,
} as const;

export function buildWorkDetailPath(slug: string) {
  return `/work/${slug}`;
}

export function buildBeyondWorkSeriesPath(slug: string) {
  return `${ROUTE_PATHS.beyondWork}/${slug}`;
}

export function buildWritingDetailPath(slug: string) {
  return `/writing/${slug}`;
}

export function buildDaosoftProjectPath(slug: string) {
  return `/work/daosoft-ai-decision-intelligence/${slug}`;
}
