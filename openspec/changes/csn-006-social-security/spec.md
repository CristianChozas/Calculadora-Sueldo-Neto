# Spec

## Requirement: Employee social security calculation

The project MUST calculate employee social security deductions from annual salary inputs.

### Scenario: Standard salary under the contribution cap

Given a gross annual salary and contract type
When the social security calculation runs
Then the monthly contribution base should be derived from the annual salary and pay periods
And the result should include the annual deduction breakdown for each concept

### Scenario: Salary exceeds the contribution cap

Given a salary that produces a monthly base above 4,909.50 euros
When the social security calculation runs
Then the capped monthly base should be used for every deduction concept
