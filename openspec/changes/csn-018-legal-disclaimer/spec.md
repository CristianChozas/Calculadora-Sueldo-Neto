# Spec

## Requirement: Legal transparency elements

The calculator UI MUST provide an official reference link and a legal disclaimer.

### Scenario: User wants official reference

Given the result panel is visible
When the user looks for more context about IRPF
Then the UI should expose a visible link to `https://sede.agenciatributaria.gob.es`

### Scenario: User sees legal disclaimer

Given the calculator result is visible
When the user reads the transparency area
Then the UI should display the disclaimer `Calculo orientativo. Consulta a un asesor fiscal para casos especificos.`
