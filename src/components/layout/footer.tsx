import clsx from "clsx";
import { useLocation } from "react-router";
import { LAYOUT_TOKENS, resolvePageShellMaxWidthClass } from "@/design";
import { resolvePageShellVariant } from "@/config/routes";
import { SocialLinks } from "./social-links";
import { SITE_COPYRIGHT } from "@/config/site";

export function Footer() {
  const { pathname } = useLocation();
  const shellWidth = resolvePageShellMaxWidthClass(
    resolvePageShellVariant(pathname),
  );

  return (
    <footer className="border-t border-[var(--surface-border)]">
      <div
        className={clsx(
          "mx-auto",
          LAYOUT_TOKENS.pageFooterStack,
          LAYOUT_TOKENS.pageFooterSpacer,
          shellWidth,
          LAYOUT_TOKENS.pageShellPaddingX,
        )}
      >
        <SocialLinks className="flex gap-4" linkClassName="text-[12px] text-[var(--surface-fg-mid)]" />
        <span className="ml-auto text-[12px] text-[var(--surface-fg-mid)]">{SITE_COPYRIGHT}</span>
      </div>
    </footer>
  );
}
