# Spec

## Requirement: Project bootstrap

The repository MUST provide a working Next.js application scaffold using TypeScript, Tailwind CSS and ESLint.

### Scenario: Developer installs dependencies and starts the project

Given the repository root
When the developer runs the standard project scripts
Then the project should contain a valid `package.json`
And the app router structure should exist under `app/`
And shared directories `components/` and `lib/` should be present

### Scenario: Developer validates the scaffold

Given the initial bootstrap is complete
When lint and build are executed
Then both commands should complete successfully
