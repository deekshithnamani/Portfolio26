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
  it("opens the next project from the end of a case study", async () => {
    const user = userEvent.setup();
    await renderAt(SITE_LINKS.legalProof.href);
    const navigation = screen.getByRole("navigation", {
      name: "Project navigation",
    });
    const next = within(navigation).getByRole("link");
    const href = next.getAttribute("href");
    expect(href).not.toBe(SITE_LINKS.legalProof.href);
    await user.click(next);
    expect(window.location.pathname).toBe(href);
  });
  it("changes the background when returning Home from another page", async () => {
    const user = userEvent.setup();
    const { container } = await renderAt("/");
    const first = container
      .querySelector(".home-dither")
      ?.getAttribute("data-effect");
    await user.click(
      within(screen.getByRole("banner")).getByRole("link", { name: "Work" }),
    );
    expect(container.querySelector(".home-dither")).toBeNull();
    await user.click(screen.getByRole("link", { name: "Deekshith Namani" }));
    expect(container.querySelector(".home-dither")).not.toHaveAttribute(
      "data-effect",
      first,
    );
  });
  it("shows only featured Work rows on Home, newest first", async () => {
    await renderAt(ROUTE_PATHS.home);
    const mainElement = screen.getByRole("main");
    const main = within(mainElement);
    expect(
      main.getByText(/I started as a chemical engineer/),
    ).toBeInTheDocument();
    expect(main.getByRole("link", { name: "photograph" })).toHaveAttribute(
      "href",
      "/creative",
    );
    expect(
      main.getByText(/see some of those photographs in Creative/),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { name: "Selected work" }),
    ).toBeInTheDocument();
    const selected = within(
      main.getByRole("region", { name: "Selected work" }),
    );
    expect(selected.queryByRole("region")).toBeNull();
    const rows = selected.getAllByRole("listitem");
    expect(rows.map((row) => row.firstElementChild?.textContent)).toEqual([
      "Decision workflows",
      "Property-document checker",
    ]);
    expect(within(rows[0]).getByText("Product design")).toBeInTheDocument();
    expect(within(rows[1]).getByText("Case study")).toBeInTheDocument();
    expect(
      within(rows[1]).getByRole("link", { name: "Property-document checker" }),
    ).toHaveAttribute("href", SITE_LINKS.legalProof.href);
    expect(within(rows[0]).getByRole("link")).toHaveAttribute(
      "href",
      "/work/decision-workflow",
    );
    expect(mainElement.querySelector(".home-dither")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("returns to Work after opening the property checker from Home", async () => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.home);
    await user.click(getLinkByHref(SITE_LINKS.legalProof.href));
    expect(window.location.pathname).toBe(SITE_LINKS.legalProof.href);
    await user.click(
      within(screen.getByRole("main")).getByRole("link", {
        name: "Back to Work",
      }),
    );
    expect(window.location.pathname).toBe("/work");
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it.each(["/product", "/product-thinking", "/work#product-thinking"])(
    "focuses the Product thinking section from %s",
    async (source) => {
      await renderAt(source);
      const section = screen.getByRole("region", { name: "Product thinking" });
      expect(window.location.pathname + window.location.hash).toBe(
        "/work#product-thinking",
      );
      expect(section).toHaveFocus();
    },
  );

  it("focuses a section from an encoded fragment", async () => {
    await renderAt(SITE_LINKS.legalProof.href + "#%6Fptions");
    expect(screen.getByRole("region", { name: "Options" })).toHaveFocus();
  });

  it("focuses the section when its current anchor is activated again", async () => {
    const user = userEvent.setup();
    await renderAt(SITE_LINKS.legalProof.href + "#options");
    const nav = within(
      screen.getByRole("navigation", { name: "Case study sections" }),
    );
    const link = nav.getByRole("link", { name: "Options" });
    link.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("region", { name: "Options" })).toHaveFocus();
  });

  it("handles a malformed fragment without interrupting navigation", async () => {
    await renderAt(SITE_LINKS.legalProof.href + "#%ZZ");
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it.each([
    [
      "/Work/",
      "Work",
      "Selected work by Deekshith Namani, with the decisions behind it.",
    ],
    [
      "/WORK/PROPERTY-DOCUMENT-CHECKER",
      "Property-document checker",
      "A case study on a tool that surfaces issues in land documents.",
    ],
    [
      "/Creative/EVENING-SKIES",
      "Evening skies",
      "A daily photograph of the evening sky.",
    ],
  ])(
    "keeps the page and metadata aligned at %s",
    async (path, heading, description) => {
      await renderAt(path);
      expect(
        screen.getByRole("heading", { level: 1, name: heading }),
      ).toBeInTheDocument();
      expect(document.title).toBe(`Deekshith Namani · ${heading}`);
      expect(
        document.querySelector('meta[name="description"]'),
      ).toHaveAttribute("content", description);
    },
  );

  it("renders the case study and the five populated section links", async () => {
    await renderAt(SITE_LINKS.legalProof.href);
    const main = within(screen.getByRole("main"));
    expect(main.queryByText(/^Case study$/i)).toBeNull();
    expect(
      main.getByRole("heading", {
        name: "Property-document checker",
        level: 1,
      }),
    ).toBeInTheDocument();
    const titles = ["Context", "Problem", "Options", "What I cut", "Outcome"];
    expect(
      main
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(titles);
    const nav = within(
      main.getByRole("navigation", { name: "Case study sections" }),
    );
    for (const title of titles) {
      const link = nav.getByRole("link", { name: title }) as HTMLAnchorElement;
      const id = link.hash.slice(1);
      expect(document.getElementById(id)).toContainElement(
        main.getByRole("heading", { name: title }),
      );
    }
    const backLinks = main.getAllByRole("link", { name: "Back to Work" });
    expect(backLinks).toHaveLength(1);
    const heading = main.getByRole("heading", { level: 1 });
    expect(backLinks[0].closest("header")).toContainElement(heading);
    expect(
      backLinks[0].compareDocumentPosition(heading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(backLinks[0].querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(main.queryByRole("link", { name: "LinkedIn ↗" })).toBeNull();
  });

  it("moves keyboard focus to the case study section and preserves the query", async () => {
    const user = userEvent.setup();
    await renderAt(SITE_LINKS.legalProof.href + "?view=case");
    const main = within(screen.getByRole("main"));
    const nav = within(
      main.getByRole("navigation", { name: "Case study sections" }),
    );
    nav.getByRole("link", { name: "Options" }).focus();
    await user.keyboard("{Enter}");
    expect(window.location.hash).toBe("#options");
    expect(window.location.search).toBe("?view=case");
    expect(main.getByRole("region", { name: "Options" })).toHaveFocus();
  });

  it.each([
    ["/make", "/work", "Work"],
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
    ["Work", "/work"],
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
    expect(main.getByText(/studied chemical engineering/)).toBeInTheDocument();
    expect(
      main.getByText(/I speak Telugu, Hindi and English/),
    ).toBeInTheDocument();
    expect(
      main
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["How I work", "What I’m looking for", "Outside work"]);
    expect(main.getByRole("link", { name: "LinkedIn ↗" })).toHaveAttribute(
      "href",
      SITE_LINKS.linkedin.href,
    );
    expect(main.getByRole("link", { name: "Creative" })).toHaveAttribute(
      "href",
      "/creative",
    );
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
      "A daily photograph of the evening sky.",
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

  it("opens the Univ.AI project note and returns to the Work index", async () => {
    const user = userEvent.setup();
    await renderAt(ROUTE_PATHS.work);
    const main = within(screen.getByRole("main"));
    expect(main.queryByRole("heading", { name: "How I work" })).toBeNull();
    await user.click(main.getByRole("link", { name: "Univ.AI platform" }));
    expect(
      main.getByRole("heading", { name: "Univ.AI platform", level: 1 }),
    ).toBeInTheDocument();
    expect(
      main
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["Background", "My part", "Outcome"]);
    expect(
      main.queryByRole("navigation", { name: "Case study sections" }),
    ).toBeNull();
    expect(main.getAllByRole("figure")).toHaveLength(3);
    expect(
      main.getByText("Product design · Univ.AI · Oct 2022 – Apr 2023"),
    ).toBeInTheDocument();
    expect(document.title).toBe("Deekshith Namani · Univ.AI platform");
    await user.click(main.getByRole("link", { name: "Back to Work" }));
    expect(
      main.getByRole("heading", { name: "Work", level: 1 }),
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
    expect(document.title).toBe("Deekshith Namani · Not found");
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
    expect(footer.getAllByRole("link")).toHaveLength(2);
    for (const [label, href] of [
      [SITE_LINKS.linkedin.label, SITE_LINKS.linkedin.href],
      [SITE_LINKS.github.label, SITE_LINKS.github.href],
    ]) {
      const link = footer.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveClass("no-underline", "hover:underline");
    }
    expect(footer.getByText("© 2026")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /resume|résumé/i })).toBeNull();
  });

  it("shows project types without status tags in Work rows", async () => {
    await renderAt(ROUTE_PATHS.work);
    const main = within(screen.getByRole("main"));
    expect(main.queryByText(/^(new|soon)$/i)).toBeNull();
    expect(main.getByText("Case study")).toBeInTheDocument();
  });

  it("restores image slots for populated sections and omits empty sections and captions", async () => {
    await renderAt(SITE_LINKS.legalProof.href);
    const main = screen.getByRole("main");
    expect(within(main).queryByText("Tradeoffs")).toBeNull();
    expect(within(main).queryByText("In hindsight")).toBeNull();
    expect(
      within(main).getAllByRole("button", { name: /^Expand media: / }),
    ).toHaveLength(5);
    expect(main.querySelector("figcaption")).toBeNull();
  });

  it("renders the project metadata as one line", async () => {
    await renderAt(SITE_LINKS.legalProof.href);
    const main = screen.getByRole("main");
    expect(
      within(main).getByText(
        "Product design · Stealth AI startup, legal-tech · Aug 2023 – Feb 2024",
      ),
    ).toHaveClass("text-small");
    expect(main).not.toHaveTextContent(/TODO|placeholder/i);
  });
});
