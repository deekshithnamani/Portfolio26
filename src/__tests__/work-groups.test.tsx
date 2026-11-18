import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { WorkIndex } from "@/pages/Work";

describe("work index", () => {
  it("renders the shared work rows and the product thinking links", () => {
    render(
      <MemoryRouter>
        <WorkIndex />
      </MemoryRouter>,
    );

    const [workList, fellowshipList] = screen.getAllByRole("list");
    const [live, soon] = within(workList).getAllByRole("listitem");
    expect(within(live).getByText("2023–24")).toBeInTheDocument();
    expect(
      within(live).getByRole("link", { name: /Property-document checker New/ }),
    ).toHaveAttribute("href", "/work/property-document-checker");
    expect(within(live).getByText("case study")).toBeInTheDocument();
    expect(within(soon).getByText("Decision workflow")).toBeInTheDocument();
    expect(within(soon).getByText("soon")).toBeInTheDocument();
    expect(within(soon).queryByRole("link")).toBeNull();

    expect(
      screen.getByRole("heading", { name: "Product thinking" }),
    ).toBeInTheDocument();
    const links = within(fellowshipList).getAllByRole("link");
    expect(links.map(({ textContent }) => textContent)).toEqual([
      "Zomato eco-features PRD ↗",
      "NextLeap portfolio ↗",
    ]);
    for (const link of links) {
      expect(link).toHaveAttribute(
        "href",
        "https://nextleap.app/portfolio/n-deekshith",
      );
      expect(link).toHaveAttribute("target", "_blank");
    }
  });
});
