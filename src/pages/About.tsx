import { PageContainer } from "@/components/ui";
import { InlineCopy } from "@/components/ui/inline-copy";
import { ABOUT_CONTENT } from "@/data/about-content";

export default function About() {
  const { label, story, sections, contact } = ABOUT_CONTENT;
  const populatedSections = sections.filter(({ body }) =>
    body.some(({ text, link }) => link !== undefined || text?.trim()),
  );

  return (
    <PageContainer>
      <h1 className="page-title">{label}</h1>
      <div className="mt-gutter space-y-gutter">
        {story
          .filter((paragraph) => paragraph.trim())
          .map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
      </div>
      {populatedSections.map(({ id, heading, body }) => (
        <section key={id} className="mt-page" aria-labelledby={id}>
          <h2 id={id} className="section-title">
            {heading}
          </h2>
          <p className="mt-link">
            <InlineCopy parts={body} />
          </p>
        </section>
      ))}
      <p className="mt-page">
        <InlineCopy parts={contact} />
      </p>
    </PageContainer>
  );
}
