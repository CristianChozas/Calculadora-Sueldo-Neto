export const CONTRACT_TYPES = ["indefinido", "temporal"] as const;
export const PAY_PERIOD_OPTIONS = [12, 14] as const;
export const MARITAL_STATUSES = ["soltero", "casado"] as const;
export const DISABILITY_LEVELS = ["none", "33_plus", "65_plus"] as const;
export const AUTONOMOUS_COMMUNITIES = [
  "andalucia",
  "aragon",
  "asturias",
  "baleares",
  "canarias",
  "cantabria",
  "castilla_la_mancha",
  "castilla_y_leon",
  "cataluna",
  "ceuta",
  "comunidad_valenciana",
  "extremadura",
  "galicia",
  "la_rioja",
  "madrid",
  "melilla",
  "murcia",
  "navarra",
  "pais_vasco",
] as const;

export type ContractType = (typeof CONTRACT_TYPES)[number];
export type PayPeriods = (typeof PAY_PERIOD_OPTIONS)[number];
export type MaritalStatus = (typeof MARITAL_STATUSES)[number];
export type DisabilityLevel = (typeof DISABILITY_LEVELS)[number];
export type AutonomousCommunity = (typeof AUTONOMOUS_COMMUNITIES)[number];

export interface FormData {
  grossAnnualSalary: number;
  contractType: ContractType;
  paymentsPerYear: PayPeriods;
  autonomousCommunity: AutonomousCommunity;
  maritalStatus: MaritalStatus;
  dependants: number;
  age: number;
  disability: DisabilityLevel;
}

export interface IRPFResult {
  taxableBase: number;
  personalAllowance: number;
  totalTaxQuota: number;
  effectiveRate: number;
}

export interface SSResult {
  contributionBaseMonthly: number;
  commonContingencies: number;
  unemployment: number;
  training: number;
  mei: number;
  totalEmployeeContributions: number;
  effectiveRate: number;
}

export interface CalculationResult {
  grossAnnualSalary: number;
  grossMonthlySalary: number;
  netAnnualSalary: number;
  netMonthlySalary: number;
  irpf: IRPFResult;
  socialSecurity: SSResult;
}
