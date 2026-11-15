import { PROJECTS } from "./projects";

const zomato = PROJECTS.find(({ slug }) => slug === "nextleap-zomato-capstone");
if (!zomato) throw new Error("Zomato product-thinking project is missing");

export const PRODUCT_THINKING = [{
  ...zomato,
  context: "Fellowship capstone exercise applied to a real consumer product, not a commissioned engagement with the company.",
  tag: "NextLeap Fellowship",
  portfolioUrl: "https://nextleap.app/portfolio/n-deekshith",
}] as const;
