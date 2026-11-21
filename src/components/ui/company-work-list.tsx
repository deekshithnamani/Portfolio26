import { WORK_CONTENT, WORK_GROUPS } from "@/data/work-content";
import { ListRow } from "./list-row";

export function CompanyWorkList() {
  const { companies } = WORK_CONTENT;

  return (
    <div className="mt-link divide-y divide-line">
      {Array.from(WORK_GROUPS, ([company, projects]) => {
        const experience = companies[company];

        return (
          <section
            key={company}
            aria-label={company}
            className="company-work-group py-link"
          >
            <div>
              <h2 className="text-nav font-medium text-text-2">{company}</h2>
              {experience && (
                <div className="text-small text-text-2">
                  <p>{experience.role}</p>
                  <p>{experience.duration}</p>
                </div>
              )}
            </div>
            <ul role="list" className="space-y-row-small">
              {projects.map(({ title, href }) => (
                <ListRow key={title} title={title} href={href} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
