import { Link, useParams } from "react-router";
import { useState } from "react";
import clsx from "clsx";
import { MagneticButton, useCursor } from "@/Layout";
import {
  AsciiEmpty,
  FilterPills,
  MetaPill,
  PageContainer,
  RevealPanel,
  SectionHeader,
} from "@/components/ui";
import { ROUTE_PATHS, buildWritingDetailPath } from "@/config/route-paths";
import { POSTS } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";

function formatParagraph(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function WritingIndex() {
  const { setLabel } = useCursor();
  const tags = ["All", ...new Set(POSTS.flatMap((post) => post.tags))];
  const [active, setActive] = useState<(typeof tags)[number]>("All");
  const filtered =
    active === "All"
      ? POSTS
      : POSTS.filter((post) => post.tags.includes(active));

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="WRITING"
        description="Essays, notes, and unfiltered thinking"
      />

      <FilterPills tags={tags} active={active} onChange={setActive} size="sm" />

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {filtered.map((post, index) => (
            <RevealPanel
              key={post.slug}
              index={index}
              onMouseEnter={() => setLabel(post.id)}
              onMouseLeave={() => setLabel(null)}
            >
              <Link
                to={buildWritingDetailPath(post.slug)}
              className="group flex h-full min-h-[240px] flex-col justify-between border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--surface-accent)] hover:shadow-[0_20px_48px_rgba(52,38,28,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)] md:p-6"
              >
                <div>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span
                      className={clsx(
                        "text-[0.72rem] tracking-[0.2em]",
                        UI_RECIPE_TOKENS.monoMuted,
                      )}
                    >
                      {post.date}
                    </span>
                    <span className="h-px w-8 bg-[var(--surface-border-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-hover:bg-[var(--surface-accent)]" />
                  </div>

                  <h2 className="text-[1.45rem] font-normal leading-[1.08] tracking-[-0.035em] text-[var(--surface-fg)] md:text-[1.65rem]">
                    {post.title}
                  </h2>

                  <p className={clsx("mt-5 line-clamp-3 text-[0.95rem] leading-[1.75]", UI_RECIPE_TOKENS.bodySupport)}>
                    {post.excerpt}
                  </p>
                </div>

                <div
                  className={clsx(
                    "mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--surface-border)] pt-4 text-[0.72rem] uppercase tracking-[0.18em]",
                    UI_RECIPE_TOKENS.monoMuted,
                  )}
                >
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            </RevealPanel>
          ))}
        </div>
      ) : (
        <AsciiEmpty />
      )}
    </PageContainer>
  );
}

export function PostDetail() {
  const { slug = "" } = useParams();
  const currentIndex = POSTS.findIndex((post) => post.slug === slug);
  const post = currentIndex >= 0 ? POSTS[currentIndex] : null;

  if (!post) {
    return (
      <PageContainer compact>
        <AsciiEmpty title="post not found —" subtitle="return to writing" />
      </PageContainer>
    );
  }

  const next = POSTS[(currentIndex + 1) % POSTS.length];

  return (
    <PageContainer compact>
      <Link
        to={ROUTE_PATHS.writing}
        className={clsx(
          UI_RECIPE_TOKENS.sectionLeadMargin,
          UI_RECIPE_TOKENS.actionLinkMuted,
        )}
      >
        ← BACK
      </Link>

      <div className="mb-4 flex flex-wrap gap-2 md:gap-3">
        <MetaPill size="sm">{post.date}</MetaPill>
        {post.tags.map((tag) => (
          <MetaPill key={tag} size="sm">
            {tag}
          </MetaPill>
        ))}
      </div>

      <h1 className={clsx("mb-5 md:mb-6", UI_RECIPE_TOKENS.titleLarge)}>
        {post.title}
      </h1>

      <article
        className={clsx(
          "max-w-[66ch] space-y-4 md:space-y-5",
          UI_RECIPE_TOKENS.bodyProse,
        )}
      >
        {post.body.split("\n\n").map((paragraph, index) => (
          <p key={index}>{formatParagraph(paragraph)}</p>
        ))}
      </article>

      <div className="mt-8 md:mt-10">
        <MagneticButton>
          <Link
            to={buildWritingDetailPath(next.slug)}
            className={UI_RECIPE_TOKENS.actionLink}
          >
            NEXT
          </Link>
        </MagneticButton>
      </div>
    </PageContainer>
  );
}
