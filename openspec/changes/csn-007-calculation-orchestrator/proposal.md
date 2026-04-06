# CSN-007 Implementar orquestador principal de calculo

## Objetivo

Unificar el calculo de sueldo neto anual y mensual a partir de los modulos fiscales ya implementados.

## Alcance

- Crear `lib/calculadora.ts`.
- Consumir `FormData` como unica entrada.
- Integrar minimo personal, IRPF y Seguridad Social.
- Devolver `CalculationResult` listo para UI.

## Fuera de alcance

- Renderizado en pantalla.
- Formularios React.
- Ajustes autonomicos avanzados.
