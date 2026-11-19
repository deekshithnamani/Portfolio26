import { LinkLabel } from "@/components/ui/link-label";
import { NavLink, Link } from "react-router";
import { getSiteLinks, SITE_LINKS } from "@/data/site-links";

export function Header() {
  const { brand, resume } = SITE_LINKS;
  const navigation = getSiteLinks("header").filter(
    ({ id, newTab }) => id !== "brand" && !newTab,
  );

  return (
    <header className="flex flex-col gap-link pt-gutter sm:flex-row sm:items-baseline sm:justify-between">
      <Link to={brand.href} className="no-underline hover:underline">
        {brand.label}
      </Link>
      <nav
        aria-label="Primary navigation"
        className="site-header-nav flex items-center gap-link text-small"
      >
        {navigation.map(({ label, href }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              isActive ? "text-text" : "text-text-2"
            }
          >
            {label}
          </NavLink>
        ))}
        <a
          href={resume.href}
          target="_blank"
          rel="noreferrer"
          className="ml-link text-text-2"
        >
          <LinkLabel label={resume.label} />
        </a>
      </nav>
    </header>
  );
}
