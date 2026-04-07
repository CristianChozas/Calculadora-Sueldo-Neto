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
      className="overflow-hidden rounded-[var(--radius-card)] bg-primary-strong text-white shadow-[var(--shadow-soft)]"
    >
      <div className="bg-linear-to-br from-accent/35 via-transparent to-transparent px-6 py-6 sm:px-8 sm:py-8">
        <p className="text-sm font-medium tracking-[0.18em] text-white/72 uppercase">
          Sueldo neto estimado
        </p>
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-sm font-medium text-white/72">Anual</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {annualNetSalary}
            </p>
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-white/12 pt-5">
            <div>
              <p className="text-sm font-medium text-white/72">Mensual</p>
              <p className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                {monthlyNetSalary}
              </p>
            </div>
            <span className="rounded-[var(--radius-pill)] bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
              {isPending ? "Pendiente" : "Actualizado al instante"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
