import { useEffect, useState } from "react";
import type { Theme } from "@/design";
import { resolveDocumentTitle } from "@/config/navigation";
import { ROUTE_PATHS } from "@/config/route-paths";

export function getDocumentTitle(pathname: string) {
  return resolveDocumentTitle(pathname);
}

export function isActivePath(pathname: string, href: string) {
  if (href === ROUTE_PATHS.home) return pathname === ROUTE_PATHS.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return finePointer;
}

export function applyThemeVariables(theme: Theme, dark: boolean) {
  const root = document.documentElement;
  root.dataset.theme = dark ? "dark" : "light";
  root.style.setProperty("--surface-bg", theme.bg);
  root.style.setProperty("--surface-fg", theme.fg);
  root.style.setProperty("--surface-fg-mid", theme.fgMid);
  root.style.setProperty("--surface-fg-dim", theme.fgDim);
  root.style.setProperty("--surface-nav-muted", theme.navMuted);
  root.style.setProperty("--surface-border", theme.border);
  root.style.setProperty("--surface-border-mid", theme.borderMid);
  root.style.setProperty("--surface-nav", theme.navBg);
  root.style.setProperty("--surface-side-nav", theme.sideNavBg);
  root.style.setProperty("--surface-accent", theme.accent);
  root.style.setProperty("--surface-card", theme.card);
}
