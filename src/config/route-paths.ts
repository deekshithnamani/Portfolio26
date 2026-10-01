export const ROUTE_SEGMENTS = {
  home: "",
  work: "work",
  make: "make",
  curations: "curations",
  practice: "practice",
  concepts: "concepts",
  about: "about",
  writing: "writing",
  interests: "interests",
  workDetail: "work/:slug",
  writingDetail: "writing/:slug",
  notFound: "*",
} as const;

export const ROUTE_PATHS = {
  home: "/",
  work: "/work",
  make: "/make",
  curations: "/curations",
  practice: "/practice",
  concepts: "/concepts",
  about: "/about",
  writing: "/writing",
  interests: "/interests",
  workDetail: "/work/:slug",
  writingDetail: "/writing/:slug",
  notFound: "*",
} as const;

export type RouteSegment = (typeof ROUTE_SEGMENTS)[keyof typeof ROUTE_SEGMENTS];
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export const ROUTE_IDS = {
  home: "home",
  work: "work",
  workDetail: "work-detail",
  make: "make",
  curations: "curations",
  practice: "practice",
  concepts: "concepts",
  about: "about",
  writing: "writing",
  writingDetail: "writing-detail",
  interests: "interests",
  notFound: "not-found",
} as const;

export type RouteId = (typeof ROUTE_IDS)[keyof typeof ROUTE_IDS];

export function buildWorkDetailPath(slug: string) {
  return `/work/${slug}`;
}

export function buildWritingDetailPath(slug: string) {
  return `/writing/${slug}`;
}
