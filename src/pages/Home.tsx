import { PageContainer } from "@/components/ui";
import { DitherBackground } from "@/components/ui/dither-background";
import { InlineCopy } from "@/components/ui/inline-copy";
import { ListRow } from "@/components/ui/list-row";
import { WORK_CONTENT } from "@/data/work-content";

export default function Home() {
  const { home, entries } = WORK_CONTENT;

  return (
    <PageContainer>
      <DitherBackground />
      <p>{home.intro}</p>
      <p className="mt-gutter">
        <InlineCopy parts={home.photography} />
      </p>
      <section className="mt-home-projects" aria-labelledby="home-projects">
        <h1 id="home-projects" className="page-title">
          {home.selectedLabel}
        </h1>
        <ul role="list" className="mt-link space-y-row-small">
          {entries
            .filter(({ featured }) => featured)
            .map(({ title, href, type, year }) => (
              <ListRow
                key={title}
                title={title}
                href={href}
                type={type}
                year={year}
              />
            ))}
        </ul>
      </section>
    </PageContainer>
  );
}
