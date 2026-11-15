import { Link } from "react-router";
import type { RefObject } from "react";
import { ROUTE_PATHS } from "@/config/route-paths";
import { SITE_BRAND_NAME } from "@/config/site";
import { BrandMark } from "./brand-mark";
import { MainNavLinks, UtilityNavLinks } from "./nav-links";

export function TopBar({ onOpen, open, drawerId, menuButtonRef }: { onOpen: () => void; open: boolean; drawerId: string; menuButtonRef: RefObject<HTMLButtonElement | null> }) {
  return <header className="site-top-nav sticky top-0 z-30 border-b border-[var(--surface-border)] bg-[var(--surface-nav)] backdrop-blur">
    <div className="mx-auto flex h-[var(--nav-top-height)] max-w-7xl items-center gap-5 px-4 sm:px-5 md:px-7">
      <Link to={ROUTE_PATHS.home} className="focus-ring inline-flex items-center"><BrandMark size={34} /><span className="sr-only">{SITE_BRAND_NAME}</span></Link>
      <div className="ml-auto hidden items-center gap-6 md:flex"><MainNavLinks className="flex items-center gap-5" linkClassName="text-[14px]" /><UtilityNavLinks linkClassName="inline-flex border border-[var(--surface-border-mid)] px-3 py-1.5 text-[12px] uppercase tracking-wider" /></div>
      <button ref={menuButtonRef} type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={open} aria-controls={drawerId} onClick={onOpen} className="focus-ring ml-auto flex items-center gap-2 border border-[var(--surface-border-mid)] px-2 py-1 text-xs md:hidden"><span className="hidden sm:inline">MENU</span><span aria-hidden="true">|||</span></button>
    </div>
  </header>;
}
