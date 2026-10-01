import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { PLACEHOLDER_IMAGE, POSTS, WORK } from "@/data";
import {
  ROUTE_PATHS,
  buildWorkDetailPath,
  buildWritingDetailPath,
} from "@/config/route-paths";
import { setMediaState } from "@/test/matchMedia";

const BASE_POSTS = structuredClone(POSTS);
const BASE_WORK = structuredClone(WORK);
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
  WORK.splice(0, WORK.length, ...structuredClone(BASE_WORK));
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
  it("renders the home hero without duplicate CTA links", async () => {
    await renderAt(ROUTE_PATHS.home);
    const heroSection = screen
      .getByRole("heading", { name: /i shape products/i })
      .closest("section");

    expect(
      screen.getByRole("heading", { name: /i shape products/i }),
    ).toBeInTheDocument();
    expect(
      within(heroSection as HTMLElement).queryByRole("link", {
        name: /view work/i,
      }),
    ).not.toBeInTheDocument();
    expect(heroSection).toBeTruthy();
    expect(
      within(heroSection as HTMLElement).queryByRole("link", { name: /about/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /latest writing/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the work detail route with a next link", async () => {
    await renderAt(buildWorkDetailPath("tbd-case-study-01"));

    expect(
      screen.getByRole("heading", { name: "Operations Command Center" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^next/i })).toBeInTheDocument();
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

    expect(screen.getByText(/this page wandered off/i)).toBeInTheDocument();
  });

  it("renders the work index heading and description", async () => {
    await renderAt(ROUTE_PATHS.work);

    expect(screen.getByRole("heading", { name: "WORK" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "The problems I got paid to solve, and how I actually solved them — decisions and trade-offs included, not just the finished screens.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the practice and concepts pages with updated descriptions", async () => {
    await renderAt(ROUTE_PATHS.practice);

    expect(screen.getByRole("heading", { name: "PRACTICE" })).toBeInTheDocument();
    expect(
      screen.getByText(/A camera, a sketchbook, a calligraphy pen/i),
    ).toBeInTheDocument();

    await renderAt(ROUTE_PATHS.concepts);

    expect(screen.getByRole("heading", { name: "CONCEPTS" })).toBeInTheDocument();
    expect(
      screen.getByText(/Problems I noticed and couldn't let go of/i),
    ).toBeInTheDocument();
  });

  it("renders the about route with a current-focus block and contact CTA", async () => {
    await renderAt(ROUTE_PATHS.about);

    expect(screen.getByRole("heading", { name: "ABOUT" })).toBeInTheDocument();
    expect(screen.getByText("NOW")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      "mailto:hello@example.com",
    );
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

    expect(screen.getByText("return to the index")).toBeInTheDocument();
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
    await user.click(getLinkByHref(buildWorkDetailPath("tbd-case-study-01")));

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  it("clears the custom cursor label after route navigation", async () => {
    const user = userEvent.setup();

    await renderAt(ROUTE_PATHS.work);

    const cursor = await screen.findByTestId("custom-cursor");
    const firstCaseStudy = getLinkByHref(
      buildWorkDetailPath("tbd-case-study-01"),
    );

    await user.hover(firstCaseStudy);
    expect(within(cursor).getByText("01")).toBeInTheDocument();

    await user.click(firstCaseStudy);
    expect(within(cursor).queryByText("01")).not.toBeInTheDocument();
  });

  it("keeps the footer shell empty for future content", async () => {
    await renderAt(ROUTE_PATHS.home);

    const footer = document.querySelector("footer");

    expect(footer?.firstElementChild?.className).toContain("h-11");
    expect(footer?.textContent?.trim()).toBe("");
    expect(footer?.querySelector("a")).toBeNull();
    expect(screen.getAllByRole("link", { name: /linkedin/i }).length).toBe(1);
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

  it("renders image, video, and embedded media blocks in work detail", async () => {
    WORK[0].body = [
      { type: "image", src: PLACEHOLDER_IMAGE, caption: "Still frame" },
      { type: "video", src: "https://example.com/tbd.mp4", caption: "Clip" },
      {
        type: "video",
        src: "https://www.youtube.com/shorts/abc123?feature=share",
        caption: "Embed",
      },
    ];

    await renderAt(buildWorkDetailPath("tbd-case-study-01"));

    expect(
      screen.getByRole("img", { name: "Still frame" }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('video[src="https://example.com/tbd.mp4"]'),
    ).toBeTruthy();
    expect(screen.getByTitle("Embed")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/abc123",
    );
  });

  it("renders company and duration metadata on work index and detail pages", async () => {
    const { unmount } = await renderAt(ROUTE_PATHS.work);

    expect(screen.getByText("AURORA OPS / 8 WEEKS")).toBeInTheDocument();
    unmount();

    await renderAt(buildWorkDetailPath("tbd-case-study-01"));

    expect(
      screen.getByText("AURORA OPS / Product Systems / 2026"),
    ).toBeInTheDocument();
    expect(screen.getByText("8 WEEKS")).toBeInTheDocument();
  });
});
