import { useParams } from "react-router";
import { PageContainer } from "@/components/ui";
import { LinkLabel } from "@/components/ui/link-label";
import { ListRow } from "@/components/ui/list-row";
import { buildWorkDetailPath } from "@/config/route-paths";
import { SITE_LINKS } from "@/data/site-links";
import { PROJECT_PAGES, WORK_CONTENT } from "@/data/work-content";
import { CaseStudyPage } from "@/components/projects/project-page-template";
import NotFound from "./NotFound";

export function WorkIndex() {
  const { entries, label, description, newLabel, productThinking } =
    WORK_CONTENT;

  return (
    <PageContainer>
      <h1 className="page-title">{label}</h1>
      <p className="mt-link">{description}</p>
      <ul className="mt-link border-t border-line">
        {entries.map(({ isNew, ...entry }) => (
          <ListRow
            key={entry.title}
            {...entry}
            newLabel={isNew ? newLabel : undefined}
          />
        ))}
      </ul>
      <section
        className="mt-page scroll-mt-gutter"
        id={productThinking.id}
        tabIndex={-1}
        aria-labelledby="product-thinking-heading"
      >
        <h2 className="section-title" id="product-thinking-heading">
          {productThinking.label}
        </h2>
        <ul className="mt-link border-t border-line">
          {productThinking.entries.map(({ link, ...entry }) => (
            <ListRow
              key={entry.title}
              {...entry}
              href={link ? SITE_LINKS[link].href : entry.href}
              newTab={link ? SITE_LINKS[link].newTab : undefined}
            />
          ))}
        </ul>
        <p className="mt-gutter text-text-2">
          {productThinking.note}
          {productThinking.certificateUrl?.trim() && (
            <>
              {" "}
              <a
                href={productThinking.certificateUrl}
                target="_blank"
                rel="noreferrer"
              >
                <LinkLabel label={productThinking.certificateLabel} />
              </a>
            </>
          )}
        </p>
      </section>
    </PageContainer>
  );
}

export function WorkDetail() {
  const { slug } = useParams();
  const project = slug ? PROJECT_PAGES[buildWorkDetailPath(slug)] : undefined;
  return project ? <CaseStudyPage project={project} /> : <NotFound />;
}
