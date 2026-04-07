"use client";

import { useState } from "react";
import { CurrencyInput } from "@/components/CurrencyInput";
import {
  CONTRACT_TYPES,
  PAY_PERIOD_OPTIONS,
  type ContractType,
  type PayPeriods,
} from "@/lib/types";
import {
  SOCIAL_SECURITY_RATES_2025,
  calculateEmployeeSocialSecurity,
} from "@/lib/seguridadSocial";

const MIN_SALARY = 0;
const MAX_SALARY = 999999;
const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const contractLabels: Record<ContractType, string> = {
  indefinido: "Indefinido",
  temporal: "Temporal",
};

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
  const [contractType, setContractType] = useState<ContractType>("indefinido");
  const [paymentsPerYear, setPaymentsPerYear] = useState<PayPeriods>(12);
  const grossAnnualSalaryError = getGrossSalaryError(grossAnnualSalary);
  const socialSecurity = calculateEmployeeSocialSecurity(
    grossAnnualSalary ?? 0,
    contractType,
    paymentsPerYear,
  );
  const grossMonthlySalary = grossAnnualSalary === null ? null : grossAnnualSalary / paymentsPerYear;
  const unemploymentRate =
    SOCIAL_SECURITY_RATES_2025.unemploymentByContract[contractType] * 100;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-18">
      <section className="w-full max-w-5xl rounded-[var(--radius-card)] border border-border bg-surface px-8 py-12 shadow-[var(--shadow-soft)] sm:px-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:items-start">
          <div>
            <span className="inline-flex rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-sm font-medium tracking-[0.18em] text-accent uppercase">
              CSN-010
            </span>
            <div className="mt-8 max-w-3xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-primary-strong sm:text-6xl">
                Calculadora de sueldo neto con base fiscal 2025.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                El formulario base ya permite fijar salario bruto anual, tipo de
                contrato y numero de pagas para anticipar el impacto mensual.
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
                <p className="text-sm font-medium text-muted">Contrato</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  {contractLabels[contractType]}
                </p>
              </article>
              <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
                <p className="text-sm font-medium text-muted">Pagas</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  {paymentsPerYear} al ano
                </p>
              </article>
              <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
                <p className="text-sm font-medium text-muted">Estado</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  Listo para CSN-011
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
            <div className="mt-8 space-y-3">
              <p className="text-sm font-medium text-primary-strong">Tipo de contrato</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {CONTRACT_TYPES.map((option) => {
                  const isSelected = option === contractType;

                  return (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-[var(--radius-card)] border px-4 py-4 transition ${
                        isSelected
                          ? "border-accent bg-accent-soft text-primary-strong"
                          : "border-border bg-surface text-primary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="contractType"
                        value={option}
                        checked={isSelected}
                        onChange={() => setContractType(option)}
                        className="sr-only"
                      />
                      <span className="block text-sm font-medium text-muted">Contrato</span>
                      <span className="mt-1 block text-lg font-semibold">
                        {contractLabels[option]}
                      </span>
                      <span className="mt-2 block text-sm text-muted">
                        Paro trabajador: {(
                          SOCIAL_SECURITY_RATES_2025.unemploymentByContract[option] * 100
                        ).toFixed(2)}%
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <label
                htmlFor="payments-per-year"
                className="block text-sm font-medium text-primary-strong"
              >
                Numero de pagas
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {PAY_PERIOD_OPTIONS.map((option) => {
                  const isSelected = option === paymentsPerYear;

                  return (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-[var(--radius-card)] border px-4 py-4 transition ${
                        isSelected
                          ? "border-accent bg-accent-soft text-primary-strong"
                          : "border-border bg-surface text-primary"
                      }`}
                    >
                      <input
                        id={option === 12 ? "payments-per-year" : undefined}
                        type="radio"
                        name="paymentsPerYear"
                        value={option}
                        checked={isSelected}
                        onChange={() => setPaymentsPerYear(option)}
                        className="sr-only"
                      />
                      <span className="block text-sm font-medium text-muted">Distribucion anual</span>
                      <span className="mt-1 block text-lg font-semibold">{option} pagas</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-surface p-5">
              <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                Impacto actual
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <article>
                  <p className="text-sm font-medium text-muted">Sueldo bruto mensual</p>
                  <p className="mt-1 text-2xl font-semibold text-primary-strong">
                    {grossMonthlySalary === null
                      ? "Pendiente"
                      : currencyFormatter.format(grossMonthlySalary)}
                  </p>
                </article>
                <article>
                  <p className="text-sm font-medium text-muted">Desempleo trabajador</p>
                  <p className="mt-1 text-2xl font-semibold text-primary-strong">
                    {currencyFormatter.format(socialSecurity.unemployment)}
                  </p>
                  <p className="text-sm text-muted">Tipo aplicado: {unemploymentRate.toFixed(2)}%</p>
                </article>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
