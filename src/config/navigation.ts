import { BEYOND_WORK_CONTENT } from "@/data/beyond-work-content";
import { SITE_LINKS, SITE_METADATA } from "@/data/site-links";
import { WORK_CONTENT } from "@/data/work-content";

export { resolveDocumentMetadata, resolveDocumentTitle } from "./page-metadata";

export type NavItem = {
  label: string;
  path: string;
  order: number;
  visible: boolean;
  group: "main" | "utility";
  description: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: SITE_LINKS.work.label,
    path: SITE_LINKS.work.href,
    order: 0,
    visible: true,
    group: "main",
    description: WORK_CONTENT.description,
  },
  {
    label: SITE_LINKS.beyondWork.label,
    path: SITE_LINKS.beyondWork.href,
    order: 1,
    visible: true,
    group: "main",
    description: BEYOND_WORK_CONTENT.description,
  },
  {
    label: SITE_LINKS.about.label,
    path: SITE_LINKS.about.href,
    order: 2,
    visible: true,
    group: "main",
    description: SITE_METADATA.about.description,
  },
];

export function getVisibleNavItems(group: NavItem["group"]) {
  return NAV_ITEMS.filter((item) => item.visible && item.group === group).sort(
    (a, b) => a.order - b.order,
  );
}
