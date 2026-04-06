# Spec

## Requirement: Personal and family allowance

The project MUST calculate the personal and family allowance from the form data that affects IRPF.

### Scenario: Age increases the personal minimum

Given a taxpayer older than 65 or 75 years
When the allowance is calculated
Then the personal minimum should increase above the base 5,550 euros threshold

### Scenario: Dependants and disability add allowances

Given a taxpayer with dependants or disability
When the allowance is calculated
Then the result should include the corresponding additions
And the function should remain pure and deterministic
