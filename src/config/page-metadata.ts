import { matchRoutes } from "react-router";
// eslint-disable-next-line no-restricted-imports -- Vite loads this module before resolving app aliases.
import { BEYOND_WORK_CONTENT } from "../data/beyond-work-content";
// eslint-disable-next-line no-restricted-imports -- Vite loads this module before resolving app aliases.
import {
  NOT_FOUND_CONTENT,
  SITE_LINKS,
  SITE_METADATA,
} from "../data/site-links";
import {
  buildBeyondWorkSeriesPath,
  buildWorkDetailPath,
  LEGACY_REDIRECTS,
  ROUTE_PATHS,
} from "./route-paths";

const pages = [
  [ROUTE_PATHS.home, SITE_METADATA.home],
  [ROUTE_PATHS.work, SITE_METADATA.work],
  [SITE_LINKS.legalProof.href, SITE_METADATA.propertyChecker],
  [buildWorkDetailPath("univ-ai-platform"), SITE_METADATA.univPlatform],
  [ROUTE_PATHS.beyondWork, SITE_METADATA.beyondWork],
  [ROUTE_PATHS.about, SITE_METADATA.about],
  ...BEYOND_WORK_CONTENT.series.map(
    ({ slug, title, description }) =>
      [
        buildBeyondWorkSeriesPath(slug),
        { title: `${SITE_LINKS.brand.label} · ${title}`, description },
      ] as const,
  ),
] as const;

export const PAGE_METADATA = pages.map(([path, { title, description }]) => ({
  path,
  title,
  description,
}));

const redirectRoutes = Object.entries(LEGACY_REDIRECTS).map(
  ([path, destination]) => ({
    path,
    destination,
  }),
);

export function resolveDocumentMetadata(pathname: string) {
  const redirect = matchRoutes(redirectRoutes, pathname)?.[0].route;
  const page = matchRoutes(
    PAGE_METADATA,
    redirect?.destination ?? pathname,
  )?.[0].route;
  return {
    title: page?.title ?? SITE_METADATA.notFound.title,
    description: page?.description ?? NOT_FOUND_CONTENT.message,
  };
}

export function resolveDocumentTitle(pathname: string) {
  return resolveDocumentMetadata(pathname).title;
}
