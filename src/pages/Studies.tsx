import { useState } from "react";
import { useCursor } from "@/Layout";
import { AsciiEmpty, FilterPills, PageContainer, RevealPanel, SectionHeader } from "@/components/ui";
import { STUDIES, type StudyItem } from "@/data";
import { PLACEHOLDER_IMAGE } from "@/data/constants";

const studyMediums = [
  "All",
  ...Array.from(new Set(STUDIES.map((item) => item.medium))),
];

function resolveStudyImage(src: string) {
  return src === "TBD" || src.trim() === "" ? PLACEHOLDER_IMAGE : src;
}

function StudyImage({ src }: { src: string }) {
  const resolvedSrc = resolveStudyImage(src);

  return (
    <img
      src={resolvedSrc}
      alt=""
      className="h-full w-full object-cover transition-all duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-hover:scale-[0.98] group-hover:brightness-95 group-hover:contrast-110"
    />
  );
}

function StudyCard({ study, index, onHover, onLeave }: {
  study: StudyItem;
  index: number;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <RevealPanel index={index + 1}>
      <article
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="group corner-frame media-grayscale overflow-hidden rounded-[0.75rem] border border-[var(--surface-border)] bg-[var(--surface-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)]"
      >
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">{/* 4:5 fallback */}
            <StudyImage src={study.img} />
          </div>
          <span className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between opacity-0 transition-opacity duration-150 linear group-hover:opacity-100">
            <span className="h-2.5 w-2.5 border-t border-l border-[var(--surface-fg)]" />
            <span className="h-2.5 w-2.5 border-t border-r border-[var(--surface-fg)]" />
          </span>
          <span className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between opacity-0 transition-opacity duration-150 linear group-hover:opacity-100">
            <span className="h-2.5 w-2.5 border-b border-l border-[var(--surface-fg)]" />
            <span className="h-2.5 w-2.5 border-b border-r border-[var(--surface-fg)]" />
          </span>
        </div>

        <div className="space-y-2 border-t border-[var(--surface-border)] p-3 md:p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--surface-fg-mid)]">
            {study.medium} — {study.year}
          </p>
          <p className="text-[0.98rem] font-light leading-[1.1] tracking-[-0.02em] text-[var(--surface-fg)]">
            {study.title}
          </p>
          {study.note ? (
            <p className="text-sm leading-[1.75] text-[var(--surface-fg-mid)]">
              {study.note}
            </p>
          ) : null}
        </div>
      </article>
    </RevealPanel>
  );
}

export default function Studies() {
  const [active, setActive] = useState<(typeof studyMediums)[number]>("All");
  const { setLabel } = useCursor();
  const featuredStudy = STUDIES[0];
  const heroImage = featuredStudy ? resolveStudyImage(featuredStudy.img) : PLACEHOLDER_IMAGE;
  const heroTitle = featuredStudy?.title ?? "A study field for visual experiments";
  const heroMeta = featuredStudy
    ? `${featuredStudy.medium} • ${featuredStudy.year}`
    : "Practice · exploration · visual language";
  const heroCopy = featuredStudy?.note ??
    "I keep this section as a compact sketchbook for ideas in motion, composition studies, and rendering tests before they grow into full case studies.";

  const filtered =
    active === "All" ? STUDIES : STUDIES.filter((item) => item.medium === active);

  return (
    <PageContainer variant="wide">
      <SectionHeader
        title="PRACTICE"
        description="A camera, a sketchbook, a calligraphy pen — whatever I'm practicing with lately. Photography, sketches, lettering, visual experiments that aren't trying to be finished, just kept up."
      />

      <RevealPanel index={0}>
        <section className="mb-6 grid gap-4 overflow-hidden rounded-[1rem] border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 sm:p-5 md:grid md:grid-cols-[1.1fr,0.9fr] md:gap-6 md:p-6">
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--surface-fg-mid)]">
              Featured work in practice
            </p>
            <h2 className="max-w-xl text-[1.4rem] leading-tight font-light tracking-[-0.02em] text-[var(--surface-fg)] md:text-[1.7rem]">
              {heroTitle}
            </h2>
            <p className="text-[0.8rem] leading-[1.65] text-[var(--surface-fg-mid)] md:text-[0.82rem]">
              {heroMeta}
            </p>
            <p className="max-w-xl text-[0.8rem] leading-[1.65] text-[var(--surface-fg-mid)] md:text-[0.82rem]">
              {heroCopy}
            </p>
          </div>
          <div className="overflow-hidden rounded-[0.75rem] border border-[var(--surface-border)] bg-[var(--surface-bg)]">
            <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-[var(--surface-bg)] p-1">
              <img
                src={heroImage}
                alt="Studies featured visual"
                className="max-h-full max-w-full object-contain object-center"
              />
            </div>
          </div>
        </section>
      </RevealPanel>

      <FilterPills tags={studyMediums} active={active} onChange={setActive} size="sm" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
        {filtered.length > 0 ? (
          filtered.map((study, index) => (
            <StudyCard
              key={study.id}
              study={study}
              index={index}
              onHover={() => setLabel(study.id)}
              onLeave={() => setLabel(null)}
            />
          ))
        ) : (
          <div className="col-span-full">
            <AsciiEmpty />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
