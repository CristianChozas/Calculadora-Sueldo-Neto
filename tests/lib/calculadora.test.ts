import { describe, expect, it } from "vitest";

import { calculateNetSalary } from "@/lib/calculadora";
import type { FormData } from "@/lib/types";

describe("calculateNetSalary", () => {
  it("returns a full annual and monthly breakdown for a known case", () => {
    const formData: FormData = {
      grossAnnualSalary: 30_000,
      contractType: "indefinido",
      paymentsPerYear: 12,
      autonomousCommunity: "madrid",
      maritalStatus: "soltero",
      dependants: 0,
      age: 30,
      disability: "none",
    };

    const result = calculateNetSalary(formData);

    expect(result.irpf.taxableBase).toBe(22_506);
    expect(result.irpf.totalTaxQuota).toBe(4_917.36);
    expect(result.socialSecurity.totalEmployeeContributions).toBe(1_944);
    expect(result.netAnnualSalary).toBe(23_138.64);
    expect(result.netMonthlySalary).toBe(1_928.22);
  });

  it("keeps IRPF at zero when the taxable base is fully absorbed by allowances", () => {
    const formData: FormData = {
      grossAnnualSalary: 5_000,
      contractType: "indefinido",
      paymentsPerYear: 12,
      autonomousCommunity: "asturias",
      maritalStatus: "soltero",
      dependants: 0,
      age: 30,
      disability: "none",
    };

    const result = calculateNetSalary(formData);

    expect(result.irpf.taxableBase).toBe(0);
    expect(result.irpf.totalTaxQuota).toBe(0);
  });
});
