# Spec

## Requirement: Contract and payment selectors

The input form MUST let the user configure the contract type and the number of annual payments before the rest of the calculator is completed.

### Scenario: Contract type changes unemployment rate

Given a gross annual salary entered by the user
When the user switches between `indefinido` and `temporal`
Then the UI should reflect the unemployment contribution rate that applies to the selected contract

### Scenario: Payment count changes monthly gross salary

Given a gross annual salary entered by the user
When the user switches between `12` and `14` payments
Then the UI should update the gross monthly salary shown in the summary
