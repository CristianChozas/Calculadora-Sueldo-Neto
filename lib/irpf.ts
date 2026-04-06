import type { DisabilityLevel } from "@/lib/types";

export interface IRPFBracket {
  upperLimit: number;
  rate: number;
}

export const IRPF_2025_BRACKETS: readonly IRPFBracket[] = [
  { upperLimit: 12_450, rate: 0.19 },
  { upperLimit: 20_199, rate: 0.24 },
  { upperLimit: 35_199, rate: 0.30 },
  { upperLimit: 59_999, rate: 0.37 },
  { upperLimit: 299_999, rate: 0.45 },
  { upperLimit: Number.POSITIVE_INFINITY, rate: 0.47 },
];

const DESCENDANT_ALLOWANCES = [2_400, 2_700, 4_000, 4_500] as const;

export interface PersonalAllowanceInput {
  age: number;
  dependants: number;
  disability: DisabilityLevel;
}

function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function calculateIRPFQuota(taxableBase: number): number {
  if (!Number.isFinite(taxableBase) || taxableBase <= 0) {
    return 0;
  }

  let totalQuota = 0;
  let lowerLimit = 0;

  for (const bracket of IRPF_2025_BRACKETS) {
    if (taxableBase <= lowerLimit) {
      break;
    }

    const taxableAmountInBracket = Math.min(taxableBase, bracket.upperLimit) - lowerLimit;
    totalQuota += taxableAmountInBracket * bracket.rate;
    lowerLimit = bracket.upperLimit;
  }

  return roundToCents(totalQuota);
}

function getPersonalAllowanceByAge(age: number): number {
  if (age >= 75) {
    return 8_100;
  }

  if (age >= 65) {
    return 6_700;
  }

  return 5_550;
}

function getDependantsAllowance(dependants: number): number {
  if (!Number.isFinite(dependants) || dependants <= 0) {
    return 0;
  }

  let allowance = 0;

  for (let index = 0; index < dependants; index += 1) {
    allowance += DESCENDANT_ALLOWANCES[Math.min(index, DESCENDANT_ALLOWANCES.length - 1)];
  }

  return allowance;
}

function getDisabilityAllowance(disability: DisabilityLevel): number {
  switch (disability) {
    case "33_plus":
      return 3_000;
    case "65_plus":
      return 9_000;
    default:
      return 0;
  }
}

export function calculatePersonalAndFamilyAllowance(
  input: PersonalAllowanceInput,
): number {
  return roundToCents(
    getPersonalAllowanceByAge(input.age) +
      getDependantsAllowance(input.dependants) +
      getDisabilityAllowance(input.disability),
  );
}
