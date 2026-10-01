import { motion, useReducedMotion } from "motion/react";
import { UI_ANIMATION_TOKENS } from "@/design";
import { useTheme } from "./layout-context";

export function ThemeSwitch() {
  const { dark, toggle } = useTheme();
  const reducedMotion = useReducedMotion();
  const modeLabel = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <motion.button
      type="button"
      aria-label={modeLabel}
      aria-pressed={dark}
      title={modeLabel}
      onClick={toggle}
      className="focus-ring relative h-5 w-9 shrink-0 border border-[var(--surface-border-mid)]"
      style={{
        borderColor: "var(--surface-border-mid)",
        background: dark ? "var(--surface-fg)" : "var(--surface-bg)",
      }}
      whileHover={
        reducedMotion ? undefined : { y: UI_ANIMATION_TOKENS.hoverDistance }
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
    >
      <motion.span
        aria-hidden="true"
        className="absolute top-0.5 left-0.5 h-3.5 w-3.5 border border-[var(--surface-border-mid)]"
        style={{
          background: dark ? "var(--surface-bg)" : "var(--surface-fg)",
        }}
        animate={reducedMotion ? { x: 0 } : { x: dark ? 0 : 16 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: UI_ANIMATION_TOKENS.cardDuration,
                ease: UI_ANIMATION_TOKENS.hoverEasing,
              }
        }
      />
      <span className="sr-only">{modeLabel}</span>
    </motion.button>
  );
}
