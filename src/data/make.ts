import type { MakeItem } from "./types";
import { PORTFOLIO_CONTENT } from "./portfolio-content";

export const MAKE: MakeItem[] = PORTFOLIO_CONTENT.make.map((item) => ({ ...item }));

export const MAKE_TAGS = ["All", "Projects", "Experiments"] as const;

export type { MakeItem };
