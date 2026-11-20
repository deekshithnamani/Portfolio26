import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import ProductThinking from "@/pages/ProductThinking";

describe("Product", () => {
  it("launches with the Zomato PRD and verified NextLeap link", () => {
    render(
      <MemoryRouter>
        <ProductThinking />
      </MemoryRouter>,
    );
    expect(screen.getByText("NextLeap Fellowship")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /nextleap portfolio/i }),
    ).toHaveAttribute("href", "https://nextleap.app/portfolio/n-deekshith");
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
});
