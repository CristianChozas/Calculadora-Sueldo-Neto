type BreakdownRowProps = {
  label: string;
  amount: string;
  percentage: string;
  tone?: "default" | "accent" | "danger";
};

const toneClasses: Record<NonNullable<BreakdownRowProps["tone"]>, string> = {
  default: "text-primary-strong",
  accent: "text-accent",
  danger: "text-danger",
};

export function BreakdownRow({
  label,
  amount,
  percentage,
  tone = "default",
}: BreakdownRowProps) {
  return (
    <article className="flex items-start justify-between gap-4 rounded-[var(--radius-card)] border border-border bg-surface px-4 py-4">
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className={`mt-1 text-lg font-semibold ${toneClasses[tone]}`}>{amount}</p>
      </div>
      <div className="rounded-[var(--radius-pill)] bg-surface-muted px-3 py-1 text-sm font-medium text-muted">
        {percentage}
      </div>
    </article>
  );
}
