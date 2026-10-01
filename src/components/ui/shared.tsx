import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import {
  CONTROL_SIZE_RECIPES,
  UI_ANIMATION_TOKENS,
  UI_RECIPE_TOKENS,
  buildPageShellClassName,
} from "@/design";
import type {
  AsciiEmptyProps,
  FilterPillsProps,
  MetaPillProps,
  PageContainerProps,
  RevealPanelProps,
  SectionHeaderProps,
} from "./shared-props";

export function SectionHeader({ title, description }: SectionHeaderProps) {
  const displayTitle = /^[A-Z\s]+$/.test(title)
    ? title.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
    : title;

  return (
    <header className="mb-10 space-y-2 md:mb-12">
      <h1 className="text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[var(--surface-accent)] md:text-[1.625rem]">
        {displayTitle}
      </h1>
      <p className="max-w-[52ch] text-[0.8rem] font-normal leading-[1.6] text-[var(--surface-fg-mid)] md:text-[0.82rem]">
        {description}
      </p>
    </header>
  );
}

export function FilterPills<T extends string>({
  tags,
  active,
  onChange,
  size = "md",
}: FilterPillsProps<T>) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--surface-border)] md:mb-8 md:gap-x-6">
      {tags.map((tag) => {
        const selected = tag === active;

        return (
          <motion.button
            key={tag}
            type="button"
            aria-pressed={selected}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    y: UI_ANIMATION_TOKENS.hoverDistance,
                    transition: {
                      duration: UI_ANIMATION_TOKENS.microDuration,
                      ease: UI_ANIMATION_TOKENS.hoverEasing,
                    },
                  }
            }
            whileTap={
              reducedMotion ? undefined : { scale: UI_ANIMATION_TOKENS.tapScale }
            }
            onClick={() => onChange(tag)}
            className={clsx(
              UI_RECIPE_TOKENS.filterPillBase,
              CONTROL_SIZE_RECIPES[size].filterPill,
              selected
                ? "border-[var(--surface-accent)] text-[var(--surface-accent)]"
                : "border-transparent text-[var(--surface-fg-mid)] hover:border-[var(--surface-border-mid)] hover:text-[var(--surface-fg)]",
            )}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: UI_ANIMATION_TOKENS.microDuration,
                    ease: UI_ANIMATION_TOKENS.microEasing,
                  }
            }
          >
            {tag}
          </motion.button>
        );
      })}
    </div>
  );
}

export function PageContainer({
  children,
  compact = false,
  variant,
  className,
}: PageContainerProps) {
  return (
    <div
      className={clsx(buildPageShellClassName({ compact, variant }), className)}
    >
      {children}
    </div>
  );
}

export function RevealPanel({
  children,
  index,
  reducedMotion: reducedMotionOverride,
  hoverLift = true,
  className,
  ...rest
}: RevealPanelProps) {
  const systemReducedMotion = useReducedMotion();
  const reducedMotion =
    typeof reducedMotionOverride === "boolean"
      ? reducedMotionOverride
      : systemReducedMotion;

  return (
    <motion.div
      whileHover={
        hoverLift && !reducedMotion
          ? {
              y: UI_ANIMATION_TOKENS.hoverDistance,
              scale: UI_ANIMATION_TOKENS.hoverScale,
            }
          : undefined
      }
      whileTap={
        hoverLift && !reducedMotion
          ? { scale: UI_ANIMATION_TOKENS.tapScale }
          : undefined
      }
      {...(reducedMotion
        ? {}
        : {
            initial: { opacity: 0, y: UI_ANIMATION_TOKENS.revealOffsetY },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: {
              delay: index * UI_ANIMATION_TOKENS.revealDelayStep,
              duration: UI_ANIMATION_TOKENS.revealDuration,
              ease: UI_ANIMATION_TOKENS.revealEasing,
            },
          })}
      className={clsx("row-divider", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function MetaPill({
  children,
  tone = "default",
  className,
  size = "md",
}: MetaPillProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: UI_ANIMATION_TOKENS.hoverDistance,
              scale: UI_ANIMATION_TOKENS.hoverScale,
            }
      }
      whileTap={
        reducedMotion ? undefined : { scale: UI_ANIMATION_TOKENS.tapScale }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: UI_ANIMATION_TOKENS.microDuration,
              ease: UI_ANIMATION_TOKENS.microEasing,
            }
      }
      className={clsx(
        UI_RECIPE_TOKENS.pillBase,
        CONTROL_SIZE_RECIPES[size].metaPill,
        tone === "accent"
          ? "border-[var(--surface-accent)] text-[var(--surface-accent)]"
          : "border-[var(--surface-border-mid)] text-[var(--surface-fg-mid)]",
        className,
      )}
    >
      {children}
    </motion.span>
  );
}

export function AsciiEmpty({
  title = "nothing here yet —",
  subtitle = "check back soon",
}: AsciiEmptyProps) {
  return (
    <div
      className={clsx(UI_RECIPE_TOKENS.cardFrame, UI_RECIPE_TOKENS.panelPadding)}
    >
      <pre
        aria-hidden="true"
        className={clsx(
          "m-0 whitespace-pre-wrap text-[var(--surface-fg-mid)]",
          UI_RECIPE_TOKENS.metaText,
        )}
      >
        {`  ___
 /   \\
|  ?  |
 \\___/`}
      </pre>
      <div className="mt-3 space-y-1">
        <h2 className="text-sm font-light text-[var(--surface-fg)]">{title}</h2>
        <p className={UI_RECIPE_TOKENS.bodySupport}>{subtitle}</p>
      </div>
    </div>
  );
}
