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
import { CURATIONS, type CurationItem } from "@/data";
import { PLACEHOLDER_IMAGE } from "@/data/constants";

const curationTags = [
  "All",
  ...Array.from(new Set(CURATIONS.map((item) => item.tag))),
];

function CurationRowImage({ imageSrc }: { imageSrc?: string }) {
  if (!imageSrc) return null;

  const resolvedImage =
    imageSrc === "TBD" || imageSrc.trim() === ""
      ? PLACEHOLDER_IMAGE
      : imageSrc;

  return (
    <img
      src={resolvedImage}
      alt=""
      className="h-16 w-16 flex-none rounded-[8px] object-cover object-center grayscale-[1] media-grayscale"
    />
  );
}

export default function Curations() {
  const { setLabel } = useCursor();
  const [active, setActive] = useState<(typeof curationTags)[number]>("All");

  const filtered =
    active === "All" ? CURATIONS : CURATIONS.filter((item) => item.tag === active);

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="CURATIONS"
        description="Books I keep rereading, anime that stuck with me longer than it should have, tools and interfaces I admire, people whose thinking rewired mine a little — the stuff I've actually chosen to keep close, not just bookmarked and forgotten."
      />

      <FilterPills tags={curationTags} active={active} onChange={setActive} size="sm" />

      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((item: CurationItem, index) => (
            <RevealPanel
              key={item.id}
              index={index}
              onMouseEnter={() => setLabel(item.id)}
              onMouseLeave={() => setLabel(null)}
            >
              <div
                className={clsx(
                  "flex items-center gap-4 border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 transition-all duration-[150ms] linear motion-reduce:transition-none",
                  "hover:translate-x-1 hover:border-[var(--surface-accent)]",
                )}
              >
                <CurationRowImage imageSrc={item.img} />
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="text-[0.72rem] tracking-[0.16em] text-[var(--surface-fg-mid)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="text-[1.1rem] font-light leading-[1.15] tracking-[-0.02em] text-[var(--surface-fg)]">
                    {item.title}
                  </h2>
                  <p className="max-w-[74ch] text-[0.92rem] leading-[1.7] text-[var(--surface-fg-mid)]">
                    {item.note}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-[4px] border border-[var(--surface-border-mid)] px-2 py-0.5 text-[10px] font-mono tracking-[0.13em] uppercase text-[var(--surface-fg-mid)]">
                      {item.tag}
                    </span>
                    {item.link ? (
                      item.link !== "TBD" ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-[var(--surface-fg-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-[var(--surface-accent)]"
                        >
                          ↗
                        </a>
                      ) : null
                    ) : null}
                  </div>
                </div>
              </div>
            </RevealPanel>
          ))}
        </div>
      ) : (
        <AsciiEmpty />
      )}
    </PageContainer>
  );
}
