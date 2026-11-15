import clsx from "clsx";
import { Link } from "react-router";
import { useCursor } from "@/Layout";
import { AsciiEmpty, PageContainer, RevealPanel } from "@/components/ui";
import { ROUTE_PATHS, buildWorkDetailPath } from "@/config/route-paths";
import { WORK } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import heroLogo from "@/assets/logored.png";

function PreviewRow({
  rowIndex,
  indexLabel,
  href,
  title,
  subtitle,
}: {
  rowIndex: number;
  indexLabel: string;
  href: string;
  title: string;
  subtitle: string;
}) {
  const { setLabel } = useCursor();

  return (
    <RevealPanel
      index={rowIndex}
      onMouseEnter={() => setLabel(indexLabel)}
      onMouseLeave={() => setLabel(null)}
    >
      <Link
        to={href}
        className="group flex h-full min-h-[220px] flex-col justify-between border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--surface-accent)] hover:shadow-[0_20px_48px_rgba(52,38,28,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)] md:p-6"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <span
            className={clsx(
              "text-[0.72rem] tracking-[0.2em]",
              UI_RECIPE_TOKENS.monoMuted,
            )}
          >
            {indexLabel}
          </span>
          <span className="h-px w-8 bg-[var(--surface-border-mid)] transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-hover:bg-[var(--surface-accent)]" />
        </div>

        <div className="space-y-5">
          <h3 className="text-[1.45rem] font-normal leading-[1.08] tracking-[-0.035em] text-[var(--surface-fg)] md:text-[1.65rem]">
            {title}
          </h3>
          <p
            className={clsx(
              "line-clamp-3 text-[0.95rem] leading-[1.75]",
              UI_RECIPE_TOKENS.bodySupport,
            )}
          >
            {subtitle}
          </p>
        </div>
      </Link>
    </RevealPanel>
  );
}

const HOME_SECTION_CARDS = [
  {
    label: "Work",
    href: ROUTE_PATHS.work,
    description: "Case studies across product, systems, and shipping.",
  },
  {
    label: "Product thinking",
    href: ROUTE_PATHS.productThinking,
    description: "PRDs, teardowns, and product decisions.",
  },
  {
    label: "About",
    href: ROUTE_PATHS.about,
    description: "How I work and what I value.",
  },
] as const;

export default function Home() {
  const { setLabel } = useCursor();
  const featuredWork = HOME_FEATURED_WORK;

  return (
    <PageContainer variant="wide" className="lg:!max-w-none">
      <div className="home-dither-panel grid gap-6 overflow-hidden border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 md:p-7 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[minmax(300px,40%)_minmax(0,1fr)] lg:gap-8">
        <section className="relative z-10 flex min-h-[420px] overflow-hidden md:min-h-[520px] lg:sticky lg:top-8 lg:min-h-[calc(100vh-10rem)]">
          <img
            src={heroLogo}
            alt=""
            aria-hidden="true"
            className="home-hero-logo pointer-events-none absolute bottom-[-8%] right-[-18%] w-[78%] max-w-[440px] select-none"
          />
          <div className="relative z-10 flex h-full min-h-0 flex-col justify-between">
            <div>
              <p
                className={clsx(
                  "mb-6 text-[0.72rem] uppercase tracking-[0.2em]",
                  UI_RECIPE_TOKENS.monoMuted,
                )}
              >
                Product Designer / Systems Thinker
              </p>

              <h1 className="max-w-[13ch] text-[2.35rem] font-normal leading-[0.98] tracking-[-0.055em] text-[var(--surface-fg)] md:text-[3.05rem] xl:text-[3.45rem]">
                <span className="block">{HOME_CONTENT.heroLines.line1}</span>
                <span className="block text-[var(--surface-accent)]">
                  {HOME_CONTENT.heroLines.accentLine}
                </span>
                <span className="block">{HOME_CONTENT.heroLines.line3}</span>
              </h1>
            </div>

            <div className="mt-10 max-w-[34rem]">
              <p className="text-[0.98rem] leading-[1.72] text-[var(--surface-fg-mid)] md:text-[1.04rem]">
                {HOME_CONTENT.positioningLine}
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 space-y-5">
          <div className="mb-4 flex items-center justify-between md:mb-5">
            <h2 className={UI_RECIPE_TOKENS.metaText}>FEATURED WORK</h2>
            <Link
              to={ROUTE_PATHS.work}
              className={UI_RECIPE_TOKENS.actionLinkMuted}
            >
              ALL →
            </Link>
          </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {HOME_SECTION_CARDS.map((card, index) => (
            <RevealPanel
              key={card.href}
              index={index}
              onMouseEnter={() => setLabel(`0${index + 1}`)}
              onMouseLeave={() => setLabel(null)}
            >
              <Link
                to={card.href}
                onMouseEnter={() => setLabel(`0${index + 1}`)}
                onMouseLeave={() => setLabel(null)}
                onFocus={() => setLabel(`0${index + 1}`)}
                onBlur={() => setLabel(null)}
                className="group flex h-full min-h-[180px] flex-col justify-between border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 transition duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--surface-accent)] hover:shadow-[0_20px_48px_rgba(52,38,28,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--surface-accent)] md:p-6"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span
                    className={clsx(
                      "text-[0.72rem] tracking-[0.2em]",
                      UI_RECIPE_TOKENS.monoMuted,
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span className="h-px w-8 bg-[var(--surface-border-mid)] transition-colors group-hover:bg-[var(--surface-accent)]" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-[1.45rem] font-normal leading-[1.08] tracking-[-0.035em] text-[var(--surface-fg)] md:text-[1.65rem]">
                    {card.label}
                  </h3>
                  <p
                    className={clsx(
                      "text-[0.95rem] leading-[1.75]",
                      UI_RECIPE_TOKENS.bodySupport,
                    )}
                  >
                    {card.description}
                  </p>
                </div>
              </Link>
            </RevealPanel>
          ))}
        </div>

        {featuredWork.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
            {featuredWork.map((item, rowIndex) => (
              <PreviewRow
                key={item.slug}
                rowIndex={rowIndex}
                indexLabel={item.id}
                href={buildWorkDetailPath(item.slug)}
                title={item.title}
                subtitle={item.tldr}
              />
            ))}
          </div>
        ) : (
          <AsciiEmpty />
        )}
        </section>
      </div>
    </PageContainer>
  );
}

const HOME_CONTENT = PORTFOLIO_CONTENT.home;

const HOME_FEATURED_WORK =
  HOME_CONTENT.featuredWorkSlugs
    .map((slug) => WORK.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
