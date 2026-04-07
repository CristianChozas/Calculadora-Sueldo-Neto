# Spec

## Requirement: Autonomous community selector

The form MUST allow users to choose their autonomous community before regional tax logic is implemented.

### Scenario: User chooses a territory

Given the form is visible
When the user opens the autonomous community selector
Then the list should contain the 17 autonomous communities plus Ceuta and Melilla

### Scenario: User sees the current tax scope

Given the regional selector is present
When the user reads the related help text
Then the UI should explain that the current IRPF estimate uses the state reference and may vary by autonomous community
