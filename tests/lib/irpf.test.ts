import { describe, expect, it } from "vitest";

import { calculateIRPFQuota, calculatePersonalAndFamilyAllowance } from "@/lib/irpf";

describe("calculateIRPFQuota", () => {
  it("calculates progressive tax across multiple brackets", () => {
    expect(calculateIRPFQuota(30_000)).toBe(7_165.56);
  });

  it("returns zero for non-positive or invalid taxable bases", () => {
    expect(calculateIRPFQuota(0)).toBe(0);
    expect(calculateIRPFQuota(-200)).toBe(0);
    expect(calculateIRPFQuota(Number.NaN)).toBe(0);
  });
});

describe("calculatePersonalAndFamilyAllowance", () => {
  it("applies age, dependants, and disability allowances", () => {
    expect(
      calculatePersonalAndFamilyAllowance({
        age: 70,
        dependants: 2,
        disability: "33_plus",
      }),
    ).toBe(14_800);
  });

  it("uses the highest personal minimum tier for taxpayers over 75", () => {
    expect(
      calculatePersonalAndFamilyAllowance({
        age: 78,
        dependants: 0,
        disability: "none",
      }),
    ).toBe(8_100);
  });
});
