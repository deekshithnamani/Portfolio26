import clsx from "clsx";
import { SOCIALS } from "@/data/socials";

export function SocialLinks({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  return <div aria-label="Social links" className={className}>{SOCIALS.map((item) => <a key={item.label} href={item.path} target={item.path.startsWith("http") ? "_blank" : undefined} rel={item.path.startsWith("http") ? "noreferrer" : undefined} className={clsx("focus-ring", linkClassName)}>{item.label}</a>)}</div>;
}
