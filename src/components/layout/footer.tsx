import { LinkLabel } from "@/components/ui/link-label";
import { FOOTER_CREDIT, getSiteLinks } from "@/data/site-links";

export function Footer() {
  return (
    <footer className="site-footer mt-footer border-t border-line py-gutter text-small text-text-2">
      <div className="flex flex-wrap gap-x-link gap-y-row-small">
        {getSiteLinks("footer").map(({ id, label, href, newTab }) => (
          <a
            key={id}
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
            className="no-underline hover:underline"
          >
            <LinkLabel label={label} />
          </a>
        ))}
      </div>
      <p className="shrink-0">{FOOTER_CREDIT}</p>
    </footer>
  );
}
