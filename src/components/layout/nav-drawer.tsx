import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useRef,
  type RefObject,
} from "react";
import { Link, useLocation } from "react-router";
import {
  SITE_COPYRIGHT,
  SITE_LINKEDIN_URL,
} from "@/config/site";
import { ROUTE_PATHS } from "@/config/route-paths";
import { UI_ANIMATION_TOKENS, UI_RECIPE_TOKENS } from "@/design";
import { NAV_ITEMS } from "./layout-utils";
import { ThemeSwitch } from "./theme-switch";

export function NavDrawer({
  open,
  onClose,
  drawerId,
  menuButtonRef,
}: {
  open: boolean;
  onClose: () => void;
  drawerId: string;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    if (!open) return;
    document.body.dataset.drawerOpen = "true";
    return () => {
      delete document.body.dataset.drawerOpen;
    };
  }, [open]);

  const closeDrawer = useCallback(() => {
    panelRef.current?.setAttribute("aria-hidden", "true");
    onClose();
    menuButtonRef.current?.focus();
  }, [menuButtonRef, onClose]);

  useEffect(() => {
    if (open && previousPathname.current !== location.pathname) {
      closeDrawer();
    }

    previousPathname.current = location.pathname;
  }, [closeDrawer, location.pathname, open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDrawer, open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-30 bg-black/55 md:hidden"
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : UI_ANIMATION_TOKENS.standardDuration,
              ease: UI_ANIMATION_TOKENS.hoverEasing,
            }}
          />
          <motion.aside
            ref={panelRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-nav-heading"
            className={clsx(UI_RECIPE_TOKENS.drawerPanel, "md:hidden")}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
            transition={{
              duration: reducedMotion ? 0 : UI_ANIMATION_TOKENS.cardDuration,
              ease: UI_ANIMATION_TOKENS.hoverEasing,
            }}
          >
            <div className="mb-8 flex justify-end md:mb-10">
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close navigation"
                className={clsx(
                  "focus-ring transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]",
                  UI_RECIPE_TOKENS.metaText,
                )}
              >
                CLOSE
              </button>
            </div>
        <div>
              <h2 id="site-nav-heading" className="sr-only">
                Site navigation
              </h2>
              <nav
                aria-label="Primary"
                className="flex flex-col gap-5 pl-5 md:gap-6 md:pl-6"
              >
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : UI_ANIMATION_TOKENS.cardDuration,
                      delay: reducedMotion ? 0 : index * UI_ANIMATION_TOKENS.revealDelayStep,
                      ease: reducedMotion
                        ? UI_ANIMATION_TOKENS.microEasing
                        : UI_ANIMATION_TOKENS.hoverEasing,
                    }}
                  >
                    <Link
                      to={item.href}
                      style={
                        isPrimaryNavItemActive(location.pathname, location.hash, item.href)
                          ? { color: "var(--surface-fg)" }
                          : undefined
                      }
                      className={clsx(
                        UI_RECIPE_TOKENS.drawerNavLink,
                        isPrimaryNavItemActive(location.pathname, location.hash, item.href)
                          ? "pl-1 hand-drawn-nav-underline--active hand-drawn-nav-underline--shifted"
                          : "text-[var(--surface-fg-mid)] hover:text-[var(--surface-accent)]",
                      )}
                    >
                      {item.label}
                    </Link>
                    <p className={UI_RECIPE_TOKENS.drawerDescription}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </nav>
            </div>
            <div className="flex-1" />
            <div className="space-y-2">
              <div className="flex items-center">
                <ThemeSwitch />
              </div>
              <div className="space-y-0.5">
                <a
                  href={SITE_LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring block text-[12px] font-normal text-[var(--surface-fg-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/deekshithnamani"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring block text-[12px] font-normal text-[var(--surface-fg-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]"
                >
                  GitHub
                </a>
                <p className="m-0 text-[12px] text-[var(--surface-fg-mid)]">
                  {SITE_COPYRIGHT}
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function isPrimaryNavItemActive(pathname: string, hash: string, href: string) {
  if (href === ROUTE_PATHS.home) {
    return pathname === ROUTE_PATHS.home && !hash;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
