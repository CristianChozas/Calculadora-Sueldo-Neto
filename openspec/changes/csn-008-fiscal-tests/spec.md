# Spec

## Requirement: Fiscal unit tests

The fiscal logic MUST be covered by isolated unit tests before the UI relies on it.

### Scenario: Known salary case

Given a representative salary example
When the test suite runs
Then the IRPF, social security, and final net salary values should match the expected calculation

### Scenario: Edge cases

Given salaries at zero, under the taxable threshold, or above the social security cap
When the test suite runs
Then the logic should keep returning stable and expected values
