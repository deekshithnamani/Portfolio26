import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { CaseStudyPage } from "@/components/projects/project-page-template";
import type { ProjectContent } from "@/data/work-content";
import { ProjectMedia } from "@/components/projects/project-media";

function renderMedia(section: Partial<ProjectContent["sections"][number]>) {
  return render(
    <MemoryRouter>
      <CaseStudyPage
        project={{
          title: "Project",
          placeholder: false,
          sections: [
            {
              id: "example",
              title: "Example",
              body: "Body",
              placeholder: false,
              ...section,
            },
          ],
        }}
      />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    },
  });
});

describe("project media", () => {
  it("browses an uncropped photo gallery with buttons and arrow keys", async () => {
    const user = userEvent.setup();
    const gallery = [
      { src: "/one.webp", alt: "First photo", caption: "First caption" },
      { src: "/two.webp", alt: "Second photo", caption: "Second caption" },
    ];
    render(
      <ProjectMedia
        image={gallery[1]}
        gallery={gallery}
        galleryIndex={1}
        naturalAspect
      />,
    );
    const trigger = screen.getByRole("button", {
      name: "Expand media: Second photo",
    });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Photography viewer" });
    expect(within(dialog).getByRole("img")).toHaveAttribute("src", "/two.webp");
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByRole("img")).toHaveAttribute("src", "/one.webp");
    expect(within(dialog).getByText("First caption")).toBeInTheDocument();
    await user.click(within(dialog).getByRole("button", { name: /Previous/ }));
    expect(within(dialog).getByRole("img")).toHaveAttribute("src", "/two.webp");
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(within(dialog).getByRole("img")).toHaveAttribute("src", "/one.webp");
    await user.click(
      within(dialog).getByRole("button", { name: "Close media viewer" }),
    );
    expect(trigger).toHaveFocus();
  });
  it("expands a gray placeholder before real media is added", async () => {
    const user = userEvent.setup();
    renderMedia({});
    const trigger = screen.getByRole("button", {
      name: "Expand media: Example",
    });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Example" });
    expect(within(dialog).getByText("Image placeholder")).toBeInTheDocument();
    expect(within(dialog).queryByRole("img")).toBeNull();
    await user.click(
      within(dialog).getByRole("button", { name: "Close media viewer" }),
    );
    expect(trigger).toHaveFocus();
  });
  it("expands an image and restores focus when closed", async () => {
    const user = userEvent.setup();
    renderMedia({
      image: { src: "/screen.webp", alt: "Product screen" },
      caption: "Screen caption",
    });
    const trigger = screen.getByRole("button", {
      name: "Expand media: Product screen",
    });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Product screen" });
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      "/screen.webp",
    );
    expect(within(dialog).getByText("Screen caption")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Close media viewer" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes from Escape and backdrop and restores page scrolling", async () => {
    const user = userEvent.setup();
    document.body.style.overflow = "auto";
    renderMedia({ image: { src: "/animation.gif", alt: "Flow animation" } });
    const trigger = screen.getByRole("button", {
      name: "Expand media: Flow animation",
    });
    await user.click(trigger);
    expect(document.body.style.overflow).toBe("hidden");
    expect(within(screen.getByRole("dialog")).getByRole("img")).toHaveAttribute(
      "src",
      "/animation.gif",
    );
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("auto");
    await user.click(trigger);
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("renders video controls, poster, and captions inline and expanded", async () => {
    const user = userEvent.setup();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    renderMedia({
      video: {
        src: "/demo.mp4",
        alt: "Product demo",
        poster: "/poster.webp",
        tracks: [{ src: "/demo.vtt", srcLang: "en", label: "English" }],
      },
    });
    const inline = screen.getByLabelText("Product demo", { selector: "video" });
    expect(inline).toHaveAttribute("controls");
    expect(inline).toHaveAttribute("poster", "/poster.webp");
    expect(inline).not.toHaveAttribute("autoplay");
    expect(inline.querySelector("track")).toHaveAttribute("src", "/demo.vtt");
    await user.click(
      screen.getByRole("button", { name: "Expand media: Product demo" }),
    );
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(
      within(screen.getByRole("dialog")).getByLabelText("Product demo", {
        selector: "video",
      }),
    ).toHaveAttribute("src", "/demo.mp4");
  });
});
