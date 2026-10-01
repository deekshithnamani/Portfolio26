import clsx from "clsx";
import { Link, useLocation, useParams } from "react-router";
import { MagneticButton, useCursor } from "@/Layout";
import {
  AsciiEmpty,
  PageContainer,
  RevealPanel,
  SectionHeader,
} from "@/components/ui";
import { ROUTE_PATHS, buildWorkDetailPath } from "@/config/route-paths";
import { WORK, type WorkBodyBlock, type WorkItem } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";

function getYouTubeEmbedId(url: URL) {
  const hostname = url.hostname.replace(/^www\./, "");

  if (hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (hostname !== "youtube.com" && hostname !== "m.youtube.com") {
    return null;
  }

  if (url.pathname === "/watch") {
    return url.searchParams.get("v");
  }

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments[0] === "embed" || segments[0] === "shorts") {
    return segments[1] ?? null;
  }

  return null;
}

function getVimeoEmbedId(url: URL) {
  const hostname = url.hostname.replace(/^www\./, "");
  const segments = url.pathname.split("/").filter(Boolean);

  if (hostname === "player.vimeo.com" && segments[0] === "video") {
    return segments[1] ?? null;
  }

  if (hostname !== "vimeo.com") {
    return null;
  }

  return segments[0] ?? null;
}

function getEmbedSource(src: string) {
  try {
    const url = new URL(src);
    const youtubeId = getYouTubeEmbedId(url);

    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }

    const vimeoId = getVimeoEmbedId(url);

    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
  } catch {
    return null;
  }

  return null;
}

const WORK_DETAIL_SECTIONS = [
  { id: "work-section-quickfacts", label: "Quick Facts" },
  { id: "work-section-overview", label: "Overview" },
  { id: "work-section-cover", label: "Cover" },
  { id: "work-section-story", label: "Project Notes" },
  { id: "work-section-next", label: "Next Case" },
] as const;

type WorkDetailSection = {
  id: string;
  label: string;
};

