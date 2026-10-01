import { PLACEHOLDER_IMAGE } from "./constants";
import type { InterestItem } from "./types";

export const INTERESTS: InterestItem[] = [
  {
    id: "01",
    tag: "Anime",
    title: "Slice-of-life pacing",
    sub: "Quiet scenes, strong routines, and the kind of pacing that makes small decisions feel human.",
    year: "2026",
    link: "#",
    img: PLACEHOLDER_IMAGE,
  },
  {
    id: "02",
    tag: "Books",
    title: "Designing for attention",
    sub: "Notes from books about systems, perception, habits, and why people return to certain tools.",
    year: "2026",
    link: "#",
  },
  {
    id: "03",
    tag: "Creative coding",
    title: "Interface sketches",
    sub: "Small studies in layout, cursor behavior, timing, and visual feedback.",
    year: "2026",
    link: "#",
  },
  {
    id: "04",
    tag: "Photographs",
    title: "Everyday surfaces",
    sub: "Reference photos for texture, spacing, signage, and the accidental composition of daily life.",
    year: "2026",
    link: "#",
    img: PLACEHOLDER_IMAGE,
  },
];

export const INTEREST_TAGS = [
  "All",
  "Creative coding",
  "Photographs",
  "Books",
  "Anime",
] as const;

export type { InterestItem };
