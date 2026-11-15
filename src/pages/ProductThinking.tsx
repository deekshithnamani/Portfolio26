import clsx from "clsx";
import { Link } from "react-router";
import { PageContainer, SectionHeader } from "@/components/ui";
import { PRODUCT_THINKING } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";
import { buildWorkDetailPath } from "@/config/route-paths";

export default function ProductThinking() {
  return <PageContainer><SectionHeader title="PRODUCT THINKING" description="PRDs, teardowns, and product decisions." />
    <div className="space-y-6">{PRODUCT_THINKING.map((item) => <article key={item.slug} className="border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 md:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><span className={clsx("border border-[var(--surface-border-mid)] px-2 py-1", UI_RECIPE_TOKENS.metaText)}>{item.tag}</span><span className={UI_RECIPE_TOKENS.monoMuted}>{item.duration}</span></div>
      <h2 className="max-w-3xl text-3xl leading-tight tracking-[-0.04em] text-[var(--surface-fg)]">{item.title}</h2>
      <p className={clsx("mt-4 max-w-3xl", UI_RECIPE_TOKENS.bodySupport)}>{item.context}</p>
      <p className={clsx("mt-4 max-w-3xl", UI_RECIPE_TOKENS.bodySupport)}>{item.tldr}</p>
      <div className="mt-7 flex flex-wrap gap-5"><Link to={buildWorkDetailPath(item.slug)} className={UI_RECIPE_TOKENS.actionLink}>Read the project</Link><a href={item.portfolioUrl} target="_blank" rel="noreferrer" className={UI_RECIPE_TOKENS.actionLinkMuted}>See more on NextLeap ↗</a></div>
    </article>)}</div>
  </PageContainer>;
}
