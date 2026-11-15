import { PORTFOLIO_CONTENT } from "./portfolio-content";
import type { WorkItem } from "./types";

export const PROJECTS: WorkItem[] = PORTFOLIO_CONTENT.work.map((project) => ({
  ...project,
  tags: [...project.tags],
  body: project.body.map((block) => ({ ...block })),
}));

export type Project = WorkItem;