function WorkBlock({ block }: { block: WorkBodyBlock }) {
  const embedSource = block.type === "video" ? getEmbedSource(block.src) : null;

  if (block.type === "text") {
    return (
      <p className={clsx("max-w-[66ch]", UI_RECIPE_TOKENS.bodyProse)}>
        {block.content}
      </p>
    );
  }

  if (block.type === "image") {
    return (
      <figure className={UI_RECIPE_TOKENS.sectionInnerStack}>
        <img
          src={block.src}
          alt={block.caption}
          className={clsx(
            "media-grayscale aspect-video w-full object-cover",
            UI_RECIPE_TOKENS.coverFrame,
          )}
        />
        <figcaption className={UI_RECIPE_TOKENS.monoMuted}>
          {block.caption}
        </figcaption>
      </figure>
    );
  }

  if (embedSource) {
    return (
      <figure className={UI_RECIPE_TOKENS.sectionInnerStack}>
        <div
          className={clsx(
            "overflow-hidden border border-[var(--surface-border-mid)]",
            UI_RECIPE_TOKENS.mediaFrame,
          )}
        >
          <iframe
            title={block.caption ?? "Embedded case study video"}
            src={embedSource}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {block.caption ? (
          <figcaption className={UI_RECIPE_TOKENS.monoMuted}>
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={UI_RECIPE_TOKENS.sectionInnerStack}>
      <video
        controls
        src={block.src}
        className={clsx(
          "media-grayscale w-full object-cover",
          UI_RECIPE_TOKENS.mediaFrame,
        )}
      />
      {block.caption ? (
        <figcaption className={UI_RECIPE_TOKENS.monoMuted}>
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function WorkDetailSecondaryNav({
  sections,
}: {
  sections: readonly WorkDetailSection[];
}) {
  const { hash } = useLocation();
  const activeSection = hash ? hash.slice(1) : sections[0]?.id;

  return (
    <aside className={clsx("hidden md:block", UI_RECIPE_TOKENS.workDetailSecondaryNav)}>
      <div className={UI_RECIPE_TOKENS.workDetailSecondaryNavInner}>
        <nav
          aria-label="Case study section links"
          className={UI_RECIPE_TOKENS.workDetailSecondaryNavList}
        >
          {sections.map((section) => {
            const selected = section.id === activeSection;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={selected ? "location" : undefined}
                className={clsx(
                  UI_RECIPE_TOKENS.workDetailSecondaryNavLink,
                  selected
                    ? "pl-1 text-[var(--surface-accent)]"
                    : "text-[var(--surface-fg-mid)] hover:text-[var(--surface-accent)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    UI_RECIPE_TOKENS.workDetailSecondaryNavMarker,
                    selected ? "opacity-100" : "opacity-0",
                  )}
                />
                  {section.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function WorkQuickFactsStrip({
  quickFacts,
  id,
}: {
  quickFacts: WorkItem["quickFacts"];
  id: string;
}) {
  return (
    <section
      id={id}
      className={clsx("mb-8 scroll-mt-24", UI_RECIPE_TOKENS.panelPadding)}
    >
      <dl className="grid grid-cols-1 gap-x-3 gap-y-3 text-[0.76rem] leading-[1.35] sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["ROLE", quickFacts.role],
          ["DURATION", quickFacts.duration],
          ["TEAM", quickFacts.teamSize],
          ["TOOLS", quickFacts.tools],
        ].map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt
              className={clsx(
                UI_RECIPE_TOKENS.metaText,
                "text-[10px] tracking-[0.17em]",
              )}
            >
              {label}
            </dt>
            <dd className="mt-1 font-mono text-[0.9rem] leading-[1.5] text-[var(--surface-fg)]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function WorkIndex() {
  const { setLabel } = useCursor();

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="WORK"
        description="The problems I got paid to solve, and how I actually solved them — decisions and trade-offs included, not just the finished screens."
      />

      {WORK.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {WORK.map((item, index) => (
            <RevealPanel
              key={item.slug}
              index={index}
              onMouseEnter={() => setLabel(item.id)}
              onMouseLeave={() => setLabel(null)}
            >
              <Link
                to={buildWorkDetailPath(item.slug)}
                className="group flex h-full min-h-[260px] flex-col justify-between border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--surface-accent)] hover:shadow-[0_24px_60px_rgba(52,38,28,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)] md:p-6"
              >
                <div>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span
                      className={clsx(
                        "text-[0.72rem] tracking-[0.2em]",
                        UI_RECIPE_TOKENS.monoMuted,
                      )}
                    >
                      {item.id}
                    </span>
                    <span className="h-px w-8 bg-[var(--surface-border-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-hover:bg-[var(--surface-accent)]" />
                  </div>

                  <h2 className="max-w-[13ch] text-[1.6rem] font-normal leading-[1.05] tracking-[-0.04em] text-[var(--surface-fg)] md:text-[1.8rem]">
                    {item.title}
                  </h2>

                  <p
                    className={clsx(
                      "mt-5 text-[0.72rem] uppercase tracking-[0.2em]",
                      UI_RECIPE_TOKENS.monoMuted,
                    )}
                  >
                    {item.company} / {item.duration}
                  </p>
                </div>

                <div className="mt-10 space-y-5">
                  <p
                    className={clsx(
                      "line-clamp-3 text-[0.95rem] leading-[1.75]",
                      UI_RECIPE_TOKENS.bodySupport,
                    )}
                  >
                    {item.tldr}
                  </p>

                  <div
                    className={clsx(
                      "flex items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-4 text-[0.72rem] uppercase tracking-[0.18em]",
                      UI_RECIPE_TOKENS.monoMuted,
                    )}
                  >
                    <span>{item.category}</span>
                    <span>{item.year}</span>
                  </div>
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

export function WorkDetail() {
  const { slug = "" } = useParams();
  const itemIndex = WORK.findIndex((item) => item.slug === slug);
  const item = itemIndex >= 0 ? WORK[itemIndex] : null;

  if (!item) {
    return (
      <PageContainer compact>
        <AsciiEmpty
          title="case study not found —"
          subtitle="return to the index"
        />
      </PageContainer>
    );
  }

  const next = WORK[(itemIndex + 1) % WORK.length];

  return (
    <PageContainer
      variant="wide"
      className="md:grid md:grid-cols-[minmax(0,1fr)_240px] md:items-start md:gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14 xl:gap-16"
    >
      <div>
        <Link
          to={ROUTE_PATHS.work}
          className={clsx(
            UI_RECIPE_TOKENS.sectionLeadMargin,
            UI_RECIPE_TOKENS.actionLinkMuted,
          )}
        >
          ← WORK
        </Link>

        <WorkQuickFactsStrip
          id="work-section-quickfacts"
          quickFacts={item.quickFacts}
        />

        <section
          id="work-section-overview"
          className={clsx(
            "mb-8 scroll-mt-24",
            UI_RECIPE_TOKENS.compactCard,
            "border-l-2 border-[var(--surface-accent)] pl-4 md:mb-10 md:pl-6",
          )}
        >
          <h1
            className={clsx("mb-3 md:mb-4", UI_RECIPE_TOKENS.titleLarge)}
          >
            {item.title}
          </h1>

          <p
            className={clsx(
              "text-[0.78rem] uppercase tracking-[0.16em] md:mb-0",
              UI_RECIPE_TOKENS.monoMuted,
            )}
          >
            {item.company} / {item.category} / {item.year}
          </p>

          <p className={clsx("mt-4 max-w-[64ch] text-base leading-[1.9]", UI_RECIPE_TOKENS.bodyProse)}>
            {item.tldr}
          </p>
        </section>

        <div
          id="work-section-cover"
          className={clsx(
            "corner-frame relative mb-8 scroll-mt-24 md:mb-10",
          )}
        >
          <img
            src={item.cover}
            alt={item.title}
            className={clsx(
              "media-grayscale w-full object-cover",
              UI_RECIPE_TOKENS.coverFrame,
            )}
          />
          <span
            className={clsx(
              "absolute left-3 top-3 border border-[var(--surface-accent)] text-[var(--surface-accent)] md:left-4 md:top-4",
              UI_RECIPE_TOKENS.pill,
            )}
          >
            {item.id}
          </span>
        </div>

        <section id="work-section-story" className="scroll-mt-24">
          <div className="space-y-5 md:space-y-6">
            {item.body.map((block, index) => (
              <WorkBlock key={`${item.slug}-${index}`} block={block} />
            ))}
          </div>

          {item.closingNote ? (
            <p
              className={clsx(
                "mt-8 text-sm leading-[1.75]",
                UI_RECIPE_TOKENS.bodySupport,
              )}
            >
              {item.closingNote}
            </p>
          ) : null}
        </section>

        <div id="work-section-next" className="mt-6 scroll-mt-24 md:mt-8">
          <MagneticButton>
            <Link
              to={buildWorkDetailPath(next.slug)}
              className={UI_RECIPE_TOKENS.actionLink}
            >
              NEXT
            </Link>
          </MagneticButton>
        </div>
      </div>
      <WorkDetailSecondaryNav sections={WORK_DETAIL_SECTIONS} />
    </PageContainer>
  );
}
