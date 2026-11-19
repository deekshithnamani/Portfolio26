import { LinkLabel } from "@/components/ui/link-label";
import { PageContainer } from "@/components/ui";
import { ABOUT_CONTENT } from "@/data/about-content";
import { SITE_LINKS } from "@/data/site-links";

export default function About() {
  return (
    <PageContainer>
      <h1 className="text-text-2">{ABOUT_CONTENT.label}</h1>
      <div className="mt-gutter space-y-gutter">
        {ABOUT_CONTENT.sections.map(({ title, body, links }) => (
          <section key={title}>
            <h2 className="font-medium">{title}</h2>
            <p className="mt-link">{body}</p>
            {links && (
              <ul className="mt-link flex flex-wrap gap-x-gutter gap-y-link">
                {links.map((id) => {
                  const { href, label, labels, newTab } = SITE_LINKS[id];
                  return (
                    <li key={id}>
                      <a
                        href={href}
                        target={newTab ? "_blank" : undefined}
                        rel={newTab ? "noreferrer" : undefined}
                      >
                        <LinkLabel label={labels?.about ?? label} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
        <p>{ABOUT_CONTENT.languages}</p>
      </div>
    </PageContainer>
  );
}
