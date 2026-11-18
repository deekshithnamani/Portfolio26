import { useEffect, useRef, type RefObject } from "react";
import { useLocation } from "react-router";
import { resolveDocumentMetadata } from "@/config/navigation";
import { useCursor } from "./layout-context";

export function RouteEffects({
  mainRef,
}: {
  mainRef: RefObject<HTMLElement | null>;
}) {
  const pathname = useLocation().pathname;
  const { setLabel } = useCursor();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const { title, description } = resolveDocumentMetadata(pathname);
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.append(meta);
    }
    meta.content = description;
    setLabel(null);

    if (previousPathname.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      mainRef.current?.focus({ preventScroll: true });
      previousPathname.current = pathname;
    }
  }, [mainRef, pathname, setLabel]);

  return null;
}

export function SkipLink({
  mainRef,
}: {
  mainRef: RefObject<HTMLElement | null>;
}) {
  return (
    <a
      href="#main-content"
      className="skip-link focus-ring"
      onClick={(event) => {
        event.preventDefault();
        const focusMain = () => {
          mainRef.current?.focus({ preventScroll: true });
          if (typeof mainRef.current?.scrollIntoView === "function") {
            mainRef.current.scrollIntoView();
          }
        };

        window.setTimeout(focusMain, 0);
      }}
    >
      Skip to content
    </a>
  );
}
