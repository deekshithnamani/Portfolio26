import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Link, MemoryRouter, Route, Routes } from "react-router";
import Layout, { isActivePath } from "@/Layout";
import { ROUTE_PATHS, ROUTE_SEGMENTS } from "@/config/route-paths";
import { setMediaState } from "@/test/matchMedia";

function renderLayout(initialEntries: string[] = [ROUTE_PATHS.home]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Link to={ROUTE_PATHS.work} className="focus-ring">
                Go to work
              </Link>
            }
          />
          <Route path={ROUTE_SEGMENTS.work} element={<div>work screen</div>} />
          <Route
            path={ROUTE_SEGMENTS.workDetail}
            element={<div>work detail screen</div>}
          />
          <Route
            path={ROUTE_SEGMENTS.beyondWork}
            element={<div>beyond work screen</div>}
          />
          <Route
            path={ROUTE_SEGMENTS.beyondWorkSeries}
            element={<div>series screen</div>}
          />
          <Route path="workflow" element={<div>workflow screen</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("layout shell", () => {
  afterEach(() => {
    setMediaState({ reduce: false });
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
  });

  it("matches navigation paths at route segment boundaries", () => {
    expect(isActivePath(`${ROUTE_PATHS.work}/featured`, ROUTE_PATHS.work)).toBe(
      true,
    );
    expect(isActivePath("/workflow", ROUTE_PATHS.work)).toBe(false);
  });

  it("loads the single light color scheme from the stylesheet", () => {
    const tokens = readFileSync(resolve("src/tokens.css"), "utf8");
    expect(tokens).toContain("color-scheme: light");
    expect(readFileSync(resolve("index.html"), "utf8")).not.toContain(
      "data-theme",
    );
  });

  it("renders no theme switch even when a dark preference is stored", () => {
    localStorage.setItem("portfolio.theme", "dark");
    renderLayout();
    expect(
      screen.queryByRole("button", { name: /theme/i }),
    ).not.toBeInTheDocument();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("exposes the header links in keyboard order at all widths", async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.tab();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole("link", { name: "Deekshith Namani" }),
    ).toHaveFocus();
    await user.tab();
    expect(
      within(screen.getByRole("navigation")).getByRole("link", {
        name: "Work",
      }),
    ).toHaveFocus();
  });

  it("renders the same navigation links on the desktop and mobile layout", () => {
    renderLayout();
    const header = screen.getByRole("banner");
    expect(header).not.toHaveClass("sticky");
    expect(
      within(header)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(["Deekshith Namani", "Work", "Creative", "About"]);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("marks Creative as current on series pages", () => {
    renderLayout(["/creative/evening-skies"]);
    const activeLink = within(screen.getByRole("navigation")).getByRole(
      "link",
      {
        name: "Creative",
      },
    );
    expect(activeLink).toHaveAttribute("aria-current", "page");
    expect(activeLink).toHaveClass("font-semibold", "text-text");
  });

  it("moves focus to Creative after following its header link", async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole("link", { name: "Creative" }));
    expect(screen.getByRole("main")).toHaveFocus();
    expect(screen.getByText("beyond work screen")).toBeInTheDocument();
  });

  it("moves focus to the main route destination and updates the title", async () => {
    const user = userEvent.setup();
    document.title = "Portfolio26";

    renderLayout();

    expect(document.title).toBe("Deekshith Namani · Product designer");
    await user.click(screen.getByRole("link", { name: /go to work/i }));

    expect(screen.getByRole("main")).toHaveFocus();
    expect(document.title).toBe("Deekshith Namani · Work");
  });

  it("provides a skip link that focuses the main content", async () => {
    const user = userEvent.setup();

    renderLayout();

    const skipLink = screen.getByRole("link", { name: /skip to content/i });
    const main = screen.getByRole("main");

    expect(skipLink).toHaveAttribute("href", "#main-content");
    await user.click(skipLink);
    await waitFor(() => expect(main).toHaveFocus());
  });

  it("lets main content fill the viewport above the in-flow footer", () => {
    renderLayout();
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex-1");
    expect(main.parentElement).toHaveClass("min-h-dvh");
    expect(main.nextElementSibling).toBe(screen.getByRole("contentinfo"));
  });

  it("uses the same 640px column for every page and footer", () => {
    for (const path of ["/", "/work", "/work/featured"]) {
      const { unmount } = renderLayout([path]);
      const column = screen.getByRole("main").parentElement;
      expect(column).toHaveClass("max-w-column", "px-gutter");
      expect(screen.getByRole("banner").parentElement).toBe(column);
      expect(screen.getByRole("contentinfo").parentElement).toBe(column);
      unmount();
    }
  });

  it.each([false, true])(
    "uses the native cursor with reduced motion set to %s",
    (reduce) => {
      setMediaState({ finePointer: true, reduce });
      renderLayout();
      expect(screen.queryByTestId("custom-cursor")).not.toBeInTheDocument();
    },
  );

  it("updates the page description with the title", async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole("link", { name: "Go to work" }));
    expect(document.title).toBe("Deekshith Namani · Work");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Selected work by Deekshith Namani, with the decisions behind it.",
    );
  });
});
