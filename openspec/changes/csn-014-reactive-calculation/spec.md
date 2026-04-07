# Spec

## Requirement: Reactive salary calculation

The UI MUST update the salary estimate automatically whenever the user changes any relevant field and the current data is valid.

### Scenario: Valid form updates result instantly

Given the user has entered valid salary and personal data
When the user changes salary, contract type, pay periods, age, dependants, or disability
Then the salary estimate shown on screen should update automatically without a manual calculate button

### Scenario: Invalid form blocks reactive estimate

Given one or more required fields contain invalid values
When the user edits the form
Then the UI should keep showing validation messages and avoid presenting the final reactive estimate until the data is valid
