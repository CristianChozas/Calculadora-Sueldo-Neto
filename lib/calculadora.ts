import { calculateIRPFQuota, calculatePersonalAndFamilyAllowance } from "@/lib/irpf";
import { calculateEmployeeSocialSecurity } from "@/lib/seguridadSocial";
import type { CalculationResult, FormData, IRPFResult } from "@/lib/types";

function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

function buildIRPFResult(formData: FormData, grossAnnualSalary: number): IRPFResult {
  const personalAllowance = calculatePersonalAndFamilyAllowance({
    age: formData.age,
    dependants: formData.dependants,
    disability: formData.disability,
  });

  const socialSecurity = calculateEmployeeSocialSecurity(
    grossAnnualSalary,
    formData.contractType,
    formData.paymentsPerYear,
  );
  const taxableBase = Math.max(
    grossAnnualSalary - socialSecurity.totalEmployeeContributions - personalAllowance,
    0,
  );
  const totalTaxQuota = calculateIRPFQuota(taxableBase);

  return {
    taxableBase: roundToCents(taxableBase),
    personalAllowance,
    totalTaxQuota,
    effectiveRate: grossAnnualSalary > 0 ? roundToCents((totalTaxQuota / grossAnnualSalary) * 100) : 0,
  };
}

export function calculateNetSalary(formData: FormData): CalculationResult {
  const grossAnnualSalary = roundToCents(formData.grossAnnualSalary);
  const socialSecurity = calculateEmployeeSocialSecurity(
    grossAnnualSalary,
    formData.contractType,
    formData.paymentsPerYear,
  );
  const irpf = buildIRPFResult(formData, grossAnnualSalary);
  const netAnnualSalary = roundToCents(
    grossAnnualSalary - socialSecurity.totalEmployeeContributions - irpf.totalTaxQuota,
  );

  return {
    grossAnnualSalary,
    grossMonthlySalary: roundToCents(grossAnnualSalary / formData.paymentsPerYear),
    netAnnualSalary,
    netMonthlySalary: roundToCents(netAnnualSalary / formData.paymentsPerYear),
    irpf,
    socialSecurity,
  };
}
