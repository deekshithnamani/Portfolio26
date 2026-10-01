import { Link } from "react-router";
import { useState } from "react";
import clsx from "clsx";
import { useCursor } from "@/Layout";
import {
  AsciiEmpty,
  FilterPills,
  PageContainer,
  RevealPanel,
  SectionHeader,
} from "@/components/ui";
import { INTERESTS, INTEREST_TAGS } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";

export default function Interests() {
  const [active, setActive] = useState<(typeof INTEREST_TAGS)[number]>("All");
  const { setLabel } = useCursor();

  const filtered =
    active === "All"
      ? INTERESTS
      : INTERESTS.filter((item) => item.tag === active);

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="INTERESTS"
        description="Books, anime, photography, and other obsessions"
      />

      <FilterPills
        tags={INTEREST_TAGS}
        active={active}
        onChange={setActive}
        size="sm"
      />

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {filtered.map((item, index) => (
            <RevealPanel
              key={item.id}
              index={index}
              onMouseEnter={() => setLabel(item.id)}
              onMouseLeave={() => setLabel(null)}
            >
              <Link
                to={item.link}
                className="group flex h-full min-h-[290px] flex-col overflow-hidden border border-[var(--surface-border)] bg-[var(--surface-card)] transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--surface-accent)] hover:shadow-[0_20px_48px_rgba(52,38,28,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)]"
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.title}
                    className="media-grayscale aspect-[16/9] w-full object-cover opacity-90 transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:opacity-100"
                  />
                ) : null}

                <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
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

                    <h2 className="text-[1.45rem] font-normal leading-[1.08] tracking-[-0.035em] text-[var(--surface-fg)] md:text-[1.65rem]">
                      {item.title}{" "}
                      {item.tag === "Anime" ? (
                        <span className="font-mono text-base">( ˘ω˘ )</span>
                      ) : null}
                    </h2>
                    <p className={clsx("mt-5 text-[0.95rem] leading-[1.75]", UI_RECIPE_TOKENS.bodySupport)}>
                      {item.sub}
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "mt-10 flex items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-4 text-[0.72rem] uppercase tracking-[0.18em]",
                      UI_RECIPE_TOKENS.monoMuted,
                    )}
                  >
                    <span>{item.tag}</span>
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
