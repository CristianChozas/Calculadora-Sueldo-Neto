# Spec

## Requirement: Shared calculation contracts

The project MUST provide strongly typed contracts for input data and calculation outputs.

### Scenario: Fiscal modules consume form input

Given a calculation use case
When it receives form data
Then the input should be described by a single `FormData` contract
And constrained fields should use explicit unions instead of free text

### Scenario: UI consumes calculation output

Given the calculation engine finishes a result
When UI modules render it
Then the output should be described by `IRPFResult`, `SSResult`, and `CalculationResult`
And the result should already separate annual and monthly values
