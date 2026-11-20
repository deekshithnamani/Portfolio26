import { Link } from "react-router";
import { PageContainer } from "@/components/ui";
import { DitherBackground } from "@/components/ui/dither-background";
import { LinkLabel } from "@/components/ui/link-label";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";

export default function Home() {
  const { intro, experience } = WORK_CONTENT.home;

  return (
    <PageContainer>
      <DitherBackground />
      <p>{intro}</p>

      <section className="mt-page" aria-labelledby="home-work">
        <h1 id="home-work" className="text-text-2">
          {WORK_CONTENT.label}
        </h1>
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

                  const { href, newTab } = SITE_LINKS[link];
                  return (
                    <li key={title}>
                      {newTab ? (
                        <a href={href} target="_blank" rel="noreferrer">
                          <LinkLabel label={title} />
                        </a>
                      ) : (
                        <Link to={href}>
                          <LinkLabel label={title} />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
