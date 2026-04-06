# Spec

## Requirement: Design foundation

The application MUST expose a reusable visual foundation with production-ready fonts and semantic design tokens.

### Scenario: Base theme is loaded

Given the application root layout
When the page is rendered
Then the app should load the selected font through `next/font`
And global styles should define semantic tokens for color, spacing, radius, and shadow

### Scenario: Tokens can be consumed in the UI

Given the home page
When the developer uses the initial screen
Then the page should consume the configured tokens instead of raw ad hoc styling values
