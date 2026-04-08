"use client";

import { useState } from "react";
import { BreakdownRow } from "@/components/BreakdownRow";
import { CurrencyInput } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import {
  AUTONOMOUS_COMMUNITIES,
  CONTRACT_TYPES,
  DISABILITY_LEVELS,
  MARITAL_STATUSES,
  PAY_PERIOD_OPTIONS,
  type AutonomousCommunity,
  type ContractType,
  type DisabilityLevel,
  type MaritalStatus,
  type PayPeriods,
} from "@/lib/types";
import {
  SOCIAL_SECURITY_RATES_2025,
  calculateEmployeeSocialSecurity,
} from "@/lib/seguridadSocial";
import { calculateNetSalary } from "@/lib/calculadora";

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

const autonomousCommunityLabels: Record<AutonomousCommunity, string> = {
  andalucia: "Andalucia",
  aragon: "Aragon",
  asturias: "Asturias",
  baleares: "Illes Balears",
  canarias: "Canarias",
  cantabria: "Cantabria",
  castilla_la_mancha: "Castilla-La Mancha",
  castilla_y_leon: "Castilla y Leon",
  cataluna: "Cataluna",
  ceuta: "Ceuta",
  comunidad_valenciana: "Comunitat Valenciana",
  extremadura: "Extremadura",
  galicia: "Galicia",
  la_rioja: "La Rioja",
  madrid: "Comunidad de Madrid",
  melilla: "Melilla",
  murcia: "Region de Murcia",
  navarra: "Navarra",
  pais_vasco: "Pais Vasco",
};

const maritalStatusLabels: Record<MaritalStatus, string> = {
  soltero: "Soltero",
  casado: "Casado",
};

const disabilityLabels: Record<DisabilityLevel, string> = {
  none: "Sin discapacidad",
  "33_plus": "Discapacidad 33%+",
  "65_plus": "Discapacidad 65%+",
};

function getGrossSalaryError(rawValue: string, value: number | null) {
  if (!rawValue.trim()) {
    return "El salario bruto anual es obligatorio.";
  }

  if (value === null) {
    return "Introduce una cantidad valida en EUR.";
  }

  if (value < MIN_SALARY) {
    return "El salario bruto anual no puede ser inferior a 0 EUR.";
  }

  if (value > MAX_SALARY) {
    return "El salario bruto anual no puede superar 999.999 EUR.";
  }

  return undefined;
}

function getDependantsError(rawValue: string) {
  if (!rawValue.trim()) {
    return "El numero de descendientes es obligatorio.";
  }

  if (!/^\d+$/.test(rawValue.trim())) {
    return "Introduce un numero entero igual o superior a 0.";
  }

  return undefined;
}

function getAgeError(rawValue: string) {
  if (!rawValue.trim()) {
    return "La edad es obligatoria.";
  }

  if (!/^\d+$/.test(rawValue.trim())) {
    return "Introduce una edad valida en años cumplidos.";
  }

  return undefined;
}

