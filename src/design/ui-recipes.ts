const MONO_META_BASE =
  "font-mono text-[12px] uppercase tracking-[0.16em]";
const CHROME_TEXT_BASE =
  "font-sans text-[12px] font-medium uppercase leading-none tracking-[0.1em]";

export const CONTROL_SIZE_RECIPES = {
  sm: {
    filterPill:
      "min-h-7 px-0 py-1 text-[12px] leading-none tracking-[0.12em] md:min-h-8 md:tracking-[0.14em]",
    metaPill:
      "px-2 py-0.5 text-[12px] tracking-[0.12em] md:px-3 md:tracking-[0.14em]",
    subtleScaleButton:
      "px-3 py-1 text-[12px] tracking-[0.14em] md:tracking-[0.16em]",
  },
  md: {
    filterPill:
      "min-h-8 px-0 py-1 text-[12px] leading-none tracking-[0.14em] 2xl:min-h-9 2xl:text-[13px] 2xl:tracking-[0.16em]",
    metaPill: "px-3 py-1 text-[12px] tracking-[0.16em]",
    subtleScaleButton: "px-4 py-2 text-[12px] tracking-[0.18em]",
  },
} as const;

export type ControlSize = keyof typeof CONTROL_SIZE_RECIPES;

export const UI_RECIPE_TOKENS = {
  pageHeading:
    "max-w-full break-words text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[var(--surface-accent)] md:text-[2.25rem]",
  pageDescription:
    "max-w-full break-words text-base font-normal leading-[1.7] text-[var(--surface-fg-mid)] md:text-lg",
  actionLink:
    "focus-ring inline-flex font-mono text-[12px] uppercase tracking-[0.16em] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]",
  actionLinkMuted:
    "focus-ring inline-flex font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--surface-fg-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]",
  bodyProse:
    "text-base leading-[1.85] text-[var(--surface-fg-mid)] md:leading-[1.9]",
  bodySupport:
    "text-[0.95rem] leading-[1.7] text-[var(--surface-fg-mid)] md:leading-[1.76]",
  cardFrame:
    "rounded-[var(--radius-medium)] border border-[var(--surface-border-mid)] bg-[var(--surface-card-soft)] shadow-[0_1px_0_rgba(255,255,255,0.03),0_14px_34px_-28px_rgba(0,0,0,0.65)]",
  coverFrame: "rounded-[var(--radius-large)]",
  compactCard:
    "border-y border-[var(--surface-border)] bg-transparent transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)]",
  handDrawnNavUnderline: "hand-drawn-nav-underline",
  drawerDescription:
    "mt-1 font-mono text-[12px] leading-[1.5] tracking-[0.08em] text-[var(--surface-fg-mid)] md:mt-2",
  drawerNavLink:
    "focus-ring relative inline-flex w-fit pb-1 text-[1.5625rem] font-normal tracking-[-0.022em] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hand-drawn-nav-underline sm:text-[1.75rem] md:text-[1.9375rem] lg:text-[2.125rem]",
  drawerPanel:
    "fixed right-0 top-0 z-40 flex h-screen w-full max-w-[22rem] flex-col overflow-y-auto border-l border-[var(--surface-border-mid)] bg-[var(--surface-side-nav)] px-6 py-8 sm:max-w-[24rem] sm:px-7 md:max-w-[26rem] md:px-8 md:py-9 lg:max-w-[30rem] lg:px-9 lg:py-10",
  filterPill: [
    "focus-ring inline-flex items-center justify-center whitespace-nowrap border-b font-mono uppercase transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
    CONTROL_SIZE_RECIPES.md.filterPill,
  ].join(" "),
  filterPillBase:
    "focus-ring inline-flex items-center justify-center whitespace-nowrap border-b font-mono uppercase transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
  heroDisplay:
    "max-w-3xl text-[clamp(2.125rem,4vw,3.25rem)] font-light leading-[0.95] tracking-[-0.026em]",
  chromeText: CHROME_TEXT_BASE,
  chromeTextMuted: `${CHROME_TEXT_BASE} text-[var(--surface-fg-mid)]`,
  mediaFrame: "rounded-[var(--radius-medium)]",
  brandText:
    "font-brand text-[15px] leading-[0.95] font-medium tracking-[0.02em]",
  metaText: MONO_META_BASE,
  panelPadding: "p-3 md:p-4",
  sectionLeadMargin: "mb-4 md:mb-6",
  sectionInnerStack: "space-y-2 md:space-y-3",
  monoMuted: `${MONO_META_BASE} text-[var(--surface-fg-mid)]`,
  workDetailSecondaryNav: "md:w-[240px] lg:w-[260px] md:pl-4 lg:pl-6",
  workDetailSecondaryNavInner: "sticky top-20 border-l border-[var(--surface-border)] pl-5",
  workDetailSecondaryNavList: "flex flex-col gap-3 text-[15px] leading-[1.45]",
  workDetailSecondaryNavLink:
    "focus-ring relative block py-0.5 font-normal transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)]",
  workDetailSecondaryNavMarker:
    "absolute left-[-21px] top-1/2 h-7 w-[1.5px] -translate-y-1/2 bg-[var(--surface-accent)] transition-opacity duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)]",
  pill: [
    "inline-flex items-center rounded-[var(--radius-soft)] border font-mono uppercase",
    CONTROL_SIZE_RECIPES.md.metaPill,
  ].join(" "),
  pillBase:
    "inline-flex items-center rounded-[var(--radius-soft)] border font-mono uppercase",
  rowLink:
    "focus-ring block py-3 text-left transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-[var(--surface-accent)] motion-reduce:transition-none md:py-4",
  rowLinkBare:
    "focus-ring block py-3 text-left transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-[var(--surface-accent)] motion-reduce:transition-none md:py-4",
  rowLinkCompact:
    "focus-ring flex gap-3 py-3 transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-[var(--surface-accent)] motion-reduce:transition-none md:gap-4 md:py-4 lg:gap-5",
  rowLinkGrid:
    "focus-ring grid gap-3 py-3 transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-[var(--surface-accent)] motion-reduce:transition-none md:grid-cols-[128px_1fr] md:gap-4 md:py-4 lg:grid-cols-[136px_1fr]",
  sectionLabel: "font-mono text-xs uppercase tracking-[0.2em]",
  subtleScaleButton: [
    "focus-ring inline-flex rounded-[var(--radius-soft)] border border-[var(--surface-border-mid)] font-mono uppercase transition-transform duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none",
    CONTROL_SIZE_RECIPES.sm.subtleScaleButton,
  ].join(" "),
  titleLarge:
    "text-[clamp(1.9375rem,2.7vw,2.4375rem)] font-light leading-[0.98] tracking-[-0.022em]",
  titleMedium:
    "text-[clamp(1.5625rem,2vw,1.9375rem)] font-light leading-[1.04] tracking-[-0.02em]",
  titleSmall:
    "text-[clamp(1.25rem,1.55vw,1.5625rem)] font-light leading-[1.08] tracking-[-0.018em]",
} as const;
