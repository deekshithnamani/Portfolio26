import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { sortProjectsByYear } from "@/data/work-content";
import { WorkIndex } from "@/pages/Work";

describe("work index", () => {
  it("groups Work by company end year, putting ongoing work first", () => {
    render(
      <MemoryRouter>
        <WorkIndex />
      </MemoryRouter>,
    );

    const regions = screen.getAllByRole("region");
    expect(
      regions.map(
        (region) =>
          region.getAttribute("aria-label") ??
          within(region).getByRole("heading").textContent,
      ),
    ).toEqual(["DAOSoft", "Stealth AI startup", "Univ.AI", "Product thinking"]);
    const [daosoft, stealth, univ, product] = regions.map((region) =>
      within(region),
    );
    for (const group of [daosoft, stealth, univ]) {
      expect(group.getAllByRole("listitem")).toHaveLength(1);
      expect(group.getByText("UX/UI Designer")).toBeInTheDocument();
    }
    const thinkingRows = product.getAllByRole("listitem");
    expect(thinkingRows).toHaveLength(2);
    expect(thinkingRows[0].firstElementChild).toHaveTextContent(
      "Zomato eco-features PRD",
    );
    expect(within(thinkingRows[0]).getByText("2025")).toBeInTheDocument();
    expect(
      stealth.getByRole("link", { name: "Property-document checker" }),
    ).toHaveAttribute("href", "/work/property-document-checker");
    expect(
      univ.getByRole("link", { name: "Univ.AI platform" }),
    ).toHaveAttribute("href", "/work/univ-ai-platform");
    expect(univ.getByText("UX/UI Designer").parentElement).toHaveClass(
      "text-small",
      "text-text-2",
    );
    expect(univ.getByText("2022–23")).toBeInTheDocument();
    expect(daosoft.getByText("Decision workflows")).toBeInTheDocument();
    expect(daosoft.queryByRole("link")).toBeNull();
    expect(product.getByText("Zomato eco-features PRD")).toBeInTheDocument();
    expect(product.queryByRole("link", { name: /Zomato/ })).toBeNull();
    expect(
      product.getByRole("link", { name: "NextLeap portfolio ↗" }),
    ).toHaveAttribute("href", "https://nextleap.app/portfolio/n-deekshith");
    expect(
      screen.getByText(
        "NextLeap PM Fellowship, Feb–May 2025. Top ~12% of 200+ fellows, 87%.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Certificate ↗" })).toBeNull();
  });
  it("sorts ongoing, abbreviated ranges and newer years without mutating data", () => {
    const projects = [
      { title: "Undated project" },
      { year: "2025", title: "Fellowship" },
      { year: "2022–2023", title: "Earlier project" },
      { year: "2024–", title: "Ongoing project", status: "soon" },
      { year: "2023–26", title: "Newer project" },
      { year: "2026", title: "Latest start" },
    ];
    expect(sortProjectsByYear(projects).map(({ title }) => title)).toEqual([
      "Ongoing project",
      "Latest start",
      "Newer project",
      "Fellowship",
      "Earlier project",
      "Undated project",
    ]);
    expect(projects[0].title).toBe("Undated project");
  });
});
