# Spec

## Requirement: Progressive IRPF calculation

The project MUST provide a pure function that calculates the 2025 IRPF quota from an annual taxable base.

### Scenario: Positive taxable base spans multiple brackets

Given a taxable base above the first bracket
When the IRPF calculation runs
Then the function should apply every bracket progressively
And return the rounded tax quota in euros

### Scenario: Non-positive or invalid base

Given a taxable base equal to zero, negative, or non-finite
When the IRPF calculation runs
Then the function should return zero instead of throwing
