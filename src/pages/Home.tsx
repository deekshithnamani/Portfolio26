import { PageContainer } from "@/components/ui";
import { DitherBackground } from "@/components/ui/dither-background";
import { InlineCopy } from "@/components/ui/inline-copy";
import { CompanyWorkList } from "@/components/ui/company-work-list";
import { WORK_CONTENT } from "@/data/work-content";

export default function Home() {
  const { home } = WORK_CONTENT;

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
        <CompanyWorkList featuredOnly />
      </section>
    </PageContainer>
  );
}
