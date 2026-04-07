# Spec

## Requirement: Deductions breakdown with percentages

The results panel MUST display the detailed salary breakdown with euro amounts and percentages.

### Scenario: Valid calculation shows full breakdown

Given the form contains valid data
When the reactive calculation is available
Then the panel should show gross salary, IRPF, each employee social-security component, total social security, and net salary with their percentages

### Scenario: Invalid form keeps pending state

Given the form still contains invalid values
When the user views the breakdown area
Then the UI should keep showing a pending message instead of a final breakdown