function formatPercentage(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function Home() {
  const [grossAnnualSalary, setGrossAnnualSalary] = useState<number | null>(null);
  const [grossAnnualSalaryRaw, setGrossAnnualSalaryRaw] = useState("");
  const [contractType, setContractType] = useState<ContractType>("indefinido");
  const [paymentsPerYear, setPaymentsPerYear] = useState<PayPeriods>(12);
  const [autonomousCommunity, setAutonomousCommunity] =
    useState<AutonomousCommunity>("madrid");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>("soltero");
  const [ageRaw, setAgeRaw] = useState("30");
  const [dependantsRaw, setDependantsRaw] = useState("0");
  const [disability, setDisability] = useState<DisabilityLevel>("none");
  const grossAnnualSalaryError = getGrossSalaryError(grossAnnualSalaryRaw, grossAnnualSalary);
  const ageError = getAgeError(ageRaw);
  const dependantsError = getDependantsError(dependantsRaw);
  const age = ageError ? 0 : Number(ageRaw);
  const dependants = dependantsError ? 0 : Number(dependantsRaw);
  const hasFormErrors = Boolean(grossAnnualSalaryError || ageError || dependantsError);
  const calculationResult =
    !hasFormErrors && grossAnnualSalary !== null
      ? calculateNetSalary({
          grossAnnualSalary,
          contractType,
          paymentsPerYear,
          autonomousCommunity,
          maritalStatus,
          dependants,
          age,
          disability,
        })
      : null;
  const socialSecurity = calculateEmployeeSocialSecurity(
    grossAnnualSalaryError ? 0 : grossAnnualSalary ?? 0,
    contractType,
    paymentsPerYear,
  );
  const grossMonthlySalary =
    grossAnnualSalaryError || grossAnnualSalary === null
      ? null
      : grossAnnualSalary / paymentsPerYear;
  const unemploymentRate =
    SOCIAL_SECURITY_RATES_2025.unemploymentByContract[contractType] * 100;
  const highlightedAnnualNetSalary = calculationResult
    ? currencyFormatter.format(calculationResult.netAnnualSalary)
    : "Pendiente";
  const highlightedMonthlyNetSalary = calculationResult
    ? currencyFormatter.format(calculationResult.netMonthlySalary)
    : "Pendiente";

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 min-[375px]:px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-muted uppercase">
              Simulador salarial
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-primary-strong sm:text-3xl">
              Calculadora de sueldo neto
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 min-[375px]:px-6 min-[375px]:py-8 sm:px-8 md:py-10 lg:px-10">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface px-6 py-8 shadow-[var(--shadow-soft)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-4xl font-semibold tracking-tight text-primary-strong sm:text-5xl">
              Calculadora de sueldo neto con base fiscal 2025.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Calcula tu sueldo neto anual y mensual con una presentacion clara,
              formal y orientada a consulta profesional.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
              <p className="text-sm font-medium text-muted">Entrada</p>
              <p className="mt-2 text-lg font-semibold text-primary">Salario bruto anual</p>
            </article>
            <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
              <p className="text-sm font-medium text-muted">Contrato</p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {contractLabels[contractType]}
              </p>
            </article>
            <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
              <p className="text-sm font-medium text-muted">Pagas</p>
              <p className="mt-2 text-lg font-semibold text-primary">{paymentsPerYear} al año</p>
            </article>
            <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
              <p className="text-sm font-medium text-muted">Territorio</p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {autonomousCommunityLabels[autonomousCommunity]}
              </p>
            </article>
            <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
              <p className="text-sm font-medium text-muted">Situacion</p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {maritalStatusLabels[maritalStatus]}
              </p>
            </article>
          </div>

          <div className="mt-12 grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <section
              aria-labelledby="input-panel-title"
              className="rounded-[var(--radius-card)] border border-border bg-surface-muted p-5 min-[375px]:p-6 sm:p-8"
            >
              <p
                id="input-panel-title"
                className="text-sm font-medium tracking-[0.18em] text-accent uppercase"
              >
                Datos de entrada
              </p>
              <div className="mt-6">
                <CurrencyInput
                  label="Salario bruto anual"
                  value={grossAnnualSalary}
                  onValueChange={setGrossAnnualSalary}
                  onRawValueChange={setGrossAnnualSalaryRaw}
                  min={MIN_SALARY}
                  max={MAX_SALARY}
                  error={grossAnnualSalaryError}
                  hint="Introduce el salario anual antes de retenciones y cotizaciones."
                />
              </div>
              <fieldset className="mt-8 space-y-3">
                <legend className="text-sm font-medium text-primary-strong">
                  Tipo de contrato
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CONTRACT_TYPES.map((option) => {
                    const isSelected = option === contractType;

                    return (
                      <label
                        key={option}
                        className={`cursor-pointer rounded-[var(--radius-card)] border px-4 py-4 transition ${
                          isSelected
                            ? "border-primary bg-white text-primary-strong"
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
              </fieldset>

              <fieldset className="mt-8 space-y-3">
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
                            ? "border-primary bg-white text-primary-strong"
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
              </fieldset>

              <div className="mt-8 space-y-3">
                <label
                  htmlFor="autonomous-community"
                  className="block text-sm font-medium text-primary-strong"
                >
                  Comunidad autonoma
                </label>
                <select
                  id="autonomous-community"
                  value={autonomousCommunity}
                  onChange={(event) => {
                    setAutonomousCommunity(event.target.value as AutonomousCommunity);
                  }}
                  className="w-full rounded-[var(--radius-card)] border bg-surface px-4 py-3 text-base font-medium text-primary shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  {AUTONOMOUS_COMMUNITIES.map((community) => (
                    <option key={community} value={community}>
                      {autonomousCommunityLabels[community]}
                    </option>
                  ))}
                </select>
                <p className="rounded-[var(--radius-card)] border border-border bg-surface px-4 py-3 text-sm leading-6 text-muted">
                  El IRPF autonomico puede variar segun la comunidad. Por ahora, la
                  calculadora usa la referencia estatal como estimacion orientativa.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <label htmlFor="age" className="block text-sm font-medium text-primary-strong">
                  Edad
                </label>
                <input
                  id="age"
                  type="text"
                  inputMode="numeric"
                  value={ageRaw}
                  aria-invalid={Boolean(ageError)}
                  aria-describedby={ageError ? "age-error" : undefined}
                  onChange={(event) => {
                    setAgeRaw(event.target.value);
                  }}
                  className="w-full rounded-[var(--radius-card)] border bg-surface px-4 py-3 text-base font-medium text-primary shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                {ageError ? (
                  <p id="age-error" className="text-sm font-medium text-danger">
                    {ageError}
                  </p>
                ) : (
                  <p className="text-sm leading-6 text-muted">
                    La edad ajusta el minimo personal en el motor fiscal actual.
                  </p>
                )}
              </div>

              <fieldset className="mt-8 space-y-3">
                <legend className="text-sm font-medium text-primary-strong">Estado civil</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {MARITAL_STATUSES.map((option) => {
                    const isSelected = option === maritalStatus;

                    return (
                      <label
                        key={option}
                        className={`cursor-pointer rounded-[var(--radius-card)] border px-4 py-4 transition ${
                          isSelected
                            ? "border-primary bg-white text-primary-strong"
                            : "border-border bg-surface text-primary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="maritalStatus"
                          value={option}
                          checked={isSelected}
                          onChange={() => setMaritalStatus(option)}
                          className="sr-only"
                        />
                        <span className="block text-sm font-medium text-muted">
                          Situacion personal
                        </span>
                        <span className="mt-1 block text-lg font-semibold">
                          {maritalStatusLabels[option]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 space-y-3">
                <label
                  htmlFor="dependants"
                  className="block text-sm font-medium text-primary-strong"
                >
                  Numero de hijos o descendientes a cargo
                </label>
                <input
                  id="dependants"
                  type="text"
                  inputMode="numeric"
                  value={dependantsRaw}
                  aria-invalid={Boolean(dependantsError)}
                  aria-describedby={dependantsError ? "dependants-error" : undefined}
                  onChange={(event) => {
                    setDependantsRaw(event.target.value);
                  }}
                  className="w-full rounded-[var(--radius-card)] border bg-surface px-4 py-3 text-base font-medium text-primary shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                {dependantsError ? (
                  <p id="dependants-error" className="text-sm font-medium text-danger">
                    {dependantsError}
                  </p>
                ) : (
                  <p className="text-sm leading-6 text-muted">
                    Introduce el numero de hijos o descendientes a cargo con un entero desde 0.
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <label
                  htmlFor="disability"
                  className="block text-sm font-medium text-primary-strong"
                >
                  Discapacidad
                </label>
                <select
                  id="disability"
                  value={disability}
                  onChange={(event) => {
                    setDisability(event.target.value as DisabilityLevel);
                  }}
                  className="w-full rounded-[var(--radius-card)] border bg-surface px-4 py-3 text-base font-medium text-primary shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  {DISABILITY_LEVELS.map((option) => (
                    <option key={option} value={option}>
                      {disabilityLabels[option]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-surface p-5">
                <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                  Situacion familiar actual
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <article>
                    <p className="text-sm font-medium text-muted">Estado civil</p>
                    <p className="mt-1 text-lg font-semibold text-primary-strong">
                      {maritalStatusLabels[maritalStatus]}
                    </p>
                  </article>
                  <article>
                    <p className="text-sm font-medium text-muted">Edad</p>
                    <p className="mt-1 text-lg font-semibold text-primary-strong">
                      {ageError ? "Pendiente" : `${age} años`}
                    </p>
                  </article>
                  <article>
                    <p className="text-sm font-medium text-muted">Descendientes</p>
                    <p className="mt-1 text-lg font-semibold text-primary-strong">
                      {dependants}
                    </p>
                  </article>
                  <article>
                    <p className="text-sm font-medium text-muted">Discapacidad</p>
                    <p className="mt-1 text-lg font-semibold text-primary-strong">
                      {disabilityLabels[disability]}
                    </p>
                  </article>
                </div>
              </div>
            </section>

            <aside aria-labelledby="results-panel-title" className="space-y-8">
              <ResultCard
                annualNetSalary={highlightedAnnualNetSalary}
                monthlyNetSalary={highlightedMonthlyNetSalary}
                isPending={!calculationResult}
              />

              <div className="border border-border bg-surface-muted p-5 min-[375px]:p-6 sm:p-8">
                <p
                  id="results-panel-title"
                  className="text-sm font-medium tracking-[0.18em] text-accent uppercase"
                >
                  Panel de resultados
                </p>

                <div className="mt-6 border border-border bg-white p-5">
                  <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                    Desglose de deducciones
                  </p>
                  {calculationResult ? (
                    <div className="mt-4 space-y-4">
                      <BreakdownRow
                        label="Bruto anual"
                        amount={currencyFormatter.format(calculationResult.grossAnnualSalary)}
                        percentage={formatPercentage(100)}
                      />
                      <BreakdownRow
                        label="IRPF"
                        amount={currencyFormatter.format(calculationResult.irpf.totalTaxQuota)}
                        percentage={formatPercentage(calculationResult.irpf.effectiveRate)}
                        tone="danger"
                      />
                      <BreakdownRow
                        label="Contingencias comunes"
                        amount={currencyFormatter.format(
                          calculationResult.socialSecurity.commonContingencies,
                        )}
                        percentage={formatPercentage(
                          (calculationResult.socialSecurity.commonContingencies /
                            calculationResult.grossAnnualSalary) *
                            100,
                        )}
                      />
                      <BreakdownRow
                        label="Desempleo"
                        amount={currencyFormatter.format(calculationResult.socialSecurity.unemployment)}
                        percentage={formatPercentage(
                          (calculationResult.socialSecurity.unemployment /
                            calculationResult.grossAnnualSalary) *
                            100,
                        )}
                      />
                      <BreakdownRow
                        label="Formacion profesional"
                        amount={currencyFormatter.format(calculationResult.socialSecurity.training)}
                        percentage={formatPercentage(
                          (calculationResult.socialSecurity.training /
                            calculationResult.grossAnnualSalary) *
                            100,
                        )}
                      />
                      <BreakdownRow
                        label="MEI"
                        amount={currencyFormatter.format(calculationResult.socialSecurity.mei)}
                        percentage={formatPercentage(
                          (calculationResult.socialSecurity.mei /
                            calculationResult.grossAnnualSalary) *
                            100,
                        )}
                      />
                      <BreakdownRow
                        label="Seguridad Social total"
                        amount={currencyFormatter.format(
                          calculationResult.socialSecurity.totalEmployeeContributions,
                        )}
                        percentage={formatPercentage(calculationResult.socialSecurity.effectiveRate)}
                        tone="danger"
                      />
                      <BreakdownRow
                        label="Neto anual"
                        amount={currencyFormatter.format(calculationResult.netAnnualSalary)}
                        percentage={formatPercentage(
                          (calculationResult.netAnnualSalary /
                            calculationResult.grossAnnualSalary) *
                            100,
                        )}
                        tone="accent"
                      />
                      <p className="text-sm leading-6 text-muted">
                        Base mensual bruta: {currencyFormatter.format(calculationResult.grossMonthlySalary)}. Neto mensual: {currencyFormatter.format(calculationResult.netMonthlySalary)}. Tipo de paro aplicado: {unemploymentRate.toFixed(2)}%.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm leading-6 text-muted">
                        Completa los campos obligatorios con valores validos para ver la
                        estimacion reactiva del sueldo neto y su desglose detallado.
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
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
                          <p className="text-sm text-muted">
                            Tipo aplicado: {unemploymentRate.toFixed(2)}%
                          </p>
                        </article>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 border border-border bg-white p-5">
                  <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
                    Transparencia fiscal
                  </p>
                  <div className="mt-4 space-y-4">
                    <a
                      href="https://sede.agenciatributaria.gob.es"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-primary-strong transition hover:bg-white"
                    >
                      Como se calcula el IRPF?
                    </a>
                    <p className="rounded-[var(--radius-card)] border border-border bg-surface-muted px-4 py-4 text-sm leading-6 text-muted">
                      Calculo orientativo. Consulta a un asesor fiscal para casos especificos.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-muted min-[375px]:px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>Calculadora Sueldo Neto 2025</p>
          <p>Cristian Chozas Diaz - 2025</p>
        </div>
      </footer>
    </main>
  );
}
