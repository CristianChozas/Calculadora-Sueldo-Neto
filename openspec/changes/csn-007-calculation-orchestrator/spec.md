# Spec

## Requirement: Net salary orchestration

The project MUST provide a main calculation function that composes fiscal modules and returns a full result for the UI.

### Scenario: Full form input is processed

Given a complete `FormData` object
When the main calculator runs
Then it should calculate social security deductions
And derive the taxable base using the personal allowance
And calculate annual and monthly net salary outputs

### Scenario: Result is UI-ready

Given a successful calculation
When the result is returned
Then the response should match `CalculationResult`
And include gross, net, IRPF, and social security breakdown data
