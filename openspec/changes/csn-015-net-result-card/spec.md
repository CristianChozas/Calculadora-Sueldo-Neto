# Spec

## Requirement: Highlighted net salary card

The UI MUST present the estimated net salary as the most prominent piece of information on screen.

### Scenario: Valid data shows highlighted net result

Given the form contains valid values
When the calculation updates
Then the screen should show a prominent card with the annual and monthly net salary

### Scenario: Pending state before valid calculation

Given the form still contains invalid or incomplete values
When the user views the result area
Then the highlighted card should remain visible and indicate that the result is pending
