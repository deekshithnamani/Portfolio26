import { ROUTE_PATHS } from "@/config/route-paths";

export function isActivePath(pathname: string, href: string) {
  if (href === ROUTE_PATHS.home) return pathname === ROUTE_PATHS.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}
