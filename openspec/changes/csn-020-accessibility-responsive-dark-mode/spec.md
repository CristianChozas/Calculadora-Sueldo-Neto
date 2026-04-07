# Spec

## Requirement: Accessibility, responsive, and dark mode refinement

The UI MUST improve usability across accessibility, small screens, and dark mode.

### Scenario: Keyboard navigation

Given the user navigates with keyboard
When focus moves through interactive controls
Then the UI should provide a visible focus treatment

### Scenario: Responsive readability

Given the user opens the app at mobile or tablet widths
When the page renders around 375px and 768px
Then spacing and stacking should remain readable and usable

### Scenario: Semantic form groups

Given the user or assistive technology parses the form
When grouped controls such as contract type or marital status are reached
Then the UI should expose meaningful grouping and labels
