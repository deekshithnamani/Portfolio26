export const LAYOUT_TOKENS = {
  pageShellPaddingX: "px-gutter",
  viewportFillMinusTopBar: "min-h-0",
} as const;

export type PageShellVariant = "standard" | "compact" | "wide";

export function buildPageShellClassName() {
  return "page-shell";
}
