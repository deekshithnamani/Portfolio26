import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { WorkIndex } from "@/pages/Work";

describe("work index", () => {
  it("groups work by experience and links published case studies", () => {
    render(
      <MemoryRouter>
        <WorkIndex />
      </MemoryRouter>,
    );

    const groups = screen.getAllByRole("list");
    expect(
      groups.map((group) => within(group).getAllByRole("listitem").length),
    ).toEqual([3, 2, 2]);
    expect(
      screen.getByRole("link", { name: "Property-document checker →" }),
    ).toHaveAttribute("href", "/work/property-document-checker");
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Decision workflow")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Decision workflow" }),
    ).toHaveAttribute("href", "/work/decision-workflow");
    for (const group of groups) {
      expect(within(group).getAllByRole("link")).toHaveLength(
        within(group).getAllByRole("listitem").length,
      );
    }
    expect(screen.queryByRole("link", { name: /Zomato|NextLeap/ })).toBeNull();
  });
});
