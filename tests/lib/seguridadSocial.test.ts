import { describe, expect, it } from "vitest";

import { calculateEmployeeSocialSecurity } from "@/lib/seguridadSocial";

describe("calculateEmployeeSocialSecurity", () => {
  it("calculates annual worker contributions for an indefinite contract", () => {
    const result = calculateEmployeeSocialSecurity(30_000, "indefinido", 12);

    expect(result.contributionBaseMonthly).toBe(2_500);
    expect(result.commonContingencies).toBe(1_410);
    expect(result.unemployment).toBe(465);
    expect(result.training).toBe(30);
    expect(result.mei).toBe(39);
    expect(result.totalEmployeeContributions).toBe(1_944);
    expect(result.effectiveRate).toBe(6.48);
  });

  it("applies the monthly contribution cap when salary exceeds the maximum base", () => {
    const result = calculateEmployeeSocialSecurity(100_000, "indefinido", 12);

    expect(result.contributionBaseMonthly).toBe(4_909.5);
    expect(result.totalEmployeeContributions).toBe(3_817.63);
  });
});
