import { LinkLabel } from "@/components/ui/link-label";
import { SITE_COPYRIGHT } from "@/config/site";
import { getSiteLinks, SITE_UPDATED } from "@/data/site-links";

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-link border-t border-line py-gutter text-small text-text-2">
      <div className="flex flex-wrap gap-link">
        {getSiteLinks("footer").map(({ id, label, href, newTab }) => (
          <a
            key={id}
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
          >
            <LinkLabel label={label} />
          </a>
        ))}
      </div>
      <p>
        {SITE_COPYRIGHT} · {SITE_UPDATED}
      </p>
    </footer>
  );
}
