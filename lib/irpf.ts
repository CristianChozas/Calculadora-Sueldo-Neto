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
