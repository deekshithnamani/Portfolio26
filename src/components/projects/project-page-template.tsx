import { LinkLabel } from "@/components/ui/link-label";
import { Link, useLocation } from "react-router";
import { PageContainer } from "@/components/ui";
import type { WorkItem } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";
import { SITE_LINKS } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";
import { SectionNav } from "./section-nav";

export type ProjectTemplateData = {
  title: string;
  problem: string;
  artifacts: Array<{ src: string; caption: string; designIntent?: string }>;
  productDecision: string;
  outcome: string;
  constraints: string;
  caseStudyUrl: string;
};

function textWithPrefix(item: WorkItem, prefix: string, fallback: string) {
  const block = item.body.find((candidate) => candidate.type === "text" && candidate.content.startsWith(prefix));
  return block?.type === "text" ? block.content : fallback;
}

export function projectToTemplate(item: WorkItem): ProjectTemplateData {
  const artifacts = item.body.filter((block) => block.type === "image").map((block) => ({ src: block.src, caption: block.caption }));
  while (artifacts.length < 3) artifacts.push({ src: item.cover, caption: "TODO: replace with a project artifact and 1–2 line caption." });
  return {
    title: item.title,
    problem: item.tldr,
    artifacts: artifacts.slice(0, 5),
    productDecision: textWithPrefix(item, "Trade-offs & decisions:", "TODO: add the central product decision."),
    outcome: textWithPrefix(item, "Metrics:", "TODO: add a verified outcome."),
    constraints: textWithPrefix(item, "Constraints:", "TODO: add constraints and tradeoffs."),
    caseStudyUrl: "#",
  };
}

export function ProjectPageTemplate({ project, children }: { project: ProjectTemplateData; children?: React.ReactNode }) {
  return <PageContainer variant="wide"><Link to="/work" className={UI_RECIPE_TOKENS.actionLinkMuted}>← Work</Link><header className="mt-8 max-w-4xl"><h1 className="text-4xl leading-tight tracking-[-0.05em] md:text-6xl">{project.title}</h1><p className="mt-6 text-xl leading-relaxed text-[var(--surface-fg-mid)]">{project.problem}</p></header>{children}
    <section aria-label="Project artifacts" className="mt-12 grid gap-6">{project.artifacts.map((artifact, index) => <figure key={`${artifact.caption}-${index}`} className="border border-[var(--surface-border)] p-4"><img src={artifact.src} alt={artifact.caption} loading="lazy" className="aspect-video w-full object-cover" />{artifact.designIntent ? <p className="mt-3 text-xs uppercase tracking-wider text-[var(--surface-accent)]">Design intent — {artifact.designIntent}</p> : null}<figcaption className="mt-3 text-[var(--surface-fg-mid)]">{artifact.caption}</figcaption></figure>)}</section>
    <aside className="mt-12 border-l-2 border-[var(--surface-accent)] bg-[var(--surface-card)] p-5"><h2 className="text-sm uppercase tracking-wider">Product decision</h2><p className="mt-2">{project.productDecision}</p></aside>
    <p className="mt-8 text-lg"><strong>Outcome —</strong> {project.outcome}</p>
    <section className="mt-10"><h2 className="text-2xl">Constraints and tradeoffs</h2><p className="mt-3 max-w-3xl text-[var(--surface-fg-mid)]">{project.constraints}</p></section>
    <a href={project.caseStudyUrl} className="focus-ring mt-10 inline-flex border border-[var(--surface-border-mid)] px-4 py-3">Read the full case study <span className="sr-only">(TODO: add PDF deck)</span></a>
  </PageContainer>;
}

export function CaseStudyPage() {
  const { label, title, summary, metadata, sections, contact } =
    WORK_CONTENT.caseStudy;
  const { state } = useLocation();
  const backLink = state?.fromHome === true ? SITE_LINKS.backHome : SITE_LINKS.backToWork;

  return (
    <PageContainer>
      <article className="space-y-page">
        <header>
          <Link to={backLink.href} className="back-link">{backLink.label}</Link>
          <p className="mt-link text-text-2">{label}</p>
          <h1 className="page-title">{title}</h1>
          <p className="mt-link">{summary}</p>
          <dl className="mt-gutter text-text-2">
            {metadata.map(({ label: name, value }) => (
              <div key={name}>
                <dt className="inline">{name}: </dt>
                <dd className="inline">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <SectionNav sections={sections} />
        {sections.map(({ id, title: heading, body, note, caption }) => (
          <section
            key={id}
            id={id}
            aria-labelledby={`${id}-heading`}
            className="scroll-mt-gutter"
            tabIndex={-1}
          >
            <h2 id={`${id}-heading`} className="section-title">
              {heading}
            </h2>
            <p className="mt-link">{body}</p>
            {note && <p className="mt-link pl-gutter text-text-2">{note}</p>}
            <figure className="mt-gutter">
              <div aria-hidden="true" className="aspect-video bg-case-image" />
              {caption?.trim() && (
                <figcaption className="mt-link text-small text-text-2">
                  {caption}
                </figcaption>
              )}
            </figure>
          </section>
        ))}

        <div className="space-y-link">
          <Link to={backLink.href} className="back-link">{backLink.label}</Link>
          <p>
            {contact.map(({ text, link }, index) => {
              if (link === undefined) return text;
              const { href, label: linkLabel, newTab } = SITE_LINKS[link];
              return (
                <a
                  key={index}
                  href={href}
                  target={newTab ? "_blank" : undefined}
                  rel={newTab ? "noreferrer" : undefined}
                >
                  <LinkLabel label={linkLabel} />
                </a>
              );
            })}
          </p>
        </div>
      </article>
    </PageContainer>
  );
}
