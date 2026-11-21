import { PageContainer } from "@/components/ui";
import { DitherBackground } from "@/components/ui/dither-background";
import { InlineCopy } from "@/components/ui/inline-copy";
import { ListRow } from "@/components/ui/list-row";
import { WORK_CONTENT } from "@/data/work-content";

export default function Home() {
  const { home, entries, newLabel } = WORK_CONTENT;

  return (
    <PageContainer>
      <DitherBackground />
      <p>{home.intro}</p>
      <p className="mt-gutter">
        <InlineCopy parts={home.photography} />
      </p>
      <section className="mt-home-projects" aria-labelledby="home-projects">
        <h1 id="home-projects" className="section-title">
          {home.selectedLabel}
        </h1>
        <ul className="mt-link border-t border-line">
          {entries
            .filter(({ featured }) => featured)
            .map(({ title, year, status, href, isNew }) => (
              <ListRow
                key={title}
                title={title}
                year={year}
                status={status}
                href={href}
                newLabel={isNew ? newLabel : undefined}
              />
            ))}
        </ul>
      </section>
    </PageContainer>
  );
}
