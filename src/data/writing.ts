import type { Post } from "./types";

export const POSTS: Post[] = [
  {
    slug: "tbd-note-01",
    id: "01",
    date: "August 2026",
    title: "Notes on Quiet Interaction States",
    excerpt:
      "A short draft about making default, hover, and active states feel useful without making the interface shout.",
    tags: ["Notes"],
    body: "Good interface states should answer a simple question: what can I do, what am I touching, and where am I now?\n\n**Quiet interaction states** are not weak states. They are states with restraint, contrast, and a clear job.",
  },
  {
    slug: "tbd-note-02",
    id: "02",
    date: "July 2026",
    title: "A Process for Placeholder Content",
    excerpt:
      "Why realistic draft content helps expose layout problems earlier than repeated lorem ipsum.",
    tags: ["Process"],
    body: "Placeholder content should be specific enough to stress the design but honest enough that it does not pretend to be finished work.\n\nThe goal is to reveal rhythm, density, hierarchy, and empty promises before real content arrives.",
  },
];

export type { Post };
