import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import type { ControlSize, PageShellVariant } from "@/design";

export type SectionHeaderProps = {
  title: string;
  description: string;
};

export type FilterPillsProps<T extends string> = {
  tags: readonly T[];
  active: T;
  onChange: (value: T) => void;
  size?: ControlSize;
};

export type PageContainerProps = {
  children: ReactNode;
  compact?: boolean;
  variant?: PageShellVariant;
  className?: string;
};

export type RevealPanelProps = {
  children: ReactNode;
  index: number;
  reducedMotion?: boolean | null;
  className?: string;
  hoverLift?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export type MetaPillProps = {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
  size?: ControlSize;
};

export type AsciiEmptyProps = {
  title?: string;
  subtitle?: string;
};
