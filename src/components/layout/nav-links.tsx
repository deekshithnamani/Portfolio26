import clsx from "clsx";
import { Link, useLocation } from "react-router";
import { getVisibleNavItems, type NavItem } from "@/config/navigation";
import { isActivePath } from "./layout-utils";

function NavAnchor({ item, className, onNavigate }: { item: NavItem; className?: string; onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const active = item.group === "main" && isActivePath(pathname, item.path);
  const classes = clsx("focus-ring transition-colors hover:text-[var(--surface-accent)]", className, active ? "font-medium text-[var(--surface-fg)]" : "text-[var(--surface-fg-mid)]");

  if (item.path === "#") {
    return <a href="#" className={classes} onClick={onNavigate}>{item.label}</a>;
  }
  return <Link to={item.path} aria-current={active ? "page" : undefined} className={classes} onClick={onNavigate}>{item.label}</Link>;
}

export function MainNavLinks({ className, linkClassName, onNavigate }: { className?: string; linkClassName?: string; onNavigate?: () => void }) {
  return <nav aria-label="Primary navigation" className={className}>{getVisibleNavItems("main").map((item) => <NavAnchor key={item.path} item={item} className={linkClassName} onNavigate={onNavigate} />)}</nav>;
}

export function UtilityNavLinks({ className, linkClassName, onNavigate }: { className?: string; linkClassName?: string; onNavigate?: () => void }) {
  return <div className={className}>{getVisibleNavItems("utility").map((item) => <NavAnchor key={item.label} item={item} className={linkClassName} onNavigate={onNavigate} />)}</div>;
}
