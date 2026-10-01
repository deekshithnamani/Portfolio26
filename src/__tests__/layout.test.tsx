import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { useEffect } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Link, MemoryRouter, Route, Routes } from "react-router";
import Layout, { isActivePath, useCursor } from "@/Layout";
import { ROUTE_PATHS, ROUTE_SEGMENTS } from "@/config/route-paths";
import { setMediaState } from "@/test/matchMedia";

function CursorLabelRoute() {
  const { setLabel } = useCursor();

  useEffect(() => {
    setLabel("01");
    return () => setLabel(null);
  }, [setLabel]);

  return <div>cursor screen</div>;
}

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
          <Route path={ROUTE_SEGMENTS.about} element={<div>about screen</div>} />
          <Route path="cursor" element={<CursorLabelRoute />} />
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

  it("boots the document shell in light mode before React mounts", () => {
    const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");

    expect(indexHtml).toContain('<html lang="en" data-theme="light">');
  });

  it("defaults to light theme even when a dark preference is stored", () => {
    setMediaState({ darkTheme: true });
    localStorage.setItem("portfolio.theme", "dark");

    renderLayout();
    const sideRail = screen.getByRole("complementary", {
      name: /primary sidebar/i,
    });

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("portfolio.theme")).toBeNull();
    expect(
      within(sideRail).getByRole("button", { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
  });

  it("manages drawer trigger semantics, focus, and scroll locking", async () => {
    const user = userEvent.setup();

    renderLayout();

    const menuButton = screen.getByRole("button", {
      name: /open navigation/i,
    });

    expect(menuButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);

    const drawer = screen.getByRole("dialog", { name: /site navigation/i });
    const closeButton = screen.getByRole("button", {
      name: /^close navigation$/i,
    });

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(menuButton).toHaveAttribute("aria-controls", drawer.id);
    expect(closeButton).toHaveFocus();
    expect(document.body).toHaveAttribute("data-drawer-open", "true");
    expect(within(drawer).queryByText(/^theme$/i)).not.toBeInTheDocument();
    expect(
      within(drawer).getByRole("button", { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
    expect(
      within(drawer).getByRole("link", { name: /linkedin/i }),
    ).toBeInTheDocument();
    expect(within(drawer).getByText("© 2026")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: /site navigation/i }),
    ).not.toBeInTheDocument();
    expect(menuButton).toHaveFocus();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.body).not.toHaveAttribute("data-drawer-open");
  });

  it("renders a desktop sidebar utility block while keeping the menu trigger mobile-only", () => {
    renderLayout();

    const banner = screen.getByRole("banner");
    const sideRail = screen.getByRole("complementary", {
      name: /primary sidebar/i,
    });
    const nav = within(sideRail).getByRole("navigation", {
      name: /primary navigation/i,
    });
    const menuButton = within(banner).getByRole("button", {
      name: /open navigation/i,
    });
    const homeLink = within(sideRail).getByRole("link", { name: "Home" });
    const workLink = within(sideRail).getByRole("link", { name: "Work" });
    const linkedInLink = within(sideRail).getByRole("link", {
      name: /linkedin/i,
    });

    expect(banner.className).toContain("md:hidden");
    expect(sideRail.className).toContain("hidden");
    expect(sideRail.className).toContain("md:flex");
    expect(sideRail.className).not.toContain("md:fixed");
    expect(sideRail.className).toContain("md:w-[180px]");
    expect(nav.className).toContain("gap-2");
    expect(menuButton.className).not.toContain("md:hidden");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("aria-current", "page");
    expect(homeLink.className).toContain("font-medium");
    expect(homeLink.className).toContain("text-[15px]");
    expect(homeLink).toHaveStyle("color: var(--surface-fg)");
    expect(homeLink.className).toContain("after:w-full");
    expect(homeLink.className).toContain("after:scale-x-100");
    expect(homeLink.className).not.toContain("bg-black/[0.04]");
    expect(homeLink.className).not.toContain("border-");
    expect(homeLink.querySelector("span")).toBeNull();
    expect(workLink.className).toContain("font-normal");
    expect(workLink.className).toContain("text-[15px]");
    expect(workLink.className).toContain("text-[var(--surface-fg-mid)]");
    expect(workLink.className).toContain("hover:text-[var(--surface-accent)]");
    expect(workLink.className).toContain("after:w-full");
    expect(workLink.className).toContain("hover:after:scale-x-100");
    expect(workLink.className).not.toContain("hover:bg-black/[0.03]");
    expect(workLink.className).not.toContain("border-");
    expect(workLink.querySelector("span")).toBeNull();
    expect(within(sideRail).queryByText(/^theme$/i)).not.toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "Work" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "Making" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "About" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "Ideas" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "Practice" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("link", { name: "Curation" }),
    ).toBeInTheDocument();
    expect(
      within(sideRail).getByRole("button", { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink.className).toContain("font-normal");
    expect(linkedInLink.className).toContain("text-[12px]");
    expect(linkedInLink.className).toContain("text-[var(--surface-fg-mid)]");
    expect(within(sideRail).getByText("© 2026")).toBeInTheDocument();
  });

  it("closes the drawer after navigation", async () => {
    const user = userEvent.setup();

    renderLayout();

    await user.click(screen.getByRole("button", { name: /open navigation/i }));
    const drawer = screen.getByRole("dialog", { name: /site navigation/i });
    await user.click(within(drawer).getByRole("link", { name: "Work" }));

    expect(screen.getByText("work screen")).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: /site navigation/i }),
    ).not.toBeInTheDocument();
    expect(document.body).not.toHaveAttribute("data-drawer-open");
  });

  it("does not restore focus to the menu during closed-drawer navigation", async () => {
    const user = userEvent.setup();

    renderLayout();

    const menuButton = screen.getByRole("button", {
      name: /open navigation/i,
    });

    await user.click(screen.getByRole("link", { name: /go to work/i }));

    expect(screen.getByText("work screen")).toBeInTheDocument();
    expect(menuButton).not.toHaveFocus();
  });

  it("moves focus to the main route destination and updates the title", async () => {
    const user = userEvent.setup();
    document.title = "Portfolio26";

    renderLayout();

    expect(document.title).toBe("Home | Dnamani");
    await user.click(screen.getByRole("link", { name: /go to work/i }));

    expect(screen.getByRole("main")).toHaveFocus();
    expect(document.title).toBe("Work | Dnamani");
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

  it("uses a stable viewport shell so the footer stays anchored across routes", () => {
    renderLayout();

    const banner = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const contentSlot = main.firstElementChild as HTMLElement | null;

    expect(banner.className).toContain("md:hidden");
    expect(main.className).toContain("flex");
    expect(main.className).toContain("flex-col");
    expect(main.className).toContain("min-h-[calc(100vh-3rem)]");
    expect(main.className).toContain("md:min-h-screen");
    expect(main.className).toContain("pt-12");
    expect(main.className).toContain("md:pt-0");
    expect(contentSlot?.className).toContain("flex-1");
    expect(main.parentElement?.className).toContain("md:grid");
    expect(main.parentElement?.className).toContain(
      "md:grid-cols-[180px_minmax(0,1fr)]",
    );
  });

  it("matches the footer shell width to the active route shell", () => {
    const homeView = renderLayout();

    let footer = document.querySelector("footer");

    expect(footer?.firstElementChild?.className).toContain("max-w-5xl");
    expect(footer?.textContent?.trim()).toBe("");
    homeView.unmount();

    const aboutView = renderLayout([ROUTE_PATHS.about]);
    footer = document.querySelector("footer");
    expect(footer?.firstElementChild?.className).toContain("max-w-2xl");
    expect(footer?.textContent?.trim()).toBe("");
    aboutView.unmount();

    renderLayout(["/work/tbd-case-study-01"]);
    footer = document.querySelector("footer");
    expect(footer?.firstElementChild?.className).toContain("max-w-2xl");
    expect(footer?.textContent?.trim()).toBe("");
  });

  it("does not render the custom cursor for reduced-motion users", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    setMediaState({ reduce: true });

    renderLayout();

    expect(screen.queryByTestId("custom-cursor")).not.toBeInTheDocument();
  });

  it("uses a larger idle custom cursor dot for fine pointers", () => {
    renderLayout();

    const cursor = screen.getByTestId("custom-cursor");

    expect(cursor.firstElementChild?.className).toContain("h-2.5");
    expect(cursor.firstElementChild?.className).toContain("w-2.5");
  });

  it("renders cursor labels with surface-backed accent styling", () => {
    renderLayout(["/cursor"]);

    const cursor = screen.getByTestId("custom-cursor");
    const label = cursor.firstElementChild as HTMLElement | null;

    expect(cursor.className).not.toContain("mix-blend-difference");
    expect(label?.textContent).toContain("01");
    expect(label?.className).toContain("h-12");
    expect(label?.className).toContain("w-12");
    expect(label?.className).toContain("border-[var(--surface-accent)]");
    expect(label?.className).toContain("text-[var(--surface-accent)]");
    expect(label?.className).toContain("backdrop-blur");
    expect(label?.className).not.toContain("text-white");
  });
});
