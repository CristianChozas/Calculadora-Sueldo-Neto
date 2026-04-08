type ResultCardProps = {
  annualNetSalary: string;
  monthlyNetSalary: string;
  isPending?: boolean;
};

export function ResultCard({
  annualNetSalary,
  monthlyNetSalary,
  isPending = false,
}: ResultCardProps) {
  return (
    <article
      aria-live="polite"
      className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-linear-to-r from-[#f6f8fb] to-white text-primary-strong shadow-[var(--shadow-soft)]"
    >
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
          Sueldo neto estimado
        </p>
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-sm font-medium text-muted">Anual</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-primary-strong sm:text-5xl">
              {annualNetSalary}
            </p>
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-border pt-5">
            <div>
              <p className="text-sm font-medium text-muted">Mensual</p>
              <p className="mt-1 text-2xl font-semibold text-primary-strong sm:text-3xl">
                {monthlyNetSalary}
              </p>
            </div>
            <span className="border border-border bg-surface px-4 py-2 text-sm font-medium text-muted">
              {isPending ? "Pendiente" : "Actualizado al instante"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
