"use client";

import { useState } from "react";
import { CurrencyInput } from "@/components/CurrencyInput";

const MIN_SALARY = 0;
const MAX_SALARY = 999999;

function getGrossSalaryError(value: number | null) {
  if (value === null) {
    return undefined;
  }

  if (value < MIN_SALARY) {
    return "El salario bruto anual no puede ser inferior a 0 EUR.";
  }

  if (value > MAX_SALARY) {
    return "El salario bruto anual no puede superar 999.999 EUR.";
  }

  return undefined;
}

export default function Home() {
  const [grossAnnualSalary, setGrossAnnualSalary] = useState<number | null>(null);
  const grossAnnualSalaryError = getGrossSalaryError(grossAnnualSalary);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-18">
      <section className="w-full max-w-5xl rounded-[var(--radius-card)] border border-border bg-surface px-8 py-12 shadow-[var(--shadow-soft)] sm:px-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:items-start">
          <div>
            <span className="inline-flex rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-sm font-medium tracking-[0.18em] text-accent uppercase">
              CSN-009
            </span>
            <div className="mt-8 max-w-3xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-primary-strong sm:text-6xl">
                Calculadora de sueldo neto con base fiscal 2025.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                Primer campo del formulario listo para capturar el salario bruto anual
                con formato EUR y validacion de rango.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
                <p className="text-sm font-medium text-muted">Entrada</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  Salario bruto anual
                </p>
              </article>
              <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
                <p className="text-sm font-medium text-muted">Formato</p>
                <p className="mt-2 text-lg font-semibold text-primary">EUR</p>
              </article>
              <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
                <p className="text-sm font-medium text-muted">Estado</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  Listo para CSN-010
                </p>
              </article>
            </div>
          </div>

          <aside className="rounded-[var(--radius-card)] border border-border bg-surface-muted p-6 sm:p-8">
            <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
              Datos de entrada
            </p>
            <div className="mt-6">
              <CurrencyInput
                label="Salario bruto anual"
                value={grossAnnualSalary}
                onValueChange={setGrossAnnualSalary}
                min={MIN_SALARY}
                max={MAX_SALARY}
                error={grossAnnualSalaryError}
                hint="Introduce el salario anual antes de retenciones y cotizaciones."
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
