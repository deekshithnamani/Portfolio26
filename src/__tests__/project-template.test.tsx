import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { WORK } from "@/data";
import { ProjectPageTemplate, projectToTemplate } from "@/components/projects/project-page-template";
import { DAOSOFT_PROJECTS } from "@/data";

describe("project page template", () => {
  it("renders the required decision-story structure without invented content", () => {
    render(<MemoryRouter><ProjectPageTemplate project={projectToTemplate(WORK[0])} /></MemoryRouter>);
    expect(screen.getAllByRole("figure")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Product decision" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Constraints and tradeoffs" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /read the full case study/i })).toHaveAttribute("href", "#");
  });
  it("defines DAOSoft as a parent with child project pages", () => {
    expect(DAOSOFT_PROJECTS.map(({ slug }) => slug)).toEqual(["ai-workflow-planner", "platform-design-system"]);
  });
});
