import { Link } from "react-router";
import clsx from "clsx";
import { MagneticButton } from "@/Layout";
import { ROUTE_PATHS } from "@/config/route-paths";
import { LAYOUT_TOKENS, UI_RECIPE_TOKENS } from "@/design";

export default function NotFound() {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        LAYOUT_TOKENS.viewportFillMinusTopBar,
        LAYOUT_TOKENS.pageShellPaddingX,
        LAYOUT_TOKENS.pageShellPaddingY,
      )}
    >
      <div className="space-y-5 text-center md:space-y-6">
        <pre
          className={clsx(
            "m-0 text-sm text-[var(--surface-fg-mid)]",
            UI_RECIPE_TOKENS.metaText,
          )}
        >
          {`      ┌───┐
      │ ?? │
      └───┘
   this page wandered off.`}
        </pre>

        <MagneticButton>
          <Link to={ROUTE_PATHS.home} className={UI_RECIPE_TOKENS.actionLink}>
            BACK TO HOME →
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
