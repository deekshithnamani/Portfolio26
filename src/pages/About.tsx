import { PageContainer } from "@/components/ui";
import { ABOUT_CONTENT } from "@/data/about-content";

export default function About() {
  const { label, story, howIWork } = ABOUT_CONTENT;

  return (
    <PageContainer>
      <h1 className="page-title">{label}</h1>
      <div className="mt-gutter space-y-gutter">
        {story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <section className="mt-page" aria-labelledby="about-how-i-work">
        <h2 id="about-how-i-work" className="section-title">
          {howIWork.heading}
        </h2>
        <p className="mt-link">{howIWork.body}</p>
      </section>
    </PageContainer>
  );
}
