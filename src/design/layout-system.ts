export const LAYOUT_TOKENS = {
  pageShellMaxWidth: "max-w-5xl",
  pageShellMaxWidthCompact: "max-w-2xl",
  pageShellMaxWidthWide: "max-w-6xl",
  pageShellPaddingX: "px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-10",
  pageShellPaddingY:
    "py-12 sm:py-14 md:py-[3.75rem] lg:py-16 xl:py-[4.25rem] 2xl:py-20",
  topBarOffset: "pt-12 md:pt-0",
  desktopShell: "site-layout-shell",
  viewportFillMinusTopBar: "min-h-[calc(100vh-3rem)] md:min-h-screen",
  pageFooterSpacer: "py-3 md:py-4",
  pageFooterStack: "flex items-center",
} as const;

export type PageShellVariant = "standard" | "compact" | "wide";

export function resolvePageShellMaxWidthClass(variant: PageShellVariant) {
  if (variant === "compact") return LAYOUT_TOKENS.pageShellMaxWidthCompact;
  if (variant === "wide") return LAYOUT_TOKENS.pageShellMaxWidthWide;
  return LAYOUT_TOKENS.pageShellMaxWidth;
}

export function buildPageShellClassName({
  compact = false,
  variant,
}: {
  compact?: boolean;
  variant?: PageShellVariant;
}) {
  const resolvedVariant = variant ?? (compact ? "compact" : "standard");

  return [
    "page-shell",
    "mx-auto",
    resolvePageShellMaxWidthClass(resolvedVariant),
    LAYOUT_TOKENS.pageShellPaddingX,
    LAYOUT_TOKENS.pageShellPaddingY,
  ].join(" ");
}
