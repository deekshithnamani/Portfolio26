import { Navigate, useLocation } from "react-router";
import { LEGACY_REDIRECTS } from "@/config/route-paths";

export function LegacyRedirect() {
  const { pathname } = useLocation();
  const destination = LEGACY_REDIRECTS[pathname as keyof typeof LEGACY_REDIRECTS] ?? "/";
  return <Navigate to={destination} replace />;
}
