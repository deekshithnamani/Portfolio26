import { PageContainer } from "@/components/ui";
import { DitherBackground } from "@/components/ui/dither-background";
import { ListRow } from "@/components/ui/list-row";
import { ROUTE_PATHS } from "@/config/route-paths";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";

export default function Home() {
  const { home, entries, productThinking } = WORK_CONTENT;

  const selected = [
    ...entries
      .filter(({ href }) => href)
      .map(({ year, title, href }) => ({
        year,
        title,
        href,
        category: WORK_CONTENT.label,
      })),
    ...productThinking.entries.map(({ year, link }) => ({
      year,
      title: SITE_LINKS[link].label.replace(/ ↗$/, ""),
      href: ROUTE_PATHS.productThinking,
      category: productThinking.label,
    })),
  ].sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""));

  return (
    <PageContainer>
      <DitherBackground />
      <p>{home.intro}</p>

      <section className="mt-home-projects" aria-labelledby="home-projects">
        <h1 id="home-projects" className="page-title">
          {home.selectedLabel}
        </h1>
        <ul className="mt-link border-t border-line">
          {selected.map(({ title, year, category, href }) => (
            <ListRow
              key={title}
              year={year}
              title={title}
              status={category}
              href={href}
              navigationState={{ fromHome: true }}
            />
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
