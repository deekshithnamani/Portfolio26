import { NavLink, Link } from "react-router";
import { getSiteLinks, SITE_LABELS, SITE_LINKS } from "@/data/site-links";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const { brand } = SITE_LINKS;
  const navigation = getSiteLinks("header").filter(
    ({ id, newTab }) => id !== "brand" && !newTab,
  );

  return (
    <header className="site-header mb-header flex flex-wrap items-baseline justify-between gap-x-gutter gap-y-row-small pt-gutter">
      <div className="flex min-w-0 items-center gap-row-small">
        <Link
          to={brand.href}
          className="font-brand text-brand leading-tight font-normal text-text no-underline hover:underline"
        >
          {brand.label}
        </Link>
        <ThemeToggle />
      </div>
      <nav
        aria-label={SITE_LABELS.primaryNav}
        className="site-header-nav flex flex-wrap items-center gap-x-link text-nav"
      >
        {navigation.map(({ label, href }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              `inline-flex min-h-tap shrink-0 items-center no-underline hover:underline ${isActive ? "font-semibold text-text" : "text-text-2"}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
