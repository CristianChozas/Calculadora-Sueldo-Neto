type SalaryDistributionItem = {
  label: string;
  value: number;
  color: string;
};

type SalaryDistributionChartProps = {
  items: SalaryDistributionItem[];
  total: number;
  pending?: boolean;
};

const chartSize = 220;
const strokeWidth = 24;
const radius = (chartSize - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

function formatPercentage(value: number) {
  return `${value.toFixed(2)}%`;
}

export function SalaryDistributionChart({
  items,
  total,
  pending = false,
}: SalaryDistributionChartProps) {
  const segments = items.map((item, index) => {
    const previousRatio = items
      .slice(0, index)
      .reduce((sum, currentItem) => sum + currentItem.value / total, 0);
    const ratio = item.value / total;

    return {
      ...item,
      ratio,
      dashLength: circumference * ratio,
      dashOffset: circumference * (1 - previousRatio),
    };
  });

  return (
    <article className="rounded-[var(--radius-card)] border border-border bg-white p-5">
      <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
        Distribucion salarial
      </p>

      {pending || total <= 0 ? (
        <p className="mt-4 text-sm leading-6 text-muted">
          Completa los campos validos para visualizar la proporcion entre neto,
          IRPF y Seguridad Social.
        </p>
      ) : (
        <div className="mt-5 grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
          <div className="mx-auto w-full max-w-[220px]">
            <svg
              viewBox={`0 0 ${chartSize} ${chartSize}`}
              className="h-auto w-full"
              role="img"
              aria-label="Grafico de distribucion del salario"
            >
              <circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={radius}
                fill="none"
                stroke="var(--surface-muted)"
                strokeWidth={strokeWidth}
              />
              {segments.map((item) => {
                return (
                  <circle
                    key={item.label}
                    cx={chartSize / 2}
                    cy={chartSize / 2}
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${item.dashLength} ${circumference}`}
                    strokeDashoffset={item.dashOffset}
                    strokeLinecap="butt"
                    transform={`rotate(-90 ${chartSize / 2} ${chartSize / 2})`}
                  />
                );
              })}
              <circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={radius - strokeWidth / 1.5}
                fill="var(--surface)"
              />
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                fill="var(--primary-strong)"
                fontSize="12"
                fontWeight="500"
              >
                Bruto anual
              </text>
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                fill="var(--primary-strong)"
                fontSize="18"
                fontWeight="600"
              >
                100%
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-border bg-surface-muted px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-primary-strong">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-muted">
                  {formatPercentage((item.value / total) * 100)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
