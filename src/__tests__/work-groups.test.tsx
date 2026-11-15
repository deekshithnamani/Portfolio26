import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { WorkIndex } from "@/pages/Work";
import { CursorCtx } from "@/components/layout/layout-context";

describe("company-grouped work index", () => {
  it("renders companies in reverse chronology with differentiated cards", () => {
    class IntersectionObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    render(<CursorCtx.Provider value={{ label: null, setLabel: () => undefined }}><MemoryRouter><WorkIndex /></MemoryRouter></CursorCtx.Provider>);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map(({ textContent }) => textContent)).toEqual(["DAOSoft.AI", "Stealth AI Startup", "Univ.AI"]);
    expect(screen.getByTestId("company-daosoft")).toHaveAttribute("data-size", "large");
    expect(screen.getByTestId("company-stealth-ai")).toHaveAttribute("data-size", "medium");
    expect(screen.getByTestId("company-univ-ai")).toHaveAttribute("data-size", "compact");
  });
});
