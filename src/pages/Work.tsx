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
  const { experience, entries, label, description, newLabel, howIWork } =
    WORK_CONTENT;

  return (
    <PageContainer>
      <h1 className="text-text-2">{label}</h1>
      <p className="mt-link">{description}</p>
      <div className="mt-link border-t border-line">
        {experience.map(({ company, role, years, projects }) => (
          <section
            key={company}
            className="experience-group border-b border-line py-gutter"
          >
            <div>
              <h2 className="font-medium">{company}</h2>
              <p className="text-small text-text-2">{role}</p>
              <p className="text-small text-text-2">{years}</p>
            </div>
            <ul className="experience-projects">
              {projects.map(({ title, link }) => {
                if (link === undefined) {
                  return (
                    <li key={title} className="text-text-2">
                      {title}
                    </li>
                  );
                }

                const { href } = SITE_LINKS[link];
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
