export const LAYOUT_TOKENS = {
  pageShellPaddingX: "px-gutter",
  pageShellPaddingY: "py-page",
  viewportFillMinusTopBar: "min-h-0",
} as const;

export type PageShellVariant = "standard" | "compact" | "wide";

export function buildPageShellClassName() {
  return `page-shell ${LAYOUT_TOKENS.pageShellPaddingY}`;
}
