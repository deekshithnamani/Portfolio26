import { PROJECTS } from "./projects";

export const COMPANIES = [
  {
    id: "daosoft",
    name: "DAOSoft.AI",
    description: "Decision-intelligence software for large, technically sophisticated client organizations.",
    role: "Product Designer (doing PM work)",
    dates: "Mar 2024 – Present",
    projectSlugs: PROJECTS.filter(({ company }) => company === "DAOSoft.AI").map(({ slug }) => slug),
  },
  {
    id: "stealth-ai",
    name: "Stealth AI Startup",
    description: "A GPT-powered legal-tech startup building AI research and document-drafting tools.",
    role: "Product Designer (MVP scoping & strategy)",
    dates: "Aug 2023 – Feb 2024",
    projectSlugs: PROJECTS.filter(({ company }) => company === "Stealth AI Startup").map(({ slug }) => slug),
  },
  {
    id: "univ-ai",
    name: "Univ.AI",
    description: "An edtech learner platform.",
    role: "UX/UI Design Intern",
    dates: "Oct 2022 – Apr 2023",
    projectSlugs: PROJECTS.filter(({ company }) => company === "Univ.AI").map(({ slug }) => slug),
  },
] as const;
