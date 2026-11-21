import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { WorkIndex } from "@/pages/Work";

describe("work index", () => {
  it("renders three flat Work rows and two Product thinking rows", () => {
    render(
      <MemoryRouter>
        <WorkIndex />
      </MemoryRouter>,
    );

    const [work, product] = screen
      .getAllByRole("list")
      .map((list) => within(list));
    expect(work.getAllByRole("listitem")).toHaveLength(3);
    expect(product.getAllByRole("listitem")).toHaveLength(2);
    expect(
      work.getByRole("link", { name: "Property-document checker" }),
    ).toHaveAttribute("href", "/work/property-document-checker");
    expect(
      work.getByRole("link", { name: "Univ.AI platform" }),
    ).toHaveAttribute("href", "/work/univ-ai-platform");
    expect(work.getByText("New")).toBeInTheDocument();
    expect(work.getByText("Decision workflows")).toBeInTheDocument();
    expect(work.queryByRole("link", { name: "Decision workflows" })).toBeNull();
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
});
