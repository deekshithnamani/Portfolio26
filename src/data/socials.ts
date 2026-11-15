import { SITE_EMAIL_HREF, SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "@/config/site";

export const SOCIALS = [
  { label: "LinkedIn", path: SITE_LINKEDIN_URL },
  { label: "GitHub", path: SITE_GITHUB_URL },
  { label: "Email", path: SITE_EMAIL_HREF },
] as const;
