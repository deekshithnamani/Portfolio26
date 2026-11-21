import { useEffect, useState } from "react";

type Section = { id: string; title: string };

export function SectionNav({ sections }: { sections: readonly Section[] }) {
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

    const fragmentTarget = targets.find(
      ({ id }) => window.location.hash === `#${id}`,
    );
    fragmentTarget?.scrollIntoView?.();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Case study sections"
      className="fixed top-1/2 hidden -translate-y-1/2 max-h-[calc(100dvh-var(--page-space)-var(--page-space))] w-44 overflow-y-auto p-1 text-small min-[1101px]:block"
      style={{ left: "calc(50% + var(--column-width) / 2 + var(--gutter))" }}
    >
      <ul className="space-y-2">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? "location" : undefined}
              className={`no-underline hover:underline ${activeId === id ? "font-semibold text-text" : "text-text-2"}`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
