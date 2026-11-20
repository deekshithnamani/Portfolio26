import { useParams } from "react-router";
import { PageContainer } from "@/components/ui";
import { ListRow } from "@/components/ui/list-row";
import { buildWorkDetailPath } from "@/config/route-paths";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";
import { CaseStudyPage } from "@/components/projects/project-page-template";
import NotFound from "./NotFound";

export function WorkIndex() {
  const { entries, label, description, newLabel, productThinking, howIWork } =
    WORK_CONTENT;

  return (
    <PageContainer>
      <h1 className="text-text-2">{label}</h1>
      <p className="mt-link">{description}</p>
      <ul className="mt-link border-t border-line">
        {entries.map(({ year, title, status, href, isNew }) => (
          <ListRow
            key={title}
            year={year}
            title={title}
            status={status}
            href={href}
            newLabel={isNew ? newLabel : undefined}
          />
        ))}
      </ul>

      <section className="mt-page" aria-labelledby="product-thinking">
        <h2 id="product-thinking" className="text-text-2">
          {productThinking.label}
        </h2>
        <ul className="mt-link border-t border-line">
          {productThinking.entries.map(({ year, link, status }) => {
            const { label, href, newTab } = SITE_LINKS[link];
            return (
              <ListRow
                key={link}
                year={year}
                title={label}
                status={status}
                href={href}
                newTab={newTab}
              />
            );
          })}
        </ul>
        <p className="mt-gutter text-text-2">{productThinking.note}</p>
      </section>
      <section className="mt-page" aria-labelledby="how-i-work">
        <h2 id="how-i-work" className="text-text-2">
          {howIWork.label}
        </h2>
        <p className="mt-link">{howIWork.body}</p>
      </section>
    </PageContainer>
  );
}

export function WorkDetail() {
  const { slug } = useParams();
  if (!slug || buildWorkDetailPath(slug) !== SITE_LINKS.legalProof.href) {
    return <NotFound />;
  }
  return <CaseStudyPage />;
}
