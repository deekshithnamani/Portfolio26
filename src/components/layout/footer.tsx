import clsx from "clsx";
import { useLocation } from "react-router";
import { LAYOUT_TOKENS, resolvePageShellMaxWidthClass } from "@/design";
import { resolvePageShellVariant } from "@/config/routes";

export function Footer() {
  const { pathname } = useLocation();
  const shellWidth = resolvePageShellMaxWidthClass(
    resolvePageShellVariant(pathname),
  );

  return (
    <footer className="border-t border-[var(--surface-border)]">
      <div
        aria-hidden="true"
        className={clsx(
          "mx-auto",
          LAYOUT_TOKENS.pageFooterStack,
          LAYOUT_TOKENS.pageFooterSpacer,
          shellWidth,
          LAYOUT_TOKENS.pageShellPaddingX,
        )}
      />
    </footer>
  );
}
