import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { POSTS } from "@/data";
import {
  ROUTE_PATHS,
  buildWorkDetailPath,
  buildWritingDetailPath,
} from "@/config/route-paths";
import { setMediaState } from "@/test/matchMedia";
import { SITE_LINKS } from "@/data/site-links";

const BASE_POSTS = structuredClone(POSTS);
const MAKE_PATH = (ROUTE_PATHS as Record<string, string>).make ?? "/make";

beforeAll(() => {
  class IntersectionObserverMock {
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  }

  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: IntersectionObserverMock,
  });
});

afterEach(() => {
  POSTS.splice(0, POSTS.length, ...structuredClone(BASE_POSTS));
  setMediaState({ reduce: false });
  vi.restoreAllMocks();
});

async function renderAt(pathname: string) {
  window.history.pushState({}, "", pathname);
  const view = render(<App />);
  const loading = screen.queryByText("Loading page…");

  if (loading) {
    await waitForElementToBeRemoved(loading);
  }

  return view;
}

function getLinkByHref(href: string) {
  const link = screen
    .getAllByRole("link")
    .find((candidate) => candidate.getAttribute("href") === href);

  if (!link) {
    throw new Error(`Missing link for href: ${href}`);
  }

  return link;
}

describe("app routes", () => {
  it("renders the Home intro links and featured work list", async () => {
    await renderAt(ROUTE_PATHS.home);
    const main = within(screen.getByRole("main"));
    for (const id of [
      "decisionProof",
      "legalProof",
      "photograph",
      "linkedin",
      "github",
      "resume",
    ] as const) {
      const link = SITE_LINKS[id];
      expect(
        main.getByRole("link", { name: link.labels?.home ?? link.label }),
      ).toHaveAttribute("href", link.href);
    }
    expect(
      main.getByRole("link", { name: /Property-document checker/ }),
    ).toHaveAttribute("href", SITE_LINKS.legalProof.href);
    expect(main.getByText("Decision workflow")).toBeInTheDocument();
    expect(
      main.getByRole("link", { name: "more in Practice →" }),
    ).toHaveAttribute("href", "/practice");
    expect(screen.getByRole("main").querySelector("canvas")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(main.queryByRole("link", { name: "Decision workflow" })).toBeNull();
  });

  it("renders the case study and its seven section links", async () => {
    await renderAt(SITE_LINKS.legalProof.href);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", {
        name: "Property-document checker",
        level: 1,
      }),
    ).toBeInTheDocument();
    const titles = [
      "Context",
      "User and problem",
      "Options",
      "What I cut",
      "Tradeoffs",
      "Outcome",
      "What I'd change",
    ];
    expect(
      main
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(titles);
    const nav = within(
      main.getByRole("navigation", { name: "Case study sections" }),
    );
    for (const title of titles) {
      const id =
        nav.getByRole("link", { name: title }).getAttribute("href")?.slice(1) ??
        "";
      expect(document.getElementById(id)).toContainElement(
        main.getByRole("heading", { name: title }),
      );
    }
    expect(main.getAllByRole("link", { name: "← Work" })).toHaveLength(2);
    expect(main.getByRole("link", { name: "LinkedIn ↗" })).toHaveAttribute(
      "href",
      SITE_LINKS.linkedin.href,
    );
  });

  it("filters make items by type", async () => {
    const user = userEvent.setup();

    await renderAt(MAKE_PATH);
    await user.click(screen.getByRole("button", { name: "Experiments" }));

    expect(screen.getByText("Prototype Rhythm Tester")).toBeInTheDocument();
    expect(screen.queryByText("Field Notes Index")).not.toBeInTheDocument();
  });

  it("renders the make index heading and description", async () => {
    await renderAt(MAKE_PATH);

    expect(screen.getByRole("heading", { name: "MAKE" })).toBeInTheDocument();
    expect(
      screen.getByText("Things I build when nobody asked me to."),
    ).toBeInTheDocument();
  });

  it("renders bold text in the writing detail view", async () => {
    await renderAt(buildWritingDetailPath("tbd-note-01"));

    expect(
      screen.getByText("Quiet interaction states", { selector: "strong" }),
    ).toBeInTheDocument();
  });

  it("uses dedicated prose typography for writing detail content", async () => {
    await renderAt(buildWritingDetailPath("tbd-note-01"));

    const article = document.querySelector("article");

    expect(article).toBeTruthy();
    expect(article?.className).toContain("max-w-[66ch]");
    expect(article?.className).toContain("text-base");
  });

  it("renders the anime kaomoji accent in interests", async () => {
    await renderAt(ROUTE_PATHS.interests);

    expect(screen.getByText("( ˘ω˘ )")).toBeInTheDocument();
  });

  it("renders the not-found page for unknown routes", async () => {
    await renderAt("/missing");

    expect(
      screen.getByRole("heading", { name: "That page doesn't exist." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the Work index heading and description", async () => {
    await renderAt(ROUTE_PATHS.work);
    expect(
      screen.getByRole("heading", { name: "Work", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Selected work, with the decisions behind it."),
    ).toBeInTheDocument();
  });

  it("renders the Practice index and opens the Evening skies series", async () => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.practice);
    expect(
      screen.getByRole("heading", { name: "Practice", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Photographs and studies I make to unwind."),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));
    expect(
      main.getAllByRole("link").map(({ textContent }) => textContent),
    ).toEqual([
      "City typefaces",
      "Evening skies",
      "Colors on walks",
      "Live sketches",
    ]);
    const reveal = main.getByRole("button", { name: "Evening skies" });
    expect(reveal).toHaveAttribute("aria-pressed", "false");
    await user.click(reveal);
    expect(reveal).toHaveAttribute("aria-pressed", "true");
    expect(window.location.pathname).toBe("/practice");

    const eveningSkies = main.getByRole("link", { name: "Evening skies" });
    expect(eveningSkies).toHaveAttribute("href", "/practice/evening-skies");
    await user.click(eveningSkies);
    expect(
      await screen.findByRole("heading", { name: "Evening skies" }),
    ).toBeInTheDocument();
    expect(document.title).toBe("Deekshith Namani · Evening skies");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Photographs and studies I make to unwind.",
    );
  });

  it("renders the approved About sections and contact links", async () => {
    await renderAt(ROUTE_PATHS.about);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { name: "About", level: 1 }),
    ).toBeInTheDocument();
    expect(
      main
        .getAllByRole("heading", { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual([
      "Who I am",
      "How I work",
      "What I care about",
      "What I'd cut",
      "Get in touch",
    ]);
    expect(
      main.getByText("Languages: Telugu, Hindi, English"),
    ).toBeInTheDocument();
    for (const [label, href] of [
      ["LinkedIn ↗", SITE_LINKS.linkedin.href],
      ["GitHub ↗", SITE_LINKS.github.href],
      ["Resume (product design) ↗", "/resume.pdf"],
      ["Resume (product management) ↗", "/resume-pm.pdf"],
    ]) {
      const link = main.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(main.queryByText(/TODO|placeholder/i)).toBeNull();
  });

  it("filters writing posts by tag", async () => {
    const user = userEvent.setup();

    await renderAt(ROUTE_PATHS.writing);
    await user.click(screen.getByRole("button", { name: "Process" }));

    expect(screen.getByText("July 2026")).toBeInTheDocument();
    expect(screen.queryByText("August 2026")).not.toBeInTheDocument();
  });

  it("renders the missing detail states for work and writing", async () => {
    const { unmount } = await renderAt(
      buildWorkDetailPath("missing-case-study"),
    );

    expect(
      screen.getByRole("heading", { name: "That page doesn't exist." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(document.title).toBe("Deekshith Namani · Page Not Found");
    unmount();

    await renderAt(buildWritingDetailPath("missing-note"));
    expect(screen.getByText("return to writing")).toBeInTheDocument();
  });

  it("scrolls to the top when navigating between routes", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();

    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      writable: true,
      value: scrollTo,
    });

    await renderAt(ROUTE_PATHS.work);
    await user.click(getLinkByHref(SITE_LINKS.legalProof.href));
    expect(
      await screen.findByRole("heading", { name: "Property-document checker" }),
    ).toBeInTheDocument();

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  it("uses the native cursor across route navigation", async () => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.home);
    expect(screen.queryByTestId("custom-cursor")).not.toBeInTheDocument();
    await user.click(
      within(screen.getByRole("navigation")).getByRole("link", {
        name: "Work",
      }),
    );
    expect(
      await screen.findByRole("heading", { name: "Work" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("custom-cursor")).not.toBeInTheDocument();
  });

  it("links to LinkedIn, GitHub, and Resume from the footer", async () => {
    await renderAt(ROUTE_PATHS.home);
    const footer = within(screen.getByRole("contentinfo"));
    for (const [name, href] of [
      ["LinkedIn ↗", "https://www.linkedin.com/in/deekshithnamani"],
      ["GitHub ↗", SITE_LINKS.github.href],
      ["Resume ↗", "/resume.pdf"],
    ]) {
      expect(footer.getByRole("link", { name })).toHaveAttribute("href", href);
      expect(footer.getByRole("link", { name })).toHaveAttribute(
        "target",
        "_blank",
      );
    }
  });

  it("neutralizes page hover transforms for reduced-motion users", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    setMediaState({ reduce: true });

    const { unmount } = await renderAt(ROUTE_PATHS.home);
    expect(getLinkByHref(buildWorkDetailPath("tbd-case-study-01"))).toHaveClass(
      "motion-reduce:transform-none",
      "motion-reduce:transition-none",
    );
    unmount();

    await renderAt(ROUTE_PATHS.work);
    expect(getLinkByHref(buildWorkDetailPath("tbd-case-study-01"))).toHaveClass(
      "motion-reduce:transform-none",
      "motion-reduce:transition-none",
    );
  });

  it("renders a 16:9 illustration block per section and skips empty captions", async () => {
    await renderAt(SITE_LINKS.legalProof.href);
    const main = screen.getByRole("main");
    const blocks = main.querySelectorAll("figure .aspect-video");
    expect(blocks).toHaveLength(7);
    expect(main.querySelector("figcaption")).toBeNull();
    expect(
      within(main).getByText(
        "Why: a smaller first version was easier to test and easier to trust.",
      ),
    ).toBeInTheDocument();
  });

  it("renders only the approved role, context, and period in the case study", async () => {
    await renderAt(SITE_LINKS.legalProof.href);
    const main = screen.getByRole("main");
    expect(
      Array.from(
        main.querySelectorAll("dl dd"),
        ({ textContent }) => textContent,
      ),
    ).toEqual([
      "Product design",
      "Stealth AI startup, legal-tech",
      "Aug 2023 – Feb 2024",
    ]);
    expect(main).not.toHaveTextContent(/TODO|placeholder/i);
  });
});
