import { Link } from "react-router";
import { PageContainer } from "@/components/ui";
import type { WorkItem } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";

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
