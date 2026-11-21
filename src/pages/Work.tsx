import { Link, useParams } from "react-router";
import { PageContainer } from "@/components/ui";
import { LinkLabel } from "@/components/ui/link-label";
import { NewMark } from "@/components/ui/new-mark";
import { buildWorkDetailPath } from "@/config/route-paths";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";
import { CaseStudyPage } from "@/components/projects/project-page-template";
import NotFound from "./NotFound";

export function WorkIndex() {
  const { experience, entries, label, description, newLabel } = WORK_CONTENT;

  return (
    <PageContainer>
      <h1 className="page-title">{label}</h1>
      <p className="mt-link">{description}</p>
      <div className="mt-link border-t border-line">
        {experience.map(({ company, role, years, projects }) => (
          <section
            key={company}
            className="experience-group border-b border-line py-gutter"
          >
            <div>
              <h2 className="section-title">{company}</h2>
              <p className="text-small text-text-2">{role}</p>
              <p className="text-small text-text-2">{years}</p>
            </div>
            <ul className="experience-projects">
              {projects.map(({ title, slug }) => {
                const href = buildWorkDetailPath(slug);
                const marked = entries.some(
                  (entry) => entry.href === href && entry.isNew,
                );
                return (
                  <li key={title}>
                    <Link to={href}>
                      <LinkLabel label={title} />
                    </Link>
                    {marked && <NewMark label={newLabel} />}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}

export function WorkDetail() {
  const { slug } = useParams();
  if (slug && buildWorkDetailPath(slug) === SITE_LINKS.legalProof.href) {
    return <CaseStudyPage />;
  }

  const project = WORK_CONTENT.experience
    .flatMap((group) => group.projects)
    .find((item) => item.slug === slug);
  if (!project) return <NotFound />;

  const back = SITE_LINKS.backToWork;
  return (
    <PageContainer>
      <Link to={back.href}>{back.label}</Link>
      <h1 className="page-title mt-gutter">{project.title}</h1>
      <p className="mt-link text-text-2">{WORK_CONTENT.unpublishedStatus}</p>
    </PageContainer>
  );
}
