import { SITE_LABELS } from "@/data/site-links";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

type Section = { id: string; title: string };

export function SectionNav({ sections }: { sections: readonly Section[] }) {
  const { hash, search } = useLocation();
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const targets = sections.flatMap(({ id }) => {
      const target = document.getElementById(id);
      return target ? [target] : [];
    });

    const update = () => {
      let current = targets[0];

      for (const target of targets) {
        const activationLine =
          parseFloat(getComputedStyle(target).scrollMarginTop) + 1;
        if (target.getBoundingClientRect().top > activationLine) break;
        current = target;
      }

      const scroller = document.scrollingElement;
      if (
        scroller &&
        scroller.scrollTop > 0 &&
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1
      ) {
        current = targets.at(-1) ?? current;
      }
      setActiveId(current?.id);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [hash, sections]);

  return (
    <nav
      aria-label={SITE_LABELS.projectNav}
      className="case-section-nav mt-link text-nav min-[1101px]:mt-0"
    >
      <ul
        role="list"
        className="flex flex-wrap gap-x-link gap-y-row-small min-[1101px]:block min-[1101px]:space-y-2"
      >
        {sections.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={{ search, hash: `#${id}` }}
              aria-current={activeId === id ? "location" : undefined}
              className={`inline-flex items-center min-h-tap min-[1101px]:min-h-0 no-underline hover:underline ${activeId === id ? "font-semibold text-text" : "text-text-2"}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
