import { WORK_CONTENT, WORK_GROUPS } from "@/data/work-content";
import { ListRow } from "./list-row";

export function CompanyWorkList({
  featuredOnly = false,
}: {
  featuredOnly?: boolean;
}) {
  const { companies, newLabel } = WORK_CONTENT;

  return (
    <div className="mt-link divide-y divide-line border-y border-line">
      {Array.from(WORK_GROUPS, ([company, entries]) => {
        const projects = featuredOnly
          ? entries.filter(({ featured }) => featured)
          : entries;
        if (!projects.length) return null;
        const experience = companies[company];

        return (
          <section
            key={company}
            aria-label={company}
            className="company-work-group py-link"
          >
            <div>
              <h2 className="item-title">{company}</h2>
              {experience && (
                <div className="text-small text-text-2">
                  <p>{experience.role}</p>
                  <p>{experience.duration}</p>
                </div>
              )}
            </div>
            <ul className="space-y-row-small">
              {projects.map(({ title, status, description, href, isNew }) => (
                <ListRow
                  key={title}
                  title={title}
                  status={status}
                  description={featuredOnly ? undefined : description}
                  href={href}
                  newLabel={isNew ? newLabel : undefined}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
