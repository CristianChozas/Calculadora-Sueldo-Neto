# Spec

## Requirement: Personal and family situation fields

The form MUST allow users to provide the personal and family information needed by the allowance rules.

### Scenario: User chooses marital status

Given the form is visible
When the user selects `soltero` or `casado`
Then the selected status should remain visible in the form summary

### Scenario: User sets dependants and disability

Given the form is visible
When the user enters the number of dependants and selects a disability level
Then the form should keep those selections available for later fiscal calculation steps
