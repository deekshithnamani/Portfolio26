import { Link } from "react-router";
import { PageContainer } from "@/components/ui";
import { DitherBackground } from "@/components/ui/dither-background";
import { ListRow } from "@/components/ui/list-row";
import { buildWorkDetailPath } from "@/config/route-paths";
import { PHOTO_CONTENT } from "@/data/photo-content";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";

export default function Home() {
  const { text: caption, link } = PHOTO_CONTENT.homeCaption;
  const practice = SITE_LINKS[link];

  return (
    <PageContainer>
      <DitherBackground />
      <div className="space-y-gutter">
        {WORK_CONTENT.home.paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>
            {paragraph.map(({ text, link }, index) => {
              if (link === undefined) return text;

              const { href, newTab, label, labels } = SITE_LINKS[link];
              const homeLabel = labels?.home ?? label;
              return newTab ? (
                <a key={index} href={href} target="_blank" rel="noreferrer">
                  {homeLabel}
                </a>
              ) : (
                <Link key={index} to={href}>
                  {homeLabel}
                </Link>
              );
            })}
          </p>
        ))}
      </div>

      <section className="mt-page" aria-labelledby="home-work">
        <h1 id="home-work" className="text-text-2">
          {WORK_CONTENT.label}
        </h1>
        <ul className="mt-link">
          {WORK_CONTENT.entries.map(({ year, title, status, slug, isNew }) => (
            <ListRow
              key={title}
              year={year}
              title={title}
              status={status}
              href={slug ? buildWorkDetailPath(slug) : undefined}
              newLabel={isNew ? WORK_CONTENT.newLabel : undefined}
            />
          ))}
        </ul>
      </section>
      <p className="home-dither-caption mt-page text-small text-text-2">
        {caption}
        <Link to={practice.href}>{practice.label}</Link>
      </p>
    </PageContainer>
  );
}
