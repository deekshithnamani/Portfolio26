import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useLocation } from "react-router";
import { SITE_COPYRIGHT } from "@/config/site";
import { MainNavLinks, UtilityNavLinks } from "./nav-links";
import { SocialLinks } from "./social-links";
import { ThemeSwitch } from "./theme-switch";

export function NavDrawer({ open, onClose, drawerId, menuButtonRef }: { open: boolean; onClose: () => void; drawerId: string; menuButtonRef: RefObject<HTMLButtonElement | null> }) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement | null>(null);
  const previousPathname = useRef(location.pathname);
  const closeDrawer = useCallback(() => { onClose(); menuButtonRef.current?.focus(); }, [menuButtonRef, onClose]);

  useEffect(() => { if (!open) return; document.body.dataset.drawerOpen = "true"; return () => { delete document.body.dataset.drawerOpen; }; }, [open]);
  useEffect(() => { if (open && previousPathname.current !== location.pathname) closeDrawer(); previousPathname.current = location.pathname; }, [closeDrawer, location.pathname, open]);
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusable[0]; const last = focusable[focusable.length - 1]; first?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); closeDrawer(); } else if (event.key === "Tab" && focusable.length) { if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } } };
    document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey);
  }, [closeDrawer, open]);

  if (!open) return null;
  return <><button type="button" aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-black/55 md:hidden" onClick={closeDrawer} /><aside ref={panelRef} id={drawerId} role="dialog" aria-modal="true" aria-labelledby="site-nav-heading" className="fixed inset-y-0 right-0 z-40 flex w-[min(88vw,24rem)] flex-col border-l border-[var(--surface-border)] bg-[var(--surface-bg)] p-6 md:hidden" data-reduced-motion={reducedMotion || undefined}>
    <div className="mb-8 flex justify-end"><button type="button" onClick={closeDrawer} aria-label="Close navigation" className="focus-ring text-xs">CLOSE</button></div><h2 id="site-nav-heading" className="sr-only">Site navigation</h2>
    <MainNavLinks className="flex flex-col gap-5" linkClassName="text-xl" onNavigate={closeDrawer} /><UtilityNavLinks className="mt-8" linkClassName="inline-flex border border-[var(--surface-border-mid)] px-3 py-2 text-sm" onNavigate={closeDrawer} />
    <div className="mt-auto space-y-3"><ThemeSwitch /><SocialLinks className="flex flex-col gap-1" linkClassName="text-[12px] text-[var(--surface-fg-mid)]" /><p className="m-0 text-[12px] text-[var(--surface-fg-mid)]">{SITE_COPYRIGHT}</p></div>
  </aside></>;
}
