import type { WorkBodyBlock, WorkItem } from "./types";
import { PORTFOLIO_CONTENT } from "./portfolio-content";
import { PLACEHOLDER_IMAGE } from "./constants";

const normalizeMedia = (value: string) =>
  value && value.trim() ? value : PLACEHOLDER_IMAGE;

const normalizeWork = (items: readonly WorkItem[]): WorkItem[] =>
  items.map((item) => ({
    ...item,
    cover: normalizeMedia(item.cover),
    tags: [...item.tags],
    body: item.body.map((block: WorkBodyBlock) => {
      if (block.type === "image") {
        return {
          ...block,
          src: normalizeMedia(block.src),
        };
      }
      return block;
    }),
  }));

export const WORK: WorkItem[] = normalizeWork(PORTFOLIO_CONTENT.work);

export type { WorkBodyBlock, WorkItem };
