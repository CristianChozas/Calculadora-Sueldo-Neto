# Spec

## Requirement: Inline form validation

The current form MUST validate the user input before the reactive calculation ticket is implemented.

### Scenario: Missing or invalid salary

Given the gross annual salary field is empty or malformed
When the user edits the field
Then the UI should show an inline validation message explaining whether the value is required, invalid, or out of range

### Scenario: Invalid dependants value

Given the dependants field contains an empty or non-integer value
When the user edits the field
Then the UI should show an inline validation message under that field
