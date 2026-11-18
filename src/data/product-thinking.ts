import { SITE_LINKS } from "./site-links";
import { PROJECTS } from "./projects";

const zomato = PROJECTS.find(({ slug }) => slug === "nextleap-zomato-capstone");
if (!zomato) throw new Error("Zomato product-thinking project is missing");

export const PRODUCT_THINKING = [
  {
    ...zomato,
    context:
      "Fellowship capstone exercise applied to a real consumer product, not a commissioned engagement with the company.",
    tag: "NextLeap Fellowship",
    portfolioUrl: SITE_LINKS.nextLeap.href,
  },
] as const;
