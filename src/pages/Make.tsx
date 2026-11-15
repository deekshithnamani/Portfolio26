import clsx from "clsx";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useCursor } from "@/Layout";
import {
  AsciiEmpty,
  FilterPills,
  PageContainer,
  RevealPanel,
  SectionHeader,
} from "@/components/ui";
import { MAKE, MAKE_TAGS } from "@/data";
import { UI_ANIMATION_TOKENS, UI_RECIPE_TOKENS } from "@/design";

export default function Make() {
  const [active, setActive] = useState<(typeof MAKE_TAGS)[number]>("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const { setLabel } = useCursor();

  useEffect(() => {
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.head.appendChild(Object.assign(document.createElement("meta"), { name: "robots" }));
    const previous = robots.content;
    robots.content = "noindex, nofollow";
    return () => { robots.content = previous; };
  }, []);

  const filtered =
    active === "All" ? MAKE : MAKE.filter((item) => item.type === active);

  const toggleExpanded = (slug: string) => {
    setExpandedSlug((value) => (value === slug ? null : slug));
  };

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="BUILT"
        description="Things I build when nobody asked me to."
      />

      <FilterPills
        tags={MAKE_TAGS}
        active={active}
        onChange={setActive}
        size="sm"
      />

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {filtered.map((item, index) => {
          const isExpanded = expandedSlug === item.slug;

          return (
            <RevealPanel
              key={item.slug}
              index={index}
              onMouseEnter={() => setLabel(item.id)}
              onMouseLeave={() => setLabel(null)}
            >
              <div className="flex h-full min-h-[280px] flex-col justify-between border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:border-[var(--surface-accent)] hover:shadow-[0_20px_48px_rgba(52,38,28,0.07)] md:p-6">
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.slug)}
                    aria-expanded={isExpanded}
                    aria-controls={`make-quick-take-${item.slug}`}
                    className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)]"
                  >
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

                    <div className="space-y-4">
                      <h2 className="text-[1.45rem] font-normal leading-[1.08] tracking-[-0.035em] text-[var(--surface-fg)] md:text-[1.65rem]">
                        {item.title}
                      </h2>
                      <p
                        className={clsx(
                          "text-[0.72rem] uppercase tracking-[0.18em]",
                          UI_RECIPE_TOKENS.monoMuted,
                        )}
                      >
                        {item.type} / {item.year}
                      </p>
                    </div>
                  </button>


                  <motion.div
                    id={`make-quick-take-${item.slug}`}
                    initial={false}
                    animate={isExpanded ? "open" : "closed"}
                    variants={{
                      open: {
                        gridTemplateRows: "1fr",
                        opacity: 1,
                      },
                      closed: {
                        gridTemplateRows: "0fr",
                        opacity: 0,
                      },
                    }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            duration: UI_ANIMATION_TOKENS.cardDuration,
                            ease: UI_ANIMATION_TOKENS.microEasing,
                          }
                    }
                    style={{ display: "grid" }}
                    className={clsx(
                      "overflow-hidden border-t border-[var(--surface-border)]",
                      isExpanded ? "pt-5" : "pointer-events-none border-transparent",
                    )}
                  >
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p
                          className={clsx(
                            UI_RECIPE_TOKENS.monoMuted,
                            "text-[10px] tracking-[0.17em]",
                          )}
                        >
                          WHAT IT IS
                        </p>
                        <p className={UI_RECIPE_TOKENS.bodySupport}>
                          {item.whatItIs}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p
                          className={clsx(
                            UI_RECIPE_TOKENS.monoMuted,
                            "text-[10px] tracking-[0.17em]",
                          )}
                        >
                          WHY
                        </p>
                        <p className={UI_RECIPE_TOKENS.bodySupport}>
                          {item.whyIBuilt}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p
                          className={clsx(
                            UI_RECIPE_TOKENS.monoMuted,
                            "text-[10px] tracking-[0.17em]",
                          )}
                        >
                          LEARNED
                        </p>
                        <p className={UI_RECIPE_TOKENS.bodySupport}>
                          {item.whatLearned}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div
                  className={clsx(
                    "mt-8 flex items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-4 text-[0.72rem] uppercase tracking-[0.18em]",
                    UI_RECIPE_TOKENS.monoMuted,
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.slug)}
                    className="transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)]"
                  >
                    {isExpanded ? "COLLAPSE" : "READ NOTE"}
                  </button>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    className="transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)]"
                      aria-label={`Open ${item.title} link`}
                    >
                      OPEN ↗
                    </a>
                  ) : (
                    <span>COMING SOON</span>
                  )}
                </div>
              </div>
            </RevealPanel>
          );
        })}
        </div>
      ) : (
        <AsciiEmpty />
      )}
    </PageContainer>
  );
}
