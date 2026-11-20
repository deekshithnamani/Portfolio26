import { readFileSync } from "node:fs";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import {
  ROUTE_PATHS,
  buildWorkDetailPath,
  buildBeyondWorkSeriesPath,
} from "@/config/route-paths";
import { setMediaState } from "@/test/matchMedia";
import { SITE_LINKS } from "@/data/site-links";

afterEach(() => {
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
  it("shows selected projects from Product and Work on Home, newest first", async () => {
    await renderAt(ROUTE_PATHS.home);
    const mainElement = screen.getByRole("main");
    const main = within(mainElement);
    expect(
      main.getByText(/I’m Deekshith, a product designer/),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { name: "Selected projects" }),
    ).toBeInTheDocument();
    const projects = main.getAllByRole("link");
    expect(projects.map((link) => link.getAttribute("href"))).toEqual([
      "/product",
      SITE_LINKS.legalProof.href,
    ]);
    expect(projects[0]).toHaveAccessibleName("Zomato eco-features PRD");
    expect(projects[1]).toHaveAccessibleName("Property-document checker");
    expect(mainElement.querySelector("canvas")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
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
      "What I’d change",
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

  it.each([
    ["/make", "/work", "Work"],
    ["/product-thinking", "/product", "Product"],
    ["/writing", "/work", "Work"],
    ["/writing/old-note", "/work", "Work"],
    ["/interests", "/work", "Work"],
    [
      "/work/daosoft-ai-decision-intelligence/ai-workflow-planner",
      "/work",
      "Work",
    ],
    ["/curations/", "/work", "Work"],
    ["/concepts", "/work", "Work"],
    ["/practice", "/beyond-work", "Beyond work"],
    ["/practice/evening-skies", "/beyond-work", "Beyond work"],
    ["/practice/archived/series", "/beyond-work", "Beyond work"],
  ])("redirects legacy URL %s to %s", async (source, destination, heading) => {
    await renderAt(source);
    expect(
      await screen.findByRole("heading", { name: heading, level: 1 }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe(destination);
    expect(screen.getByRole("main")).not.toHaveTextContent(/TODO|placeholder/i);
  });

  it.each([
    ["Product", "/product"],
    ["About", "/about"],
  ])("opens %s from the header", async (label, path) => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.home);
    const link = within(screen.getByRole("navigation")).getByRole("link", {
      name: label,
    });
    await user.click(link);
    expect(
      await screen.findByRole("heading", { level: 1, name: label }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe(path);
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("renders the not-found page for unknown routes", async () => {
    await renderAt("/missing");

    expect(
      screen.getByRole("heading", { name: "That page doesn’t exist." }),
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

  it("renders the Beyond work index and opens the Evening skies series", async () => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.beyondWork);
    expect(
      screen.getByRole("heading", { name: "Beyond work", level: 1 }),
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
    const reveal = main.getByRole("button", {
      name: "Show original image: Evening skies",
    });
    expect(reveal).toHaveAttribute("aria-pressed", "false");
    await user.click(reveal);
    expect(reveal).toHaveAttribute("aria-pressed", "true");
    expect(window.location.pathname).toBe("/beyond-work");

    const eveningSkies = main.getByRole("link", { name: "Evening skies" });
    expect(eveningSkies).toHaveAttribute("href", "/beyond-work/evening-skies");
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

  it("places How I work after the experience groups on Work", async () => {
    await renderAt(ROUTE_PATHS.work);
    const main = within(screen.getByRole("main"));
    expect(
      main
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["Company B", "Company A", "Company C", "How I work"]);
    expect(
      main.getByText(
        /I question long feature lists, because most of them are guesses/,
      ),
    ).toHaveClass("mt-link");
  });

  it.each([
    buildWorkDetailPath("missing-case-study"),
    buildBeyondWorkSeriesPath("missing-series"),
  ])("uses the same empty state for %s", async (path) => {
    await renderAt(path);
    expect(
      screen.getByRole("heading", { name: "That page doesn’t exist." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(document.title).toBe("Deekshith Namani · Page Not Found");
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
        name: "Beyond work",
      }),
    );
    expect(
      await screen.findByRole("heading", { name: "Beyond work" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("custom-cursor")).not.toBeInTheDocument();
  });

  it("shows social links in the footer and omits the résumé link", async () => {
    await renderAt(ROUTE_PATHS.home);
    const footer = within(screen.getByRole("contentinfo"));
    expect(footer.getAllByRole("link")).toHaveLength(3);
    for (const [label, href] of [
      [SITE_LINKS.linkedin.label, SITE_LINKS.linkedin.href],
      [SITE_LINKS.github.label, SITE_LINKS.github.href],
      ["NextLeap ↗", SITE_LINKS.nextLeap.href],
    ]) {
      const link = footer.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveClass("no-underline", "hover:underline");
    }
    expect(footer.getByText("deekshithn007 © 2026")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /resume|résumé/i })).toBeNull();
  });

  it("limits the New mark animation to visitors who allow motion", async () => {
    await renderAt(ROUTE_PATHS.work);
    expect(
      screen.getByRole("main").querySelector(".new-mark-stroke"),
    ).toBeInTheDocument();
    const styles = readFileSync("src/index.css", "utf8");
    expect(styles).toMatch(
      /@media \(prefers-reduced-motion: no-preference\)\s*\{\s*\.new-mark-stroke\s*\{[^}]*animation: draw-new-mark/,
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
