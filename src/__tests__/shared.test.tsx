import { useState, type ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import Layout from "@/Layout";
import {
  AsciiEmpty,
  FilterPills,
  MetaPill,
  SectionHeader,
} from "@/components/ui";

function renderInsideLayout(node: ReactNode) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<>{node}</>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

type FilterTag = "All" | "Projects" | "Experiments";

function FilterPillsHarness({
  onChange,
  size,
}: {
  onChange: (value: FilterTag) => void;
  size?: "sm" | "md";
}) {
  const [active, setActive] = useState<FilterTag>("All");

  return (
    <FilterPills
      tags={["All", "Projects", "Experiments"]}
      active={active}
      size={size}
      onChange={(value) => {
        onChange(value);
        setActive(value);
      }}
    />
  );
}

describe("shared page primitives", () => {
  it("renders a section header", () => {
    renderInsideLayout(
      <SectionHeader
        title="WORK"
        description="The problems I got paid to solve, and how I actually solved them — decisions and trade-offs included, not just the finished screens."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Work" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The problems I got paid to solve, and how I actually solved them — decisions and trade-offs included, not just the finished screens.",
      ),
    ).toBeInTheDocument();
  });

  it("presses the selected filter and notifies its parent", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderInsideLayout(<FilterPillsHarness onChange={onChange} />);

    const projects = screen.getByRole("button", { name: "Projects" });

    expect(projects).toHaveAttribute("aria-pressed", "false");

    await user.click(projects);

    expect(onChange).toHaveBeenCalledWith("Projects");
    expect(projects).toHaveAttribute("aria-pressed", "true");
  });

  it("uses the compact shared control sizing when requested", () => {
    renderInsideLayout(
      <FilterPillsHarness onChange={() => undefined} size="sm" />,
    );

    const all = screen.getByRole("button", { name: "All" });

    expect(all.className).toContain("text-[12px]");
    expect(all.className).toContain("leading-none");
    expect(all.className).toContain("min-h-7");
    expect(all.className).toContain("px-2");
    expect(all.className).toContain("md:min-h-8");
  });

  it("defaults meta pills to the medium shared control size", () => {
    renderInsideLayout(<MetaPill>Notes</MetaPill>);

    const pill = screen.getByText("Notes");

    expect(pill.className).toContain("text-[12px]");
    expect(pill.className).toContain("px-3");
  });

  it("renders the ASCII empty state", () => {
    renderInsideLayout(<AsciiEmpty />);

    expect(
      screen.getByRole("heading", { name: /nothing here yet/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/check back soon/i)).toBeInTheDocument();
  });
});
