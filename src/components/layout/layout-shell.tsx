import { useLayoutEffect, useRef, type RefObject } from "react";
import { useLocation } from "react-router";
import { resolveDocumentMetadata } from "@/config/navigation";
import { SITE_LABELS } from "@/data/site-links";
import { useCursor } from "./layout-context";

export function RouteEffects({
  mainRef,
}: {
  mainRef: RefObject<HTMLElement | null>;
}) {
  const { pathname, hash, state } = useLocation();
  const returnToId =
    typeof state?.returnToId === "string" ? state.returnToId : undefined;
  const { setLabel } = useCursor();
  const previousLocation = useRef(pathname);

  useLayoutEffect(() => {
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

    if (previousLocation.current !== pathname + hash) {
      const fragment = hash ? document.getElementById(hash.slice(1)) : null;
      if (fragment && mainRef.current?.contains(fragment)) {
        fragment.scrollIntoView?.({ block: "start", behavior: "auto" });
        fragment.focus({ preventScroll: true });
        previousLocation.current = pathname + hash;
        return;
      }
      const target = returnToId ? document.getElementById(returnToId) : null;
      if (
        target instanceof HTMLAnchorElement &&
        mainRef.current?.contains(target)
      ) {
        target.scrollIntoView?.({ block: "center", behavior: "auto" });
        target.focus({ preventScroll: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        mainRef.current?.focus({ preventScroll: true });
      }
      previousLocation.current = pathname + hash;
    }
  }, [hash, mainRef, pathname, returnToId, setLabel]);

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
      {SITE_LABELS.skip}
    </a>
  );
}
