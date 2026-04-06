import type { ContractType, PayPeriods, SSResult } from "@/lib/types";

const COMMON_CONTINGENCIES_RATE = 0.047;
const UNEMPLOYMENT_RATE_BY_CONTRACT: Record<ContractType, number> = {
  indefinido: 0.0155,
  temporal: 0.016,
};
const TRAINING_RATE = 0.001;
const MEI_RATE = 0.0013;
const MAX_MONTHLY_CONTRIBUTION_BASE = 4_909.5;

function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

function calculateAnnualAmount(monthlyBase: number, rate: number, paymentsPerYear: PayPeriods): number {
  return roundToCents(monthlyBase * rate * paymentsPerYear);
}

export function calculateEmployeeSocialSecurity(
  grossAnnualSalary: number,
  contractType: ContractType,
  paymentsPerYear: PayPeriods,
): SSResult {
  if (!Number.isFinite(grossAnnualSalary) || grossAnnualSalary <= 0) {
    return {
      contributionBaseMonthly: 0,
      commonContingencies: 0,
      unemployment: 0,
      training: 0,
      mei: 0,
      totalEmployeeContributions: 0,
      effectiveRate: 0,
    };
  }

  const grossMonthlySalary = grossAnnualSalary / paymentsPerYear;
  const contributionBaseMonthly = Math.min(grossMonthlySalary, MAX_MONTHLY_CONTRIBUTION_BASE);

  const commonContingencies = calculateAnnualAmount(
    contributionBaseMonthly,
    COMMON_CONTINGENCIES_RATE,
    paymentsPerYear,
  );
  const unemployment = calculateAnnualAmount(
    contributionBaseMonthly,
    UNEMPLOYMENT_RATE_BY_CONTRACT[contractType],
    paymentsPerYear,
  );
  const training = calculateAnnualAmount(contributionBaseMonthly, TRAINING_RATE, paymentsPerYear);
  const mei = calculateAnnualAmount(contributionBaseMonthly, MEI_RATE, paymentsPerYear);
  const totalEmployeeContributions = roundToCents(
    commonContingencies + unemployment + training + mei,
  );

  return {
    contributionBaseMonthly: roundToCents(contributionBaseMonthly),
    commonContingencies,
    unemployment,
    training,
    mei,
    totalEmployeeContributions,
    effectiveRate: roundToCents((totalEmployeeContributions / grossAnnualSalary) * 100),
  };
}

export const SOCIAL_SECURITY_RATES_2025 = {
  commonContingencies: COMMON_CONTINGENCIES_RATE,
  unemploymentByContract: UNEMPLOYMENT_RATE_BY_CONTRACT,
  training: TRAINING_RATE,
  mei: MEI_RATE,
  maxMonthlyContributionBase: MAX_MONTHLY_CONTRIBUTION_BASE,
} as const;
