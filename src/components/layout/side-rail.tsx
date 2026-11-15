import { Link } from "react-router";
import { ROUTE_PATHS } from "@/config/route-paths";
import { SITE_BRAND_NAME, SITE_COPYRIGHT } from "@/config/site";
import { BrandMark } from "./brand-mark";
import { MainNavLinks, UtilityNavLinks } from "./nav-links";
import { SocialLinks } from "./social-links";
import { ThemeSwitch } from "./theme-switch";

export function SideRail({ collapsible = false, collapsed = false, onToggle }: { collapsible?: boolean; collapsed?: boolean; onToggle?: () => void }) {
  return <aside aria-label="Primary sidebar" className="site-side-nav sticky top-0 h-screen overflow-hidden border-r border-[var(--surface-border)] bg-[var(--surface-side-nav)]" data-collapsed={collapsed || undefined}>
    <div className="flex h-full flex-col px-3 py-4"><div className="flex items-center justify-between"><Link to={ROUTE_PATHS.home} className="focus-ring inline-flex"><BrandMark size={42} /><span className="sr-only">{SITE_BRAND_NAME}</span></Link>{collapsible ? <button type="button" className="focus-ring text-xs" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={onToggle}>{collapsed ? ">" : "<"}</button> : null}</div>
      <MainNavLinks className="site-side-nav-links mt-8 flex flex-1 flex-col gap-3" linkClassName="w-fit text-[15px]" />
      <div className="site-side-nav-links mt-auto flex flex-col items-start gap-3"><UtilityNavLinks linkClassName="inline-flex border border-[var(--surface-border-mid)] px-3 py-1.5 text-[12px] uppercase tracking-wider" /><ThemeSwitch /><SocialLinks className="flex flex-col gap-1" linkClassName="text-[12px] text-[var(--surface-fg-mid)]" /><p className="m-0 text-[12px] text-[var(--surface-fg-mid)]">{SITE_COPYRIGHT}</p></div>
    </div>
  </aside>;
}
