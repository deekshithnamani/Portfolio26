import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import {
  ROUTE_PATHS,
  buildWorkDetailPath,
  buildBeyondWorkSeriesPath,
} from "@/config/route-paths";
import { setMediaState } from "@/test/matchMedia";
import { SITE_LINKS } from "@/data/site-links";

beforeEach(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  setMediaState({ reduce: false });
  vi.restoreAllMocks();
});

async function renderAt(pathname: string) {
  window.history.pushState({}, "", pathname);
  return render(<App />);
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
    const rows = main.getAllByRole("listitem");
    expect(within(rows[0]).getByText("Product")).toBeInTheDocument();
    expect(within(rows[1]).getByText("Work")).toBeInTheDocument();
    for (const row of rows) expect(row).not.toHaveTextContent(/20\d{2}/);
    const projects = main.getAllByRole("link");
    expect(projects.map((link) => link.getAttribute("href"))).toEqual([
      "/product",
      SITE_LINKS.legalProof.href,
    ]);
    expect(projects[0]).toHaveAccessibleName("Zomato eco-features PRD");
    expect(projects[1]).toHaveAccessibleName("Property-document checker");
    expect(mainElement.querySelector(".home-dither")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it.each([
    ["Property-document checker", "/work/property-document-checker"],
    ["Zomato eco-features PRD", "/product"],
  ])(
    "returns to Home after opening %s from the selection",
    async (title, destination) => {
      const user = userEvent.setup();
      await renderAt(ROUTE_PATHS.home);
      await user.click(
        within(screen.getByRole("main")).getByRole("link", { name: title }),
      );
      expect(window.location.pathname).toBe(destination);
      const [back] = within(screen.getByRole("main")).getAllByRole("link", {
        name: "Back to Home",
      });
      expect(back).toHaveAttribute("href", "/");
      await user.click(back);
      expect(
        screen.getByRole("heading", { name: "Selected projects", level: 1 }),
      ).toBeInTheDocument();
      expect(screen.getByRole("main")).toHaveFocus();
    },
  );

  it("renders the case study and its seven section links", async () => {
    await renderAt(SITE_LINKS.legalProof.href);
    const main = within(screen.getByRole("main"));
    expect(main.queryByText(/^Case study$/i)).toBeNull();
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
    const backLinks = main.getAllByRole("link", { name: "Back to Work" });
    expect(backLinks).toHaveLength(2);
    expect(backLinks[0].querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
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
    ["/beyond-work", "/creative", "Creative"],
    ["/beyond-work/evening-skies", "/creative/evening-skies", "Evening skies"],
    ["/practice", "/creative", "Creative"],
    ["/practice/evening-skies", "/creative", "Creative"],
    ["/practice/archived/series", "/creative", "Creative"],
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

  it("reads About as a story with a separate approach section", async () => {
    await renderAt(ROUTE_PATHS.about);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByText(/trained as a chemical engineer/),
    ).toBeInTheDocument();
    expect(
      main.getByText(/I speak Telugu, Hindi and English/),
    ).toBeInTheDocument();
    expect(
      main
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["How I work"]);
    expect(main.queryByRole("link", { name: /linkedin|github/i })).toBeNull();
  });

  it("renders the not-found page for unknown routes", async () => {
    await renderAt("/missing");

    expect(
      screen.getByRole("heading", { name: "That page doesn’t exist." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
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

  it("renders the Creative index and opens the Evening skies series", async () => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.beyondWork);
    expect(
      screen.getByRole("heading", { name: "Creative", level: 1 }),
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
    expect(window.location.pathname).toBe("/creative");

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");
    const eveningSkies = main.getByRole("link", { name: "Evening skies" });
    expect(eveningSkies).toHaveAttribute("href", "/creative/evening-skies");
    await user.click(eveningSkies);
    expect(
      await screen.findByRole("heading", { name: "Evening skies" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBe(header);
    expect(screen.getByRole("contentinfo")).toBe(footer);
    expect(screen.getByRole("main")).toHaveFocus();
    const back = within(screen.getByRole("main")).getByRole("link", {
      name: "Back to Creative",
    });
    expect(back).toHaveAttribute("href", "/creative");
    expect(document.title).toBe("Deekshith Namani · Evening skies");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Photographs and studies I make to unwind.",
    );
    await user.click(back);
    expect(
      await screen.findByRole("heading", { name: "Creative", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBe(header);
    expect(screen.getByRole("contentinfo")).toBe(footer);
    expect(
      within(screen.getByRole("main")).getByRole("link", {
        name: "Evening skies",
      }),
    ).toHaveFocus();
  });

  it("opens an unpublished project from Work and returns to the project index", async () => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.work);
    const main = within(screen.getByRole("main"));
    expect(main.queryByRole("heading", { name: "How I work" })).toBeNull();
    await user.click(main.getByRole("link", { name: "Decision workflow" }));
    expect(
      await screen.findByRole("heading", {
        name: "Decision workflow",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Case study not yet published."),
    ).toBeInTheDocument();
    expect(document.title).toBe("Deekshith Namani · Decision workflow");
    await user.click(screen.getByRole("link", { name: "Back to Work" }));
    expect(
      await screen.findByRole("heading", { name: "Work", level: 1 }),
    ).toBeInTheDocument();
  });

  it.each([
    buildWorkDetailPath("missing-case-study"),
    buildBeyondWorkSeriesPath("missing-series"),
  ])("uses the same empty state for %s", async (path) => {
    await renderAt(path);
    expect(
      screen.getByRole("heading", { name: "That page doesn’t exist." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(document.title).toBe("Deekshith Namani · Page Not Found");
  });

  it("scrolls to the top when navigating between routes", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.mocked(window.scrollTo);

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
        name: "Creative",
      }),
    );
    expect(
      await screen.findByRole("heading", { name: "Creative" }),
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
