import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { WORK } from "@/data";
import {
  CaseStudyPage,
  ProjectPageTemplate,
  projectToTemplate,
} from "@/components/projects/project-page-template";
import { DAOSOFT_PROJECTS } from "@/data";

describe("project page template", () => {
  it("renders the required decision-story structure without invented content", () => {
    render(
      <MemoryRouter>
        <ProjectPageTemplate project={projectToTemplate(WORK[0])} />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("figure")).toHaveLength(3);
    expect(
      screen.getByRole("heading", { name: "Product decision" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Constraints and tradeoffs" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /read the full case study/i }),
    ).toHaveAttribute("href", "#");
  });
  it("fills the image slot when a section supplies an image and caption", () => {
    render(
      <MemoryRouter>
        <CaseStudyPage
          project={{
            title: "Example project",
            placeholder: true,
            sections: [
              {
                id: "example",
                title: "Example section",
                body: "Example body",
                image: { src: "/example.webp", alt: "An example interface" },
                caption: "Example caption",
                placeholder: true,
              },
            ],
          }}
        />
      </MemoryRouter>,
    );
    const figure = screen.getByRole("figure");
    expect(
      screen.getByRole("img", { name: "An example interface" }),
    ).toHaveAttribute("src", "/example.webp");
    expect(figure.querySelector("figcaption")).toHaveTextContent(
      "Example caption",
    );
  });
  it("defines DAOSoft as a parent with child project pages", () => {
    expect(DAOSOFT_PROJECTS.map(({ slug }) => slug)).toEqual([
      "ai-workflow-planner",
      "platform-design-system",
    ]);
  });
});
