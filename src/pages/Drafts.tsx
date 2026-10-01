import clsx from "clsx";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useCursor } from "@/Layout";
import {
  AsciiEmpty,
  FilterPills,
  PageContainer,
  RevealPanel,
  SectionHeader,
} from "@/components/ui";
import { DRAFTS, type DraftItem } from "@/data";

const draftDomains = [
  "All",
  ...Array.from(
    new Set(
      DRAFTS.flatMap((item) => (item.domain ? [item.domain] : [])),
    ),
  ),
];

export default function Drafts() {
  const reducedMotion = useReducedMotion();
  const { setLabel } = useCursor();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [active, setActive] = useState<(typeof draftDomains)[number]>("All");

  const filtered =
    active === "All"
      ? DRAFTS
      : DRAFTS.filter((item) => item.domain === active);

  const toggleExpanded = (slug: string) => {
    setExpandedSlug((value) => (value === slug ? null : slug));
  };

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="BACKLOG"
        description="Problems I noticed and couldn't let go of, questions I kept asking longer than made sense, half-built product and business ideas that grew out of them — some will go nowhere, some might become real work someday."
      />

      {draftDomains.length > 1 ? (
        <FilterPills
          tags={draftDomains}
          active={active}
          onChange={setActive}
          size="sm"
        />
      ) : null}

      {filtered.length > 0 ? (
        <div className="space-y-4 md:grid md:grid-cols-2 md:space-y-0 md:gap-4 lg:gap-5">
          {filtered.map((item: DraftItem, index) => {
            const isExpanded = expandedSlug === item.id;
            const expandedId = `draft-note-${item.id}`;

            return (
              <RevealPanel
                key={item.id}
                index={index}
                onMouseEnter={() => setLabel(item.id)}
                onMouseLeave={() => setLabel(null)}
              >
                <article className="flex h-full flex-col border border-[var(--surface-border)] bg-[var(--surface-card)] transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:border-[var(--surface-accent)] hover:shadow-[0_20px_48px_rgba(52,38,28,0.07)]">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={expandedId}
                    className="group flex flex-1 flex-col justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)] md:p-6"
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <span className="text-[0.72rem] tracking-[0.2em] text-[var(--surface-fg-mid)]">
                          {item.id}
                        </span>
                        <span className="h-px w-8 bg-[var(--surface-border-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-hover:bg-[var(--surface-accent)]" />
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-[1.45rem] font-normal leading-[1.08] tracking-[-0.035em] text-[var(--surface-fg)] md:text-[1.65rem]">
                          {item.title}
                        </h2>
                        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
                          {item.hook}
                        </p>
                      </div>
                    </div>
                  </button>

                  <motion.div
                    id={expandedId}
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
                            duration: 0.18,
                            ease: [0.2, 0, 0, 1],
                          }
                    }
                    style={{ display: "grid" }}
                    className={clsx(
                      "border-t border-[var(--surface-border)] overflow-hidden bg-[var(--surface-card)] px-5 md:px-6",
                      isExpanded
                        ? "pt-4 pb-5"
                        : "pointer-events-none border-transparent",
                    )}
                  >
                    <p className="text-sm leading-[1.75] text-[var(--surface-fg-mid)]">
                      {item.note}
                    </p>
                  </motion.div>

                  <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(item.id)}
                      className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--surface-fg-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none hover:text-[var(--surface-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)]"
                    >
                      {isExpanded ? "COLLAPSE" : "READ NOTE"}
                    </button>
                  </div>
                </article>
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
