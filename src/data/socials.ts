import { SITE_EMAIL_HREF } from "@/config/site";
import { SITE_LINKS } from "./site-links";

export const SOCIALS = [
  { label: "LinkedIn", path: SITE_LINKS.linkedin.href },
  { label: "GitHub", path: SITE_LINKS.github.href },
  { label: "Email", path: SITE_EMAIL_HREF },
] as const;
