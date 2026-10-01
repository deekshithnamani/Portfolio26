import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import type { RefObject } from "react";
import { ROUTE_PATHS } from "@/config/route-paths";
import { SITE_BRAND_NAME } from "@/config/site";
import { UI_ANIMATION_TOKENS, UI_RECIPE_TOKENS } from "@/design";
import { BrandMark } from "./brand-mark";

export function TopBar({
  onOpen,
  open,
  drawerId,
  menuButtonRef,
}: {
  onOpen: () => void;
  open: boolean;
  drawerId: string;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[var(--surface-border)] bg-[var(--surface-nav)] backdrop-blur md:hidden">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5">
        <Link
          to={ROUTE_PATHS.home}
          className="focus-ring inline-flex items-center"
        >
          <BrandMark size={34} />
          <span className="sr-only">{SITE_BRAND_NAME}</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <motion.button
            ref={menuButtonRef}
            type="button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={onOpen}
            className={[
              "focus-ring flex items-center gap-2 border border-[var(--surface-border-mid)] px-2 py-1",
              UI_RECIPE_TOKENS.chromeText,
            ].join(" ")}
            whileTap={
              reducedMotion ? undefined : { scale: UI_ANIMATION_TOKENS.tapScale }
            }
            whileHover={
              reducedMotion ? undefined : { y: UI_ANIMATION_TOKENS.hoverDistance }
            }
            transition={{
              duration: reducedMotion ? 0 : UI_ANIMATION_TOKENS.standardDuration,
              ease: UI_ANIMATION_TOKENS.hoverEasing,
            }}
          >
            <span className="hidden sm:inline">MENU</span>
            <span aria-hidden="true">|||</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
