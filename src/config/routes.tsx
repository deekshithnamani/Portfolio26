import {
  lazy,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { matchPath } from "react-router";
import { ROUTE_IDS, ROUTE_SEGMENTS } from "./route-paths";
import type { PageShellVariant } from "@/design";

export type RouteDefinition = {
  id: (typeof ROUTE_IDS)[keyof typeof ROUTE_IDS];
  path: string;
  index?: boolean;
  pageShell: PageShellVariant;
  component: LazyExoticComponent<ComponentType>;
  preload?: () => Promise<unknown> | void;
};

export const ROUTES: RouteDefinition[] = [
  {
    id: ROUTE_IDS.home,
    path: ROUTE_SEGMENTS.home,
    index: true,
    pageShell: "standard",
    component: lazy(() => import("@/pages/Home")),
    preload: () => import("@/pages/Home"),
  },
  {
    id: ROUTE_IDS.work,
    path: ROUTE_SEGMENTS.work,
    pageShell: "standard",
    component: lazy(() =>
      import("@/pages/Work").then((module) => ({ default: module.WorkIndex })),
    ),
    preload: () =>
      import("@/pages/Work").then((module) => ({
        default: module.WorkIndex,
      })),
  },
  {
    id: ROUTE_IDS.workDetail,
    path: ROUTE_SEGMENTS.workDetail,
    pageShell: "compact",
    component: lazy(() =>
      import("@/pages/Work").then((module) => ({ default: module.WorkDetail })),
    ),
  },
  {
    id: ROUTE_IDS.daosoftProject,
    path: ROUTE_SEGMENTS.daosoftProject,
    pageShell: "wide",
    component: lazy(() => import("@/pages/Work").then((module) => ({ default: module.DaosoftProjectDetail }))),
  },
  {
    id: ROUTE_IDS.practice,
    path: ROUTE_SEGMENTS.practice,
    pageShell: "standard",
    component: lazy(() => import("@/pages/Studies")),
  },
  {
    id: ROUTE_IDS.practiceSeries,
    path: ROUTE_SEGMENTS.practiceSeries,
    pageShell: "standard",
    component: lazy(() =>
      import("@/pages/Studies").then((module) => ({
        default: module.PracticeSeriesPage,
      })),
    ),
  },
  {
    id: ROUTE_IDS.productThinking,
    path: ROUTE_SEGMENTS.productThinking,
    pageShell: "standard",
    component: lazy(() => import("@/pages/ProductThinking")),
  },
  {
    id: ROUTE_IDS.beyondWork,
    path: ROUTE_SEGMENTS.beyondWork,
    pageShell: "standard",
    component: lazy(() => import("@/pages/BeyondWork")),
  },
  {
    id: ROUTE_IDS.make,
    path: ROUTE_SEGMENTS.make,
    pageShell: "standard",
    component: lazy(() => import("@/pages/Make")),
  },
  {
    id: ROUTE_IDS.about,
    path: ROUTE_SEGMENTS.about,
    pageShell: "compact",
    component: lazy(() => import("@/pages/About")),
  },
  {
    id: ROUTE_IDS.writing,
    path: ROUTE_SEGMENTS.writing,
    pageShell: "standard",
    component: lazy(() =>
      import("@/pages/Writing").then((module) => ({
        default: module.WritingIndex,
      })),
    ),
  },
  {
    id: ROUTE_IDS.writingDetail,
    path: ROUTE_SEGMENTS.writingDetail,
    pageShell: "compact",
    component: lazy(() =>
      import("@/pages/Writing").then((module) => ({
        default: module.PostDetail,
      })),
    ),
  },
  {
    id: ROUTE_IDS.interests,
    path: ROUTE_SEGMENTS.interests,
    pageShell: "standard",
    component: lazy(() => import("@/pages/Interests")),
  },
  {
    id: ROUTE_IDS.notFound,
    path: ROUTE_SEGMENTS.notFound,
    pageShell: "standard",
    component: lazy(() => import("@/pages/NotFound")),
  },
];

function getRoutePattern(route: RouteDefinition) {
  if (route.index) {
    return "/";
  }

  if (route.path === ROUTE_SEGMENTS.notFound) {
    return null;
  }

  return `/${route.path}`;
}

export function resolvePageShellVariant(pathname: string): PageShellVariant {
  const matchedRoute = ROUTES.find((route) => {
    const pattern = getRoutePattern(route);

    if (!pattern) {
      return false;
    }

    return Boolean(matchPath({ path: pattern, end: true }, pathname));
  });

  return matchedRoute?.pageShell ?? "standard";
}
