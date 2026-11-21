import type { ReactNode } from "react";

export function EmptyState({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="space-y-link">
      <h1 className="page-title">{title}</h1>
      {action && <p>{action}</p>}
    </div>
  );
}
