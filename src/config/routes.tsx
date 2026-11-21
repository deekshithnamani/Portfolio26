import type { ComponentType } from "react";
import { matchPath } from "react-router";
import { ROUTE_IDS, ROUTE_SEGMENTS } from "./route-paths";
import type { PageShellVariant } from "@/design";
import About from "@/pages/About";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ProductThinking from "@/pages/ProductThinking";
import CreativeIndex, { BeyondWorkSeriesPage } from "@/pages/Studies";
import { WorkDetail, WorkIndex } from "@/pages/Work";

export type RouteDefinition = {
  id: (typeof ROUTE_IDS)[keyof typeof ROUTE_IDS];
  path: string;
  index?: boolean;
  pageShell: PageShellVariant;
  component: ComponentType;
};

export const ROUTES: RouteDefinition[] = [
  {
    id: ROUTE_IDS.home,
    path: ROUTE_SEGMENTS.home,
    index: true,
    pageShell: "standard",
    component: Home,
  },
  {
    id: ROUTE_IDS.work,
    path: ROUTE_SEGMENTS.work,
    pageShell: "standard",
    component: WorkIndex,
  },
  {
    id: ROUTE_IDS.workDetail,
    path: ROUTE_SEGMENTS.workDetail,
    pageShell: "compact",
    component: WorkDetail,
  },
  {
    id: ROUTE_IDS.beyondWork,
    path: ROUTE_SEGMENTS.beyondWork,
    pageShell: "standard",
    component: CreativeIndex,
  },
  {
    id: ROUTE_IDS.beyondWorkSeries,
    path: ROUTE_SEGMENTS.beyondWorkSeries,
    pageShell: "standard",
    component: BeyondWorkSeriesPage,
  },
  {
    id: ROUTE_IDS.productThinking,
    path: ROUTE_SEGMENTS.productThinking,
    pageShell: "standard",
    component: ProductThinking,
  },
  {
    id: ROUTE_IDS.about,
    path: ROUTE_SEGMENTS.about,
    pageShell: "standard",
    component: About,
  },
  {
    id: ROUTE_IDS.notFound,
    path: ROUTE_SEGMENTS.notFound,
    pageShell: "standard",
    component: NotFound,
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
