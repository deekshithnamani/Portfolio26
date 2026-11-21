import { NavLink, Link } from "react-router";
import { getSiteLinks, SITE_LINKS } from "@/data/site-links";

export function Header() {
  const { brand } = SITE_LINKS;
  const navigation = getSiteLinks("header").filter(
    ({ id, newTab }) => id !== "brand" && !newTab,
  );

  return (
    <header className="mb-header flex flex-wrap items-baseline justify-between gap-x-gutter gap-y-row-small pt-gutter">
      <Link
        to={brand.href}
        className="shrink-0 text-body text-text no-underline hover:underline"
      >
        {brand.label}
      </Link>
      <nav
        aria-label="Primary navigation"
        className="site-header-nav flex flex-wrap items-baseline gap-x-link text-nav"
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
