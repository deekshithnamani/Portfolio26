import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import { Link, useLocation } from "react-router";
import { NAV_ITEMS } from "@/config/navigation";
import { ROUTE_PATHS } from "@/config/route-paths";
import { SITE_BRAND_NAME, SITE_COPYRIGHT, SITE_LINKEDIN_URL } from "@/config/site";
import { UI_ANIMATION_TOKENS } from "@/design";
import { BrandMark } from "./brand-mark";
import { ThemeSwitch } from "./theme-switch";

export function SideRail() {
  const reducedMotion = useReducedMotion();
  const location = useLocation();

  return (
    <aside
      aria-label="Primary sidebar"
      className="hidden md:sticky md:top-0 md:flex md:min-h-screen md:h-screen md:max-h-screen md:w-[180px] md:flex-col md:border-r md:border-[var(--surface-border)] md:bg-[var(--surface-side-nav)] md:overflow-hidden"
    >
      <div className="flex h-full min-h-0 flex-col px-3 py-4">
        <Link
          to={ROUTE_PATHS.home}
          className="focus-ring inline-flex items-center"
        >
          <BrandMark size={42} />
          <span className="sr-only">{SITE_BRAND_NAME}</span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="mt-8 flex min-h-0 flex-1 flex-col gap-2"
        >
          {NAV_ITEMS.map((item, index) => (
            <motion.div
              key={item.href}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : UI_ANIMATION_TOKENS.cardDuration,
                delay: reducedMotion
                  ? 0
                  : index * UI_ANIMATION_TOKENS.revealDelayStep,
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
                  "focus-ring relative inline-flex w-fit min-h-5 items-center py-0 font-sans text-[15px] leading-[1.1] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hand-drawn-nav-underline",
                  isPrimaryNavItemActive(location.pathname, location.hash, item.href)
                    ? "pl-1 font-medium hand-drawn-nav-underline--active hand-drawn-nav-underline--shifted"
                    : "font-normal text-[var(--surface-fg-mid)] hover:text-[var(--surface-accent)]",
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="mt-auto flex flex-col items-start gap-2 pb-1">
          <div className="flex items-center">
            <ThemeSwitch />
          </div>
          <div className="flex flex-col gap-0.5">
              <a
                href={SITE_LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="focus-ring text-[12px] font-normal text-[var(--surface-fg-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/deekshithnamani"
                target="_blank"
                rel="noreferrer"
                className="focus-ring text-[12px] font-normal text-[var(--surface-fg-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]"
              >
                GitHub
              </a>
              <p className="m-0 text-[12px] text-[var(--surface-fg-mid)]">
                {SITE_COPYRIGHT}
              </p>
            </div>
        </div>
      </div>
    </aside>
  );
}

function isPrimaryNavItemActive(pathname: string, hash: string, href: string) {
  if (href === ROUTE_PATHS.home) {
    return pathname === ROUTE_PATHS.home && !hash;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
