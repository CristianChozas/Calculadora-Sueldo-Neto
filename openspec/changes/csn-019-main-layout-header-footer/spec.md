# Spec

## Requirement: Main application layout

The application MUST provide a clear top-level structure with header, footer, and responsive layout.

### Scenario: Desktop layout

Given the user opens the application on a desktop viewport
When the main page renders
Then the form should appear on the left and the results panel on the right

### Scenario: Mobile layout

Given the user opens the application on a mobile viewport
When the main page renders
Then the content should stack vertically in a readable order

### Scenario: Application framing

Given the main page is visible
When the user scans the page chrome
Then the UI should show a header with the app title and a footer with `Cristian Chozas Diaz - 2025`
