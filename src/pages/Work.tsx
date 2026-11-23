import { useParams } from "react-router";
import { PageContainer } from "@/components/ui";
import { LinkLabel } from "@/components/ui/link-label";
import { CompanyWorkList } from "@/components/ui/company-work-list";
import { ListRow } from "@/components/ui/list-row";
import { buildWorkDetailPath } from "@/config/route-paths";
import { SITE_LINKS } from "@/data/site-links";
import { PROJECT_PAGES, WORK_CONTENT } from "@/data/work-content";
import { CaseStudyPage } from "@/components/projects/project-page-template";
import NotFound from "./NotFound";

export function WorkIndex() {
  const { label, description, productThinking } = WORK_CONTENT;

  return (
    <PageContainer>
      <div className="space-y-heading-gap">
        <h1 className="page-title">{label}</h1>
        <p className="text-nav text-text-2">{description}</p>
      </div>
      <CompanyWorkList />
      <section
        className="mt-page scroll-mt-gutter"
        id={productThinking.id}
        tabIndex={-1}
        aria-labelledby="product-thinking-heading"
      >
        <h2 className="section-title" id="product-thinking-heading">
          {productThinking.label}
        </h2>
        <ul role="list" className="mt-link space-y-row-small">
          {productThinking.entries.map(({ title, type, year, href, link }) => (
            <ListRow
              key={title}
              title={title}
              type={type}
              year={year ?? "TBD"}
              href={link ? SITE_LINKS[link].href : href}
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
  const project = slug
    ? PROJECT_PAGES[buildWorkDetailPath(slug.toLowerCase())]
    : undefined;
  const projects = WORK_CONTENT.entries.filter(
    ({ href }) => href && PROJECT_PAGES[href],
  );
  const current = projects.findIndex(
    ({ href }) =>
      href === (slug ? buildWorkDetailPath(slug.toLowerCase()) : undefined),
  );
  const next =
    current >= 0 && projects.length > 1
      ? projects[(current + 1) % projects.length]
      : undefined;
  return project ? (
    <CaseStudyPage
      project={project}
      nextProject={
        next?.href ? { title: next.title, href: next.href } : undefined
      }
    />
  ) : (
    <NotFound />
  );
}
