import { getSiteLinks } from "@/data/site-links";

export function Footer() {
  return (
    <footer className="flex flex-wrap gap-link border-t border-line py-gutter text-small text-text-2">
      {getSiteLinks("footer").map(({ id, label, href, newTab }) => (
        <a
          key={id}
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noreferrer" : undefined}
        >
          {label}
        </a>
      ))}
    </footer>
  );
}
