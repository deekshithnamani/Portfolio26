import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BeyondWork from "@/pages/BeyondWork";

describe("Beyond work", () => {
  it("keeps honest empty states until real data exists", () => {
    render(<BeyondWork />);
    expect(screen.getByRole("heading", { name: "Photography" })).toBeInTheDocument();
    expect(screen.getByText(/real photographs/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Library" })).toBeInTheDocument();
    expect(screen.getByText(/books and courses/i)).toBeInTheDocument();
  });
});
