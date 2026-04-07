# Spec

## Requirement: Salary distribution chart

The results panel MUST visualize the annual salary split between net income, IRPF, and employee social security.

### Scenario: Valid calculation shows distribution chart

Given the form contains valid values
When the reactive calculation is available
Then the UI should display a chart and legend showing the proportions of net salary, IRPF, and social security

### Scenario: Invalid form keeps chart pending

Given the form still contains invalid or incomplete values
When the user views the chart area
Then the chart should show a pending message instead of a final visualization
